---
title: Advanced Tactical Depth
description: "Master suit interactions, rule variations, and elite combat rules."
---

# Advanced Tactical Depth

Beyond the foundations lies a system of complex geometric interaction. Mastery of Phalanx Duel requires understanding these high-level mechanics.

## 1. Suit Bonuses: Beyond Shields
While suits provide basic defense, they also trigger offensive modifiers that shape the battle:
- **Clubs (♣):** Double the carryover damage to the Back Rank.
- **Spades (♠):** Double the final damage dealt to your Core LP.

{% include render-asset.html id="tut-tactics-clubs" show_caption=true %}

## 2. Rule Variations: Legacy vs. Canonical
You can toggle the Simulation Environment in the Combat Lab to see the evolution of the engine:
- **Legacy Prototype:** The original combat math. No protection for special cards—every card is vulnerable. Used for historical regression.
- **Canonical v1.1.0:** The modern competitive standard. Introduces advanced card protections (see below).

## 3. Elite Combat Rules (Canonical Only)
In the Canonical format, specific cards are resistant to destruction:
- **Ace Protection:** An Ace can only be destroyed by a direct attack from another Ace in the front rank.
- **Face Card Rank:** Attackers cannot destroy Face cards of higher rank (e.g., a Jack cannot destroy a Queen or King).

{% include render-asset.html id="tut-tactics-protection" show_caption=true %}

---

### [Refine Skills in Combat Lab]({{ '/tools/battle-calculator/' | relative_url }})

*Experiment with these rules by switching between 'Legacy Prototype' and 'Canonical v1.1.0' modes. Observe how Spade attacks behave differently and verify Ace resilience.*
