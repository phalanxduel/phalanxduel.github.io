---
title: Rules of Engagement
description: "Player-readable summary of the canonical Phalanx Duel v1.0 rules."
---

# Phalanx Duel Rules v1.0 (Player Summary)

<p class="small-note">This page is a scannable, player-readable summary of the canonical v1.0 rules. It is designed for play accuracy, not lore.</p>

<section class="hero">
  <h2>What the Game Is</h2>
  <p>Phalanx Duel is a deterministic 1v1 column-battle card game. You attack from the front rank of your board into one defending column, resolve carryover through front -> back -> player, then rebuild pressure through reinforcement and draw.</p>
</section>

<section class="two-col">
  <article class="card">
    <h2>Classic Match Defaults (v1.0)</h2>
    <ul class="quick-list">
      <li><strong>Board:</strong> 4 columns × 2 ranks (front = rank 0, back = rank 1).</li>
      <li><strong>Hand Limit:</strong> 4.</li>
      <li><strong>Initial Draw:</strong> 12.</li>
      <li><strong>Classic Aces:</strong> Enabled.</li>
      <li><strong>Classic Face Cards:</strong> Enabled.</li>
      <li><strong>Damage Persistence:</strong> Classic (no defense persists between turns).</li>
    </ul>
  </article>

  <article class="card">
    <h2>Initiative & Pass Rules</h2>
    <ul class="quick-list">
      <li><strong>Classic Deployment:</strong> P2 deploys first.</li>
      <li><strong>Classic First Attack:</strong> P1 attacks first.</li>
      <li><strong>Pass Limits:</strong> More than 3 consecutive passes is a forfeit.</li>
      <li><strong>Total Pass Limit:</strong> More than 5 total passes by one player is a forfeit.</li>
      <li><strong>No-Attacker Attempt:</strong> Counts as a pass outside any special-start window.</li>
    </ul>
  </article>
</section>

<section class="two-col">
  <article class="card">
    <h2>Card Values</h2>
    <div class="table-wrap">
      <table>
        <thead>
          <tr><th>Rank</th><th>Combat Value</th></tr>
        </thead>
        <tbody>
          <tr><td>Ace</td><td>1 (special destroy rules in Classic Aces)</td></tr>
          <tr><td>2 through 10</td><td>Face value</td></tr>
          <tr><td>Jack, Queen, King</td><td>11 (with Classic Face Card destroy restrictions)</td></tr>
        </tbody>
      </table>
    </div>
    <p class="small-note">Face cards and Aces use eligibility rules in Classic modes. Damage value alone does not guarantee destruction.</p>
  </article>

  <article class="card">
    <h2>Classic Special Card Rules</h2>
    <ul class="quick-list">
      <li><strong>Ace (Classic Aces):</strong> A front-rank Ace is destroyable only by an Ace attack hitting target index 0.</li>
      <li><strong>Jack:</strong> Can destroy Jack.</li>
      <li><strong>Queen:</strong> Can destroy Jack or Queen.</li>
      <li><strong>King:</strong> Can destroy Jack, Queen, or King.</li>
      <li><strong>Damage Origin:</strong> The attacking card remains the origin across the whole target chain.</li>
    </ul>
  </article>
</section>

<section class="hero">
  <h2>Turn Cycle and Suit Timing</h2>
  <p>For a visual walkthrough of the 7-phase turn lifecycle and the <strong>Shield -> Weapon -> Clamp</strong> boundary ordering, use our authoritative learning resources.</p>
  <div class="cta-row">
    <a class="button-link primary" href="{{ '/tutorial/' | relative_url }}">Official Tutorial &rarr;</a>
    <a class="button-link" href="{{ '/battle-calculator/' | relative_url }}">Battle Calculator</a>
  </div>
</section>

<section class="card">
  <h2>Attack Declaration & Target Chain</h2>
  <ul class="quick-list">
    <li><strong>Attacker Source:</strong> Must have a card at rank 0 in the attacking column.</li>
    <li><strong>Targeting:</strong> You pick a defending column, not an individual card.</li>
    <li><strong>Target Chain:</strong> All defending cards front-to-back, then the defending player.</li>
    <li><strong>Carryover:</strong> Remaining damage after a destruction can continue to the next target.</li>
    <li><strong>Cleanup:</strong> Destroyed cards are removed, then the column collapses forward.</li>
  </ul>
</section>

<section class="two-col">
  <article class="card">
    <h2>Reinforcement & Draw</h2>
    <ul class="quick-list">
      <li>After cleanup, you may reinforce empty back ranks from hand.</li>
      <li>Draw until hand size reaches the max (4 in Classic) or the deck is empty.</li>
      <li>No reshuffle from graveyard.</li>
      <li>Empty deck alone does not cause an automatic loss.</li>
    </ul>
  </article>

  <article class="card">
    <h2>Determinism (Why It Matters)</h2>
    <ul class="quick-list">
      <li>Identical inputs must produce identical outcomes.</li>
      <li>Turns are event-logged and hashable for replay verification.</li>
      <li>This supports competitive adjudication and trustworthy online play.</li>
    </ul>
  </article>
</section>

<div class="cta-row">
  <a class="button-link primary" href="https://play.phalanxduel.com" target="_blank" rel="noopener noreferrer">Play Online &rarr;</a>
  <a class="button-link" href="{{ '/tutorial/' | relative_url }}">Official Tutorial</a>
  <a class="button-link" href="{{ '/how-to-play/' | relative_url }}">How to Play</a>
  <a class="button-link secondary" href="{{ '/suits-strategy/' | relative_url }}">Suits & Strategy</a>
</div>

<p class="small-note">For implementation-grade language and exact canonical terminology, use the official v1.0 rules specification in the Phalanx Duel game repository.</p>
