/**
 * main.js
 * -----------------------------------------------------------------------
 * Purpose : Core application logic for the portfolio website.
 *           Handles navigation, smooth scrolling, data loading from JSON,
 *           dynamic rendering of skills/projects/certificates, and
 *           general site interactions.
 *
 * Author  : Mohammed Al-Mahjani Portfolio
 * Phase   : 3C — Projects + Sam-Smart + Network Labs sections complete
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
  // Run once initially to check state
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
    rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies the active viewport center
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
    rootMargin: '0px 0px -80px 0px', // Trigger slightly before entering fully
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--visible');
        // Stop observing once animated in
        observer.unobserve(entry.target);
      }
    });
  }, options);

  revealElements.forEach(el => observer.observe(el));
}


// -----------------------------------------------------------------------
// 2. DATA LOADING (Skeletons to be completed in Phase 5/6)
// -----------------------------------------------------------------------

/* --- Load skills (from data/skills-data.js global) --- */
function loadSkills() {
  if (typeof SKILLS_DATA === 'undefined') {
    console.error('SKILLS_DATA not found. Ensure data/skills-data.js is loaded before main.js.');
    const skillsGrid = document.getElementById('skills-grid');
    if (skillsGrid) {
      skillsGrid.innerHTML = `
        <div class="error-panel text-mono">
          <span class="text-danger">[ERROR]</span> SKILLS_DATA not found. Check script load order in index.html.
        </div>
      `;
    }
    return;
  }
  renderSkills(SKILLS_DATA);
}

/* --- Load projects (fetch projects.json with file:// fallback) --- */
function loadProjects() {
  fetch('data/projects.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      renderProjects(data);
    })
    .catch(error => {
      console.warn('Could not fetch data/projects.json dynamically, falling back to local PROJECTS_DATA:', error);
      if (typeof PROJECTS_DATA !== 'undefined') {
        // Synchronize project properties in the fallback PROJECTS_DATA global array
        const syncedData = PROJECTS_DATA.map(project => {
          if (project.id === 'smart-sam' || project.id === 'Sam-Smart') {
            return {
              ...project,
              id: "smart-sam", // align with json id
              title: "Smart-SAM",
              subnet: "Zero-Knowledge Password Manager",
              description: "Smart-SAM is a Zero-Knowledge Password Manager designed to provide enterprise-grade password protection while ensuring that sensitive user data remains inaccessible to the server itself.",
              longDescription: "The platform utilizes AES-256-GCM encryption, secure master-key management, key wrapping, and multi-factor authentication to protect credentials through a modern security architecture.",
              techStack: ["PHP", "AES-256-GCM", "Cryptography", "Argon2id", "Libsodium", "Zero-Knowledge Security", "2FA", "Password Management"],
              keyFeatures: [
                "Zero-Knowledge Security Architecture",
                "AES-256-GCM Encryption",
                "Master Key & Key Wrapping System",
                "Multi-Factor Authentication (2FA)",
                "Secure Password Vault Management"
              ],
              links: {
                github: "https://github.com/mohammed-almahjani/Smart-SAM",
                demo: ""
              },
              thumbnail: "assets/screenshots/smartsam-login.png"
            };
          }
          if (project.id === 'grocery-cards') {
            return {
              ...project,
              title: "Grocery Cards",
              subnet: "Mobile / Cloud-Connected Grocery Management System",
              description: "An offline-first, cloud-connected mobile application featuring biometric authentication, real-time Firebase sync, and a multi-layer security system.",
              longDescription: "Built on clean mobile architecture principles to deliver high availability offline while maintaining seamless secure sync with cloud datastores under role-based control parameters.",
              techStack: ["Firebase", "Offline-First", "Biometric Authentication", "Role-Based Access", "Cloud Sync", "Mobile App"],
              keyFeatures: [
                "Offline-First Architecture with Automatic Synchronization",
                "Multi-Layer Security System",
                "Biometric Authentication",
                "Real-Time Firebase Synchronization",
                "Role-Based Access & Management System"
              ],
              links: {
                github: "https://https://github.com/mohammed-almahjani",
                demo: ""
              },
              thumbnail: "assets/screenshots/grocerycards-dashboard.png"
            };
          }
          return project;
        });
        renderProjects(syncedData);
      } else {
        const grid = document.getElementById('projects-grid');
        if (grid) {
          grid.innerHTML = `
            <div class="error-panel text-mono">
              <span class="text-danger">[ERROR]</span> PROJECTS_DATA database could not be loaded.
            </div>
          `;
        }
      }
    });
}

/* --- Load certificates.json --- */
async function loadCertificates() {
  // TODO: Fetch certificates from data/certificates.json and render in Phase 5
}


// -----------------------------------------------------------------------
// 3. DYNAMIC RENDERING (Skeletons to be completed in Phase 5/6)
// -----------------------------------------------------------------------

/* --- Render Skills Grid --- */
function renderSkills(skillsData) {
  const skillsGrid = document.getElementById('skills-grid');
  if (!skillsGrid) return;

  skillsGrid.innerHTML = ''; // Clear loading notification

  skillsData.forEach(categoryObj => {
    const categoryCard = document.createElement('div');
    categoryCard.className = 'skills-category-card reveal fade-in-up';

    let cardHtml = `
      <div class="skills-category-header">
        <h3 class="category-title text-mono">${categoryObj.category}</h3>
      </div>
      <div class="skills-list">
    `;

    categoryObj.skills.forEach(skill => {
      cardHtml += `
        <div class="skill-item">
          <div class="skill-info flex-between">
            <span class="skill-name">${skill.name}</span>
            <span class="skill-percentage text-mono">${skill.level}%</span>
          </div>
          <div class="skill-bar-track">
            <div class="skill-bar-fill" style="--fill-level: ${skill.level}%"></div>
          </div>
        </div>
      `;
    });

    cardHtml += `</div>`;
    categoryCard.innerHTML = cardHtml;
    skillsGrid.appendChild(categoryCard);
  });

  // Re-observe dynamic nodes to trigger scroll animation
  initScrollReveal();
}

/* --- Render Projects Grid --- */
function renderProjects(projectsData) {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  grid.innerHTML = ''; // Clear loading placeholder

  // Sort: featured cards first
  const sorted = [...projectsData].sort((a, b) =>
    (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
  );

  sorted.forEach(project => {
    const card = document.createElement('article');
    card.className = `project-card reveal fade-in-up${project.featured ? ' project-card--featured' : ''}`;

    /* Build tech badges HTML */
    const techBadges = (project.techStack || []).map(
      tech => `<span class="tech-badge">${tech}</span>`
    ).join('');

    /* Build key features list (only for featured) */
    const featuresHtml = project.featured && project.keyFeatures
      ? `<ul class="project-features">${project.keyFeatures.map(
        f => `<li>${f}</li>`
      ).join('')}</ul>`
      : '';

    /* Build CTA links */
    const githubLink = project.links?.github
      ? `<a href="${project.links.github}" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="View ${project.title} on GitHub">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          GitHub
        </a>`
      : '';

    const demoLink = project.links?.demo
      ? `<a href="${project.links.demo}" target="_blank" rel="noopener noreferrer" class="project-link project-link--demo" aria-label="View live demo of ${project.title}">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          Live Demo
        </a>`
      : '';

    /* Build project thumbnail container if available */
    const thumbnailHtml = project.thumbnail
      ? `<div class="project-card-image">
          <img src="${project.thumbnail}" alt="${project.title} screenshot" class="project-thumbnail lightbox-trigger" />
         </div>`
      : '';

    card.innerHTML = `
      ${thumbnailHtml}
      <div class="project-card-header">
        <p class="project-category text-mono">${project.category}</p>
        <h3 class="project-title">${project.title}</h3>
      </div>
      <div class="project-card-body">
        <p class="project-desc">${project.description}</p>
        ${featuresHtml}
        <div class="project-tech">${techBadges}</div>
      </div>
      <div class="project-card-footer">${githubLink}${demoLink}</div>
    `;

    grid.appendChild(card);
  });

  // Re-run scroll reveal so dynamically inserted cards animate in
  initScrollReveal();
}

/* --- Render Certificates Grid --- */
// TODO: function renderCertificates(certificatesData) { ... }


// -----------------------------------------------------------------------
// 4. CONTACT FORM (Skeletons to be completed in Phase 5)
// -----------------------------------------------------------------------

/* --- Form Submit Handler --- */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // TODO: implement form validation & mailto/service sending in Phase 5
  });
}


// -----------------------------------------------------------------------
// 5. FOOTER — DYNAMIC YEAR
// -----------------------------------------------------------------------
function setFooterYear() {
  const footerYear = document.getElementById('footer-year');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }
}


// -----------------------------------------------------------------------
// 6. UTILITIES
// -----------------------------------------------------------------------

/* --- Throttle Helper --- */
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
// 6.5 SCREENSHOT LIGHTBOX MODAL
// -----------------------------------------------------------------------
function initLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('lightbox-close');
  const triggerImages = document.querySelectorAll('.lightbox-trigger');

  if (!modal || !modalImg) return;

  triggerImages.forEach(img => {
    img.addEventListener('click', () => {
      modalImg.src = img.src;
      modalImg.alt = img.alt;
      modal.classList.add('lightbox--open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden'; // Lock background scrolling
    });
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
// 6.8 ANIMATED NETWORK BACKGROUND SYSTEM
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

  const COLORS = [
    'rgba(0, 212, 255, $opacity)', // Cyan
    'rgba(0, 255, 157, $opacity)', // Green
    'rgba(26, 110, 247, $opacity)'  // Blue
  ];

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

    // Density-based count
    const nodeCount = Math.min(32, Math.max(12, Math.floor((width * height) / 40000)));
    const particleCount = Math.min(45, Math.max(15, Math.floor((width * height) / 30000)));

    // Generate Nodes
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

    // Generate Particles
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

    // Update Nodes
    nodes.forEach(node => {
      node.x += node.vx;
      node.y += node.vy;
      node.pulsePhase += node.pulseSpeed;

      // Screen boundary wrap with radius buffer
      const buffer = node.radius * 3;
      if (node.x < -buffer) node.x = width + buffer;
      if (node.x > width + buffer) node.x = -buffer;
      if (node.y < -buffer) node.y = height + buffer;
      if (node.y > height + buffer) node.y = -buffer;
    });

    // Update Particles
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -p.radius) p.x = width + p.radius;
      if (p.x > width + p.radius) p.x = -p.radius;
      if (p.y < -p.radius) p.y = height + p.radius;
      if (p.y > height + p.radius) p.y = -p.radius;
    });

    // Spawn / Update Pulses
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

    // Draw Connection Edges (between nearby nodes)
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

    // Draw Particles
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`;
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
  const fpsInterval = 1000 / 60; // target 60fps cap

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

  // Handle visibility changes to save battery
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

  // Setup Resize
  window.addEventListener('resize', throttle(resize, 150));
  document.addEventListener('visibilitychange', handleVisibilityChange);

  // Initialize
  resize();

  if (!prefersReducedMotion) {
    animationFrameId = requestAnimationFrame(tick);
  }
}


// -----------------------------------------------------------------------
// 7. INITIALIZATION
// -----------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  initNetworkBackground();
  initStickyNavbar();
  initMobileMenu();
  initActiveLinkHighlighting();
  initScrollReveal();
  loadSkills();    // Retrieve and render technical skills data
  loadProjects();  // Retrieve and render portfolio projects
  initLightbox();  // Initialize screenshot lightbox modal
  initContactForm();
  setFooterYear();
});
