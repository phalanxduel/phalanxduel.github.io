---
title: Official Tutorial
description: "Step-by-step walkthrough of Phalanx Duel: phases, turn cycle, and tactical depth."
---

# Phalanx Duel: The Official Tutorial

Welcome to the Phalanx Duel tutorial! This guide will walk you through your first match, explaining the phases, turn cycle, and tactical depth of the game.

## 1. The Battlefield

A standard Phalanx Duel match takes place on a **4x2 grid** for each player.

-   **Front Row (Rank 0):** Your active combatants. Only cards in the front row can initiate attacks.
-   **Back Row (Rank 1):** Your reserves. When a front-row card is destroyed, the card behind it collapses forward to take its place.

![Empty Battlefield]({{ '/assets/images/tutorial/deployment-start.png' | relative_url }})

## 2. Phase 1: Deployment

Before the first turn, both players participate in a **Deployment Phase**.

-   In Classic mode, you draw 12 cards.
-   You and your opponent alternate placing cards until your board is full (8 cards) and you have exactly 4 cards remaining in your hand.
-   **Tip:** Think about your column structure. Putting a high-value card behind a weaker one can create a surprise second-wave attack.

## 3. The Turn Cycle (The 7 Phases)

Every turn in Phalanx Duel is deterministic and follows these 7 phases:

1.  **Start Turn:** Initial state checks.
2.  **Attack Phase:** Declare your attacker and target column.
3.  **Attack Resolution:** Calculate damage and boundary effects.
4.  **Cleanup:** Remove destroyed cards and collapse columns.
5.  **Reinforcement:** Play cards from your hand to empty back-row slots.
6.  **Draw:** Refill your hand to the limit (usually 4).
7.  **End Turn:** Finalize state.

## 4. Attacking and Defending

### Declaring an Attack

To attack, select a card in your **front row** and then select a **defending column** on the opponent's side.

![Attack Phase]({{ '/assets/images/tutorial/attack-phase.png' | relative_url }})

### The Target Chain

Damage resolves in a "chain" from front to back:

1.  **Front Card:** Takes damage equal to the attacker's value.
2.  **Back Card:** If the front card is destroyed, any remaining damage (**Carryover**) hits the back card.
3.  **Player LP:** If the back card is also destroyed, the remaining damage hits the opponent's Life Points (LP) directly.

## 5. Suit Bonuses (The Tactical Edge)

Suits trigger at **boundaries** (the transition between targets). In Phalanx Duel, multiple effects can happen at once. They always resolve in this canonical order: **Shield → Weapon → Clamp**.

| Suit | Type | Timing | Effect |
| :--- | :--- | :--- | :--- |
| **♦ Diamonds** | Shield | Card -> Card | Reduces carryover damage before it hits the next card. |
| **♣ Clubs** | Weapon | Card -> Card | Doubles carryover once after the first destruction in the chain. |
| **♥ Hearts** | Shield | Card -> Player | Reduces final damage to the player if it was the last destroyed card. |
| **♠ Spades** | Weapon | Card -> Player | Doubles all damage that reaches the player LP. |

## 6. Special Cards: Aces and Face Cards

In Classic mode, some cards have special destruction rules:

-   **Aces:** A front-row Ace can ONLY be destroyed by another Ace.
-   **Jacks:** Can only be destroyed by Jack, Queen, or King.
-   **Queens:** Can only be destroyed by Queen or King.
-   **Kings:** Can only be destroyed by another King.

**Note:** If an attacker isn't eligible to destroy a target (e.g., a 10 attacking a King), the damage is "clamped" and the attack stops.

## 7. Reinforcement: Rebuilding the Line

After combat, you enter the **Reinforcement Phase**. You can place cards from your hand into any empty slots in your **back row**.

![Reinforcement Phase]({{ '/assets/images/tutorial/reinforce-phase.png' | relative_url }})

**Pro Tip:** Always try to keep your front row full. A hole in your front line is a direct path for the opponent to hit your Life Points!

## 8. Victory and Defeat

The game ends when:

-   A player's Life Points reach zero.
-   A player forfeits.
-   A player violates the **Pass Limit** (3 consecutive passes or 5 total passes).

![Game Over]({{ '/assets/images/tutorial/game-over.png' | relative_url }})

Now you're ready to duel! [Play Phalanx Duel Now](https://play.phalanxduel.com)
