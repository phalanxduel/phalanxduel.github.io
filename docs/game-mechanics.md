# Phalanx Duel: Canonical Game Mechanics

This document serves as the internal architectural and rules reference for Phalanx Duel (v1.0), derived from the canonical game engine.

## 1. Play Surface & Lifecycle
### Zones
- **Hand:** Active cards player can deploy.
- **Draw Pile:** Source of new cards. No reshuffling.
- **Battlefield:** Grid where cards are played. Organized by Column and Rank.
- **Discard/Graveyard:** LIFO stack for destroyed/discarded cards.

### The 8-Phase Turn Lifecycle
1. **StartTurn**: Turn initiation.
2. **DeploymentPhase**: Play cards from hand to empty battlefield slots.
3. **AttackPhase**: Declare an attack on the opponent's column.
4. **AttackResolution**: Cascade calculation via the Target Chain.
5. **CleanupPhase**: Destroyed cards moved to Graveyard; columns collapse.
6. **ReinforcementPhase**: Play extra cards if ranks available.
7. **DrawPhase**: Player draws up to hand limit.
8. **EndTurn**: Turn concludes; active player alternates.

## 2. Actions
Players can perform one of five actions depending on phase:
- **Deploy:** Place card on battlefield.
- **Attack:** Declare attack on opposing column.
- **Reinforce:** Place card in empty battlefield rank.
- **Pass:** Skip action for the turn (tracked).
- **Forfeit:** Resign the match.

## 3. Game Variations
- **Classic Play:** Traditional hierarchy for Face Cards and Aces.
- **Cumulative Play:** Allows aggregated values and different destruction logic for extended strategizing.

## 4. Destruction Hierarchy & Rules
### Number Cards (2-10)
Destroyed if `Attacker.value > Target.value`.

### Aces (A)
Only destroyed by an Ace attacking from the front (Rank 0).

### Face Cards (J, Q, K)
- **Jack (J):** Only destroyed by J, Q, K.
- **Queen (Q):** Only destroyed by Q, K.
- **King (K):** Only destroyed by K.

## 5. Combat Resolution (Target Chain)
- **Chain:** Attacker -> Front -> Back -> LP.
- **Carryover:** `Damage - Health`.
- **Suit Effects:** Resolved at boundaries.
    - **Clubs (♣):** Doubles overflow.
    - **Diamonds (♦):** Absorbs overflow.
    - **Hearts (♥):** Reduces overflow (only if card destroyed).
    - **Spades (♠):** Doubles final LP damage.

## 6. Meta-Game, Administration, & Community
- **Ladder & Matchmaking:** Players ranked by ELO-derived ladder standings.
- **Profiles & Progress:** Achievement tracking and session replay integrity via transaction logs.
- **Support & Feedback:** Feedback infrastructure integrated into site UI (GitHub issues/Playtest feedback).
- **Match Integrity (Truth Gate):** Single-match concurrency enforcement to prevent farming.
- **Administration:** Authenticated admin routes (`/admin`) for A/B testing, match intervention, and integrity validation.
- **Sponsorship & Support:** Support channels for sponsoring or community contributions (see `/support`).

## 7. Advanced Context for Tutorials
- **Probability:** Since the deck does not reshuffle, card counting and draw-order management are primary skills.
- **Transaction Log:** The absolute record for replay and integrity.
