# PROJECT_CONTEXT.md
> ⚠️ This is the permanent memory and single source of truth for this project.
> Every AI model working on this project MUST read this file first before making any changes.
> This file MUST be updated immediately after every action.

---

# Project Overview

A one-page professional portfolio website for a Network & Cybersecurity Engineer.
Theme: Luxury Industrial Tech — Warm Obsidian, Muted Amber Gold, and Editorial Warm Beige.
Architecture: Floating Presentation Deck (Viewport Stage Showcase) inspired by keynote presentations.
Owner: Mohammed Al-Mahjani.

---

# Current Development Phase

**Current Phase**: Phase 6 — Floating Presentation Deck Architecture Complete
Complete structural transformation into a sequence of cinematic, high-density floating cards (`.deck-card`) that snap smoothly into the viewport center over the living ambient network background.

**Previous Phase Completed**: Bento Grid Architecture (Phase 5).

**Next Phase**: Production deployment and live hosting verification.

---

# Architecture: 5-Card Floating Presentation Deck

| Card # | Slide Target | Focus | Left Column (Visual Canvas) | Right Column (Narrative & Action) |
|--------|--------------|-------|------------------------------|-----------------------------------|
| Card 1 | `#identity` | Executive Identity & Positioning | Framed portrait with gold accent corners, pulsing sage-green availability badge, telemetry strip | Authoritative headline, bio, primary CTA ("Explore Engineering Work"), CV download, GitHub trigger |
| Card 2 | `#arsenal` | Technical Arsenal & Domain Matrix | 4-tile telemetry metrics (5+ Certs, 100+ Lab Hours, 15+ Topologies, 5+ Audits) + Focus domain strip | Domain-grouped interactive skill chips (Network, Defense, Systems, Cloud, Tools) with filter tabs |
| Card 3 | `#vault` | The Engineering Vault (Projects) | High-res browser frame mockup with URL/security badges, lightbox zoom trigger | Interactive project switcher (Sam-Smart, Grocery Cards, OSPF Lab, VLAN Lab, MikroTik Lab), problem statement, tech stack, GitHub links |
| Card 4 | `#credentials` | Verified Credentials & Network Labs | Interactive SVG topology schematics (OSPF Area 0, 802.1Q VLANs, MikroTik Firewall) + configuration takeaways | Verified credentials deck (CCNA, MikroTik, MCSA, CompTIA A+, ICDL) + 100+ user production deployment milestone |
| Card 5 | `#contact` | Direct Uplink & Secure Contact | Availability scope, transport security statement, instant PDF CV download card | One-click email copy with animated "COPIED!" feedback, verified LinkedIn & GitHub links, direct mailto launcher |

---

# Navigation & Motion Dynamics

- **CSS Scroll-Snap**: `scroll-snap-type: y mandatory` on desktop (`scroll-snap-align: center`), with soft proximity on mobile.
- **Floating Deck HUD Indicator**: Slim glass pill fixed on right rail featuring 5 navigation dots with tooltips and digital slide counter (`01 / 05`) with next/prev stepper arrows.
- **Sticky Mini-Nav**: Header bar with quick jump links (`Identity`, `Arsenal`, `Vault`, `Credentials`, `Uplink`), theme toggle, and mobile hamburger menu.
- **Keyboard Navigation**: `ArrowDown`, `ArrowUp`, `PageDown`, `PageUp`, `Home`, and `End` support.

---

# Project Structure

```
portfolio-website/
├── PROJECT_CONTEXT.md              ← permanent project memory (this file)
├── index.html                      ← 5-card presentation deck HTML (Viewport Stage Showcase)
├── README.md                       ← project documentation
├── .gitignore
├── .editorconfig
│
├── .well-known/
│   └── security.txt                ← RFC 9116 security contact
│
├── assets/
│   ├── images/profile.jpg          ← professional portrait photo
│   ├── cv/resume.pdf               ← downloadable CV
│   └── screenshots/                ← Sam-Smart login, Grocery Cards dashboard
│
├── css/
│   ├── style.css                   ← presentation deck styles: design tokens, 50/50 split cards, HUD rail
│   ├── responsive.css              ← single-column mobile adaptations and compact laptop breakpoints
│   └── animations.css              ← keyframe animations & scroll-reveal transitions
│
├── data/
│   ├── skills-data.js              ← SKILLS_DATA — domain-grouped skill chip matrix (no percentage bars)
│   ├── projects-data.js            ← PROJECTS_DATA — project metadata
│   ├── projects.json               ← JSON mirror of projects data
│   ├── skills.json                 ← JSON mirror of skills data
│   └── certificates.json           ← Certificate data with SVG icons
│
├── js/
│   └── main.js                     ← Core logic: slide observer, HUD sync, vault switcher, topology tabs, email copy, theme toggle, canvas
│
└── docs/
```

---

# Design System — Luxury Industrial Tech

## Dark Mode (`:root`)
| Token | Value | Role |
|-------|-------|------|
| `--color-bg-primary` | `#0E0E10` | Matte Warm Obsidian |
| `--color-bg-secondary` | `#151518` | Dark Velvet Card Surface |
| `--color-bg-tertiary` | `#1D1D21` | Elevated Surface |
| `--color-accent-cyan` | `#DFA33A` | Primary Warm Amber Gold |
| `--color-accent-green` | `#C8B69E` | Muted Champagne Sand |
| `--color-status-online` | `#5E9E6E` | Calm Sage Green (status dots) |
| `--color-text-primary` | `#F4EFE6` | Soft Warm Alabaster |
| `--color-text-secondary` | `#A6A095` | Warm Stone Grey-Beige |

## Light Mode (`[data-theme="light"]`)
| Token | Value | Role |
|-------|-------|------|
| `--color-bg-primary` | `#F5F0E6` | Warm Editorial Ivory |
| `--color-bg-secondary` | `#EBE4D6` | Sand Card Surface |
| `--color-accent-cyan` | `#9B6514` | Rich Bronze |
| `--color-status-online` | `#467B54` | Subtle Olive Green |
| `--color-text-primary` | `#181715` | Deep Espresso Charcoal |

---

# External Dependencies

| Resource | URL | Purpose |
|----------|-----|---------|
| Google Fonts | `fonts.googleapis.com` | Inter + JetBrains Mono |
| No JS frameworks | — | Pure Vanilla JS (100% file:// compatible) |
| No CSS frameworks | — | Pure Vanilla CSS |

---

# Changelog

| Date | Tag | Description |
|------|-----|-------------|
| 2026-10-17 | `THEME_OVERHAUL` | Replaced Neon Cyan/Green Cyber palette with Luxury Industrial Tech (Warm Obsidian, Muted Amber Gold) |
| 2026-10-18 | `BENTO_ARCHITECTURE` | 9-section scroll → 4-zone Bento Grid. |
| 2026-10-18 | `PRESENTATION_DECK_OVERHAUL` | Re-architected portfolio into ultra-modern Floating Presentation Deck (Viewport Stage Showcase): 5 centered 50/50 split cards (`.deck-card`), CSS scroll-snap, right HUD navigation rail with digital counter, interactive project switcher, interactive topology schematics, and one-click email copy. |
| 2026-10-18 | `DECK_VISIBILITY_FIX` | Resolved card stage visibility: eliminated `.reveal` opacity:0 gating on `.deck-card`, set explicit stacking context (`z-index: 10`) on `.deck-stage`, configured viewport 100vh scroll-snap container, and guaranteed `.deck-card--active` injection on load. |
| 2026-10-18 | `TELEMETRY_CLIP_FIX` | Resolved telemetry pill text clipping on Card 1: expanded container to 370px, implemented 3-column grid layout, reduced padding, calibrated typography, and streamlined text strings to prevent truncation. |
| 2026-10-19 | `COMMAND_GATEWAY_V2` | Designed and implemented "The Morphing Command Gateway": luxury Raycast/Spotlight entrance panel (`#intro-gateway`), realistic typewriter authorization sequence, micro-status verification, graceful scale exit, sessionStorage persistence, and crisp focus snap into Card 1. |

---

# Last Action Performed

**Action**: Morphing Command Gateway Implementation (`#intro-gateway`)
**Files Modified**: `index.html`, `css/style.css`, `css/responsive.css`, `js/main.js`, `PROJECT_CONTEXT.md`
**Verification**: Verified vanilla JS syntax (`node -c js/main.js`), zero-dependency execution, session persistence logic, responsive mobile styling, and transition timing.



