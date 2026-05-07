# Cross-Repo Orchestration Prompt: Phalanx Asset Migration & Deployment

**Target Agent Role:** Site/Game Parent Orchestrator
**Objective:** Synchronize the `game/` engine's visual output with the `site/` repository's 4-week "Tactical Deployment" social schedule and tutorial engine.

---

## 1. Social Strategy & Content Pillar Schedule

| Deployment Week | Content Pillar | Purpose | Asset Required |
| :--- | :--- | :--- | :--- |
| **W1: Initialization** | Educational | Establish 0% RNG Math | `tut-foundations-cascade` |
| **W1: The Engine** | Open Source | GitHub Callout (Fork Me) | `tut-foundations-setup` |
| **W2: Tactics** | Tactical | Suit System & Shields | `tut-tactics-clubs` |
| **W2: Protection** | Tactical | Ace/Face Rule Clarity | `tut-tactics-protection` |
| **W3: The Master** | Analytical | LP/Atk Optimization | `tut-mastery-briefing` |
| **W4: Global Duel** | Community | Ladder & Competition | `mkt-hero-breach` |

---

## 2. Asset Generation Requests (For Game AI)

*Instructions for Game AI: Follow the 'Tactical Brutalism' style guide. Lead with impact, use the HUD overlays (`LIVE_FEED_01`), and ensure all-caps command-style captions.*

### [TASK: GEN-01] Foundations & Cascade
- **ID:** `tut-foundations-cascade`
- **Scenario:** S-9 vs D-2, H-1. A clean column breach showing damage spilling from Front to Back to LP.
- **AI Advice:** Use slow-motion (0.5x) at the moment of impact on the Back defender. Ensure `BREACH_DETECTED` overlay is visible.
- **Output:** WEBM

### [TASK: GEN-02] Club Doubling
- **ID:** `tut-tactics-clubs`
- **Scenario:** C-4 vs D-3, H-2. An attack where the Club suit triggers the doubling of carryover damage.
- **AI Advice:** The "x2" multiplier should be ray-traced and glowing. Frame the Back rank defender centrally.
- **Output:** WEBM

### [TASK: GEN-03] Ace Protection
- **ID:** `tut-tactics-protection`
- **Scenario:** H-A vs D-A (Front Rank). An Ace successfully resisting destruction from a non-Ace attacker.
- **AI Advice:** Focus on the "Impact Reflected" animation. Text overlay: `TARGET_IMMUNE`.
- **Output:** WEBM

### [TASK: GEN-04] Hero Breach (Cinematic)
- **ID:** `mkt-hero-breach`
- **Scenario:** S-K vs D-Q, H-J. High-stakes breach with massive damage numbers.
- **AI Advice:** Cinematic camera shake on impact. Maximize the bloom on the Spade suit symbol.
- **Output:** WEBM

---

## 3. Migration & Integration Instructions (For Orchestrator)

When the Game AI signals completion, execute the following:

1. **Verify Asset Registry**: 
   - Check `site/_data/assets.yml` for ID alignment.
2. **Transfer Command**:
   - `cp game/artifacts/videos/* site/assets/videos/tutorial/`
   - `cp game/artifacts/screenshots/* site/assets/images/tutorial/`
3. **Registry Update**:
   - Flip status for the migrated IDs from `missing` to `active` in `site/_data/assets.yml`.
4. **Tutorial Integration**:
   - Verify `site/learn/tactical-depth.md` and `site/learn/first-match.md` render the new `{ % include render-asset.html % }` tags correctly.
5. **Commit**:
   - `git commit -m "feat(assets): deploy phase [x] tactical visuals to site"`
