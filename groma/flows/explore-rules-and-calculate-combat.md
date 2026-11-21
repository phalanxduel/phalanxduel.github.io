---
type: Groma Flow
title: Explore rules and calculate combat
groma:
  id: explore-rules-and-calculate-combat
---

A player visits phalanxduel.com and runs deterministic combat scenarios in the browser-side Battle Calculator.

## Steps

| From | To | Action |
| --- | --- | --- |
| [Player](../actors/player.md) | [Battle calculator](../systems/phalanxduel-site/components/battle-calculator.md) | Enters column cards and triggers combat preview |
| [Battle calculator](../systems/phalanxduel-site/components/battle-calculator.md) | [Battle resolver](../systems/phalanxduel-site/components/battle-resolver.md) | Computes deterministic suit-boundary and cascade math |
