---
title: Quick Reference
description: Printable one-page reference for canonical Phalanx Duel v1.0 setup, turn flow, and suit timing.
---

# Quick Reference (v1.0)

<p class="print-note">Use browser print for a paper table aid. This page is formatted to stay compact and readable when printed.</p>

<section class="two-col">
  <article class="card">
    <h2>Classic Setup</h2>
    <ul class="quick-list">
      <li>Two players.</li>
      <li>Battlefield: 4 columns x 2 ranks (front/back).</li>
      <li>Initial draw: 12 cards each (Classic default).</li>
      <li>Deploy alternately until all 8 slots are filled and 4 cards remain in hand.</li>
      <li>Classic initiative: P2 deploys first, P1 attacks first.</li>
    </ul>
  </article>

  <article class="card">
    <h2>Turn Lifecycle (7 Phases)</h2>
    <ol class="quick-list">
      <li>Start Turn</li>
      <li>Attack Phase</li>
      <li>Attack Resolution</li>
      <li>Cleanup Phase</li>
      <li>Reinforcement Phase</li>
      <li>Draw Phase</li>
      <li>End Turn</li>
    </ol>
  </article>
</section>

<section class="card">
  <h2>Attack Path & Boundary Order</h2>
  <ul class="quick-list">
    <li><strong>Attacker source:</strong> Rank 0 (front) card in your chosen attacking column.</li>
    <li><strong>Targeting:</strong> Choose a defending column.</li>
    <li><strong>Target chain:</strong> Front card -> back card -> player.</li>
    <li><strong>Carryover:</strong> Damage can continue after destruction.</li>
    <li><strong>Boundary order:</strong> <strong>Shield -> Weapon -> Clamp</strong>.</li>
  </ul>
</section>

<section class="card">
  <h2>Suit Timing (Canonical)</h2>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Suit</th><th>When It Applies</th><th>Effect</th></tr>
      </thead>
      <tbody>
        <tr><td>♦ Diamond</td><td>Card -> Card boundary</td><td>Reduces carryover before the next card.</td></tr>
        <tr><td>♣ Club (attacker)</td><td>First eligible Card -> Card boundary after first destruction</td><td>Doubles carryover once per attack.</td></tr>
        <tr><td>♥ Heart</td><td>Card -> Player boundary</td><td>If the last destroyed card before player is Heart, reduce final player damage.</td></tr>
        <tr><td>♠ Spade (attacker)</td><td>Card -> Player boundary</td><td>Doubles damage that reaches the player.</td></tr>
      </tbody>
    </table>
  </div>
  <p class="small-note">Hearts do not stack. Clubs apply at most once per attack.</p>
</section>

<section class="two-col">
  <article class="card">
    <h2>Classic Special Cards</h2>
    <ul class="quick-list">
      <li><strong>Ace:</strong> Front-rank Ace is destroyable only by a direct Ace attack (Classic Aces).</li>
      <li><strong>Jack:</strong> Destroys Jack.</li>
      <li><strong>Queen:</strong> Destroys Jack or Queen.</li>
      <li><strong>King:</strong> Destroys Jack, Queen, or King.</li>
    </ul>
  </article>

  <article class="card">
    <h2>Pass & Draw Rules</h2>
    <ul class="quick-list">
      <li>More than 3 consecutive passes = forfeit.</li>
      <li>More than 5 total passes by one player = forfeit.</li>
      <li>Draw until hand size reaches 4 or deck is empty.</li>
      <li>Empty deck alone is not an automatic loss.</li>
    </ul>
  </article>
</section>

<section class="formation">
  <h2>Formation</h2>
  <p class="row-label">Front row</p>
  <div class="formation-grid">
    <div class="slot">F1</div>
    <div class="slot">F2</div>
    <div class="slot">F3</div>
    <div class="slot">F4</div>
  </div>
  <p class="arrow">Target chain / carryover path: Front -> Back -> Player</p>
  <p class="row-label">Back row</p>
  <div class="formation-grid">
    <div class="slot back">B1</div>
    <div class="slot back">B2</div>
    <div class="slot back">B3</div>
    <div class="slot back">B4</div>
  </div>
</section>

<p class="small-note">Use this page at the table. Use <a href="{{ '/learn/rules/' | relative_url }}">Rules v1.0 Summary</a> for fuller explanations and <a href="{{ '/mastery/mastery/' | relative_url }}">Suits &amp; Strategy</a> for mastery patterns.</p>
