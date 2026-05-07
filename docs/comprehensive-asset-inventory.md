# Comprehensive Asset Inventory: Phalanx Duel

This inventory consolidates requirements for tutorial, marketing, and site illustration assets. All assets are to be generated via the game automation suite using the defined templates.

## 1. Tutorial Progression Assets (Learning Path)

| Asset ID | Type | Purpose | Simulation Setup |
| :--- | :--- | :--- | :--- |
| `tut-foundations-setup` | PNG | Visualizing column structure. | S-9 vs D-3, H-2 |
| `tut-foundations-cascade` | MP4 | Demonstration of carryover damage. | S-9 vs D-2, H-1 |
| `tut-tactics-clubs` | MP4 | Demonstrating Club damage doubling. | C-4 vs D-3, H-2 |
| `tut-tactics-protection` | MP4 | Visualizing Ace Protection rule. | H-A vs D-A (Front) |
| `tut-mastery-briefing` | PNG | The Mastery Dashboard showing LP/Atk efficiency. | C-10 vs S-4, H-5 |

## 2. Marketing & Illustrative Assets (Site Appeal)

| Asset ID | Type | Purpose | Simulation Setup |
| :--- | :--- | :--- | :--- |
| `mkt-hero-breach` | MP4 | Cinematic column breach for hero section. | S-K vs D-Q, H-J |
| `mkt-suit-shield` | PNG | Illustrating Heart protection. | S-5 vs H-2, C-8 |
| `mkt-spectator-view` | PNG | Showcase of real-time match observation. | (Spectator Mode Active) |
| `mkt-suit-interaction` | PNG | Side-by-side suit bonus grid. | Various (Composite) |

## 3. Engine & System Assets

| Asset ID | Type | Purpose | Simulation Setup |
| :--- | :--- | :--- | :--- |
| `eng-trace-sample` | PNG | Sample Engine Trace log for 'Quick Players Guide'. | C-5 vs D-2, S-3 |
| `eng-spectator-overlay` | PNG | UI Overlay design for spectator mode. | N/A (UI) |

---

## Automation Prompt Guide
Use the following format to trigger generation in the `game/` repository:

```bash
# Template
./scripts/generate-asset --id [AssetID] --config [SimulationSetup] --type [png/mp4]

# Examples
./scripts/generate-asset --id tut-foundations-setup --config "S-9|D-3|H-2" --type png
./scripts/generate-asset --id mkt-hero-breach --config "S-K|D-Q|H-J" --type mp4
```
