# PROJECT_CONTEXT.md
> ⚠️ This is the permanent memory and single source of truth for this project.
> Every AI model working on this project MUST read this file first before making any changes.
> This file MUST be updated immediately after every action.

---

# Project Overview

A one-page professional portfolio website for a Network & Cybersecurity Engineer.
Theme: Premium Dark Cyber Portfolio — English only, fully responsive, clean code, no frameworks.
Owner: Mohammed Al-Mahjani (placeholder — to be confirmed).

---

# Current Development Phase

**Phase 3C — Projects + Sam-Smart Showcase + Network Labs (COMPLETE)**
HTML, CSS, and JavaScript built for the Projects section (data-driven cards from projects.json), the Sam-Smart architecture deep-dive panel, and all three Network Labs cards.

---

# Project Structure

```
portfolio-website/                  ← root of the project
├── PROJECT_CONTEXT.md              ← permanent project memory (this file)
├── index.html                      ← single-page HTML entry point with static fallbacks
├── README.md                       ← project documentation
├── .gitignore                      ← system and editor ignores
├── .editorconfig                   ← coding style standardization
│
├── .well-known/
│   └── security.txt                ← RFC 9116 security contact point (cybersecurity detail)
│
├── assets/
│   ├── images/                     ← profile photo, background images
│   ├── icons/                      ← SVG/PNG icons (skills, social, etc.)
│   ├── cv/                         ← downloadable CV/resume PDF
│   └── screenshots/                ← project & lab screenshots
│
├── css/
│   ├── style.css                   ← main styles + root CSS variables (dark theme)
│   ├── responsive.css              ← media queries for all breakpoints
│   └── animations.css             ← keyframe animations & transitions
│
├── js/
│   ├── main.js                     ← core logic (nav, scroll, sections)
│   ├── animations.js              ← scroll-triggered & UI animations
│   └── network-bg.js              ← procedural canvas network background (4-layer system)
│
├── data/
│   ├── projects.json               ← portfolio projects data
│   ├── skills.json                 ← technical skills data
│   └── certificates.json          ← certifications data
│
└── docs/
    └── notes.md                    ← developer notes & decisions log
```

---

# Completed Tasks

- [x] Created `PROJECT_CONTEXT.md` (this file)
- [x] Created `index.html` — basic HTML5 structure, SEO-ready metadata, semantic contact form, all CSS/JS linked, sections scaffolded
- [x] Created `css/style.css` — dark theme root variables + section comments
- [x] Created `css/responsive.css` — breakpoint comments scaffold
- [x] Created `css/animations.css` — animation comments scaffold
- [x] Created `js/main.js` — comments-only scaffold
- [x] Created `js/animations.js` — comments-only scaffold
- [x] Created `data/projects.json` — placeholder data object
- [x] Created `data/skills.json` — placeholder data object
- [x] Created `data/certificates.json` — placeholder data object
- [x] Created `docs/notes.md` — developer notes scaffold
- [x] Created `README.md` — project documentation
- [x] Completed Architecture Review & validation of folder structure, semantics, SEO, A11y
- [x] Created `.gitignore` — repo cleanup rules
- [x] Created `.editorconfig` — code layout formatting rules
- [x] Created `.well-known/security.txt` — cybersecurity professional contact point
- [x] Completed Phase 2: Design System — configured fonts, full CSS reset, base typography, flex/grid layout utilities, custom scrollbar, primary/secondary/submit button styles, and accessibility helper classes.
- [x] Completed Phase 3A: Premium Navbar + Hero Section — designed fixed transparent glassmorphism header, hamburger menu with state animations, responsive grid hero with SVG action buttons, HTML/CSS terminal panel, decorative floating network nodes, and scroll tracker indicator.
- [x] Completed Phase 3B: About + Skills Section — built professional About layouts with metric panels and competency categories, configured custom skills data inside `data/skills.json`, and implemented a synchronized CSS transition animation for skills bars linked with scroll-reveal triggers.
- [x] Completed Phase 3C: Projects + Smart-SAM Showcase + Network Labs — built data-driven project cards (featured layout for Smart-SAM), full Smart-SAM architecture deep-dive panel (PBKDF2 → AES-256-GCM → Firebase flow diagram, security stats), three Network Labs cards (OSPF, VLAN, MikroTik) with topology placeholders and learning outcomes. CSS for all three sections added to `style.css`; `renderProjects()` fully implemented in `main.js`.
- [x] Completed Phase 7: Add Smart-SAM Showcase section with screenshots — integrated the official Smart-SAM login interface screenshot, mock browser window frame, and image expansion lightbox modal.
- [x] Completed Grocery Cards project integration — integrated the Grocery Cards app dashboard screenshot, updated technological badges, and structured its feature catalog as an additional project card.
- [x] Completed Dynamic Network Background System — built a 4-layer procedural canvas background in `js/network-bg.js`. Layer 1: large drifting topology rings. Layer 2: routers, switches, servers, firewalls + connection edges. Layer 3: slow-moving packet indicators with trails. Layer 4: spontaneous network pulse events. Viewport-sized canvas for maximum performance, scroll-parallax depth effect, off-screen node pruning, and `prefers-reduced-motion` compliance. All section backgrounds converted to semi-transparent to let the canvas show through uniformly across the page.

---

# Pending Tasks

- [ ] Phase 3D: Experience Section HTML/CSS structure (timeline layout)
- [ ] Phase 4: Implement CSS design (dark cyber theme, glassmorphism, animations)
- [ ] Phase 5: Add JavaScript interactivity (nav, smooth scroll, section reveals)
- [ ] Phase 6: Populate JSON data files with real projects, skills, certificates
- [ ] Phase 8: Add Network Labs section with lab diagrams/screenshots
- [ ] Phase 9: Responsiveness testing across all breakpoints
- [ ] Phase 10: Performance optimization & SEO meta tags
- [ ] Phase 11: Final review and deployment preparation

---

# Design Decisions

| Decision | Choice | Reason |
|---|---|---|
| Framework | None (Vanilla HTML/CSS/JS) | Clean, no dependencies, full control |
| CSS preprocessor | None | Keep it simple and portable |
| Theme | Premium Dark Cyber | Reflects cybersecurity domain |
| Layout | Single Page Application (SPA-style) | Smooth user experience |
| Color direction | Deep dark navy/black + cyan/green accents | Cyber aesthetic |
| Font direction | Monospace for accents + sans-serif for body | Professional & thematic |
| Data storage | JSON files | Separation of content from presentation |
| Images | Real assets only | No placeholder/fake images |

---

# Constraints

- ❌ No CSS frameworks (no Bootstrap, no Tailwind)
- ❌ No JavaScript frameworks (no React, no Vue, no Angular)
- ❌ No fake certificates, fake experience, or fake images
- ❌ Do not rename files or folders without updating this document
- ✅ English only
- ✅ Fully responsive (mobile-first approach)
- ✅ Clean, commented, professional code
- ✅ All changes must update this file immediately

---

# Change Log

| Date | Action | Description |
|---|---|---|
| 2026-06-06 | INIT | Project scaffolding — all starter files created |
| 2026-06-06 | ARCH_REVIEW | Completed Architecture Review; added `.gitignore`, `.editorconfig`, `.well-known/security.txt`, and enhanced `index.html` semantics and SEO |
| 2026-06-06 | DESIGN_SYS | Completed Phase 2: Design System styling in `style.css` (reset, fonts, grid, custom scrollbar, accessibility helpers, buttons) |
| 2026-06-06 | NAV_HERO | Completed Phase 3A: Premium Navbar + Hero section built (HTML layouts, CSS terminal panel & network nodes, animations, main.js scrolling tracking) |
| 2026-06-06 | ABOUT_SKILLS| Completed Phase 3B: About + Skills Section (HTML structure, stats, cards, skills JSON data, and CSS-reveal triggered progress bars) |
| 2026-06-06 | PROJECTS_3C | Completed Phase 3C: Projects section (data-driven cards + featured treatment), Smart-SAM Showcase (architecture panel, encryption flow, security stats), Network Labs (OSPF, VLAN, MikroTik cards with topology visuals + learning outcomes) |
| 2026-06-06 | SHOWCASE_INTEG | Completed Phase 3C: Smart-SAM Showcase Integration & Grocery Cards integration. Added official screenshot assets in mock browser containers, built dark cyber image-expansion lightbox modal, added dynamic loading with offline-global fallbacks in `main.js`, and styled split featured card layouts. |
| 2026-06-06 | NETWORK_BG | Completed Dynamic Network Background System. Created `js/network-bg.js` with 4-layer procedural canvas rendering (topology rings, infrastructure nodes+edges, packet animations, pulse events). Viewport-sized canvas, scroll-parallax parallax depth, off-screen pruning, `prefers-reduced-motion` compliance. Updated all section backgrounds to semi-transparent in `style.css`. |

---

# Last Action Performed

**Dynamic Network Background System — COMPLETE**
Built a full 4-layer procedural canvas background system (`js/network-bg.js`). The canvas is fixed to the viewport at `z-index: -1`, rendering a living network infrastructure visualization across the entire portfolio. Nodes represent routers, switches, servers, and firewalls with matching type-icons. Slow-moving packet indicators travel along connection edges, triggering pulse ring events on arrival. L1 large topology rings drift at 0.3× scroll parallax speed for depth. L2 nodes scroll 1:1 with page content. Off-screen pruning keeps it at 60fps. All section backgrounds converted from solid to semi-transparent (88–94% opacity) in `style.css` so the network is softly visible through every section.

---

# Next Recommended Action

**Network Labs Showcase Integration**
Complete integration of the three Network Labs diagrams/topologies:
- OSPF multi-area dynamic routing lab topology diagrams placement
- VLAN department isolation routing gateway diagram placement
- MikroTik RouterOS gateway NAT/firewall structure diagram placement
- Lightbox expansion modal integration for lab topology images
- Responsive card optimization and scroll reveal animations verification

