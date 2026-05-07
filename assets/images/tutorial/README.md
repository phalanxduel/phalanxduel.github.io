# Tutorial Images Registry

This directory contains legacy image assets for Phalanx Duel tutorials.

## Asset Status

| Filename | Status | Notes |
| :--- | :--- | :--- |
| `qa-cascade.png` | **REPLACED** | Superseded by `tut-foundations-cascade.webm`. Used as poster fallback. |
| `qa-formation.png` | **REPLACED** | Superseded by `tut-foundations-setup.webm`. Used as poster fallback. |
| `qa-reinforce.png` | **STALE** | Pending replacement by `tut-reinforce-basics`. |
| `qa-determinism.png` | **STALE** | Pending replacement. |
| `qa-gameboard.png` | **STALE** | Review for relevance. |
| `qa-lobby.png` | **STALE** | Review for relevance. |

## Maintenance
Do not delete REPLACED assets until the `_data/assets.yml` registry no longer references them as `poster` fallbacks.
STALE assets should be migrated to the canonical `_data/assets.yml` registry once replacements are synchronized.
