---
id: TASK-015
title: Task 015 - Modularize Simulation Engine (PhxBattle)
status: To Do
assignee: []
created_date: '2026-05-06 23:08'
labels: []
dependencies:
  - TASK-012
priority: high
ordinal: 4000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Decouple the simulation engine from the global window scope, enabling testability in Node/Vitest environments.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Convert PhxBattle to an ES Module export.
- [ ] #2 Update site imports to use the new module.
- [ ] #3 Maintain global window scope for existing legacy calculator pages.
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 The a11y is run agains the site and all claims are verified against the official rules and guidlines for Phalanx Duel
<!-- DOD:END -->
