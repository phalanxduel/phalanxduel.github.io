---
layout: default
article: true
author: Mike Hall
date_published: "2026-11-26"
date_modified: "2026-11-26"
title: "Part 1: What Is Phalanx Duel? Game Design & Core Concepts"
description: "How a rainy-day two-deck tabletop design at Camp Tesomas became Phalanx Duel v1.6.0 — a deterministic 2x4 tactical card duel with zero RNG, Fog of War, and transparent combat math."
permalink: /articles/what-is-phalanx-duel/
canonical_url: https://phalanxduel.com/articles/what-is-phalanx-duel/
---

# Part 1: What Is Phalanx Duel? Game Design & Core Concepts

*By [Mike Hall](https://www.just3ws.com/) · Canonical edition on `phalanxduel.com` · Companion practitioner essay on [just3ws.com](https://www.just3ws.com/2026/11/26/phalanx-duel-series-part-1-the-game-and-concepts.html) · Engine `v1.6.0` / Rules `v3.0`*

Phalanx Duel is a deterministic two-player tactical card game built on an intentionally austere premise: **two standard 52-card decks, a 2×4 formation per player, zero dice rolls, and zero mid-game randomness**. Every attack, overflow, and column collapse follows directly from visible cards and player decisions.

## From a Rainy Picnic Table to `v1.6.0`

The game started in July 2022 during a rainout at Boy Scout Camp Tesomas in northern Wisconsin with two ordinary decks, a pen, and a notebook. The design constraint was simple: any two people should be able to learn the rules across a table in five minutes, yet every turn should reward forward calculation rather than lucky top-decks.

That constraint shaped every concept in the modern `v1.6.0` platform:

1. **Formation-first spatial tactics (2×4 grid):** Four columns, two ranks. Your **front rank** leads attacks and absorbs incoming strikes first; your **back rank** shields your Life Points and steps forward when the front falls.
2. **Symmetric Fog of War:** Deployed battlefield cards are public to both players, while hands, draw piles, and future draws remain strictly redacted per viewer (and delayed for spectators).
3. **Deterministic arithmetic:** Damage flows front card → back card → player Life Points (`20 LP` standard). Every step is auditable in the live **Combat Math Inspector** and reproducible from the match's SHA-256 hash chain.
4. **Four suit boundaries:** Suits are not flavor text—they govern exact boundary transitions during combat resolution (Diamonds shield carryover, Clubs double eligible overflow, Hearts shield Life Points, Spades double Life Point damage).

## Watch the Core Introductions

Every video below was captured directly from live Phalanx Duel builds and published through the `@just3ws-mike` media pipeline:

- **[What Is Phalanx Duel? (60-Second Overview)](https://youtu.be/Lktn0-bre5g)** — The 2×4 battlefield, objective, and turn rhythm in under a minute.
- **[Your First Attack in Phalanx Duel](https://youtu.be/ygf_GOylEQc)** — Opening deployment, Quick Deploy, and reading your first resolved attack.
- **[Phalanx Duel: Make the Rules Legible (SCMC Demo)](https://youtu.be/eH6VQa2Od3E)** — Automated rules engine and combat demonstration prepared for Software Craftsmanship McHenry County (SCMC).
- **[Early Version Walkthrough with Conrad Hall](https://youtu.be/CdYwA0SG34M)** — A look back at an early playable build and how the core loop held up from day one.

Browse all 33 episodes in the [Video Tutorials Hub](/learn/tutorials/) or the [YouTube Playlist](https://www.youtube.com/playlist?list=PLHenvAZhJjHo).

## Canonical Sources & Attribution

- **Author:** Mike Hall ([just3ws.com](https://www.just3ws.com/)) · Open-source under AGPL-3.0
- **Live Game:** [play.phalanxduel.com](https://play.phalanxduel.com)
- **Quick Start & Philosophy:** [Tactical Briefing](/learn/getting-started/) · [System Philosophy](/about/philosophy/)
- **Source Code:** [`phalanxduel/phalanxduel`](https://github.com/phalanxduel/phalanxduel)

---

**Series Navigation:** [Series Index](/articles/) · **Part 1 (Current)** · [Next: Part 2 — Canonical Rules v3.0 & The Combat Cascade →](/articles/rules-and-combat-cascade/)
