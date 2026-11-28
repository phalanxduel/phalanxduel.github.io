---
layout: default
article: true
author: Mike Hall
date_published: "2026-11-26"
date_modified: "2026-11-26"
title: "Part 4: The Engineering Process: Deterministic Engine & Multi-Client Platform"
description: "How Phalanx Duel v1.6.0 evolved from a Ruby rules prototype into a server-authoritative TypeScript platform with MatchActor, Go duel-cli, SwiftUI, MCP, MCTS bots, and OpenTelemetry."
permalink: /articles/engineering-process/
canonical_url: https://www.just3ws.com/2026/11/26/phalanx-duel-series-part-4-engineering-process-and-multi-client-platform.html
---

# Part 4: The Engineering Process: Deterministic Engine & Multi-Client Platform

*By [Mike Hall](https://www.just3ws.com/) · Originally published on [just3ws.com](https://www.just3ws.com/2026/11/26/phalanx-duel-series-part-4-engineering-process-and-multi-client-platform.html) (Canonical) · Engine `v1.6.0`*

> **Canonical note:** The full practitioner engineering narrative for Part 4 lives canonically on [just3ws.com](https://www.just3ws.com/2026/11/26/phalanx-duel-series-part-4-engineering-process-and-multi-client-platform.html). This companion page summarizes the architecture contracts and links directly to the live videos and codebase surfaces.

## Key Engineering Contracts in `v1.6.0`

1. **Server-Authoritative Pure Engine (`@phalanxduel/engine`):** Clients submit move intent over WebSocket (`/ws`) or REST (`POST /api/matches/:id/action`). The engine validates, computes the next state plus canonical SHA-256 hashes, and never trusts client state.
2. **Horizontal Scaling (`LocalMatchManager` + `MatchActor` + `PostgresLedgerStore`):** Turn actions append to an immutable Postgres ledger and broadcast over `PostgresEventBus`, with seamless `rejoinMatch` session recovery.
3. **One Protocol, Four Clients:** React Web Client (`client/`), native Go CLI (`clients/go/duel-cli`), native SwiftUI client (`game-swiftui`), and the MCP Server (`@phalanxduel/mcp`) for AI agents all share the same OpenAPI + AsyncAPI contracts.
4. **Tiered Bots & Ranked Ladders:** Heuristic bots (`Scout`, `Grunt`, `Soldier`) through specialist and Monte Carlo Tree Search (`sp-mcts`) bots, tracked across seasonal Glicko-2 / Elo ladders (`/api/ladder/:category`).
5. **Hard Safety Gates:** Non-negotiable Postgres environment isolation (`phalanxduel_development` vs `phalanxduel_test`), playability gates (`pnpm qa:playthrough:verify`) before UI work, and OpenTelemetry flowing to Jaeger + OpenObserve (`otel-collector -> [Jaeger, OpenObserve]`).

## Watch the Platform & Multiplayer Videos

- **[Phalanx Duel Game Development (Ramblin' & Amblin')](https://youtu.be/D7yTXxoNGLw)** - Behind-the-scenes engineering walkthrough.
- **[Create, Join, and Reconnect to a Private Duel](https://youtu.be/gP3FiiiWxIE)** (Ep. 10)
- **[Find Your First Practice Bot](https://youtu.be/vQ7Mko4HIXw)** (Ep. 11)
- **[Choose an MCTS Bot Difficulty](https://youtu.be/TSp0Y2MUwL8)** (Ep. 12)
- **[Global Ladder: Elo, Glicko-2, Rating Deviation & Seasons](https://youtu.be/33vPLRXX8D4)** (Ep. 13)
- **[Cross-Platform Play: Browser Duel from the Go CLI](/learn/tutorials/#season-5)** (Ep. 19 - queued for publication)
- **[Tournament Host Preflight](/learn/tutorials/#season-5)** (Ep. 18 - queued for publication)

## Canonical Sources & Attribution

- **Full Essay:** [Read Part 4 on just3ws.com →](https://www.just3ws.com/2026/11/26/phalanx-duel-series-part-4-engineering-process-and-multi-client-platform.html)
- **Developer Docs:** [Build With Phalanx](/build-with-phalanx/) · [Gameplay Assurance](/learn/gameplay-assurance/) · [Contribute](/contribute/)

---

**Series Navigation:** [← Part 3: Living Architecture & Diagrams](/articles/living-architecture-and-diagrams/) · **Part 4 (Current)** · [Next: Part 5 - Video Curriculum & Media Pipeline →](/articles/video-curriculum-and-media-pipeline/)
