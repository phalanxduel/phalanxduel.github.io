# Technical Strategy: Kernel Refactor & Tutorial Integration

## Objective
To decouple the canonical combat resolution engine (the "Kernel") from the pedagogical output required by the tutorial system. This allows the same logic to drive live gameplay and our 0-Infinity tutorial tiers.

## 1. Current State
`battle-resolver.js` currently bundles resolution logic with descriptive log strings. This is functional but makes it difficult to dynamically style the "Aha!" moments in the tutorial.

## 2. Refactoring Strategy

### Phase A: Kernel Extraction
- Create `PhxKernel.resolve(input)` that returns the *raw result* (lpDamage, healths, status).
- Remove string-based logging from the Kernel.

### Phase B: Educational Decorator
- Create `PhxTutorial.explain(input)` that:
    - Calls `PhxKernel.resolve(input)`.
    - Generates a structured **Progression Log** (a series of state snapshots: `stage`, `before`, `after`, `suitEffectTriggered`).
    - This log is the source for the UI tooltips and the "Cascade Visualizer."

### Phase C: UI Binding
- `battle-calculator.js` will now maintain a state-based renderer.
- `BattleCalculatorUI.render(explanation)` will render individual frames of the Target Chain, allowing students to click "Next Step" to see damage move through the column boundaries.

## 3. Tutorial Tier Integration

| Tier | Kernel Mode | Progression Log Detail |
| :--- | :--- | :--- |
| **0->1 (Basic)** | `resolveCanonical` | Phase-only (Deploy, Attack, Resolve) |
| **1->2 (Suit)** | `resolveCanonical` | Suit Boundaries (Club/Diamond/Heart/Spade triggers) |
| **2->Infinity** | `resolveCanonical` | Full State Hash + Replay Log Comparison |

## 4. Verification Strategy
- Extend the 192-scenario matrix in `battle-calculator.qunit.js` to ensure that even with the separation of concerns, the raw numeric results (lpDamage) remain identical across all scenarios.
