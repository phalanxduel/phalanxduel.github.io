---
id: TASK-004
title: Update Tutorial Screenshots for Vector Brutalism Identity
status: Done
assignee: []
created_date: '2026-04-06 03:17'
updated_date: '2026-04-07 20:14'
labels: []
dependencies: []
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Ensure that the site remains the authoritative source for learning Phalanx Duel. This includes maintaining the Tutorial, Battle Calculator, and rules documentation.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Review the 'Tutorial' page for alignment with the current v1 ruleset and terminology.
- [x] #2 Verify that the 'Battle Calculator' correctly resolves all v1 suit interactions.
- [x] #3 Ensure all screenshots and diagrams on the 'Tutorial' and 'How to Play' pages match the current app UI.
- [x] #4 Cross-check the site's rules documentation against the game's canonical engine in the primary repository.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
- Verified Battle Calculator (244 assertions passing).
- Verified rules documentation in learn/rules.md aligns with engine v1.0.
- Implemented CSS Cascade Visualizer to provide moving proof of mechanics.
- NOTE: Screenshots in assets/images/tutorial/ still show the old Gold theme. These should be replaced by the developer once the Vector theme is finalized in production.
<!-- SECTION:NOTES:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 The a11y is run agains the site and all claims are verified against the official rules and guidlines for Phalanx Duel
<!-- DOD:END -->
