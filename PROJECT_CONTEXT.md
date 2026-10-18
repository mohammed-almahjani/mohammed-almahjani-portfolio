# PROJECT_CONTEXT.md
> ⚠️ This is the permanent memory and single source of truth for this project.
> Every AI model working on this project MUST read this file first before making any changes.
> This file MUST be updated immediately after every action.

---

# Project Overview

A one-page professional portfolio website for a Network & Cybersecurity Engineer.
Theme: Luxury Industrial Tech — Warm Obsidian, Muted Amber Gold, and Editorial Warm Beige.
Architecture: 4-Zone Adaptive Bento Grid Dashboard.
Owner: Mohammed Al-Mahjani.

---

# Current Development Phase

**Current Phase**: Phase 5 — Bento Grid Architecture Complete
Complete structural overhaul from 9-section long-scroll to 4-zone Bento Grid dashboard.

**Previous Phase Completed**: Luxury Industrial Tech Theme Overhaul (Warm Obsidian palette applied).

**Next Phase**: Visual polish, testing, and deployment optimization.

---

# Architecture: 4-Zone Layout

| Zone | Section ID | Purpose |
|------|-----------|---------|
| Zone 1 | `#home` | Executive Split Hero — name, title, availability badge, portrait, CTA group, Focus Strip |
| Zone 2 | `#dashboard` | Bento Core Dashboard — skills chip matrix, executive profile, key metrics, certifications, competencies |
| Zone 3 | `#vault` | Unified Engineering Vault — tabbed filtering: All, Cyber & Security, Network Infrastructure, Software & Tools |
| Zone 4 | `#experience` + `#contact` | Career Track (single-spine timeline) + Direct Contact Hub with email copy mechanism |

---

# Project Structure

```
portfolio-website/
├── PROJECT_CONTEXT.md              ← permanent project memory (this file)
├── index.html                      ← 4-zone single-page HTML (Bento Grid Architecture)
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
│   ├── style.css                   ← main styles: design tokens, Bento Grid, Vault cards, Career Track
│   ├── responsive.css              ← mobile-first media queries for all breakpoints
│   └── animations.css              ← keyframe animations & scroll-reveal transitions
│
├── data/
│   ├── skills-data.js              ← SKILLS_DATA — domain-grouped skill chip matrix (no percentage bars)
│   ├── projects-data.js            ← PROJECTS_DATA — project metadata (used by vault cards)
│   ├── projects.json               ← JSON mirror of projects data
│   ├── skills.json                 ← JSON mirror of skills data
│   └── certificates.json           ← Certificate data with SVG icons
│
├── js/
│   └── main.js                     ← Core logic: vault tabs, skill chips, cert deck, email copy, canvas, theme
│
└── docs/
```

---

# Navigation Links

| Nav Label | Target | Zone |
|-----------|--------|------|
| Overview | `#home` | Zone 1 |
| Skills | `#dashboard` | Zone 2 |
| Vault | `#vault` | Zone 3 |
| Experience | `#experience` | Zone 4 |
| Contact | `#contact` | Zone 4 |

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
| `--color-accent-cyan` | `#9B6514` | Rich Bronze |
| `--color-status-online` | `#467B54` | Subtle Olive Green |
| `--color-text-primary` | `#181715` | Deep Espresso Charcoal |

---

# Key Components

## Skills Matrix (Zone 2)
- **Architecture**: Domain-grouped chip/badge clusters (no percentage bars)
- **Domains**: Network & Infrastructure, Defensive Security, Systems & Server Admin, Cloud & Virtualization, Tools & Platforms, Development & Scripting
- **Data Source**: `data/skills-data.js` → `SKILLS_DATA` global
- **Renderer**: `renderSkillsMatrix()` in `js/main.js`

## Engineering Vault (Zone 3)
- **Architecture**: Unified hub merging Projects + Sam-Smart + Network Labs
- **Filtering**: Client-side tab filtering via `data-category` and `data-category-alt` attributes
- **Tabs**: All, Cyber & Security (`cyber`), Network Infrastructure (`network`), Software & Tools (`software`)
- **Cards**: Sam-Smart (featured, cyber+software), Grocery Cards (software), OSPF Lab (network), VLAN Lab (network+cyber), MikroTik Lab (network)
- **Handler**: `initVaultTabs()` in `js/main.js`

## Career Track (Zone 4)
- **Architecture**: Single-spine vertical timeline (replaces zigzag)
- **Milestones**: Enterprise Network Deployment (2023), Ministry of Industry & Trade (2023)

## Contact Hub (Zone 4)
- **Email Copy**: One-click clipboard copy with visual "Copied!" feedback
- **Cards**: Email, GitHub, LinkedIn, Download CV
- **Handler**: `initEmailCopy()` in `js/main.js`

---

# External Dependencies

| Resource | URL | Purpose |
|----------|-----|---------|
| Google Fonts | `fonts.googleapis.com` | Inter + JetBrains Mono |
| No JS frameworks | — | Pure Vanilla JS |
| No CSS frameworks | — | Pure Vanilla CSS |

---

# Changelog

| Date | Tag | Description |
|------|-----|-------------|
| 2026-10-17 | `THEME_OVERHAUL` | Replaced Neon Cyan/Green Cyber palette with Luxury Industrial Tech (Warm Obsidian, Muted Amber Gold) |
| 2026-10-18 | `BENTO_ARCHITECTURE` | Complete structural overhaul: 9-section scroll → 4-zone Bento Grid. Skills chips replace progress bars. Unified Engineering Vault with tab filtering. Single-spine career timeline. Email copy mechanism. |

---

# Last Action Performed

**Action**: Bento Grid Architecture Restructuring
**Files Modified**: `index.html`, `css/style.css`, `css/responsive.css`, `css/animations.css`, `js/main.js`, `data/skills-data.js`
**Verification**: JS syntax validated (exit 0), zero legacy neon colors remaining, git diff: 2,089 insertions, 5,414 deletions across 6 files.
