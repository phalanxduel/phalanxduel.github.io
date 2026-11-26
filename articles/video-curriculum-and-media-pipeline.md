---
layout: default
article: true
author: Mike Hall
date_published: "2026-11-26"
date_modified: "2026-11-26"
title: "Part 5: Automated Video Curriculum & Media Pipeline"
description: "How Phalanx Duel generates, verifies, and publishes a 33-episode dark-mode video curriculum using Playwright gameplay capture, rule-telemetry assertions, and media-pipeline YouTube syndication."
permalink: /articles/video-curriculum-and-media-pipeline/
canonical_url: https://www.just3ws.com/2026/11/26/phalanx-duel-series-part-5-automated-video-curriculum-and-media-pipeline.html
---

# Part 5: Automated Video Curriculum & Media Pipeline

*By [Mike Hall](https://www.just3ws.com/) · Originally published on [just3ws.com](https://www.just3ws.com/2026/11/26/phalanx-duel-series-part-5-automated-video-curriculum-and-media-pipeline.html) (Canonical) · Engine `v1.6.0`*

> **Canonical note:** The full engineering write-up on the automated recording harness and `media-pipeline` syndication lives canonically on [just3ws.com](https://www.just3ws.com/2026/11/26/phalanx-duel-series-part-5-automated-video-curriculum-and-media-pipeline.html). This companion page indexes the live published episodes and links back to the interactive [Video Tutorials Hub](/learn/tutorials/).

## How 33 Episodes Stay Honest to Live Code

Instead of hand-editing brittle screencasts that fall out of date on the next UI change, every Phalanx Duel tutorial episode is **scripted against the real running server and client**:

1. **Deterministic Playwright Capture (`scripts/tutorials/record-episode.ts`):** Launches real matches, drives real clicks and formations, and records both `9:16` Shorts and `16:9` Deep Dives in verified dark mode.
2. **Telemetry Confidence Verification:** Episodes assert `requiredRuleIds` against the live engine transaction log so a video claiming to show a Clubs overflow or Hearts shield actually triggered that rule on screen.
3. **Media Pipeline Staging & Syndication:** `stage-episode.ts --sync-site` packages MP4s, WebVTT subtitles, thumbnails, and metadata into `media-pipeline`, publishes to [`@just3ws-mike`](https://www.youtube.com/@just3ws-mike) (playlist [`PLHenvAZhJjHo`](https://www.youtube.com/playlist?list=PLHenvAZhJjHo)), and hydrates `_data/tutorials.yml` on `phalanxduel.com` plus `_data/video_assets.yml` on `just3ws.com`.

## Featured Published Episodes (Accounts, Cosmetics, Profiles & Tournaments)

- **[Sign Up, Gamertags & Account Management](https://youtu.be/Fax9WCreY8c)** (Ep. 06)
- **[Cardbacks & Cosmetics: Neon Relay, Dual Loop & Obsidian Heraldry](https://youtu.be/_Silz_TvaCA)** (Ep. 07)
- **[Profiles, Match History & Rarity Achievements](https://youtu.be/MucIU1Hq2G8)** (Ep. 14)
- **[How to Play in a Local / LAN Tournament](https://youtu.be/g_kIYFa4FP4)** (Ep. 17)

Watch all 8 seasons (33 episodes) with full transcripts on the **[Video Tutorials Hub](/learn/tutorials/)**.

## Canonical Sources & Attribution

- **Full Essay:** [Read Part 5 on just3ws.com →](https://www.just3ws.com/2026/11/26/phalanx-duel-series-part-5-automated-video-curriculum-and-media-pipeline.html)
- **YouTube Channel & Playlist:** [`@just3ws-mike`](https://www.youtube.com/@just3ws-mike) · [Phalanx Duel Playlist](https://www.youtube.com/playlist?list=PLHenvAZhJjHo)

---

**Series Navigation:** [← Part 4: Engineering Process](/articles/engineering-process/) · **Part 5 (Current)** · [Back to Series Index](/articles/)
