---
title: Suit Boundaries
description: "Master the timing. Diamonds and Hearts mitigate; Clubs and Spades amplify. The Shield -> Weapon -> Clamp boundary order."
---

# Suit Boundaries (10 to ∞)

In Phalanx Duel, suit identity is not a label; it is a **timing trigger**. Mastery of the battlefield requires internalizing the **Boundary Resolution Order**.

## The Canonical Sequence

When damage propagates through a column, the engine evaluates suit effects in this strict order at every target transition:

1.  **SHIELD (Mitigation):** Diamonds and Hearts reduce damage.
2.  **WEAPON (Amplification):** Clubs and Spades multiply damage.
3.  **CLAMP (Eligibility):** Aces and Face Card rules determine if destruction is possible.

### 1. The Card -> Card Boundary (Inner Column)
This occurs when damage moves from the **Front Row** card to the **Back Row** card.

*   ♦ **DIAMONDS:** If the Front Row card was a Diamond, it reduces the carryover damage *before* any Weapon bonuses apply.
*   ♣ **CLUBS:** If the attacker is a Club, it doubles the carryover damage *after* any Diamond mitigation.

### 2. The Card -> Player Boundary (The Killzone)
This occurs when damage moves from the **Back Row** card to the opponent's **Life Points (LP)**.

*   ♥ **HEARTS:** If the last card destroyed was a Heart, it reduces the final damage hitting the LP. Hearts do not stack; only the final eligible Heart applies.
*   ♠ **SPADES:** If the attacker is a Spade, it doubles the final damage hitting the LP *after* any Heart mitigation.

## Strategic Mental Models

*   **Read the Boundary, Not the Card:** Do not ask what a card "is." Ask what happens at the boundary when it falls.
*   **The Hidden Heart:** A Heart in the Back Row is an insurance policy. It only triggers if the opponent breaks your Front Row and your Back Row. 
*   **The Club Setup:** Because Clubs double carryover *after* Diamond mitigation, they are most effective against non-Diamond Front Rows.

**Tactical Exercise:** Use the [Combat Simulator]({{ '/tools/battle-calculator/' | relative_url }}) to recreate a "Double Cascade"—using a Club attacker to break a Diamond Front Row and a Heart Back Row. Observe the exact moment the math shifts.
