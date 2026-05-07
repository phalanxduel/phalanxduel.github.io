# Asset Synchronization Audit Report

This report tracks the status of assets ported from the `game` directory to the `site` directory based on the `comprehensive-asset-inventory.md`.

## 1. Ported Assets (Success)

| Asset ID | Type | Source Path | Target Path | Notes |
| :--- | :--- | :--- | :--- | :--- |
| `tut-foundations-setup` | WEBM | `game/client/public/tutorials/deployment_basics.webm` | `site/assets/videos/tutorial/tut-foundations-setup.webm` | Matched intent. Renamed to match ID. |
| `tut-foundations-cascade` | WEBM | `game/client/public/tutorials/attack_basics.webm` | `site/assets/videos/tutorial/tut-foundations-cascade.webm` | Matched intent. Renamed to match ID. |
| `mkt-hero-breach` | WEBM | `game/client/public/tutorials/combat_cascade.webm` | `site/assets/videos/tutorial/mkt-hero-breach.webm` | High-stakes breach visualization. |

## 2. Missing or Inadequate Assets (Action Required)

The following assets were not found in the `game` repository or require specific simulation state to be generated.

| Asset ID | Status | Reason | Priority |
| :--- | :--- | :--- | :--- |
| `tut-tactics-clubs` | MISSING | No specific "Club doubling" tutorial video found. | High |
| `tut-tactics-protection` | MISSING | No specific "Ace protection" rule visualization found. | High |
| `tut-mastery-briefing` | MISSING | No static dashboard view PNG found in game client assets. | Medium |
| `mkt-suit-shield` | MISSING | No static PNG showing Heart suit absorption found. | High |
| `mkt-spectator-view` | MISSING | No static high-fidelity screenshot of spectator view. | Medium |
| `mkt-suit-interaction` | MISSING | No composite grid showing all 4 suits in play. | High |
| `eng-trace-sample` | MISSING | No static PNG of a trace sample for rule learning. | Medium |
| `eng-spectator-overlay` | MISSING | No design-focused spectator UI overlay PNG. | Low |

## 3. Recommended Actions for Generation Agent

1. **Simulate Suit Interaction**: Generate `mkt-suit-interaction` by creating a match with cards from all 4 suits in play.
2. **Rule-Specific Recording**: Record `tut-tactics-clubs` and `tut-tactics-protection` by triggering those specific code paths in a controlled match.
3. **Trace Export**: Use the engine's debug output to generate `eng-trace-sample`.

## 4. Legacy Asset Status

- `assets/images/tutorial/qa-cascade.png`: **REPLACED** by `tut-foundations-cascade.webm`.
- `assets/images/tutorial/qa-formation.png`: **REPLACED** by `tut-foundations-setup.webm`.
- `assets/images/tutorial/qa-reinforce.png`: **STALE** - Review for deletion.
- `assets/images/tutorial/qa-determinism.png`: **STALE** - Review for deletion.
