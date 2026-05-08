# Technical Strategy: Kernel Refactor & Tutorial Integration

## Objective
To decouple the canonical combat resolution engine (the "Kernel") from the pedagogical output required by the tutorial system. This allows the same logic to drive live gameplay and our 0-Infinity tutorial tiers.

## 1. Current State
`battle-resolver.js` currently bundles resolution logic with descriptive log strings. This is functional but makes it difficult to dynamically style the "Aha!" moments in the tutorial.

## 2. Refactoring Strategy

### Phase A: Kernel Extraction (COMPLETED)
- Create `PhxBattle.resolve(input)` as a decoupled ES module.
- Isolate raw results (lpDamage, healths, survivors) from pedagogical narratives.

### Phase B: Educational Decorator (COMPLETED)
- Implemented `PedagogicalAdapter` to ingest raw results and generate level-specific narrative tokens.
- Introduced `ProgressionLog` in the engine to provide state snapshots for the UI.

### Phase C: UI Binding (COMPLETED)
- `SimulationPresenter` handles the transformation of results into a data-driven view-model.
- `BattleCalculator` (Combat Lab) uses a state-based renderer for the Cascade Log.

## 3. Tutorial Tier Integration

| Tier | Kernel Mode | Progression Log Detail |
| :--- | :--- | :--- |
| **0->1 (Basic)** | `resolveCanonical` | Phase-only (Deploy, Attack, Resolve) |
| **1->2 (Suit)** | `resolveCanonical` | Suit Boundaries (Club/Diamond/Heart/Spade triggers) |
| **2->Infinity** | `resolveCanonical` | Full State Hash + Replay Log Comparison |

## 4. Verification Strategy
- Extend the 192-scenario matrix in `battle-calculator.qunit.js` to ensure that even with the separation of concerns, the raw numeric results (lpDamage) remain identical across all scenarios.
