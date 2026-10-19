/**
 * main.js
 * -----------------------------------------------------------------------
 * Purpose : Core presentation deck application logic for Mohammed Al-Mahjani Portfolio.
 *           Manages the 5-card viewport stage showcase, scroll-snap observer,
 *           floating HUD navigation rail, Card 2 Arsenal domain matrix,
 *           Card 3 Engineering Vault interactive project switcher,
 *           Card 4 Network Lab topology schematics, Card 5 direct uplink
 *           email copy with visual feedback, procedural ambient canvas,
 *           screenshot lightbox, and theme toggle.
 *
 * Author  : Mohammed Al-Mahjani Portfolio
 * Phase   : 6 — Floating Presentation Deck (COMPLETE)
 * -----------------------------------------------------------------------
 */

// -----------------------------------------------------------------------
// 1. DATA SOURCES & INLINE FALLBACKS (Zero-dependency file:// support)
// -----------------------------------------------------------------------

const VAULT_PROJECTS = [
  {
    id: "sam-smart",
    title: "Sam-Smart",
    kicker: "FEATURED DEPLOYMENT // SECURITY",
    subtitle: "Zero-Knowledge Password Manager — Enterprise Cryptographic Security",
    url: "https://sam-smart.internal/vault",
    security: "TLS 1.3 // AES-GCM",
    image: "assets/screenshots/smartsam-login.png",
    alt: "Sam-Smart Login & Vault Interface",
    desc: "Sam-Smart is a Zero-Knowledge Password Manager engineered to eliminate server-side credential compromise. Sensitive payloads are encrypted on the client device using AES-256-GCM and Argon2id key derivation, preventing raw plaintext exposure to both the database and the host infrastructure.",
    highlights: [
      "Zero-Knowledge Security Architecture",
      "AES-256-GCM Authenticated Encryption",
      "Master Key & Key Wrapping System",
      "Multi-Factor Authentication (2FA)",
      "Secure Password Vault Management"
    ],
    tech: ["PHP", "AES-256-GCM", "Argon2id", "Libsodium", "2FA", "Zero-Knowledge"],
    github: "https://github.com/mohammed-almahjani/Sam-Smart"
  },
  {
    id: "grocery-cards",
    title: "Grocery Cards",
    kicker: "MOBILE DEPLOYMENT // CLOUD ARCHITECTURE",
    subtitle: "Cloud-Connected Grocery Management System — Offline-First Architecture",
    url: "https://grocerycards.app/dashboard",
    security: "FIREBASE // BIOMETRIC",
    image: "assets/screenshots/grocerycards-dashboard.png",
    alt: "Grocery Cards Mobile Dashboard",
    desc: "An offline-first, cloud-connected mobile application designed for high availability in fluctuating network conditions. Features automated background synchronization with Firebase upon reconnection, biometric authentication, and multi-tiered role access.",
    highlights: [
      "Offline-First Architecture with Automatic Sync",
      "Multi-Layer Security System",
      "Biometric Authentication",
      "Real-Time Firebase Synchronization",
      "Role-Based Access & Management System"
    ],
    tech: ["Firebase", "Offline-First", "Biometric Auth", "Cloud Sync", "Mobile App"],
    github: "https://github.com/mohammed-almahjani"
  },
  {
    id: "ospf-lab",
    title: "Enterprise Multi-Area OSPF Network",
    kicker: "CORE ROUTING LAB // EVE-NG",
    subtitle: "Campus Dynamic Routing Topology with Area 0 Backbone & MD5 Authentication",
    url: "https://lab.internal/ospf-topology",
    security: "MD5 AUTH // AREA 0",
    image: "assets/screenshots/smartsam-login.png",
    alt: "Enterprise Multi-Area OSPF Topology Lab",
    desc: "Designed and simulated an enterprise campus routing topology in EVE-NG. Configured Area 0 backbone interconnected with stubbed branch areas, tuned hello/dead timers and cost metrics for optimal failover, and enabled MD5 routing authentication across all peer interfaces.",
    highlights: [
      "Dynamic Path Optimization: fine-tuned hello timers and cost metrics for failover stability",
      "MD5 Authentication: secured route exchanges against rogue advertisements",
      "Stub Areas: restricted LSA floods to optimize memory on branch routers"
    ],
    tech: ["OSPF", "Cisco IOS", "EVE-NG", "MD5 Hash", "Dynamic Routing"],
    github: "https://github.com/mohammed-almahjani"
  },
  {
    id: "vlan-lab",
    title: "Secure VLAN Segmentation & Inter-VLAN Routing",
    kicker: "SWITCHING & SECURITY LAB // CISCO",
    subtitle: "Department Isolation with 802.1Q Trunks & Router-on-a-Stick Architecture",
    url: "https://lab.internal/vlan-architecture",
    security: "802.1Q // PORT-SECURITY",
    image: "assets/screenshots/grocerycards-dashboard.png",
    alt: "Secure VLAN Segmentation & Inter-VLAN Routing Lab",
    desc: "Segmented corporate departments using VLANs with 802.1Q trunk encapsulation. Implemented Router-on-a-Stick gateway routing and hardened switches against VLAN hopping, MAC flooding, and rogue DHCP insertion.",
    highlights: [
      "Layer 2 Traffic Isolation: configured distinct broadcast domains for corporate units",
      "Trunk Hardening: changed native VLANs and disabled dynamic trunking protocol (DTP)",
      "Switchport Port-Security: restricted MAC addresses per access port"
    ],
    tech: ["VLANs", "802.1Q", "Router-on-a-Stick", "Switchport Security", "Cisco Packet Tracer"],
    github: "https://github.com/mohammed-almahjani"
  },
  {
    id: "mikrotik-lab",
    title: "MikroTik RouterOS Gateway & Firewall",
    kicker: "GATEWAY LAB // ROUTEROS",
    subtitle: "Stateful Firewall Rule-Chains, NAT Masquerade & PPPoE Access Management",
    url: "https://router.internal/winbox",
    security: "STATEFUL FW // NAT",
    image: "assets/screenshots/smartsam-login.png",
    alt: "MikroTik RouterOS Gateway Configuration",
    desc: "Configured a MikroTik router as an edge gateway. Designed stateful input/forward firewall chains, dynamic NAT masquerade, DHCP server pools, and PPPoE authentication for controlled enterprise network access.",
    highlights: [
      "Designed stateful input and forward firewall filter chains to drop invalid packets",
      "Configured dynamic NAT masquerade and DHCP pools with static MAC bindings",
      "Deployed PPPoE server infrastructure and client bandwidth queues"
    ],
    tech: ["MikroTik RouterOS", "WinBox", "NAT", "Firewall Chains", "PPPoE"],
    github: "https://github.com/mohammed-almahjani"
  }
];

const TOPOLOGY_DATA = {
  ospf: {
    title: "CONFIGURATION TAKEAWAY // OSPF BACKBONE",
    takeaways: [
      "LSA flooding restriction: Stub areas reduce SPF calculations on branch nodes.",
      "MD5 authentication: Configured 'ip ospf message-digest-key' on all backbone links.",
      "Cost tuning: Metric modifications guarantee primary fiber link selection."
    ],
    svg: `
      <svg viewBox="0 0 460 170" class="topo-svg" xmlns="http://www.w3.org/2000/svg">
        <!-- Area 0 Cloud -->
        <rect x="135" y="15" width="190" height="90" rx="14" fill="rgba(223, 163, 58, 0.08)" stroke="rgba(223, 163, 58, 0.25)" stroke-dasharray="3 3"/>
        <text x="230" y="32" class="topo-badge-text">OSPF AREA 0 (BACKBONE)</text>
        
        <!-- Links -->
        <line x1="80" y1="95" x2="180" y2="65" class="topo-link" />
        <line x1="180" y1="65" x2="280" y2="65" class="topo-link" />
        <line x1="280" y1="65" x2="380" y2="95" class="topo-link" />
        
        <!-- Link labels -->
        <text x="125" y="70" class="topo-badge-text">Gig0/0</text>
        <text x="230" y="58" class="topo-badge-text">MD5 AUTH</text>
        <text x="335" y="70" class="topo-badge-text">Gig0/1</text>
        
        <!-- Nodes -->
        <circle cx="80" cy="95" r="22" class="topo-node" />
        <text x="80" y="99" class="topo-text">R1</text>
        <text x="80" y="130" class="topo-badge-text">Branch (Area 1)</text>

        <circle cx="180" cy="65" r="22" class="topo-node" />
        <text x="180" y="69" class="topo-text">ABR-1</text>
        
        <circle cx="280" cy="65" r="22" class="topo-node" />
        <text x="280" y="69" class="topo-text">ABR-2</text>
        
        <circle cx="380" cy="95" r="22" class="topo-node" />
        <text x="380" y="99" class="topo-text">R2</text>
        <text x="380" y="130" class="topo-badge-text">Core Campus</text>
      </svg>
    `
  },
  vlan: {
    title: "CONFIGURATION TAKEAWAY // 802.1Q SEGMENTATION",
    takeaways: [
      "Router-on-a-Stick: Subinterfaces configured with 802.1Q encapsulation.",
      "Switchport Security: Disabled DTP negotiation; native VLAN isolated to VLAN 99.",
      "Broadcast Isolation: Complete Layer 2 containment between finance and engineering."
    ],
    svg: `
      <svg viewBox="0 0 460 170" class="topo-svg" xmlns="http://www.w3.org/2000/svg">
        <!-- Router -->
        <circle cx="230" cy="38" r="22" class="topo-node" />
        <text x="230" y="42" class="topo-text">RT-GW</text>
        <text x="230" y="14" class="topo-badge-text">Router-on-a-Stick</text>
        
        <!-- Trunk Link -->
        <line x1="230" y1="60" x2="230" y2="95" class="topo-link" />
        <text x="270" y="80" class="topo-badge-text">802.1Q Trunk</text>

        <!-- Switches -->
        <line x1="140" y1="115" x2="210" y2="115" class="topo-link" />
        <line x1="250" y1="115" x2="320" y2="115" class="topo-link" />
        
        <rect x="208" y="95" width="44" height="32" rx="4" class="topo-node" />
        <text x="230" y="115" class="topo-text">SW-CORE</text>
        
        <rect x="96" y="95" width="44" height="32" rx="4" class="topo-node" />
        <text x="118" y="115" class="topo-text">SW-1</text>
        <text x="118" y="145" class="topo-badge-text">VLAN 10 (Finance)</text>

        <rect x="320" y="95" width="44" height="32" rx="4" class="topo-node" />
        <text x="342" y="115" class="topo-text">SW-2</text>
        <text x="342" y="145" class="topo-badge-text">VLAN 20 (Eng)</text>
      </svg>
    `
  },
  mikrotik: {
    title: "CONFIGURATION TAKEAWAY // ROUTEROS FIREWALL",
    takeaways: [
      "Stateful filter chains: Accept established & related connections, drop invalid.",
      "NAT Masquerade: Translates 192.168.88.0/24 subnet through dynamic public WAN.",
      "WinBox management: Remote management locked to dedicated management interface."
    ],
    svg: `
      <svg viewBox="0 0 460 170" class="topo-svg" xmlns="http://www.w3.org/2000/svg">
        <!-- WAN -->
        <rect x="50" y="60" width="60" height="36" rx="6" class="topo-node" />
        <text x="80" y="82" class="topo-text">WAN/ISP</text>
        
        <!-- Firewall Chain Box -->
        <rect x="170" y="25" width="130" height="105" rx="8" fill="rgba(94, 158, 110, 0.08)" stroke="rgba(94, 158, 110, 0.35)" stroke-dasharray="3 3"/>
        <text x="235" y="42" class="topo-badge-text">FIREWALL FILTER</text>
        
        <circle cx="235" cy="78" r="22" class="topo-node" />
        <text x="235" y="82" class="topo-text">MikroTik</text>
        <text x="235" y="114" class="topo-badge-text">NAT Masquerade</text>

        <!-- LAN -->
        <rect x="350" y="60" width="60" height="36" rx="6" class="topo-node" />
        <text x="380" y="82" class="topo-text">LAN / POOL</text>
        <text x="380" y="112" class="topo-badge-text">192.168.88.0/24</text>
        
        <!-- Links -->
        <line x1="110" y1="78" x2="213" y2="78" class="topo-link" />
        <line x1="257" y1="78" x2="350" y2="78" class="topo-link" />
      </svg>
    `
  }
};


// -----------------------------------------------------------------------
// 2. PRESENTATION DECK STAGE OBSERVER & NAVIGATION HUD
// -----------------------------------------------------------------------

let currentSlideIndex = 0;
const slides = [];

function initPresentationDeckStage() {
  const deckContainer = document.querySelector('.deck-stage') || document.querySelector('.deck-container');
  const slideElements = document.querySelectorAll('.deck-slide');
  const hudDots = document.querySelectorAll('.hud-dot');
  const navLinks = document.querySelectorAll('.nav-deck-link');
  const hudCurrent = document.getElementById('hud-current');
  const hudTotal = document.getElementById('hud-total');
  const prevArrow = document.getElementById('deck-prev-arrow');
  const nextArrow = document.getElementById('deck-next-arrow');

  if (!slideElements.length) return;

  slides.length = 0;
  slides.push(...slideElements);

  if (hudTotal) {
    hudTotal.textContent = String(slides.length).padStart(2, '0');
  }

  function setActiveSlideUI(index) {
    currentSlideIndex = index;

    // Update slides & cards active class
    slides.forEach((slide, i) => {
      const isActive = (i === index);
      slide.classList.toggle('deck-slide--active', isActive);
      const card = slide.querySelector('.deck-card');
      if (card) {
        card.classList.toggle('deck-card--active', isActive);
        card.style.opacity = '1';
        card.style.visibility = 'visible';
      }
    });

    // Update HUD dots
    hudDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    // Update Top Navbar links
    navLinks.forEach((link, i) => {
      link.classList.toggle('active', i === index);
    });

    // Update digital counter
    if (hudCurrent) {
      hudCurrent.textContent = String(index + 1).padStart(2, '0');
    }
  }

  // Ensure first card is active and visible immediately on load
  setActiveSlideUI(0);

  // IntersectionObserver to sync active slide during scrolling
  const observerOptions = {
    root: deckContainer || null,
    rootMargin: '-15% 0px -15% 0px',
    threshold: 0.25
  };

  const slideObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const slideIdx = parseInt(entry.target.getAttribute('data-slide-idx'), 10);
        if (!isNaN(slideIdx)) {
          setActiveSlideUI(slideIdx);
        }
      }
    });
  }, observerOptions);

  slides.forEach(slide => slideObserver.observe(slide));

  // Backup scroll synchronizer for container scrolling
  if (deckContainer) {
    deckContainer.addEventListener('scroll', throttle(() => {
      const containerCenter = deckContainer.scrollTop + deckContainer.clientHeight / 2;
      let closestIndex = 0;
      let minDistance = Infinity;

      slides.forEach((slide, i) => {
        const slideCenter = slide.offsetTop + slide.clientHeight / 2;
        const distance = Math.abs(containerCenter - slideCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = i;
        }
      });

      if (closestIndex !== currentSlideIndex) {
        setActiveSlideUI(closestIndex);
      }
    }, 100));
  }

  // Smooth scroll to slide index
  function scrollToSlide(index) {
    if (index >= 0 && index < slides.length) {
      slides[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
      setActiveSlideUI(index);
    }
  }
  window.deckScrollToSlide = scrollToSlide;

  // HUD Dot Click events
  hudDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const targetIdx = parseInt(dot.getAttribute('data-slide-target'), 10);
      scrollToSlide(targetIdx);
    });
  });

  // Top Nav Link Click events
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetIdx = parseInt(link.getAttribute('data-slide-index'), 10);
      scrollToSlide(targetIdx);

      // Close mobile menu if open
      const navLinksList = document.querySelector('.nav-links');
      const navToggle = document.getElementById('nav-toggle');
      if (navLinksList && navToggle) {
        navLinksList.classList.remove('nav-links--open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Prev / Next Stepper buttons in HUD
  prevArrow?.addEventListener('click', () => {
    if (currentSlideIndex > 0) {
      scrollToSlide(currentSlideIndex - 1);
    } else {
      scrollToSlide(slides.length - 1);
    }
  });

  nextArrow?.addEventListener('click', () => {
    if (currentSlideIndex < slides.length - 1) {
      scrollToSlide(currentSlideIndex + 1);
    } else {
      scrollToSlide(0);
    }
  });

  // Keyboard Navigation: ArrowDown/ArrowUp, PageDown/PageUp
  window.addEventListener('keydown', (e) => {
    // Avoid interfering if intro gateway is currently active
    if (document.getElementById('intro-gateway')) {
      return;
    }

    // Avoid interfering if user is inside an input/textarea
    if (['input', 'textarea'].includes(document.activeElement?.tagName.toLowerCase())) {
      return;
    }

    if (e.key === 'ArrowDown' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) {
      if (currentSlideIndex < slides.length - 1) {
        e.preventDefault();
        scrollToSlide(currentSlideIndex + 1);
      }
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) {
      if (currentSlideIndex > 0) {
        e.preventDefault();
        scrollToSlide(currentSlideIndex - 1);
      }
    } else if (e.key === 'Home') {
      e.preventDefault();
      scrollToSlide(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      scrollToSlide(slides.length - 1);
    }
  });

  // CTA explore button smooth scroll to Card 3 (Vault)
  const exploreBtn = document.getElementById('cta-explore-work');
  exploreBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    scrollToSlide(2);
  });
}


// -----------------------------------------------------------------------
// 3. CARD 2: TECHNICAL ARSENAL DOMAIN MATRIX & CHIPS
// -----------------------------------------------------------------------

function initArsenalMatrix() {
  const container = document.getElementById('arsenal-chips-container');
  const filterTabs = document.querySelectorAll('.arsenal-tab');

  if (!container) return;

  // Use global SKILLS_DATA if available, otherwise inline fallback
  let skillsData = [];
  if (typeof SKILLS_DATA !== 'undefined' && Array.isArray(SKILLS_DATA)) {
    skillsData = SKILLS_DATA;
  } else {
    skillsData = [
      {
        domain: "Network & Infrastructure",
        skills: ["Cisco Routing & Switching", "MikroTik RouterOS", "OSPF & Dynamic Routing", "VLANs & 802.1Q Trunking", "Subnetting & VLSM", "Router-on-a-Stick", "PPPoE & Hotspot", "Load Balancing", "NAT & PAT"]
      },
      {
        domain: "Defensive Security & Hardening",
        skills: ["Firewall Rules & Filter Chains", "Switchport Security", "VLAN Hopping Mitigation", "MD5 Routing Authentication", "ACL Configuration", "Wireshark Packet Analysis", "Zero-Knowledge Architecture", "AES-256-GCM"]
      },
      {
        domain: "Systems & Server Administration",
        skills: ["Windows Server (AD, DNS, DHCP)", "Linux CLI & SSH Hardening", "Active Directory Management", "Group Policy Configuration (GPO)", "VMware ESXi", "Service Hardening"]
      },
      {
        domain: "Cloud & Virtualization",
        skills: ["AWS (EC2, VPC)", "Firebase (Auth, Firestore)", "Cloud Sync Architecture", "Virtualization"]
      },
      {
        domain: "Tools & Platforms",
        skills: ["EVE-NG Lab Environment", "Cisco Packet Tracer", "GNS3 Network Simulator", "WinBox (MikroTik)", "Git & Version Control"]
      }
    ];
  }

  function renderSkills(filterDomain = 'all') {
    container.innerHTML = '';

    skillsData.forEach(group => {
      // Filter logic
      const domainLower = group.domain.toLowerCase();
      let match = false;
      if (filterDomain === 'all') {
        match = true;
      } else if (filterDomain === 'network' && domainLower.includes('network')) {
        match = true;
      } else if (filterDomain === 'security' && (domainLower.includes('security') || domainLower.includes('defensive'))) {
        match = true;
      } else if (filterDomain === 'systems' && domainLower.includes('systems')) {
        match = true;
      } else if (filterDomain === 'cloud' && (domainLower.includes('cloud') || domainLower.includes('tools'))) {
        match = true;
      }

      if (!match) return;

      const groupEl = document.createElement('div');
      groupEl.className = 'skill-domain-group';

      const titleEl = document.createElement('div');
      titleEl.className = 'skill-group-heading text-mono';
      titleEl.textContent = `// ${group.domain}`;
      groupEl.appendChild(titleEl);

      const chipsWrap = document.createElement('div');
      chipsWrap.className = 'skill-chips-flex';

      group.skills.forEach(skillName => {
        const chip = document.createElement('span');
        chip.className = 'interactive-skill-chip';
        chip.textContent = skillName;
        chipsWrap.appendChild(chip);
      });

      groupEl.appendChild(chipsWrap);
      container.appendChild(groupEl);
    });
  }

  // Initial render
  renderSkills('all');

  // Filter tab clicks
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filter = tab.getAttribute('data-filter') || 'all';
      renderSkills(filter);
    });
  });
}


// -----------------------------------------------------------------------
// 4. CARD 3: THE ENGINEERING VAULT INTERACTIVE PROJECT SHOWCASE
// -----------------------------------------------------------------------

let activeProjectIndex = 0;

function initEngineeringVaultShowcase() {
  const mockupImg = document.getElementById('vault-mockup-image');
  const mockupUrl = document.getElementById('vault-mockup-url');
  const mockupSecurity = document.getElementById('vault-mockup-security');
  const projectTitle = document.getElementById('vault-project-title');
  const projectKicker = document.getElementById('vault-project-kicker');
  const projectSubtitle = document.getElementById('vault-project-subtitle');
  const projectDesc = document.getElementById('vault-project-desc');
  const highlightsList = document.getElementById('vault-project-highlights');
  const techWrap = document.getElementById('vault-project-tech');
  const githubBtn = document.getElementById('vault-github-btn');
  const stepperCount = document.getElementById('vault-stepper-count');
  const prevBtn = document.getElementById('vault-prev-btn');
  const nextBtn = document.getElementById('vault-next-btn');
  const quickSwitcher = document.getElementById('vault-quick-switcher');

  if (!projectTitle || !VAULT_PROJECTS.length) return;

  // Generate quick switcher tabs
  if (quickSwitcher) {
    quickSwitcher.innerHTML = '';
    VAULT_PROJECTS.forEach((proj, idx) => {
      const btn = document.createElement('button');
      btn.className = `vault-quick-thumb ${idx === 0 ? 'active' : ''}`;
      btn.textContent = proj.title;
      btn.setAttribute('data-proj-idx', idx);
      btn.addEventListener('click', () => setVaultProject(idx));
      quickSwitcher.appendChild(btn);
    });
  }

  function setVaultProject(index) {
    activeProjectIndex = (index + VAULT_PROJECTS.length) % VAULT_PROJECTS.length;
    const project = VAULT_PROJECTS[activeProjectIndex];

    // Update mockup visual
    if (mockupImg) {
      mockupImg.src = project.image;
      mockupImg.alt = project.alt;
    }
    if (mockupUrl) mockupUrl.textContent = project.url;
    if (mockupSecurity) mockupSecurity.textContent = project.security;

    // Update narrative
    if (projectTitle) projectTitle.textContent = project.title;
    if (projectKicker) projectKicker.textContent = project.kicker;
    if (projectSubtitle) projectSubtitle.textContent = project.subtitle;
    if (projectDesc) projectDesc.textContent = project.desc;

    // Update highlights
    if (highlightsList) {
      highlightsList.innerHTML = '';
      project.highlights.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        highlightsList.appendChild(li);
      });
    }

    // Update tech chips
    if (techWrap) {
      techWrap.innerHTML = '';
      project.tech.forEach(t => {
        const badge = document.createElement('span');
        badge.className = 'tech-badge';
        badge.textContent = t;
        techWrap.appendChild(badge);
      });
    }

    // Update GitHub action button
    if (githubBtn) {
      githubBtn.href = project.github;
      const textSpan = document.getElementById('vault-github-btn-text');
      if (textSpan) {
        textSpan.textContent = `View ${project.title} on GitHub`;
      }
    }

    // Update stepper count
    if (stepperCount) {
      stepperCount.textContent = `${String(activeProjectIndex + 1).padStart(2, '0')} / ${String(VAULT_PROJECTS.length).padStart(2, '0')}`;
    }

    // Update quick switcher tabs active state
    if (quickSwitcher) {
      const thumbs = quickSwitcher.querySelectorAll('.vault-quick-thumb');
      thumbs.forEach((th, i) => {
        th.classList.toggle('active', i === activeProjectIndex);
      });
    }
  }

  // Stepper buttons
  prevBtn?.addEventListener('click', () => {
    setVaultProject(activeProjectIndex - 1);
  });

  nextBtn?.addEventListener('click', () => {
    setVaultProject(activeProjectIndex + 1);
  });

  // Initial load
  setVaultProject(0);
}


// -----------------------------------------------------------------------
// 5. CARD 4: TOPOLOGY SCHEMATICS & CONFIGURATION TAKEAWAYS
// -----------------------------------------------------------------------

function initTopologySchematics() {
  const diagramWrap = document.getElementById('topo-diagram-wrap');
  const takeawayTitle = document.getElementById('topo-takeaway-title');
  const takeawayList = document.getElementById('topo-takeaway-list');
  const topoTabs = document.querySelectorAll('.topo-tab');

  if (!diagramWrap || !TOPOLOGY_DATA) return;

  function setTopology(key) {
    const data = TOPOLOGY_DATA[key];
    if (!data) return;

    // Render SVG
    diagramWrap.innerHTML = data.svg;

    // Update takeaways
    if (takeawayTitle) takeawayTitle.textContent = data.title;
    if (takeawayList) {
      takeawayList.innerHTML = '';
      data.takeaways.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        takeawayList.appendChild(li);
      });
    }
  }

  topoTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      topoTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const topoKey = tab.getAttribute('data-topo') || 'ospf';
      setTopology(topoKey);
    });
  });

  // Initial render
  setTopology('ospf');
}


// -----------------------------------------------------------------------
// 6. CARD 5: DIRECT UPLINK EMAIL COPY MECHANISM
// -----------------------------------------------------------------------

function initEmailCopy() {
  const copyBtn = document.getElementById('copy-email-btn');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    const email = copyBtn.getAttribute('data-email') || 'mohalmohjany@gmail.com';
    const statusText = copyBtn.querySelector('.copy-status-text');

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email)
        .then(() => triggerCopyFeedback(copyBtn, statusText))
        .catch(() => fallbackCopy(email, copyBtn, statusText));
    } else {
      fallbackCopy(email, copyBtn, statusText);
    }
  });
}

function fallbackCopy(text, btn, statusText) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    triggerCopyFeedback(btn, statusText);
  } catch (e) {
    console.error('Fallback copy failed', e);
  }
  document.body.removeChild(textarea);
}

function triggerCopyFeedback(btn, statusText) {
  btn.classList.add('copied');
  if (statusText) statusText.textContent = 'COPIED!';

  setTimeout(() => {
    btn.classList.remove('copied');
    if (statusText) statusText.textContent = 'COPY';
  }, 2200);
}


// -----------------------------------------------------------------------
// 7. THEME TOGGLE (Warm Obsidian vs Editorial Beige)
// -----------------------------------------------------------------------

function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  const htmlEl = document.documentElement;

  if (!toggleBtn) return;

  const getTheme = () => htmlEl.getAttribute('data-theme') || 'dark';

  function applyTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateToggleState(theme);

    // Notify procedural canvas to adapt its colors
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
  }

  function updateToggleState(theme) {
    if (theme === 'light') {
      toggleBtn.setAttribute('aria-label', 'Switch to Warm Obsidian Mode');
      toggleBtn.setAttribute('title', 'Switch to Warm Obsidian Mode');
    } else {
      toggleBtn.setAttribute('aria-label', 'Switch to Warm Editorial Mode');
      toggleBtn.setAttribute('title', 'Switch to Warm Editorial Mode');
    }
  }

  toggleBtn.addEventListener('click', () => {
    const current = getTheme();
    applyTheme(current === 'light' ? 'dark' : 'light');
  });

  updateToggleState(getTheme());
}


// -----------------------------------------------------------------------
// 8. MOBILE HAMBURGER MENU
// -----------------------------------------------------------------------

function initMobileMenu() {
  const navToggle = document.getElementById('nav-toggle');
  const navLinksList = document.querySelector('.nav-links');

  if (!navToggle || !navLinksList) return;

  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
    navLinksList.classList.toggle('nav-links--open');
  });
}


// -----------------------------------------------------------------------
// 9. SCREENSHOT & TOPOLOGY LIGHTBOX MODAL
// -----------------------------------------------------------------------

function initLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('lightbox-close');

  if (!modal || !modalImg) return;

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.lightbox-trigger');
    if (trigger && trigger.src) {
      modalImg.src = trigger.src;
      modalImg.alt = trigger.alt || 'Expanded architecture preview';
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
// 10. LIVING PROCEDURAL AMBIENT NETWORK BACKGROUND
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
    const nodeCount = Math.min(28, Math.max(12, Math.floor((width * height) / 45000)));
    const particleCount = Math.min(36, Math.max(14, Math.floor((width * height) / 35000)));

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        radius: 3.2 + Math.random() * 3.2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.015 + Math.random() * 0.02
      });
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        radius: 0.8 + Math.random() * 0.9,
        opacity: 0.1 + Math.random() * 0.22
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

    if (Math.random() < 0.003 && pulses.length < 3) {
      const targetNode = nodes[Math.floor(Math.random() * nodes.length)];
      if (targetNode) {
        pulses.push({
          x: targetNode.x,
          y: targetNode.y,
          radius: targetNode.radius,
          maxRadius: 90 + Math.random() * 50,
          color: targetNode.color,
          speed: 0.7 + Math.random() * 0.5
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

    // Pulses
    pulses.forEach(pulse => {
      const progress = pulse.radius / pulse.maxRadius;
      const opacity = 0.4 * (1 - progress);
      ctx.beginPath();
      ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2);
      ctx.strokeStyle = pulse.color.replace('$opacity', opacity);
      ctx.lineWidth = 1.4;
      ctx.stroke();
    });

    // Edges
    const maxDist = 170;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const nodeA = nodes[i];
        const nodeB = nodes[j];
        const dx = nodeA.x - nodeB.x;
        const dy = nodeA.y - nodeB.y;
        const dist = Math.hypot(dx, dy);

        if (dist < maxDist) {
          const opacity = (1 - dist / maxDist) * 0.14;
          const grad = ctx.createLinearGradient(nodeA.x, nodeA.y, nodeB.x, nodeB.y);
          grad.addColorStop(0, nodeA.color.replace('$opacity', opacity));
          grad.addColorStop(1, nodeB.color.replace('$opacity', opacity));

          ctx.beginPath();
          ctx.moveTo(nodeA.x, nodeA.y);
          ctx.lineTo(nodeB.x, nodeB.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }
    }

    // Particles
    const isLightMode = document.documentElement.getAttribute('data-theme') === 'light';
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = isLightMode
        ? `rgba(155, 101, 20, ${p.opacity * 0.65})`
        : `rgba(223, 163, 58, ${p.opacity * 0.65})`;
      ctx.fill();
    });

    // Nodes
    nodes.forEach(node => {
      const breathing = Math.sin(node.pulsePhase);
      const glowOpacity = 0.1 + 0.04 * breathing;
      const coreOpacity = 0.6 + 0.15 * breathing;

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

      // Border
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius + 1.2, 0, Math.PI * 2);
      ctx.strokeStyle = node.color.replace('$opacity', 0.22);
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
// 11. DYNAMIC FOOTER YEAR & UTILITIES
// -----------------------------------------------------------------------

function setFooterYear() {
  const footerYear = document.getElementById('footer-year');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }
}

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
// 12. THE MORPHING COMMAND GATEWAY
// -----------------------------------------------------------------------

function initIntroGateway() {
  const gateway = document.getElementById('intro-gateway');
  if (!gateway) return;

  // On page load, immediately check sessionStorage.getItem('intro_completed')
  // If already completed in the current browser session: immediately remove or bypass
  if (sessionStorage.getItem('intro_completed') === 'true') {
    gateway.remove();
    return;
  }

  const typewriterEl = document.getElementById('typewriter-text');
  const commandOutputEl = document.getElementById('command-output');
  const commandOutputTextEl = document.getElementById('command-output-text');
  const gatewayStatusEl = document.getElementById('gateway-status');
  const gatewayActionsEl = document.getElementById('gateway-actions');
  const enterBtn = document.getElementById('enter-portfolio-btn');

  const commandStringToType = 'sys_auth --role guest --target "Mohammed Al-Mahjani"';
  const clearanceText = 'Status: Authorized (Clearance: Level-1)';

  let isTransitioning = false;
  let typeIndex = 0;
  let typeTimer = null;
  let delayTimer = null;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Entrance & Transition Event
  function triggerGatewayExit() {
    if (isTransitioning) return;
    isTransitioning = true;

    // Clear active typing timers
    if (typeTimer) clearTimeout(typeTimer);
    if (delayTimer) clearTimeout(delayTimer);

    // Detach window keydown handler
    window.removeEventListener('keydown', handleGatewayKeydown, true);

    // Save sessionStorage flag
    try {
      sessionStorage.setItem('intro_completed', 'true');
    } catch (e) {
      console.warn('Unable to access sessionStorage:', e);
    }

    // Trigger graceful scale & fade transition
    gateway.classList.add('intro-gateway--leaving');

    // Card 1 (#card-identity) smoothly snaps into crisp focus in the center of the viewport
    const card1 = document.getElementById('card-identity') || document.getElementById('identity');
    if (typeof window.deckScrollToSlide === 'function') {
      window.deckScrollToSlide(0);
    } else if (card1) {
      card1.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    if (card1) {
      card1.classList.add('deck-card--focused');
      setTimeout(() => {
        card1.classList.remove('deck-card--focused');
      }, 1200);
    }

    // Cleanup: Remove gateway element from DOM after transition completes (0.6s)
    setTimeout(() => {
      if (gateway && gateway.parentNode) {
        gateway.remove();
      }
    }, 650);
  }

  // Keyboard navigation: Enter, Space, Escape
  function handleGatewayKeydown(e) {
    if (isTransitioning) return;
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      triggerGatewayExit();
    }
  }

  window.addEventListener('keydown', handleGatewayKeydown, true);

  // Click on primary button
  if (enterBtn) {
    enterBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      triggerGatewayExit();
    });
  }

  // Click anywhere on gateway overlay or command box
  gateway.addEventListener('click', () => {
    triggerGatewayExit();
  });

  // If reduced motion is requested, immediately display completed state
  if (prefersReducedMotion) {
    if (typewriterEl) typewriterEl.textContent = commandStringToType;
    if (commandOutputTextEl) commandOutputTextEl.textContent = clearanceText;
    if (commandOutputEl) commandOutputEl.classList.add('revealed');
    if (gatewayStatusEl) gatewayStatusEl.classList.add('revealed');
    if (gatewayActionsEl) gatewayActionsEl.classList.add('revealed');
    if (enterBtn) enterBtn.focus({ preventScroll: true });
    return;
  }

  // Realistic fast typewriter sequence
  function typeNextChar() {
    if (isTransitioning) return;

    if (typeIndex < commandStringToType.length) {
      if (typewriterEl) {
        typewriterEl.textContent += commandStringToType.charAt(typeIndex);
      }
      typeIndex++;

      // Realistic variation (24ms - 42ms)
      const charDelay = Math.floor(Math.random() * 18) + 24;
      typeTimer = setTimeout(typeNextChar, charDelay);
    } else {
      // Wait 200ms, then output Status: Authorized (Clearance: Level-1)
      delayTimer = setTimeout(() => {
        if (isTransitioning) return;

        if (commandOutputTextEl) {
          commandOutputTextEl.textContent = clearanceText;
        }
        if (commandOutputEl) {
          commandOutputEl.classList.add('revealed');
        }

        // Status badge: [SESSION GRANTED // 200 OK]
        if (gatewayStatusEl) {
          gatewayStatusEl.classList.add('revealed');
        }

        // Reveal action button container
        if (gatewayActionsEl) {
          gatewayActionsEl.classList.add('revealed');
        }

        // Softly set focus on primary button
        if (enterBtn) {
          enterBtn.focus({ preventScroll: true });
        }
      }, 200);
    }
  }

  // Initial breath (260ms) before typing begins
  typeTimer = setTimeout(typeNextChar, 260);
}


// -----------------------------------------------------------------------
// 13. INITIALIZATION
// -----------------------------------------------------------------------

window.initDeck = initPresentationDeckStage;

document.addEventListener('DOMContentLoaded', () => {
  initNetworkBackground();
  initThemeToggle();
  initMobileMenu();
  initPresentationDeckStage();
  initIntroGateway();
  initArsenalMatrix();
  initEngineeringVaultShowcase();
  initTopologySchematics();
  initEmailCopy();
  initLightbox();
  setFooterYear();
});


