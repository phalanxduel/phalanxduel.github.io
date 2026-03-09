---
title: Official Tutorial
description: "Step-by-step walkthrough of Phalanx Duel: phases, turn cycle, and tactical depth."
---

# Phalanx Duel: Official Tutorial

Welcome to the Phalanx Duel tutorial! This guide will walk you through your first match, from your first draw to your final strike.

## 1. Your Command Center: The Hand

Your **Hand** is where your tactical options live. In Phalanx Duel, your hand is private and usually limited to **4 cards**.

![Deployment with Hand]({{ '/assets/images/tutorial/deployment-with-hand.png' | relative_url }})

*   **Management:** You only draw at the end of your turn.
*   **Strategy:** Knowing when to hold a high-value King or a defensive Diamond is the difference between a Player and a Master.

## 2. The Battlefield

Matches take place on a **4x2 grid** for each player.

-   **Front Row (Rank 0):** Your active combatants. Only cards in the front row can initiate attacks.
-   **Back Row (Rank 1):** Your reserves. When a front-row card is destroyed, the card behind it collapses forward to take its place.

## 3. Phase 1: Deployment

Before the first turn, both players participate in a **Deployment Phase**.

-   In Classic mode, you draw 12 cards.
-   You and your opponent alternate placing cards from your Hand until your board is full (8 cards) and you have exactly 4 cards remaining.
-   **Tip:** Put high-value cards behind weaker ones to create surprise "second-wave" attacks when the front row collapses.

## 4. Attacking and Defending

### Declaring an Attack

To attack, select a card in your **front row** and then select a **defending column** on the opponent's side.

![Attack Phase]({{ '/assets/images/tutorial/attack-with-hand.png' | relative_url }})

### The Target Chain

Damage resolves in a "chain" from front to back:
1.  **Front Card:** Takes damage equal to the attacker's value.
2.  **Back Card:** If the front card is destroyed, any remaining damage (**Carryover**) hits the back card.
3.  **Player LP:** If the back card is also destroyed, the remaining damage hits the opponent's Life Points (LP) directly.

## 5. Suit Bonuses (Shield -> Weapon -> Clamp)

Suits trigger at **boundaries** (the transition between targets). They resolve in this canonical order:

| Suit | Type | Timing | Effect |
| :--- | :--- | :--- | :--- |
| **♦ Diamonds** | Shield | Card -> Card | Reduces carryover damage before it hits the next card. |
| **♣ Clubs** | Weapon | Card -> Card | Doubles carryover once after the first destruction. |
| **♥ Hearts** | Shield | Card -> Player | Total value of destroyed Hearts reduces final player damage. |
| **♠ Spades** | Weapon | Card -> Player | Doubles all damage that reaches the player LP. |

## 6. Special Cards: Aces and Face Cards

-   **Aces:** A front-row Ace can ONLY be destroyed by another Ace.
-   **Jacks / Queens / Kings:** Use "Rank Eligibility." A 10 cannot destroy a King, regardless of the damage value. The attack simply "Clamps" and stops.

## 7. Reinforcement: Rebuilding the Line

After combat, you enter the **Reinforcement Phase**. You can place cards from your hand into any empty slots in your **back row**.

**Pro Tip:** Always try to keep your front row full. A hole in your front line is a direct path for the opponent to hit your Life Points!

## 8. Victory

The game ends when a player's Life Points reach zero or they violate the **Pass Limit** (3 consecutive passes or 5 total passes).

Now you're ready to duel! [Play Phalanx Duel Now](https://play.phalanxduel.com)
