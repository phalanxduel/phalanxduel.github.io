---
id: TASK-011
title: Implement /guide endpoint for Quick Players Guide
status: Done
assignee: []
created_date: '2026-04-28 23:36'
updated_date: '2026-04-28 23:37'
labels: []
dependencies: []
priority: medium
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Create a "Read the Rules" endpoint at /guide that provides a quick players guide. This will likely be an alias or a dedicated page for the quick reference content.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 The endpoint https://phalanxduel.com/guide is accessible.
- [x] #2 The page provides a quick player's guide, ideally based on the quick-reference content.
- [x] #3 The page follows the site's styling and layout.
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Created a new "Read the Rules" endpoint at https://phalanxduel.com/guide. This endpoint provides a "Quick Players Guide" based on the quick-reference content but optimized for new players. Updated the homepage, header, footer, and related documentation to point to this new endpoint.

Key changes:
- New file `guide.md` created with `/guide` permalink.
- Homepage "Access Briefing" buttons updated to "Read the Rules" pointing to `/guide`.
- Global navigation "Rules" link now points to `/guide`.
- Footer link updated to "Quick Players Guide" pointing to `/guide`.
- Internal links between canonical rules and the quick guide added.
<!-- SECTION:FINAL_SUMMARY:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 The a11y is run agains the site and all claims are verified against the official rules and guidlines for Phalanx Duel
<!-- DOD:END -->
