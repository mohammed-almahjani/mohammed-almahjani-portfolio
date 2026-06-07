/**
 * network-bg.js
 * ─────────────────────────────────────────────────────────────────────────
 * Purpose : Procedural network infrastructure background visualization.
 *           Renders 4 depth layers:
 *             L1 — Large background topology (very subtle, slow drift)
 *             L2 — Mid-layer nodes (routers, switches, servers) + edges
 *             L3 — Packet indicators moving along connection paths
 *             L4 — Occasional pulse rings from active nodes
 *
 * Design  : Professional / Enterprise feel. No neon overload, no matrix,
 *           no gaming aesthetics. Motion is slow and elegant.
 *           Palette follows the site's CSS custom properties.
 *           Highly performant: viewport-sized canvas, off-screen pruning,
 *           and scroll-parallax depth.
 *
 * Author  : Mohammed Al-Mahjani Portfolio
 * ─────────────────────────────────────────────────────────────────────────
 */

(function NetworkBackground() {
  'use strict';

  // ── Respect prefers-reduced-motion ──────────────────────────────────────
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Canvas Setup ─────────────────────────────────────────────────────────
  const canvas = document.getElementById('network-bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, dpr;
  let pageHeight = 1000; // Track total scroll height for node distribution
  let scrollY = window.scrollY;

  function resize() {
    dpr = window.devicePixelRatio || 1;
    W = window.innerWidth;
    H = window.innerHeight; // Viewport height
    pageHeight = document.body.scrollHeight || H;

    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width  = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildTopology();
  }

  // Track scroll position
  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
  }, { passive: true });

  window.addEventListener('resize', debounce(resize, 250));

  // ── Color Palette (matches site's CSS tokens) ────────────────────────────
  const COLOR = {
    nodeCyan:     'rgba(0, 212, 255, ',
    nodeGreen:    'rgba(0, 255, 157, ',
    nodePurple:   'rgba(123, 94, 167, ',
    nodeBlue:     'rgba(26, 110, 247, ',
    edgeBase:     'rgba(0, 212, 255, ',
    packetCyan:   'rgba(0, 212, 255, ',
    packetGreen:  'rgba(0, 255, 157, ',
    pulseBase:    'rgba(0, 212, 255, ',
    bgL1:         'rgba(0, 212, 255, ',
  };

  // ── Node Types ───────────────────────────────────────────────────────────
  const NODE_TYPES = ['router', 'switch', 'server', 'firewall', 'endpoint'];

  // ── State ─────────────────────────────────────────────────────────────────
  let nodes    = [];   // L2 main nodes
  let edges    = [];   // L2 connections
  let packets  = [];   // L3 moving packets
  let pulses   = [];   // L4 ring pulses
  let bgNodes  = [];   // L1 large background topology nodes
  let bgEdges  = [];   // L1 background edges
  let raf      = null;
  let lastTime = 0;

  // ── Configuration ─────────────────────────────────────────────────────────
  const CFG = {
    // L1
    bgNodeCount:    12,
    bgNodeMinR:     60,
    bgNodeMaxR:     120,
    bgDriftSpeed:   0.008,   // very slow drift

    // L2
    nodeCount:      24,      // Distributed along the page height
    nodeMinR:       5,
    nodeMaxR:       9,
    edgeMaxDist:    220,
    edgeOpacity:    0.12,

    // L3
    packetCount:    16,
    packetSpeed:    0.0004,  // fraction of edge per ms
    packetRadius:   2.5,

    // L4
    pulseInterval:  3000,    // ms between spontaneous pulses
    pulseMaxRadius: 80,
    pulseSpeed:     0.022,   // growth per frame at 60fps

    // General
    targetFPS:      60,
  };

  // ─────────────────────────────────────────────────────────────────────────
  // BUILD TOPOLOGY
  // ─────────────────────────────────────────────────────────────────────────
  function buildTopology() {
    nodes   = [];
    edges   = [];
    packets = [];
    pulses  = [];
    bgNodes = [];
    bgEdges = [];

    // ── L1 Background mega-nodes (very large, very subtle) ─────────────────
    for (let i = 0; i < CFG.bgNodeCount; i++) {
      bgNodes.push({
        x:  rand(W * 0.05, W * 0.95),
        y:  rand(pageHeight * 0.02, pageHeight * 0.98),
        r:  rand(CFG.bgNodeMinR, CFG.bgNodeMaxR),
        vx: (Math.random() - 0.5) * CFG.bgDriftSpeed,
        vy: (Math.random() - 0.5) * CFG.bgDriftSpeed,
        phase: Math.random() * Math.PI * 2,
      });
    }
    // Connect nearest bg nodes
    for (let i = 0; i < bgNodes.length; i++) {
      for (let j = i + 1; j < bgNodes.length; j++) {
        const d = dist(bgNodes[i], bgNodes[j]);
        if (d < W * 0.45) bgEdges.push({ a: i, b: j, alpha: rand(0.015, 0.04) });
      }
    }

    // ── L2 Main nodes ──────────────────────────────────────────────────────
    const sectionH = pageHeight / CFG.nodeCount;
    for (let i = 0; i < CFG.nodeCount; i++) {
      const type = NODE_TYPES[Math.floor(Math.random() * NODE_TYPES.length)];
      nodes.push({
        x:    rand(W * 0.04, W * 0.96),
        y:    i * sectionH + rand(sectionH * 0.1, sectionH * 0.9),
        r:    rand(CFG.nodeMinR, CFG.nodeMaxR),
        type: type,
        color:nodeColor(type),
        pulsePhase: Math.random() * Math.PI * 2,
        // slow ambient bob
        driftVy: (Math.random() - 0.5) * 0.008,
        driftY:  0,
      });
    }

    // ── L2 Edges ───────────────────────────────────────────────────────────
    for (let i = 0; i < nodes.length; i++) {
      let neighbours = [];
      for (let j = 0; j < nodes.length; j++) {
        if (i === j) continue;
        const d = dist(nodes[i], nodes[j]);
        if (d < CFG.edgeMaxDist) neighbours.push({ j, d });
      }
      neighbours.sort((a, b) => a.d - b.d);
      const take = Math.min(neighbours.length, 2 + Math.floor(Math.random() * 2));
      for (let k = 0; k < take; k++) {
        const j = neighbours[k].j;
        const exists = edges.some(e => (e.a === i && e.b === j) || (e.a === j && e.b === i));
        if (!exists) {
          edges.push({
            a: i,
            b: j,
            alpha: rand(0.06, CFG.edgeOpacity),
            dash: Math.random() < 0.35, // 35% dashed
          });
        }
      }
    }

    // ── L3 Packets — spawn initial batch ──────────────────────────────────
    for (let i = 0; i < CFG.packetCount; i++) {
      if (edges.length) spawnPacket();
    }
  }

  function nodeColor(type) {
    switch(type) {
      case 'router':   return COLOR.nodeCyan;
      case 'switch':   return COLOR.nodeGreen;
      case 'server':   return COLOR.nodeBlue;
      case 'firewall': return COLOR.nodePurple;
      default:         return COLOR.nodeCyan;
    }
  }

  function spawnPacket() {
    if (!edges.length) return;
    const edgeIdx = Math.floor(Math.random() * edges.length);
    const edge    = edges[edgeIdx];
    const forward = Math.random() < 0.5;
    const color   = Math.random() < 0.7 ? COLOR.packetCyan : COLOR.packetGreen;
    packets.push({
      edgeIdx,
      forward,
      progress: 0,                          // 0 → 1 along edge
      speed: rand(CFG.packetSpeed * 0.5, CFG.packetSpeed * 1.5),
      color,
      opacity: rand(0.55, 0.85),
      done: false,
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER LOOP
  // ─────────────────────────────────────────────────────────────────────────
  function frame(ts) {
    raf = requestAnimationFrame(frame);

    const dt = ts - lastTime;
    if (dt < 14) return;       // cap at ~70fps so it doesn't run too fast
    lastTime = ts;

    ctx.clearRect(0, 0, W, H);

    updateBgNodes(dt);
    drawBgLayer();

    updateNodes(dt);
    drawEdges();
    drawNodes();

    updatePackets(dt);
    drawPackets();

    updatePulses(dt);
    drawPulses();
  }

  // ─────────────────────────────────────────────────────────────────────────
  // L1 BACKGROUND LAYER
  // ─────────────────────────────────────────────────────────────────────────
  function updateBgNodes(dt) {
    const speed = dt;
    bgNodes.forEach(n => {
      n.x += n.vx * speed;
      n.y += n.vy * speed;
      n.phase += 0.0003 * dt;
      // Soft wrap
      if (n.x < -n.r) n.x = W + n.r;
      if (n.x > W + n.r) n.x = -n.r;
      if (n.y < -n.r) n.y = pageHeight + n.r;
      if (n.y > pageHeight + n.r) n.y = -n.r;
    });
  }

  function drawBgLayer() {
    bgEdges.forEach(e => {
      const a = bgNodes[e.a];
      const b = bgNodes[e.b];
      
      // L1 parallax scroll shift (0.3 factor)
      const ay = a.y - scrollY * 0.3;
      const by = b.y - scrollY * 0.3;

      // Off-screen pruning
      if ((ay >= -150 && ay <= H + 150) || (by >= -150 && by <= H + 150)) {
        ctx.beginPath();
        ctx.moveTo(a.x, ay);
        ctx.lineTo(b.x, by);
        ctx.strokeStyle = COLOR.bgL1 + e.alpha + ')';
        ctx.lineWidth   = 1;
        ctx.setLineDash([]);
        ctx.stroke();
      }
    });

    bgNodes.forEach(n => {
      const ny = n.y - scrollY * 0.3;
      if (ny < -n.r || ny > H + n.r) return;

      const breathe = 0.5 + 0.5 * Math.sin(n.phase);
      const alpha   = 0.02 + breathe * 0.015;

      // Outer ring
      ctx.beginPath();
      ctx.arc(n.x, ny, n.r, 0, Math.PI * 2);
      ctx.strokeStyle = COLOR.bgL1 + alpha + ')';
      ctx.lineWidth   = 1.5;
      ctx.setLineDash([6, 6]);
      ctx.stroke();

      // Inner dot
      ctx.beginPath();
      ctx.arc(n.x, ny, 3, 0, Math.PI * 2);
      ctx.fillStyle = COLOR.bgL1 + (alpha * 2) + ')';
      ctx.fill();

      ctx.setLineDash([]);
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // L2 NODES + EDGES
  // ─────────────────────────────────────────────────────────────────────────
  function updateNodes(dt) {
    nodes.forEach(n => {
      n.pulsePhase += 0.0015 * dt;
      n.driftY     += n.driftVy * dt;
      if (Math.abs(n.driftY) > 6) n.driftVy *= -1;
    });
  }

  function drawEdges() {
    ctx.setLineDash([]);
    edges.forEach(e => {
      const a = nodes[e.a];
      const b = nodes[e.b];
      
      // L2 1:1 scroll alignment
      const ay = a.y + a.driftY - scrollY;
      const by = b.y + b.driftY - scrollY;

      // Offscreen pruning
      if ((ay >= -100 && ay <= H + 100) || (by >= -100 && by <= H + 100)) {
        ctx.beginPath();
        ctx.moveTo(a.x, ay);
        ctx.lineTo(b.x, by);
        ctx.strokeStyle = COLOR.edgeBase + e.alpha + ')';
        ctx.lineWidth   = 1;
        if (e.dash) {
          ctx.setLineDash([4, 8]);
        } else {
          ctx.setLineDash([]);
        }
        ctx.stroke();
      }
    });
    ctx.setLineDash([]);
  }

  function drawNodes() {
    nodes.forEach(n => {
      // L2 1:1 scroll alignment
      const y = n.y + n.driftY - scrollY;
      if (y < -n.r * 3 || y > H + n.r * 3) return;

      const breathe = 0.5 + 0.5 * Math.sin(n.pulsePhase);

      // Glow halo (very soft)
      const grad = ctx.createRadialGradient(n.x, y, 0, n.x, y, n.r * 2.8);
      grad.addColorStop(0,   n.color + (0.08 + breathe * 0.04) + ')');
      grad.addColorStop(1,   n.color + '0)');
      ctx.beginPath();
      ctx.arc(n.x, y, n.r * 2.8, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Core circle
      ctx.beginPath();
      ctx.arc(n.x, y, n.r, 0, Math.PI * 2);
      ctx.fillStyle   = n.color + '0.06)';
      ctx.fill();
      ctx.strokeStyle = n.color + (0.35 + breathe * 0.15) + ')';
      ctx.lineWidth   = 1.5;
      ctx.stroke();

      drawNodeIcon(ctx, n, y, breathe);
    });
  }

  function drawNodeIcon(ctx, n, y, breathe) {
    const s = n.r * 0.55;
    ctx.strokeStyle = n.color + (0.55 + breathe * 0.2) + ')';
    ctx.lineWidth   = 1;

    ctx.save();
    ctx.translate(n.x, y);

    switch(n.type) {
      case 'router': {
        ctx.beginPath(); ctx.arc(0, 0, s * 0.4, -Math.PI * 0.75, -Math.PI * 0.25); ctx.stroke();
        ctx.beginPath(); ctx.arc(0, 0, s * 0.7, -Math.PI * 0.75, -Math.PI * 0.25); ctx.stroke();
        ctx.beginPath(); ctx.arc(0, 0, s,        -Math.PI * 0.75, -Math.PI * 0.25); ctx.stroke();
        ctx.fillStyle = n.color + '0.8)';
        ctx.beginPath(); ctx.arc(0, 0, 1.2, 0, Math.PI * 2); ctx.fill();
        break;
      }
      case 'switch': {
        const hs = s * 0.65;
        ctx.beginPath();
        ctx.moveTo(-hs, -2); ctx.lineTo(hs, -2);
        ctx.moveTo(hs * 0.5, -2 - 3); ctx.lineTo(hs, -2); ctx.lineTo(hs * 0.5, -2 + 3);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(hs, 2); ctx.lineTo(-hs, 2);
        ctx.moveTo(-hs * 0.5, 2 - 3); ctx.lineTo(-hs, 2); ctx.lineTo(-hs * 0.5, 2 + 3);
        ctx.stroke();
        break;
      }
      case 'server': {
        const rw = s * 1.2, rh = s * 0.28;
        ctx.beginPath(); ctx.rect(-rw/2, -rh * 1.5, rw, rh); ctx.stroke();
        ctx.beginPath(); ctx.rect(-rw/2, -rh * 0.3, rw, rh); ctx.stroke();
        ctx.beginPath(); ctx.rect(-rw/2,  rh * 0.9, rw, rh); ctx.stroke();
        break;
      }
      case 'firewall': {
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.lineTo(s * 0.8, -s * 0.4);
        ctx.lineTo(s * 0.8, s * 0.2);
        ctx.quadraticCurveTo(0, s * 1.1, 0, s * 1.1);
        ctx.quadraticCurveTo(-s * 0.8, s * 0.2, -s * 0.8, s * 0.2);
        ctx.lineTo(-s * 0.8, -s * 0.4);
        ctx.closePath();
        ctx.stroke();
        break;
      }
      default: {
        ctx.fillStyle = n.color + '0.7)';
        ctx.beginPath(); ctx.arc(0, 0, s * 0.45, 0, Math.PI * 2); ctx.fill();
        break;
      }
    }

    ctx.restore();
  }

  // ─────────────────────────────────────────────────────────────────────────
  // L3 PACKETS
  // ─────────────────────────────────────────────────────────────────────────
  function updatePackets(dt) {
    packets.forEach(p => {
      p.progress += p.speed * dt;
      if (p.progress >= 1) {
        p.done = true;
        const edge = edges[p.edgeIdx];
        const destIdx = p.forward ? edge.b : edge.a;
        if (Math.random() < 0.30) {
          spawnPulse(destIdx);
        }
      }
    });
    const before = packets.length;
    packets = packets.filter(p => !p.done);
    const spawned = before - packets.length;
    for (let i = 0; i < spawned; i++) spawnPacket();
  }

  function drawPackets() {
    packets.forEach(p => {
      const edge = edges[p.edgeIdx];
      const a    = nodes[edge.a];
      const b    = nodes[edge.b];
      
      // L2 1:1 scroll alignment
      const ay = a.y + a.driftY - scrollY;
      const by = b.y + b.driftY - scrollY;

      if ((ay < -50 && by < -50) || (ay > H + 50 && by > H + 50)) return;

      const t    = p.forward ? p.progress : 1 - p.progress;
      const x    = a.x + (b.x - a.x) * t;
      const y    = ay  + (by  - ay)  * t;

      for (let i = 3; i >= 0; i--) {
        const trailT = Math.max(0, t - i * 0.025);
        const tx = a.x + (b.x - a.x) * trailT;
        const ty = ay  + (by  - ay)  * trailT;
        const r  = CFG.packetRadius * (1 - i * 0.22);
        const a_ = p.opacity * (1 - i * 0.25);
        ctx.beginPath();
        ctx.arc(tx, ty, r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + a_ + ')';
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(x, y, CFG.packetRadius, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.opacity + ')';
      ctx.fill();
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // L4 PULSE RINGS
  // ─────────────────────────────────────────────────────────────────────────
  let pulseTimer = 0;

  function spawnPulse(nodeIdx) {
    if (nodeIdx === undefined) {
      // Prioritize nodes that are currently within the visible screen
      const visibleNodes = [];
      nodes.forEach((n, idx) => {
        const y = n.y + n.driftY - scrollY;
        if (y >= -100 && y <= H + 100) {
          visibleNodes.push(idx);
        }
      });
      if (visibleNodes.length > 0) {
        nodeIdx = visibleNodes[Math.floor(Math.random() * visibleNodes.length)];
      } else {
        nodeIdx = Math.floor(Math.random() * nodes.length);
      }
    }
    const n = nodes[nodeIdx];
    pulses.push({
      x:       n.x,
      y:       n.y + n.driftY, // store in page coordinates
      r:       n.r,
      maxR:    CFG.pulseMaxRadius,
      alpha:   0.5,
      color:   n.color,
      done:    false,
    });
  }

  function updatePulses(dt) {
    pulseTimer += dt;
    if (pulseTimer >= CFG.pulseInterval) {
      pulseTimer = 0;
      spawnPulse();
    }

    pulses.forEach(p => {
      p.r     += CFG.pulseSpeed * dt;
      p.alpha -= 0.0004 * dt;
      if (p.r >= p.maxR || p.alpha <= 0) p.done = true;
    });
    pulses = pulses.filter(p => !p.done);
  }

  function drawPulses() {
    pulses.forEach(p => {
      const y = p.y - scrollY;
      if (y < -p.r || y > H + p.r) return;

      ctx.beginPath();
      ctx.arc(p.x, y, p.r, 0, Math.PI * 2);
      ctx.strokeStyle = p.color + Math.max(0, p.alpha) + ')';
      ctx.lineWidth   = 1;
      ctx.stroke();
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // UTILITIES
  // ─────────────────────────────────────────────────────────────────────────
  function dist(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
  }
  function rand(min, max) {
    return min + Math.random() * (max - min);
  }
  function debounce(fn, ms) {
    let t;
    return function(...args) {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), ms);
    };
  }

  // ─────────────────────────────────────────────────────────────────────────
  // BOOT
  // ─────────────────────────────────────────────────────────────────────────
  resize();

  if (reducedMotion) {
    buildTopology();
    frame(0);
    return;
  }

  requestAnimationFrame(function(ts) {
    lastTime = ts;
    raf = requestAnimationFrame(frame);
  });

  // Pause when tab is hidden (battery friendly)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(raf);
      raf = null;
    } else if (!raf) {
      lastTime = performance.now();
      raf = requestAnimationFrame(frame);
    }
  });

})();
