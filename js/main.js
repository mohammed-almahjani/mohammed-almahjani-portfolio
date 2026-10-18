/**
 * main.js
 * -----------------------------------------------------------------------
 * Purpose : Core application logic for the portfolio website.
 *           Handles navigation, smooth scrolling, Bento Dashboard
 *           rendering (skill chips, certs deck), Vault tab filtering,
 *           email copy mechanism, theme toggle, lightbox, and
 *           procedural network canvas background.
 *
 * Author  : Mohammed Al-Mahjani Portfolio
 * Phase   : 4 — Bento Grid Architecture (COMPLETE)
 * -----------------------------------------------------------------------
 */

// -----------------------------------------------------------------------
// 1. NAVIGATION & SCROLL REVEAL LOGIC
// -----------------------------------------------------------------------

/* --- Sticky Navbar & Scroll Progress --- */
function initStickyNavbar() {
  const navbar = document.getElementById('navbar');
  const scrollThreshold = 50;

  const handleScroll = () => {
    if (window.scrollY > scrollThreshold) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', throttle(handleScroll, 100));
  handleScroll();
}

/* --- Mobile Menu Toggle --- */
function initMobileMenu() {
  const navToggle = document.getElementById('nav-toggle');
  const navLinksList = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (!navToggle || !navLinksList) return;

  const toggleMenu = () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
    navLinksList.classList.toggle('nav-links--open');
  };

  navToggle.addEventListener('click', toggleMenu);

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      navLinksList.classList.remove('nav-links--open');
    });
  });
}

/* --- Active Link Highlighting (IntersectionObserver) --- */
function initActiveLinkHighlighting() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const options = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, options);

  sections.forEach(section => observer.observe(section));
}

/* --- Scroll Reveal Animations --- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  const options = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--visible');
        observer.unobserve(entry.target);
      }
    });
  }, options);

  revealElements.forEach(el => observer.observe(el));
}


// -----------------------------------------------------------------------
// 2. SKILLS MATRIX RENDERING (Chip/Badge Clusters)
// -----------------------------------------------------------------------

function loadSkills() {
  if (typeof SKILLS_DATA === 'undefined') {
    console.error('SKILLS_DATA not found. Ensure data/skills-data.js is loaded before main.js.');
    const matrix = document.getElementById('skills-matrix');
    if (matrix) {
      matrix.innerHTML = `
        <div class="error-panel text-mono">
          <span class="text-danger">[ERROR]</span> SKILLS_DATA not found. Check script load order.
        </div>
      `;
    }
    return;
  }
  renderSkillsMatrix(SKILLS_DATA);
}

function renderSkillsMatrix(data) {
  const matrix = document.getElementById('skills-matrix');
  if (!matrix) return;

  matrix.innerHTML = '';

  data.forEach(domain => {
    const domainEl = document.createElement('div');
    domainEl.className = 'skill-domain';

    const titleEl = document.createElement('h3');
    titleEl.className = 'skill-domain-title';
    titleEl.textContent = domain.domain;
    domainEl.appendChild(titleEl);

    const chipsEl = document.createElement('div');
    chipsEl.className = 'skill-chips';

    domain.skills.forEach(skill => {
      const chip = document.createElement('span');
      chip.className = 'skill-chip';
      chip.textContent = skill;
      chipsEl.appendChild(chip);
    });

    domainEl.appendChild(chipsEl);
    matrix.appendChild(domainEl);
  });
}


// -----------------------------------------------------------------------
// 3. CERTIFICATES DECK RENDERING
// -----------------------------------------------------------------------

const CERTIFICATES_DATA = [
  {
    id: "ccna",
    name: "CCNA",
    issuer: "Cisco",
    category: "Networking",
    description: "Fundamental networking concepts, routing, switching, IP services, network security, and troubleshooting.",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cert-svg"><path d="M5 12h14"></path><path d="M12 5v14"></path><circle cx="12" cy="5" r="3"></circle><circle cx="12" cy="19" r="3"></circle><circle cx="5" cy="12" r="3"></circle><circle cx="19" cy="12" r="3"></circle></svg>`
  },
  {
    id: "mikrotik",
    name: "MikroTik Certification",
    issuer: "MikroTik",
    category: "Networking Infrastructure",
    description: "RouterOS administration, routing, firewall management, hotspot systems, PPPoE deployment, and network services.",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cert-svg"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="6" y="6" width="2" height="2"></rect><rect x="10" y="6" width="2" height="2"></rect><rect x="14" y="6" width="2" height="2"></rect><path d="M18 10v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V10"></path><line x1="12" y1="14" x2="12" y2="18"></line></svg>`
  },
  {
    id: "mcsa",
    name: "MCSA",
    issuer: "Microsoft",
    category: "Systems Administration",
    description: "Windows Server administration, Active Directory, user management, and enterprise services.",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cert-svg"><rect x="4" y="2" width="16" height="6" rx="1"></rect><rect x="4" y="9" width="16" height="6" rx="1"></rect><rect x="4" y="16" width="16" height="6" rx="1"></rect><line x1="6" y1="5" x2="6" y2="5.01"></line><line x1="6" y1="12" x2="6" y2="12.01"></line><line x1="6" y1="19" x2="6" y2="19.01"></line><line x1="8" y1="5" x2="18" y2="5"></line><line x1="8" y1="12" x2="18" y2="12"></line><line x1="8" y1="19" x2="18" y2="19"></line></svg>`
  },
  {
    id: "comptia-a",
    name: "CompTIA A+",
    issuer: "CompTIA",
    category: "IT Support",
    description: "Hardware, operating systems, troubleshooting, technical support, and IT fundamentals.",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cert-svg"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="15" x2="23" y2="15"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="15" x2="4" y2="15"></line></svg>`
  },
  {
    id: "icdl",
    name: "ICDL",
    issuer: "ICDL Foundation",
    category: "Productivity & Office Skills",
    description: "Microsoft Office applications, spreadsheets, documentation, and digital productivity.",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cert-svg"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`
  }
];

function loadCertificates() {
  // Try fetch first, fall back to inline data for file:// compatibility
  fetch('data/certificates.json')
    .then(response => {
      if (!response.ok) throw new Error('HTTP error');
      return response.json();
    })
    .then(data => {
      if (!data || data.length === 0 || data[0].id === 'placeholder-cert' || data.some(item => item._comment)) {
        renderCertsDeck(CERTIFICATES_DATA);
      } else {
        renderCertsDeck(data);
      }
    })
    .catch(() => {
      renderCertsDeck(CERTIFICATES_DATA);
    });
}

function renderCertsDeck(certs) {
  const deck = document.getElementById('certs-deck');
  if (!deck) return;

  deck.innerHTML = '';

  certs.forEach(cert => {
    const item = document.createElement('div');
    item.className = 'cert-mini';

    item.innerHTML = `
      <div class="cert-mini-icon">
        ${cert.icon || '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cert-svg"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>'}
      </div>
      <div class="cert-mini-info">
        <div class="cert-mini-name">${cert.name}</div>
        <div class="cert-mini-issuer">${cert.issuer}</div>
      </div>
    `;

    deck.appendChild(item);
  });
}


// -----------------------------------------------------------------------
// 4. VAULT TAB FILTERING
// -----------------------------------------------------------------------

function initVaultTabs() {
  const tabs = document.querySelectorAll('.vault-tab');
  const cards = document.querySelectorAll('.vault-card');
  const emptyState = document.getElementById('vault-empty');

  if (!tabs.length || !cards.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const filter = tab.getAttribute('data-filter');

      // Update active tab
      tabs.forEach(t => {
        t.classList.remove('vault-tab--active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('vault-tab--active');
      tab.setAttribute('aria-selected', 'true');

      // Filter cards
      let visibleCount = 0;
      cards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        const categoryAlt = card.getAttribute('data-category-alt') || '';

        if (filter === 'all' || category === filter || categoryAlt === filter) {
          card.classList.remove('vault-card--hidden');
          visibleCount++;
        } else {
          card.classList.add('vault-card--hidden');
        }
      });

      // Show/hide empty state
      if (emptyState) {
        emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    });
  });
}


// -----------------------------------------------------------------------
// 5. EMAIL COPY MECHANISM
// -----------------------------------------------------------------------

function initEmailCopy() {
  const copyBtn = document.getElementById('copy-email-btn');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    const email = copyBtn.getAttribute('data-email');
    const textSpan = copyBtn.querySelector('.copy-text');

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(() => {
        showCopyFeedback(copyBtn, textSpan, email);
      }).catch(() => {
        fallbackCopy(email, copyBtn, textSpan);
      });
    } else {
      fallbackCopy(email, copyBtn, textSpan);
    }
  });
}

function fallbackCopy(text, btn, textSpan) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    showCopyFeedback(btn, textSpan, text);
  } catch (e) {
    // Silently fail
  }
  document.body.removeChild(textarea);
}

function showCopyFeedback(btn, textSpan, originalText) {
  btn.classList.add('copied');
  textSpan.textContent = 'Copied!';

  setTimeout(() => {
    btn.classList.remove('copied');
    textSpan.textContent = originalText;
  }, 2000);
}


// -----------------------------------------------------------------------
// 6. THEME TOGGLE — Light / Dark Mode
// -----------------------------------------------------------------------

function initThemeToggle() {
  const toggleBtn   = document.getElementById('theme-toggle');
  const htmlEl      = document.documentElement;

  if (!toggleBtn) return;

  const getTheme = () => htmlEl.getAttribute('data-theme') || 'dark';

  function applyTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateToggleState(theme);

    /* Notify canvas to refresh its color palette */
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
  }

  function updateToggleState(theme) {
    if (theme === 'light') {
      toggleBtn.setAttribute('aria-label', 'Switch to Dark Mode');
      toggleBtn.setAttribute('title', 'Switch to Dark Mode');
    } else {
      toggleBtn.setAttribute('aria-label', 'Switch to Light Mode');
      toggleBtn.setAttribute('title', 'Switch to Light Mode');
    }
  }

  toggleBtn.addEventListener('click', () => {
    const current = getTheme();
    applyTheme(current === 'light' ? 'dark' : 'light');
  });

  updateToggleState(getTheme());
}


// -----------------------------------------------------------------------
// 7. FOOTER — DYNAMIC YEAR
// -----------------------------------------------------------------------

function setFooterYear() {
  const footerYear = document.getElementById('footer-year');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }
}


// -----------------------------------------------------------------------
// 8. UTILITIES
// -----------------------------------------------------------------------

function throttle(fn, limit) {
  let waiting = false;
  return function (...args) {
    if (!waiting) {
      fn.apply(this, args);
      waiting = true;
      setTimeout(() => {
        waiting = false;
      }, limit);
    }
  };
}


// -----------------------------------------------------------------------
// 9. SCREENSHOT LIGHTBOX MODAL
// -----------------------------------------------------------------------

function initLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('lightbox-close');

  if (!modal || !modalImg) return;

  // Use event delegation for dynamically rendered images too
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.lightbox-trigger');
    if (trigger) {
      modalImg.src = trigger.src;
      modalImg.alt = trigger.alt;
      modal.classList.add('lightbox--open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  });

  const closeModal = () => {
    modal.classList.remove('lightbox--open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  closeBtn?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('lightbox-content')) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('lightbox--open')) {
      closeModal();
    }
  });
}


// -----------------------------------------------------------------------
// 10. ANIMATED NETWORK BACKGROUND SYSTEM
// -----------------------------------------------------------------------

function initNetworkBackground() {
  const canvas = document.getElementById('network-bg');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let dpr = window.devicePixelRatio || 1;

  let nodes = [];
  let particles = [];
  let pulses = [];

  /* Colour palettes — Warm Obsidian/Gold vs Editorial Beige/Bronze */
  const COLORS_DARK = [
    'rgba(223, 163, 58, $opacity)',   // Warm Amber Gold (#DFA33A)
    'rgba(200, 182, 158, $opacity)',  // Champagne Sand (#C8B69E)
    'rgba(154, 123, 86, $opacity)'    // Muted Bronze (#9A7B56)
  ];

  const COLORS_LIGHT = [
    'rgba(155, 101, 20, $opacity)',   // Deep Bronze (#9B6514)
    'rgba(122, 115, 103, $opacity)',  // Warm Taupe (#7A7367)
    'rgba(120, 90, 40, $opacity)'     // Antique Bronze (#785A28)
  ];

  const getColors = () =>
    document.documentElement.getAttribute('data-theme') === 'light'
      ? COLORS_LIGHT
      : COLORS_DARK;

  /* When theme changes, re-assign node colors */
  window.addEventListener('themechange', () => {
    const palette = getColors();
    nodes.forEach(node => {
      node.color = palette[Math.floor(Math.random() * palette.length)];
    });
  });

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize() {
    dpr = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);

    initElements();
    if (prefersReducedMotion) {
      draw();
    }
  }

  function initElements() {
    nodes = [];
    particles = [];
    pulses = [];

    const COLORS = getColors();

    const nodeCount = Math.min(32, Math.max(12, Math.floor((width * height) / 40000)));
    const particleCount = Math.min(45, Math.max(15, Math.floor((width * height) / 30000)));

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: 3.5 + Math.random() * 3.5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.015 + Math.random() * 0.02
      });
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        radius: 0.8 + Math.random() * 1.0,
        opacity: 0.1 + Math.random() * 0.25
      });
    }
  }

  function update() {
    if (prefersReducedMotion) return;

    nodes.forEach(node => {
      node.x += node.vx;
      node.y += node.vy;
      node.pulsePhase += node.pulseSpeed;

      const buffer = node.radius * 3;
      if (node.x < -buffer) node.x = width + buffer;
      if (node.x > width + buffer) node.x = -buffer;
      if (node.y < -buffer) node.y = height + buffer;
      if (node.y > height + buffer) node.y = -buffer;
    });

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -p.radius) p.x = width + p.radius;
      if (p.x > width + p.radius) p.x = -p.radius;
      if (p.y < -p.radius) p.y = height + p.radius;
      if (p.y > height + p.radius) p.y = -p.radius;
    });

    if (Math.random() < 0.0025 && pulses.length < 3) {
      const targetNode = nodes[Math.floor(Math.random() * nodes.length)];
      if (targetNode) {
        pulses.push({
          x: targetNode.x,
          y: targetNode.y,
          radius: targetNode.radius,
          maxRadius: 100 + Math.random() * 60,
          color: targetNode.color,
          speed: 0.8 + Math.random() * 0.6
        });
      }
    }

    pulses.forEach((pulse, index) => {
      pulse.radius += pulse.speed;
      if (pulse.radius >= pulse.maxRadius) {
        pulses.splice(index, 1);
      }
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Draw Pulses
    pulses.forEach(pulse => {
      const progress = pulse.radius / pulse.maxRadius;
      const opacity = 0.45 * (1 - progress);
      ctx.beginPath();
      ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2);
      ctx.strokeStyle = pulse.color.replace('$opacity', opacity);
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    // Draw Connection Edges
    const maxDist = 180;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const nodeA = nodes[i];
        const nodeB = nodes[j];
        const dx = nodeA.x - nodeB.x;
        const dy = nodeA.y - nodeB.y;
        const dist = Math.hypot(dx, dy);

        if (dist < maxDist) {
          const opacity = (1 - dist / maxDist) * 0.16;
          const grad = ctx.createLinearGradient(nodeA.x, nodeA.y, nodeB.x, nodeB.y);
          grad.addColorStop(0, nodeA.color.replace('$opacity', opacity));
          grad.addColorStop(1, nodeB.color.replace('$opacity', opacity));

          ctx.beginPath();
          ctx.moveTo(nodeA.x, nodeA.y);
          ctx.lineTo(nodeB.x, nodeB.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Draw Particles (theme-aware)
    const isLightMode = document.documentElement.getAttribute('data-theme') === 'light';
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = isLightMode
        ? `rgba(155, 101, 20, ${p.opacity * 0.7})`
        : `rgba(223, 163, 58, ${p.opacity * 0.7})`;
      ctx.fill();
    });

    // Draw Nodes
    nodes.forEach(node => {
      const breathing = Math.sin(node.pulsePhase);
      const glowOpacity = 0.12 + 0.05 * breathing;
      const coreOpacity = 0.65 + 0.15 * breathing;

      // Glow halo
      const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 3.5);
      grad.addColorStop(0, node.color.replace('$opacity', glowOpacity));
      grad.addColorStop(1, node.color.replace('$opacity', 0));

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius * 3.5, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Node core
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = node.color.replace('$opacity', coreOpacity);
      ctx.fill();

      // Muted border
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius + 1.5, 0, Math.PI * 2);
      ctx.strokeStyle = node.color.replace('$opacity', 0.25);
      ctx.lineWidth = 1;
      ctx.stroke();
    });
  }

  let animationFrameId = null;
  let lastTime = 0;
  const fpsInterval = 1000 / 60;

  function tick(timestamp) {
    if (prefersReducedMotion) return;

    animationFrameId = requestAnimationFrame(tick);

    const elapsed = timestamp - lastTime;
    if (elapsed > fpsInterval) {
      lastTime = timestamp - (elapsed % fpsInterval);
      update();
      draw();
    }
  }

  function handleVisibilityChange() {
    if (document.hidden) {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    } else {
      if (!animationFrameId && !prefersReducedMotion) {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(tick);
      }
    }
  }

  window.addEventListener('resize', throttle(resize, 150));
  document.addEventListener('visibilitychange', handleVisibilityChange);

  resize();

  if (!prefersReducedMotion) {
    animationFrameId = requestAnimationFrame(tick);
  }
}


// -----------------------------------------------------------------------
// 11. INITIALIZATION
// -----------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  initNetworkBackground();
  initStickyNavbar();
  initMobileMenu();
  initThemeToggle();
  initActiveLinkHighlighting();
  initScrollReveal();
  loadSkills();
  loadCertificates();
  initVaultTabs();
  initEmailCopy();
  initLightbox();
  setFooterYear();
});
