# Tutorial Asset Generation Inventory

This document outlines the required visual assets (screenshots/videos) for the tutorial progression modules. These assets should be generated via the game automation suite.

## Global Conventions
- **Resolution:** 1920x1080 (16:9)
- **Theme:** Canonical v1.1.0 / Dark Mode
- **Naming Convention:** `tutorial-phase-[x]-[type]-[description].png/mp4`

---

## Phase 1: Foundations
*Goal: Demonstrate basic mechanics (Deployment, Cascade, Breach).*

| Asset ID | Type | Description | Simulation Setup |
| :--- | :--- | :--- | :--- |
| `phase-1-shot-1` | PNG | The basic column setup (Attacker, Front, Back). | S-9 vs D-3, H-2 |
| `phase-1-video-1` | MP4 | Full Cascade: Demonstrate carryover damage and LP breach. | S-9 vs D-2, H-1 |

---

## Phase 2: Tactical Depth
*Goal: Demonstrate suit logic and protection rules.*

| Asset ID | Type | Description | Simulation Setup |
| :--- | :--- | :--- | :--- |
| `phase-2-video-1` | MP4 | Club Doubling: Show carryover doubling with a Club attacker. | C-4 vs D-3, H-2 |
| `phase-2-video-2` | MP4 | Ace Protection: Show an Ace successfully resisting destruction. | H-A vs D-A (Front) |

---

## Phase 3: Analytical Mastery
*Goal: Demonstrate tactical analysis and efficiency metrics.*

| Asset ID | Type | Description | Simulation Setup |
| :--- | :--- | :--- | :--- |
| `phase-3-shot-1` | PNG | Mastery View: The "Tactical Briefing" dashboard showing Efficiency. | C-10 vs S-4, H-5 |
| `phase-3-video-1` | MP4 | Full Master Breach: Show high-efficiency column destruction. | S-K vs D-Q, H-J |

---

## Automation Prompt Template
Use the following structure to invoke your game automation:
`--run-sim --attacker [Attacker] --front [Front] --back [Back] --mode [Mode] --save-as [AssetID]`
