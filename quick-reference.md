---
title: Quick Reference
description: Printable one-page reference for Phalanx Duel v1.4.0 setup, turn flow, and suit timing.
layout: default
---

# Quick Reference (v1.4.0)

<p class="small-note">Use this page at the table. Use the <a href="{{ '/learn/rules/' | relative_url }}">v1.4.0 / rules v3.0 summary</a> for fuller explanations and <a href="{{ '/mastery/mastery/' | relative_url }}">Suits & Strategy</a> for mastery patterns.</p>

<div class="grid-2">
  <div class="card">
    <h2>1. Setup & Deployment</h2>
    <ul class="quick-list">
      <li><strong>Field:</strong> 4 Columns x 2 Ranks (Front/Back).</li>
      <li><strong>Hand:</strong> 12 Cards.</li>
      <li><strong>Phase:</strong> Alternate deploying 1 card until 8 slots filled.</li>
      <li><strong>Hand Remainder:</strong> 4 cards.</li>
    </ul>
  </div>

  <div class="card">
    <h2>2. Turn Sequence</h2>
    <ol class="quick-list">
      <li><strong>Start Turn:</strong> Passive effects.</li>
      <li><strong>Attack:</strong> Resolve one lane (Cascade).</li>
      <li><strong>Cleanup:</strong> Clear destroyed cards.</li>
      <li><strong>Reinforce:</strong> Deploy 1 card to any slot.</li>
      <li><strong>Draw:</strong> Draw to hand size of 4.</li>
      <li><strong>End Turn:</strong> Pass.</li>
    </ol>
  </div>
</div>

<div class="card">
  <h2>3. The Cascade (Suit Timing)</h2>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Trigger</th><th>Suit</th><th>Effect</th></tr>
      </thead>
      <tbody>
        <tr><td>Card -> Card</td><td>♦ Diamond</td><td>Reduces carryover to your Back Rank.</td></tr>
        <tr><td>Card -> Card</td><td>♣ Club</td><td>Doubles carryover to opponent's Back Rank.</td></tr>
        <tr><td>Card -> Player</td><td>♥ Heart</td><td>Reduces final damage to your LP.</td></tr>
        <tr><td>Card -> Player</td><td>♠ Spade</td><td>Doubles final damage to opponent's LP.</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="grid-2">
  <div class="card">
    <h2>4. Special Rules</h2>
    <ul class="quick-list">
      <li><strong>Ace:</strong> Only destroyed by a front-rank Ace.</li>
      <li><strong>Face:</strong> Destroyer must be equal or lower rank (J < Q < K).</li>
      <li><strong>No RNG:</strong> Math is final. No dice.</li>
    </ul>
  </div>

  <div class="card">
    <h2>5. Quick Tips</h2>
    <ul class="quick-list">
      <li><strong>Lanes:</strong> Every column is an independent battle.</li>
      <li><strong>Breach:</strong> An empty column deals massive LP damage.</li>
      <li><strong>Armor:</strong> Diamonds in front protect your back rank.</li>
    </ul>
  </div>
</div>

<div class="cta-row" style="margin-top: 4rem;">
  <button class="button-link primary" onclick="window.print()">Print This Guide</button>
  <a class="button-link" href="{{ '/tools/battle-calculator/' | relative_url }}">Open Combat Lab</a>
</div>
