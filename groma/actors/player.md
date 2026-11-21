---
type: C4 Actor
title: Player
description: Visitor or player learning rules and testing combat math
status: stable
groma:
  id: player
---

Reads rules and tactical briefings, experiments with the Battle Calculator, and launches live matches on play.phalanxduel.com.

## Relationships

| Source | Target | Description | Technology |
| --- | --- | --- | --- |
| [player](player.md) | [assets/js/battle-calculator.js](../../assets/js/battle-calculator.js) | Simulates combat math in browser | HTTPS / JavaScript |
