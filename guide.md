---
title: Quick Players Guide
description: Essential briefing for Phalanx Duel operatives. Setup, turn flow, and suit timing.
permalink: /guide
---

# Quick Players Guide (v1.0)

<p class="small-note">This is the authoritative quick-start guide for Phalanx Duel. For deep tactical analysis, see the <a href="{{ '/learn/rules/' | relative_url }}">Full Tactical Briefing</a>.</p>

<section class="two-col">
  <article class="card">
    <h2>1. Classic Setup</h2>
    <ul class="quick-list">
      <li><strong>Players:</strong> 2 operatives.</li>
      <li><strong>Battlefield:</strong> 4 columns x 2 ranks (Front/Back).</li>
      <li><strong>Initial Hand:</strong> 12 cards each.</li>
      <li><strong>Deployment:</strong> Deploy alternately until all 8 slots are filled. 4 cards remain in hand.</li>
      <li><strong>Initiative:</strong> P2 deploys first. P1 attacks first.</li>
    </ul>
  </article>

  <article class="card">
    <h2>2. Turn Lifecycle</h2>
    <ol class="quick-list">
      <li><strong>Start Turn:</strong> Resolve start-of-turn effects.</li>
      <li><strong>Attack Phase:</strong> Choose ONE column to initiate an attack.</li>
      <li><strong>Resolution:</strong> Calculate the cascade (Front -> Back -> Player).</li>
      <li><strong>Cleanup:</strong> Remove destroyed cards from the grid.</li>
      <li><strong>Reinforcement:</strong> Deploy ONE card from hand to an empty slot.</li>
      <li><strong>Draw Phase:</strong> Draw until hand size is 4.</li>
      <li><strong>End Turn:</strong> Pass initiative to the opponent.</li>
    </ol>
  </article>
</section>

<section class="card">
  <h2>3. The Cascade (Attack Logic)</h2>
  <p>Damage flows front-to-back in a deterministic sequence. Every column is a independent lane of combat.</p>
  <ul class="quick-list">
    <li><strong>Source:</strong> Your Front Rank card in the chosen column.</li>
    <li><strong>Target:</strong> The opponent's column (Front Defender -> Back Defender -> Player).</li>
    <li><strong>Carryover:</strong> Excess damage after destroying a card continues to the next target.</li>
    <li><strong>Deterministic:</strong> Identical inputs ALWAYS produce identical outcomes. 0% RNG.</li>
  </ul>
</section>

<section class="card">
  <h2>4. Suit Timing & Mechanics</h2>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Suit</th><th>Timing</th><th>Tactical Effect</th></tr>
      </thead>
      <tbody>
        <tr><td><strong>♦ Diamond</strong></td><td>Card -> Card</td><td>Reduces carryover damage hitting your Back Rank.</td></tr>
        <tr><td><strong>♣ Club</strong></td><td>Card -> Card</td><td>Doubles carryover damage hitting the opponent's Back Rank.</td></tr>
        <tr><td><strong>♥ Heart</strong></td><td>Card -> Player</td><td>Reduces final damage reaching the Player LP.</td></tr>
        <tr><td><strong>♠ Spade</strong></td><td>Card -> Player</td><td>Doubles final damage reaching the Player LP.</td></tr>
      </tbody>
    </table>
  </div>
  <p class="small-note">Hearts and Spades only apply if the last card in the column was that suit when destroyed (or if attacking through an empty column in some formats).</p>
</section>

<section class="two-col">
  <article class="card">
    <h2>5. Special Operatives</h2>
    <ul class="quick-list">
      <li><strong>Ace:</strong> Front-rank Ace is only destroyable by another Ace. Overflow damage still passes through.</li>
      <li><strong>Face Cards:</strong> Can only be destroyed by Face Cards of equal or lower rank (J < Q < K).</li>
      <li><strong>Logic:</strong> Rank 10 cannot destroy a Jack, but it still deals damage to it and passes carryover.</li>
    </ul>
  </article>

  <article class="card">
    <h2>6. Victory Conditions</h2>
    <ul class="quick-list">
      <li><strong>Annihilation:</strong> Reduce the opponent's LP to 0.</li>
      <li><strong>Forfeit:</strong> Opponent passes more than 3 times consecutively or 5 times total.</li>
      <li><strong>Deck Out:</strong> An empty deck is NOT a loss, but limits reinforcement and draw options.</li>
    </ul>
  </article>
</section>

<div class="cta-row" style="margin-top: 4rem;">
  <a class="button-link primary" href="{{ '/play/' | relative_url }}">Launch Online Match</a>
  <a class="button-link" href="{{ '/tools/battle-calculator/' | relative_url }}">Open Combat Lab</a>
</div>
