---
layout: default
article: true
author: Mike Hall
date_published: "2026-11-26"
date_modified: "2026-11-26"
mermaid: true
title: "Part 2: Canonical Rules v3.0 & The Combat Cascade"
description: "Complete breakdown of Phalanx Duel Rules v3.0: the 8-phase state machine, column overkill arithmetic, Diamonds/Hearts/Clubs/Spades suit boundaries, Classic vs Cumulative modes, and pass economy."
permalink: /articles/rules-and-combat-cascade/
canonical_url: https://phalanxduel.com/articles/rules-and-combat-cascade/
---

# Part 2: Canonical Rules v3.0 & The Combat Cascade

*By [Mike Hall](https://www.just3ws.com/) · Canonical edition on `phalanxduel.com` · Companion breakdown on [just3ws.com](https://www.just3ws.com/2026/11/26/phalanx-duel-series-part-2-rules-and-combat-cascade.html) · Engine `v1.6.0` / Rules `v3.0`*

Ambiguous prose is where tabletop rules break down. In Phalanx Duel, the normative rules in [`docs/gameplay/rules.md`](https://github.com/phalanxduel/phalanxduel/blob/main/docs/gameplay/rules.md) are backed 1:1 by an executable TypeScript state machine in [`engine/src/state-machine.ts`](https://github.com/phalanxduel/phalanxduel/blob/main/engine/src/state-machine.ts) and verified by property and transition tests.

## The Canonical 8-Phase State Machine

Every turn moves through an explicit, server-enforced phase graph:

```mermaid
stateDiagram-v2
    direction LR
    [*] --> StartTurn
    StartTurn --> DeploymentPhase: system:init
    DeploymentPhase --> DeploymentPhase: deploy | quickDeploy
    DeploymentPhase --> AttackPhase: deploy:complete
    AttackPhase --> AttackResolution: attack | pass
    AttackPhase --> gameOver: forfeit | system:draw
    AttackResolution --> CleanupPhase: system:advance
    AttackResolution --> gameOver: attack:victory
    CleanupPhase --> ReinforcementPhase: system:advance
    ReinforcementPhase --> DrawPhase: reinforce:complete | pass
    DrawPhase --> EndTurn: system:advance
    EndTurn --> StartTurn: system:advance
```

See the full annotated graph on the [State Machine Diagram wiki page](https://github.com/phalanxduel/phalanxduel/wiki/State-Machine-Diagram).

## Column Overkill & The Four Suit Boundaries

When a front-rank attacker strikes the opposing column, damage resolves sequentially across three targets: **Opposing Front Card → Opposing Back Card → Opponent Life Points**. Suit effects trigger strictly at the boundaries between those targets:

| Suit | Role | Boundary Trigger | Tactical Consequence |
| --- | --- | --- | --- |
| **Diamonds (`♦`)** | Front-to-Back Shield | Defender's front card absorbs incoming damage | Reduces or blocks carryover damage before it reaches the back rank. |
| **Clubs (`♣`)** | Overflow Multiplier | Attacker punches through a defending card | Doubles eligible overflow damage spilling deeper into the column. |
| **Hearts (`♥`)** | Life-Point Shield | Excess damage crosses from the column toward Life Points | Cushions direct damage to the defending player's Life Points. |
| **Spades (`♠`)** | Lethal Finisher | Unblocked damage reaches opponent Life Points | Doubles damage delivered directly to enemy Life Points. |

Test any exact matchup interactively in the [Combat Lab (Battle Calculator)](/tools/battle-calculator/) or review the [Suit Boundaries Mastery Guide](/mastery/mastery/).

## Classic vs. Cumulative Modes & Pass Economy

- **Classic Mode (Default):** Surviving cards reset damage between turns—creating crisp per-turn arithmetic and rewarding high-burst column breaks.
- **Cumulative Mode:** Damage persists on surviving cards across turns—turning chip damage into attrition traps.
- **Pass & Liveness Policy:** Passing preserves formation tempo, but consecutive passes are bounded by the canonical turn-boundary liveness rule (`system:draw`) so matches cannot stall indefinitely.

## Watch the Rules & Strategy Videos

- **[Formation-First Deployment & Quick Deploy](https://youtu.be/_7OLhDb4McQ)** (Ep. 02)
- **[Combat Cascade & Column Overkill Explained](https://youtu.be/YAnBdzdvQxQ)** (Ep. 03)
- **[The Four Suit Boundaries (Diamonds, Hearts, Clubs, Spades)](https://youtu.be/KS5A69rM3Tk)** (Ep. 04)
- **[Aces, Face Cards, Pass, Reinforce & Victory Conditions](https://youtu.be/c8y8SkhMlvk)** (Ep. 05)
- **[Classic vs. Cumulative Damage Modes](https://youtu.be/DmdoO1k01z0)** (Ep. 09)
- **[Advanced Strategy: Column Architecture & Suit Synergy](https://youtu.be/RCFCAqMH9Sk)** (Ep. 20)
- **[Pro Tip: Tempo, Pass Economy & Face-Card Traps](https://youtu.be/1-eyVc2Edwc)** (Ep. 21)

## Canonical Sources & Attribution

- **Rules Reference:** [Canonical Rules](/learn/rules/) · [Quick Players Guide](/guide) · [`engine/src/state-machine.ts`](https://github.com/phalanxduel/phalanxduel/blob/main/engine/src/state-machine.ts) · [`engine/src/turns.ts`](https://github.com/phalanxduel/phalanxduel/blob/main/engine/src/turns.ts)

---

**Series Navigation:** [← Part 1: Game & Concepts](/articles/what-is-phalanx-duel/) · **Part 2 (Current)** · [Next: Part 3 — Living Architecture & Diagrams →](/articles/living-architecture-and-diagrams/)
