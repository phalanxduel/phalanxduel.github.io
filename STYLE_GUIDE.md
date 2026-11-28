# PHALANX DUEL: TACTICAL STYLE GUIDE (v1.2)

This document defines the visual and structural language of the Phalanx Duel ecosystem. It ensures that the **"Vector Brutalism"** aesthetic—inspired by Tron and 80s Star Wars arcade graphics—is applied consistently across both the website and the game client.

---

## 1. DESIGN PHILOSOPHY: VECTOR BRUTALISM
Phalanx Duel is a game of deterministic consequences. The visual style reflects this through a high-contrast "Command Console" aesthetic:
*   **Ray-Traced Outlines:** Elements are defined by glowing borders, not solid fills. This creates a "Heavy but Light" feel—substantial geometry rendered as fast-moving light.
*   **Tactical HUD:** The UI should feel like a heads-up display. Use corner markers, scanlines, and tactical readouts.
*   **The Global Grid:** Everything exists within a persistent 40px grid system. The grid is the "floor" of the simulation.
*   **Kinetic Clarity:** Use glow and chromatic aberration only to describe the "Cascade" (damage flow) and impact events.

---

## 2. COMPONENT: THE ASSET HUD
Used for tutorial videos and pedagogical demonstrations.
*   **Frame:** `2px solid var(--color-offense)` for offensive demos, `var(--color-defense)` for defensive demos.
*   **Overlay:** Top-left corner must feature a `LIVE_FEED_XX` or `TACTICAL_HUD` tag in monospace.
*   **Fallbacks:** Missing assets must use a dashed wireframe placeholder with a `// SIGNAL_LOST` marker.

---

## 3. TYPOGRAPHY SYSTEM (OPEN SOURCE)
We use a two-font system to separate "Narrative" from "Data."

### **Primary Display & UI: Inter**
*   **Usage:** Headers, Buttons, Navigation, Card Names.
*   **Weights:** 
    *   `Black (900)`: Primary headings.
    *   `Bold (700)`: Subheaders and Button labels.

### **Data & Tactical: JetBrains Mono**
*   **Usage:** Damage values, Engine logs, Suit effects, HUD markers.
*   **Character:** Technical, high-readability, "Command Console" feel.
*   **Weights:**
    *   `Bold (700)`: Critical values (e.g., **11 LP DAMAGE**).
    *   `Regular (400)`: Contextual notes and logic logs.

---

## 3. COLOR SYSTEM: THE NEON VECTORS
Color in Phalanx is **Semantic**. We use vibrant, glowing neon versions of the suit families.

### **Neutral Foundation**
*   **The Void:** `#020205` (Background)
*   **Grid Line:** `rgba(0, 122, 255, 0.08)` (Tactical Grid)
*   **Surface:** `rgba(10, 10, 15, 0.8)` (Blurred Panels)

### **The Defense Family (RED)**
*   **Neon Defense:** `#FF2D55`
*   **Glow:** `0 0 15px rgba(255, 45, 85, 0.5)`
*   **Suits:** Hearts (♥), Diamonds (♦)

### **The Offense Family (BLUE)**
*   **Neon Offense:** `#007AFF`
*   **Glow:** `0 0 15px rgba(0, 122, 255, 0.5)`
*   **Suits:** Clubs (♣), Spades (♠)

---

## 4. COMPONENT: THE VECTOR CARD
The card is not a piece of paper; it is a tactical data-construct.
*   **Outline:** `1px solid var(--color-border-up)`.
*   **Glow Stance:** A glowing top-border (2px) indicates if the card is in Defense (Red) or Offense (Blue).
*   **Corner Markers:** Every card "data panel" should have L-shaped corner brackets in the active suit color.

---

## 5. THE GRID: 4x2 FORMATION
The grid is the primary UI element.
*   **The Lane:** Every attack is a vertical column. Highlight the active lane with a glowing Blue or Red border.
*   **The Cascade Path:** Damage flow is shown as a glowing "ray-traced" line moving from Front Rank to Back Rank.
*   **Empty Slots:** Use a subtle dashed wireframe to show the formation's potential.

---

## 6. VISUAL EFFECTS (THE POLISH)
*   **Scanlines:** Subtle 4px horizontal lines over the playable embed to simulate a CRT terminal.
*   **Chromatic Aberration:** Applied briefly during a `MATCH_START` or `PLAYER_BREACH` event.
*   **Vector Glow:** Buttons and active elements should pulse slightly with a light-bloom effect.

---

## 7. VOICE & TONE: THE DESIGNER AT THE TABLE

The visual style is Vector Brutalism. The writing is not. Site copy, docs, tutorials, and video narration sound like a smart, friendly game designer explaining a tight system to someone they would like to play with. The model is the welcome note on the homepage ("a strategic card game I invented with a plain deck of playing cards and some friends").

### Principles

1. **Say what it is, then what to do.** Lead with a plain sentence about the thing, then the next step.
2. **Plain words first.** If a regular card-game player would not use the word, don't.
3. **Show the math.** Prefer a worked example ("10 hits a 3, leaving 7") to an adjective ("devastating").
4. **Be honest about status.** Say "early access", "beta", and "in progress" when they are true.
5. **Dry, not loud.** A little wit is welcome. No exclamation marks, no hype, no emoji in body copy.
6. **Respect the reader's time.** Short sentences. One idea per paragraph.
7. **Claims need evidence.** Do not describe features or effects the game does not have.

### Word list

| Avoid | Use |
|-------|-----|
| operative, operator | player, you |
| briefing, directive, debrief | guide, summary, feedback |
| initialize, execute, engage (as hype) | start, play |
| killzone, strike, breach (as flavor) | attack, break through |
| Core | Life Points (LP) |
| tactical data-point, kinetic energy | card, damage |
| mathematically inevitable | predictable, checkable |
| ray-traced, cinematic (for combat) | leave out |

Rule terms stay: deploy, front rank, back rank, column, carryover, cascade, reinforce, pass.

### Patterns

*   **Headlines:** a plain statement or a short instruction. "Pick how you want to play." Not "Initialize Global Combat."
*   **Buttons:** verb first. "Play Now", "Learn in 5 Minutes", "Report a Bug".
*   **Labels:** sentence case. No `//` prefixes or SCREAMING_SNAKE labels in page copy.
*   **Examples:**
    *   **Bad:** "Execute the briefing and breach the enemy core."
    *   **Good:** "Pick a front card, choose a column, and see how much damage reaches Life Points."

### The one exception: engine log lines

The in-game engine log and developer telemetry stay terse and neutral, because they are data, not prose:
`ATTACK_BREACHED_FRONT_RANK. CARRYOVER: 05.` Never use that register for marketing or teaching copy.

---

### **Implementation Checklist**
- [x] Background grid (40px) implemented in `site.css`.
- [x] Neon glows (`--glow-defense`, `--glow-offense`) defined as variables.
- [x] Buttons use 2px vector borders and glow-on-hover.
- [x] Cards/Panels use corner brackets (`::before`, `::after`) for the wireframe feel.
- [x] Embed container uses scanline overlays.

---

**Creative Director Statement:** 
"We are rendering the math of the duel. If it doesn't look like it was drawn by a laser on a black glass screen, it's not Phalanx."
