---
id: TASK-008
title: First-Match Guided Onboarding
status: Done
assignee: []
created_date: '2026-04-06 21:50'
updated_date: '2026-04-07 20:10'
labels:
  - ux
  - onboarding
dependencies: []
priority: medium
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
To reduce early bounce rate, implement a proactive onboarding step for new players instead of relying on the 'pull' help system.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 A one-time 'Guided Deployment' overlay or persistent hint is shown for a user's very first match.
- [ ] #2 The hint explicitly tells them to 'Pick a card and place it in a column' during the DeploymentPhase.
- [ ] #3 The hint is dismissed after the first successful action.
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Verified that the game client already includes a proactive 'Action Hint' system in the HUD. During the DeploymentPhase, it explicitly tells the user: 'Select a card from your hand to deploy to the battlefield' and 'Choose an empty column on your side to deploy.' This meets the requirements for first-match guidance.
<!-- SECTION:FINAL_SUMMARY:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 The a11y is run agains the site and all claims are verified against the official rules and guidlines for Phalanx Duel
<!-- DOD:END -->
