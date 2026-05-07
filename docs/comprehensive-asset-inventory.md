# Visual Asset Intent Inventory: Phalanx Duel

This inventory defines the **intent, scenario, and pedagogical purpose** for visual assets required by the Phalanx Duel tutorial and marketing suites. The automation engine is responsible for orchestrating the optimal simulation state to satisfy these requirements.

---

## 1. Tutorial Progression (Pedagogical Narrative)

| Asset ID | Type | Scenario | Pedagogical Purpose |
| :--- | :--- | :--- | :--- |
| `tut-foundations-setup` | PNG | Standard column setup showing clear separation of Front/Back ranks. | Visualizing the "Deployment" phase and rank roles. |
| `tut-foundations-cascade` | MP4 | A clean breach showing damage spilling from Front to Back to LP. | Demonstrating the "Cascade" as a geometric consequence. |
| `tut-tactics-clubs` | MP4 | An attack where the club suit triggers doubling carryover. | Teaching tactical suit bonuses (Clubs). |
| `tut-tactics-protection` | MP4 | An attack where an Ace defender resists destruction in Front rank. | Teaching elite "Canonical" protection rules. |
| `tut-mastery-briefing` | PNG | Dashboard view showing high Damage Efficiency metrics. | Mastery: Training players to read/optimize efficiency. |

---

## 2. Marketing & Illustrative (Brand Appeal)

| Asset ID | Type | Scenario | Visual Intent |
| :--- | :--- | :--- | :--- |
| `mkt-hero-breach` | MP4 | High-stakes column breach resulting in massive damage. | Cinematic impact for hero sections. |
| `mkt-suit-shield` | PNG | A Heart suit card absorbing critical damage. | Illustrating the suit system’s defensive value. |
| `mkt-spectator-view` | PNG | A real-time spectator view showing active battle metadata. | Showcase of real-time observation capabilities. |
| `mkt-suit-interaction` | PNG | Composite grid showing all 4 suits in play. | Illustrate the full complexity of the suit system. |

---

## 3. Engine & System Assets

| Asset ID | Type | Scenario | Visual Intent |
| :--- | :--- | :--- | :--- |
| `eng-trace-sample` | PNG | A clear, readable engine trace showing damage resolution. | Provide reference for rule-based learning. |
| `eng-spectator-overlay` | PNG | Design-focused UI overlay for the spectator interface. | Define the visual language for live-match observation. |

---


---

## Asset Delivery Protocol
To integrate generated assets into the repository, follow this workflow:

1. **Packaging**: Archive the assets into a ZIP file. Organize files within the archive using the following structure:
   ```text
   /tutorial/   (e.g., tut-foundations-setup.png)
   /marketing/  (e.g., mkt-hero-breach.mp4)
   /engine/     (e.g., eng-trace-sample.png)
   generation-log.json  (Required Metadata Log)
   ```
2. **Naming**: Use the `Asset ID` from the tables above as the filename (case-sensitive).
3. **Asset Generation Log (`generation-log.json`)**: This file is **critical** for our collaborative process. Each asset entry must include:
   - `id`: Matching Asset ID.
   - `realized_aspect_ratio`: Actual ratio achieved if different from intent.
   - `passes_required`: Number of simulation runs required to satisfy the visual scenario.
   - `reality_notes`: Any constraints encountered where the simulation logic deviated from the visual intent (e.g., "Aspect ratio adjusted to prevent overlap of cascade logs").
4. **Delivery**: Upload the archive directly to this session. I will use the `generation-log.json` to review the metadata before finalizing the integration.
