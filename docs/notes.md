# Developer Notes
> Internal documentation log for the portfolio project.
> Record decisions, blockers, ideas, and references here.

---

## Project Info

- **Project**: Mohammed Al-Mahjani — Network & Cybersecurity Engineer Portfolio
- **Type**: Single-page portfolio website (Vanilla HTML/CSS/JS)
- **Theme**: Premium Dark Cyber Portfolio
- **Started**: 2026-06-06

---

## Design Notes

### Color Philosophy
The dark cyber theme is built around deep navy blacks (`#090e1a`) as the base, with
cyan (`#00d4ff`) as the primary accent — reflecting terminal interfaces and network
monitoring dashboards. Green (`#00ff9d`) provides a secondary accent evoking
command-line environments.

### Typography Plan
- **Body**: Inter or Outfit — clean sans-serif for readability
- **Code/Accents**: JetBrains Mono — thematic monospace for skills, labels, tech tags
- Import from Google Fonts in Phase 2

### Layout Strategy
- Mobile-first responsive design
- CSS Grid for section layouts, Flexbox for component-level alignment
- No external grid frameworks

---

## Technical Decisions

| Decision | Rationale |
|---|---|
| No frameworks | Faster load, no dependencies, clean code for employer review |
| JSON data files | Separates content from markup; easy to update |
| CSS custom properties | Single source of truth for the entire design system |
| IntersectionObserver | Native, performant scroll-based animations |
| ES6+ vanilla JS | Modern, clean, no transpile step needed |

---

## Phase Notes

### Phase 1 — Scaffolding ✅
All files and folders created with starter content only.
No real content, no complete styling, no JavaScript logic.

### Phase 2 — Design System (Pending)
- Complete CSS custom properties
- Google Fonts import
- Base reset (box-sizing, margin, padding normalization)
- Typography scale applied
- Grid/layout helpers

### Phase 3 — HTML Build (Pending)
- Real content in all sections
- Complete semantic HTML
- Accessibility attributes (ARIA)

### Phase 4 — CSS Design (Pending)
- Full dark cyber styling
- Keyframe animations
- Glassmorphism cards
- Hover effects

### Phase 5 — JavaScript (Pending)
- Navigation behavior
- JSON data loading and rendering
- Contact form
- Scroll animations trigger

---

## Assets To Add

| Asset | Location | Notes |
|---|---|---|
| Profile photo | `assets/images/` | Real photo only |
| CV/Resume PDF | `assets/cv/` | Updated version |
| Project screenshots | `assets/screenshots/` | Real screenshots only |
| Certificate badges | `assets/images/` | Official badge images |
| Skill icons | `assets/icons/` | SVG preferred |
| Issuer logos | `assets/icons/` | Cisco, CompTIA, etc. |

---

## Resources & References

- [CSS Custom Properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [IntersectionObserver (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [Google Fonts — JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)
- [Google Fonts — Inter](https://fonts.google.com/specimen/Inter)

---

## Open Questions / To Confirm

- [ ] Confirm full legal name for portfolio display
- [ ] Confirm contact email to show publicly
- [ ] Confirm which social links to include (LinkedIn, GitHub, etc.)
- [ ] Confirm list of real certifications to display
- [ ] Confirm real project list for Projects section
- [ ] Confirm real experience timeline
- [ ] Confirm Sam-Smart system details for showcase section
- [ ] Confirm network lab topics/tools to document
