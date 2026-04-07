# PHALANX DUEL: TACTICAL STYLE GUIDE (v1.0)

This document defines the visual and structural language of the Phalanx Duel ecosystem. It ensures that the "Tactical Brutalism" and "Suit Truth" discovered in the v1.0 engine are applied consistently across both the website and the game client.

---

## 1. DESIGN PHILOSOPHY: TACTICAL BRUTALISM
Phalanx Duel is a game of deterministic consequences. The visual style must reflect this through:
*   **High Information Density:** Don't hide the math; celebrate it.
*   **Architectural Rigor:** Everything is aligned to a grid. No "floating" elements.
*   **Kinetic Clarity:** Use color and motion only to describe the "Cascade" (damage flow).

---

## 2. TYPOGRAPHY SYSTEM (OPEN SOURCE)
We use a two-font system to separate "Narrative" from "Data."

### **Primary Display & UI: Inter**
*   **Usage:** Headers, Buttons, Navigation, Card Names.
*   **Character:** Modern, geometric, neutral.
*   **Source:** [Google Fonts / RSMS](https://rsms.me/inter/)
*   **Weights:** 
    *   `Black (900)`: Hero statements and Rank numbers.
    *   `Bold (700)`: Subheaders and Button labels.
    *   `Regular (400)`: Instructional body copy.

### **Data & Tactical: JetBrains Mono**
*   **Usage:** Damage values, Engine logs, Suit effects, Calculator readouts.
*   **Character:** Technical, high-readability, "Command Console" feel.
*   **Source:** [JetBrains Mono](https://www.jetbrains.com/lp/mono/)
*   **Weights:**
    *   `Bold (700)`: Critical values (e.g., **11 LP DAMAGE**).
    *   `Regular (400)`: Contextual notes and logic logs.

---

## 3. COLOR SYSTEM: THE SUIT FAMILIES
Color in Phalanx is **Semantic**, not decorative. Never use Red for an offensive action or Blue for a defensive action.

### **Neutral Foundation**
*   **Deep Space:** `#050505` (Background)
*   **Bunker Grey:** `#0F0F0F` (Surface Panels)
*   **Interface Line:** `rgba(255, 255, 255, 0.05)` (Grid Lines)

### **The Defense Family (RED)**
*   **Tactical Red:** `#FF3E3E`
*   **Suits:** Hearts (♥), Diamonds (♦)
*   **Role:** Shield Wall. Mitigation. Survival.

### **The Offense Family (BLUE)**
*   **Kinetic Blue:** `#3E82FF`
*   **Suits:** Clubs (♣), Spades (♠)
*   **Role:** Striking Line. Impact. Breach.

---

## 4. SYMBOLOGY & SUIT TRUTH
Each suit must be paired with its specific color and a secondary geometric "Role Tag" to ensure accessibility.

| Suit | Name | Color | Role Tag | Mechanical Truth |
| :--- | :--- | :--- | :--- | :--- |
| **♥** | **HEART** | Red | `[PLAYER SHIELD]` | Mitigates final damage to the player. |
| **♦** | **DIAMOND** | Red | `[CARD SHIELD]` | Mitigates carryover to the card behind. |
| **♣** | **CLUB** | Blue | `[IMPACT WEAPON]` | Doubles carryover to the card behind. |
| **♠** | **SPADE** | Blue | `[REACH WEAPON]` | Doubles final damage to the player. |

---

## 5. THE GRID: 4x2 FORMATION
The grid is the primary UI element.
*   **The Lane:** Every attack is a vertical column. In UI, highlight the active lane with a `1px solid var(--color-offense)` border.
*   **The Cascade Path:** Use a directional arrow (↓) between ranks to show damage flow.
*   **Empty Slots:** Should not be "blank." Use a subtle `dashed` border with the `Bunker Grey` color to show the formation's potential.

---

## 6. COMPONENT STATES (FOR THE GAME UI)

### **The Card Surface**
*   **Border:** `1px solid var(--color-border)`.
*   **Stance Indicator:** A 4px top-border that is either **Red** (Defense) or **Blue** (Offense).
*   **Rank (Value):** Large `Inter Black` in the top-left.
*   **Suit Symbol:** Large center-aligned icon.

### **The "Destroyed" State**
*   Do not just remove the card.
*   **Visual:** Apply a `grayscale(1)` filter and a `45-degree` red strike-through line.
*   **Label:** Display `// DESTROYED` in `JetBrains Mono`.

### **The "Protected" State (Ace Rule)**
*   **Visual:** A glowing border using `var(--color-success)` (Green).
*   **Label:** `// PROTECTED` in `JetBrains Mono`.

---

## 7. MOTION & THE CASCADE
Motion must follow the deterministic logic of the engine.
*   **Sequential Resolution:** Damage must "hit" the Front Rank first, wait 200ms, evaluate suits, then "drain" into the Back Rank.
*   **No Random Shakes:** Screenshake is only allowed on a **Player Breach** (LP Damage) and must be purely vertical to mirror the lane logic.
*   **The Counter-Roll:** LP damage should "count down" rapidly in `JetBrains Mono` text, never just "pop" to the new value.

---

## 8. VOICE & TONE: DETERMINISTIC
The system speaks like a tactical computer.
*   **Bad:** "You hit for 5 damage! Nice!"
*   **Good:** `// ATTACK BREACHED FRONT RANK. CARRYOVER: 5.`
*   **Avoid:** Exclamation points, casual slang, or "flavor" text that obscures the math.

---

### **Implementation Checklist for Developers**
- [ ] CSS Variables imported from `assets/css/site.css`.
- [ ] `Inter` and `JetBrains Mono` set as primary font-stack.
- [ ] Hearts/Diamonds forced to `#FF3E3E`.
- [ ] Clubs/Spades forced to `#3E82FF`.
- [ ] 4-Column Grid layout used for the main game board.
- [ ] All status messages prefixed with `// ` to mirror the "Combat Lab" logs.

---

**Creative Director Statement:** 
"In Phalanx Duel, beauty is the byproduct of precision. If a visual choice doesn't help the player predict the math of the next turn, it is noise. Cut it."
