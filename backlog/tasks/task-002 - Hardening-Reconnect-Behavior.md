---
id: TASK-002
title: Hardening Reconnect Behavior
status: To Do
assignee: []
created_date: '2026-04-06 03:15'
labels: []
dependencies:
  - TASK-001
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Complete reconnect behavior hardening for smoother session continuity. This is critical for the iframe embed experience on the homepage to ensure users don't lose progress if the page refreshes or if they navigate away and back.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Verify that match state is preserved during a browser refresh within the iframe embed.
- [ ] #2 Implement a "Reconnect" or "Resume Match" UI for matches that are still active.
- [ ] #3 Handle "Match Full" errors gracefully when rejoining.
- [ ] #4 Ensure session persistence works across subdomains (phalanxduel.com and play.phalanxduel.com) if required for the embed context.
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 The a11y is run agains the site and all claims are verified against the official rules and guidlines for Phalanx Duel
<!-- DOD:END -->
