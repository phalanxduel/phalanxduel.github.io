---
id: TASK-002
title: Verify Reconnect Behavior in Homepage Embed
status: To Do
assignee: []
created_date: '2026-04-06 03:15'
updated_date: '2026-04-06 03:17'
labels: []
dependencies:
  - TASK-001
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Verify the game's reconnect behavior specifically within the context of the site's homepage iframe. This task ensures that the hardening work performed in the app repo (play.phalanxduel.com) translates to a seamless experience for site visitors.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Verify that the app's reconnect UI renders correctly and is usable within the homepage iframe.
- [ ] #2 Test session persistence across subdomains (phalanxduel.com -> play.phalanxduel.com) specifically for the embed context.
- [ ] #3 Verify that 'Match Full' or 'Reconnect' overlays don't break the responsive container in the site's CSS.
- [ ] #4 Confirm that the site's analytics correctly track 'Resume' or 'Reconnect' interactions initiated from the homepage embed.
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 The a11y is run agains the site and all claims are verified against the official rules and guidlines for Phalanx Duel
<!-- DOD:END -->
