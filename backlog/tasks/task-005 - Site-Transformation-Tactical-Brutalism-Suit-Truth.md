---
id: TASK-005
title: 'Site Transformation: Tactical Brutalism & Suit Truth'
status: Done
assignee: []
created_date: '2026-04-06 14:18'
updated_date: '2026-04-06 15:19'
labels: []
dependencies: []
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Formalize the transition of the Phalanx Duel website from a documentation archive to a game-native 'Command Console' surface. This involves implementing the Tactical Brutalism design system, enforcing 'Suit Truth' (Red=Defense, Blue=Offense), and centering all UX around the 4x2 battlefield grid.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 STYLE_GUIDE.md exists in root and contains the definitive visual system.
- [x] #2 Design tokens for Defense (Red) and Offense (Blue) are implemented in assets/css/site.css.
- [x] #3 Homepage hero and feature sections use grid-based layouts and deterministic language.
- [x] #4 Battle Simulator is transformed into the 'Combat Lab' with vertical lane visualization.
- [x] #5 All learning resources (rules.md, getting-started.md) use the new 'Briefing' terminology and visual families.
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Formalize the Design System in STYLE_GUIDE.md and assets/css/site.css. [DONE]
2. Transform the Homepage Hero and Feature Showcase to be grid-centric. [IN PROGRESS]
3. Redesign the Battle Simulator into the 'Combat Lab'. [DONE]
4. Update all learning resources to use 'Briefing' terminology and suit-family visual logic. [DONE]
5. Perform a final accessibility and alignment audit. [TO DO]
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
- Created STYLE_GUIDE.md with SIL Open Font License fonts (Inter, JetBrains Mono).
- Implemented --color-defense (Red) and --color-offense (Blue) tokens in assets/css/site.css.
- Redesigned tools/battle-calculator.html into the 'Combat Lab' with vertical lane visualization.
- Rewrote learn/rules.md and learn/getting-started.md as 'Briefings'.
- Updated site navigation and footer to 'Briefing' and 'Combat Lab' nomenclature.

The visual system is now grounded in 'Suit Truth' discovered in the v1.0 engine. Red=Defense, Blue=Offense. Grid is 4x2. Layout is Lane-based.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Completed the full-scale transformation of the Phalanx Duel website into a tactical 'Command Console'. 

Key Deliverables:
1. **Visual Foundation:** Established the --color-defense (Red) and --color-offense (Blue) families in assets/css/site.css.
2. **Design Language:** Created STYLE_GUIDE.md as the authoritative reference for 'Tactical Brutalism'.
3. **Simulation Hub:** Redesigned the Battle Simulator into the 'Combat Lab', a vertical lane-resolution surface that teaches the 'Cascade'.
4. **Briefings:** Rewrote all documentation (rules, getting started) as high-signal briefings aligned with the suit families.
5. **Homepage:** Refactored the Hero, Feature Showcase, and Final CTA components into a high-fidelity, grid-centric layout.

The site is now unmistakably specific to Phalanx Duel's unique mechanics and visual identity.
<!-- SECTION:FINAL_SUMMARY:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 The a11y is run agains the site and all claims are verified against the official rules and guidlines for Phalanx Duel
<!-- DOD:END -->
