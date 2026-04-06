---
id: TASK-001
title: Enable play.phalanxduel.com Homepage Iframe Embed
status: To Do
assignee: []
created_date: '2026-04-06 02:57'
labels: []
dependencies: []
priority: medium
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Allow `phalanxduel.com` (this marketing/docs site) to embed a playable Phalanx Duel experience from `https://play.phalanxduel.com` in an `<iframe>` on the homepage.

This task has a dependency on the app project (the app served at `play.phalanxduel.com`) enabling embed support safely.

Resume Work in This Repo (phalanxduel.com site) after the app project is ready.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Set `_data/homepage.yml` `active_variant` to `embed_conversion_v1` (or create `embed_conversion_v2`)
- [ ] #2 Update the iframe `src` in `_data/homepage.yml` to the final embed URL (e.g. `/embed`)
- [ ] #3 Tighten iframe `sandbox` flags in `_data/homepage.yml` to the confirmed minimum
- [ ] #4 Verify copy and CTAs match actual embed behavior (`Create Match`, join flow, spectator link availability)
- [ ] #5 Add analytics instrumentation for `Create Match` CTA clicks, iframe section visibility, and outbound `Open Full App` clicks
- [ ] #6 Test homepage on desktop + mobile
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 The a11y is run agains the site and all claims are verified against the official rules and guidlines for Phalanx Duel
<!-- DOD:END -->
