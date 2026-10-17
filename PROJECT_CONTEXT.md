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

**Current Phase**: Phase 4 — SEO & Final Polish
Validating final SEO metadata tags, reviewing accessibility (A11y), and running performance optimization checks.

**Previous Phase Completed**: Hero Section Layout Refinement — NET_OPS_PANEL moved to full-width panel row below the hero text/photo columns.

**Next Phase**: None (Final Polish Stage)

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
│   └── main.js                     ← core logic (nav, scroll, sections, canvas background)
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
- [x] GitHub Repository: Configured and initialized git repository.
- [x] Netlify Deployment: Completed CI/CD configuration connecting GitHub to Netlify. Deployment is live and active.
- [x] Completed Phase 3D: Experience Section Timeline — designed and built a premium vertical timeline layout in `index.html` showcasing professional experience (database assistant role + network infrastructure deployment). Configured node pulse keyframe animations in `css/animations.css`, styling in `css/style.css` (alternating desktop layout, responsive tablet/mobile stacking, glowing hover states, custom date badges), and scroll-reveal triggers.
- [x] Completed Phase 3E: Certificates Section — designed and built premium dynamic certification cards in `index.html` and `js/main.js` supporting CCNA (Cisco), MikroTik Certification (MikroTik), MCSA (Microsoft), CompTIA A+ (CompTIA), and ICDL (ICDL Foundation). Implemented dynamic loading with fetch and offline local data fallback, custom inline SVG icons, responsive grid layout (3 columns on desktop, 2 on tablet, 1 on mobile) in `css/style.css`, and scroll-reveal triggers.
- [x] Completed Phase 3F: Recruiter-focused Contact Section — designed and built a grid of 5 premium contact cards (Email, GitHub, LinkedIn, Resume, Portfolio) with hover glow effects, customized icons, and external link indicators, as well as a career availability CTA block at the bottom of the section.
- [x] Completed Theme System Enhancement — Professional Light Mode: Added a full `[data-theme="light"]` CSS variable override system in `css/style.css` covering every section, component, and interactive element. Theme toggle button added in the navbar (sun/moon SVG icons). `initThemeToggle()` logic added to `js/main.js` with localStorage persistence and system preference fallback. Network background canvas colors branch per theme via `themechange` custom event. Dark Cyber theme remains the default. Theme preference persists across page reloads.
- [x] Completed Professional Hero Enhancement — Profile Photo Integration: Integrated Mohammed Al-Mahjani's real professional profile photo in a premium glassmorphic verified terminal card styled similarly to the OSPF Network Operations Panel, synchronized their floating animations, and styled theme overrides and responsive behaviors.
- [x] Completed Hero Section Layout Refinement — Restructured the Hero grid to a CSS grid-template-areas layout (2 rows): top row has Hero text (left) and Profile photo card (right); bottom row spans full width with the NET_OPS_PANEL as a horizontal three-column technical dashboard. Profile photo card and text are now top-aligned. Mobile stacks Hero text → Photo → OSPF panel cleanly.

---

# Pending Tasks

- [ ] SEO Optimization: Final SEO meta tags validation, accessibility (A11y) review, and performance optimizations

---

# Design Decisions

| Decision | Choice | Reason |
|---|---|---|
| Framework | None (Vanilla HTML/CSS/JS) | Clean, no dependencies, full control |
| CSS preprocessor | None | Keep it simple and portable |
| Theme | Luxury Industrial Tech: Warm Obsidian & Muted Gold (default) + Editorial Warm Beige & Bronze (light) | Calm, sophisticated executive tech aesthetic; recruiter-friendly luxury contrast |
| Theme Switching | `[data-theme="light"]` on `<html>`, `localStorage` persistence | Zero-flicker via inline FOUC script in `<head>`; system preference fallback |
| Layout | Single Page Application (SPA-style) | Smooth user experience |
| Color direction | Warm Obsidian (`#0E0E10`) + Muted Amber Gold (`#DFA33A`) + Champagne Sand (`#C8B69E`) (dark) / Editorial Warm Ivory (`#F5F0E6`) + Rich Bronze (`#9B6514`) + Warm Taupe (light) | Luxury Industrial Tech aesthetic; zero harsh neon artifacts |
| Font direction | Monospace for accents + sans-serif for body | Professional & thematic |
| Data storage | JSON files | Separation of content from presentation |
| Images | Real assets only | No placeholder/fake images |

### Design Tokens Reference Table

| Token Name | Dark Mode (Default `:root`) | Light Mode (`[data-theme="light"]`) | Scope & Visual Role |
|---|---|---|---|
| `--color-bg-primary` | `#0E0E10` (Matte Warm Obsidian) | `#F5F0E6` (Warm Editorial Ivory) | Viewport & document base background |
| `--color-bg-secondary` | `#151518` (Dark Velvet Card Surface) | `#EBE4D6` (Soft Sand Surface) | Cards, panels, elevated sections |
| `--color-bg-tertiary` | `#1D1D21` (Elevated Surface) | `#E0D7C5` (Elevated Sand) | Hover states, pill tracks, chips |
| `--color-bg-overlay` | `rgba(14, 14, 16, 0.88)` | `rgba(245, 240, 230, 0.92)` | Sticky navbar glass & modal overlays |
| `--color-accent-cyan` | `#DFA33A` (Warm Amber Gold) | `#9B6514` (Rich Bronze) | Primary CTA buttons, key highlights, active nav |
| `--color-accent-green`| `#C8B69E` (Muted Champagne Sand) | `#785A28` (Warm Antique Bronze) | Secondary accents, tags, learning outcomes |
| `--color-accent-purple`| `#9A7B56` (Warm Bronze / Umber) | `#6B5335` (Deep Earthy Umber) | Tertiary indicators, timeline accents |
| `--color-accent-blue` | `#C68B2C` (Deep Rich Gold) | `#B5781A` (Warm Ochre) | Secondary highlights, gradient endpoints |
| `--color-status-online`| `#5E9E6E` (Calm Sage/Olive Green) | `#467B54` (Subtle Olive Green) | Semantic verified/online/active indicators |
| `--color-text-primary`| `#F4EFE6` (Soft Warm Alabaster) | `#181715` (Deep Espresso Charcoal) | Headings, hero name, primary text |
| `--color-text-secondary`| `#A6A095` (Warm Stone Grey-Beige) | `#4A463F` (Warm Dark Slate-Brown) | Body copy, descriptions, subtitles |
| `--color-text-muted`  | `#6E695F` (Muted Warm Umber-Grey) | `#7A7367` (Muted Warm Taupe) | Footers, labels, placeholders |
| `--color-border`      | `rgba(223, 163, 58, 0.14)` | `rgba(155, 101, 20, 0.16)` | Subtle hairline borders |
| `--color-border-active`| `rgba(223, 163, 58, 0.38)` | `rgba(155, 101, 20, 0.35)` | Active/hover interactive borders |

> ⚠️ **CRITICAL: Design decisions in the table above are FROZEN and MUST NOT be changed under any circumstances.**

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

# Deployment Status & Workflow

* **GitHub Repository**: Connected and tracked.
* **Netlify Deployment**: Active and configured for Continuous Deployment.
* **Deployment Workflow**: Pushing commits or merging pull requests to the `main` branch automatically triggers Netlify's build process, deploying changes to the live website instantly.

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
| 2026-06-15 | CONTEXT_ALIGN | Updated `PROJECT_CONTEXT.md` to reflect actual project status. Documented GitHub + Netlify deployment details, froze design decisions, marked completed tasks, and aligned the roadmap (Experience, Certificates, Contact, SEO). |
| 2026-06-15 | EXPERIENCE_TIMELINE | Designed and built a premium vertical timeline in `index.html`, styled with responsive CSS (alternating on desktop, single-column on mobile) in `style.css`, configured node pulse animations in `animations.css`, and verified scroll-reveal triggers. |
| 2026-06-15 | CERTIFICATES_SECTION | Implemented dynamic rendering of certificates in `js/main.js` (with local constant fallback), custom inline SVGs for Cisco, MikroTik, Microsoft, CompTIA, and ICDL, styled with responsive premium grid in `css/style.css`, updated title/subtitle in `index.html`, and verified scroll reveal. |
| 2026-06-15 | CONTACT_CARDS | Designed and built recruiter-focused contact section with responsive 5-card grid, hover glow states, and career availability CTA block. Modified js/main.js to dynamically resolve portfolio origin link. |
| 2026-06-15 | LIGHT_MODE_THEME | Added Professional Light Mode theme system. Created `[data-theme="light"]` CSS token overrides in `css/style.css` covering all sections, cards, badges, buttons, nav, footer, lightbox, and scrollbar. Added `.theme-toggle` navbar button with sun/moon icons. Added `initThemeToggle()` to `js/main.js` with localStorage persistence, system preference fallback, and `themechange` custom event for canvas palette update. Updated `css/animations.css` to use CSS variables in keyframes for theme-aware glows. Dark Cyber theme remains the default. |
| 2026-06-18 | HERO_PROFILE_PHOTO | Integrated the professional profile photo in the Hero Section. Created a premium rounded card with a browser header, verified status badge, and custom career tags. Implemented theme overrides, synced floating animations, and verified responsive stacked layouts on tablet/mobile. |
| 2026-06-18 | HERO_LAYOUT_REFINE | Restructured Hero grid to CSS grid-template-areas: top row = Hero text (left) + Profile photo (right); bottom row = NET_OPS_PANEL spanning full width as a three-column technical dashboard. Profile card is top-aligned with Hero text. Mobile stacks Hero text → Photo → Panel. |
| 2026-10-17 | CLEANUP_SPRINT | Executed surgical cleanup: fixed malformed and generic URLs, populated og:image and twitter:image meta tags, configured verified security.txt contact, synchronized projects and skills data mirrors, populated certificates.json, and removed dead files (animations.js, network-bg.js). |
| 2026-10-17 | THEME_OVERHAUL | Executed complete visual overhaul: replaced legacy cyan/green cyber theme with Luxury Industrial Tech palette (Warm Obsidian #0E0E10, Muted Amber Gold #DFA33A, Champagne Sand #C8B69E, Editorial Warm Beige #F5F0E6, Rich Bronze #9B6514, and Calm Sage #5E9E6E for status dots). Purged all 218 legacy hardcoded neon RGB/hex occurrences across CSS, refined keyframe animations, updated buttons, skill bars, and re-themed procedural network canvas background. |

---

# Last Action Performed

**Luxury Industrial Tech Theme Overhaul — COMPLETE**
- **Root Tokens Overhaul**: Transformed `:root` to Warm Obsidian & Muted Amber Gold, and `[data-theme="light"]` to Editorial Warm Beige & Bronze.
- **Purged Neon Artifacts**: Completely eliminated all legacy cyan (`#00d4ff`, `rgba(0, 212, 255, ...)`), neon green (`#00ff9d`, `rgba(0, 255, 157, ...)`), and deep navy (`#090e1a`, `#0d1526`, `rgba(9, 14, 26, ...)`) values across `css/style.css` and `css/animations.css`.
- **Canvas Re-theming**: Replaced canvas network background palette in `js/main.js` with warm amber gold, champagne sand, and muted bronze (dark) / deep bronze and warm taupe (light), with theme-aware particle styling.
- **Component Polish**: Styled primary buttons with amber-gold fill and dark charcoal text, secondary buttons with golden-beige hairline borders, and skill progress bars with smooth dual-gold gradients.
- **Status Semantics**: Applied calm non-neon sage/olive green (`#5E9E6E` / `#467B54`) exclusively to status dots and active indicators.
- **SEO & Meta**: Added `<meta name="theme-color" content="#0E0E10" />` to `index.html`.

---

# Next Recommended Action

**Phase 4 — SEO & Final Polish**
Lighthouse performance audit, accessibility (A11y) verification, and production Netlify deployment validation.

