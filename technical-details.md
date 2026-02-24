---
title: Technical Details
description: "Deterministic turn lifecycle, state model, and canonical suit boundary timing for Phalanx Duel."
mermaid: true
---

# Technical Details

<p class="small-note">This page summarizes the canonical v1.0 technical model in player-readable form. Implementation-grade details live in the Phalanx Duel game repository.</p>

<section class="card">
  <h2>Turn Sequence</h2>
  <p>Canonical v1.0 executes a deterministic 7-phase turn lifecycle. Attack declaration and combat resolution happen inside that lifecycle, not as a standalone loop.</p>
  <div class="mermaid diagram">
flowchart LR
  A[StartTurn] --> B[AttackPhase]
  B --> C[AttackResolution]
  C --> D[CleanupPhase]
  D --> E[ReinforcementPhase]
  E --> F[DrawPhase]
  F --> G[EndTurn]
  </div>
</section>

<section class="card">
  <h2>Gameplay Loop</h2>
  <p>The game alternates deterministic turns. Each turn emits events for all phases, even if no state changes occur.</p>
  <div class="mermaid diagram">
flowchart TD
  S[Classic Setup<br/>Draw 12, alternate deploy] --> T[Turn Trace]
  T --> U[7 Phase Execution]
  U --> V{Continue Match?}
  V -- Yes --> T
  V -- No --> X[Match Termination]
  </div>
</section>

<section class="card">
  <h2>Statechart</h2>
  <p>State-level view of the canonical turn lifecycle.</p>
  <div class="mermaid diagram">
stateDiagram-v2
  [*] --> Setup
  Setup --> TurnStart
  TurnStart --> AttackPhase
  AttackPhase --> AttackResolution
  AttackResolution --> CleanupPhase
  CleanupPhase --> ReinforcementPhase
  ReinforcementPhase --> DrawPhase
  DrawPhase --> EndTurn
  EndTurn --> TurnStart: next turn
  EndTurn --> GameOver: termination / forfeit / system error
  GameOver --> [*]
  </div>
</section>

<section class="card">
  <h2>Suit Ability Timing</h2>
  <p>Suit effects are evaluated at boundaries during attack resolution. Canonical boundary order is <strong>Shield -> Weapon -> Clamp</strong>.</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Suit</th><th>Role</th><th>Boundary</th><th>Canonical Trigger</th><th>Practical Effect</th></tr>
      </thead>
      <tbody>
        <tr><td>Diamonds</td><td>Shield</td><td>Card -> Card</td><td>If the current destroyed card is a Diamond and the next target is a card</td><td>Reduces carryover before the next defender takes damage</td></tr>
        <tr><td>Hearts</td><td>Shield</td><td>Card -> Player</td><td>If the last destroyed card before the player is a Heart</td><td>Reduces final player damage (Hearts do not stack)</td></tr>
        <tr><td>Clubs</td><td>Weapon</td><td>Card -> Card</td><td>If the attacker is Club and this is the first eligible boundary after the first destruction</td><td>Doubles carryover once per attack</td></tr>
        <tr><td>Spades</td><td>Weapon</td><td>Card -> Player</td><td>If the attacker is Spade and carryover reaches the player</td><td>Doubles final player damage</td></tr>
      </tbody>
    </table>
  </div>
</section>

<section class="card">
  <h2>Match Termination Signals (Canonical Concepts)</h2>
  <ul class="quick-list">
    <li><strong>Player damage:</strong> Attack resolution can reduce player life when carryover reaches the player boundary.</li>
    <li><strong>Pass limits:</strong> Exceeding consecutive or total pass limits results in forfeit.</li>
    <li><strong>System errors:</strong> Deterministic invariant violations terminate the match with an unrecoverable error event.</li>
    <li><strong>Important:</strong> Empty deck alone is not an automatic loss in canonical v1.0.</li>
  </ul>
</section>

<section class="card">
  <h2>Classic Special Cards</h2>
  <ul class="quick-list">
    <li><strong>Classic Aces:</strong> A front-rank Ace is destroyable only by a direct Ace attack at target index 0.</li>
    <li><strong>Classic Face Cards:</strong> Jack/Queen/King destroy eligibility is rank-restricted (J < Q < K hierarchy).</li>
    <li><strong>Origin attacker is immutable:</strong> Destroy eligibility is determined by the original attacker across the full target chain.</li>
  </ul>
</section>

<section class="card">
  <h2>Trust Model (Why This Matters Online)</h2>
  <ul class="quick-list">
    <li>Phalanx Duel uses a server-authoritative architecture in digital play.</li>
    <li>The server validates actions against the rules engine.</li>
    <li>Turns emit structured events and can be replay-verified with hashes.</li>
    <li>Identical inputs must produce identical outputs under the same spec version.</li>
  </ul>
</section>
