---
title: How to Play
description: "Your first match in Phalanx Duel, from classic setup to the first attack."
---

# Your First Match

<section class="hero">
  <h2>Tactical Essentials</h2>
  <ul class="quick-list">
    <li><strong>Participants:</strong> Two-player tactical duel.</li>
    <li><strong>Classic Battlefield:</strong> 4 columns × 2 ranks (front and back).</li>
    <li><strong>Classic Hand Limit:</strong> 4 cards.</li>
    <li><strong>Classic Opening Draw:</strong> 12 cards per player before deployment.</li>
  </ul>
  <p class="small-note">This page is a fast-start guide for the canonical Duel format. For exact edge cases and deterministic timing, use the Rules v1.0 summary and canonical spec.</p>
</section>

<section class="card">
  <h2>1. Set Up the Classic Duel</h2>
  <ol class="quick-list">
    <li><strong>Draw:</strong> Each player draws 12 cards.</li>
    <li><strong>Deploy in Alternation:</strong> Players alternate placing exactly one card onto their own board.</li>
    <li><strong>Finish Deployment:</strong> Each player ends with all 8 battlefield slots filled and exactly 4 cards left in hand.</li>
    <li><strong>Start Play:</strong> In Classic defaults, P2 deploys first and P1 attacks first.</li>
  </ol>
</section>

<section class="formation" aria-labelledby="formation-title">
  <h2 id="formation-title">Formation Intelligence</h2>
  <p class="row-label">Front row (Facing Opponent)</p>
  <div class="formation-grid" role="img" aria-label="Diagram of a two-row, four-column Phalanx: Duel formation.">
    <div class="slot">F1</div>
    <div class="slot">F2</div>
    <div class="slot">F3</div>
    <div class="slot">F4</div>
  </div>
  <p class="arrow">↓ Damage Path: Front → Back → Player LP ↓</p>
  <p class="row-label">Back row (Reserves)</p>
  <div class="formation-grid">
    <div class="slot back">B1</div>
    <div class="slot back">B2</div>
    <div class="slot back">B3</div>
    <div class="slot back">B4</div>
  </div>
</section>

<section class="card">
  <h2>2. Understand the Attack Path</h2>
  <ol class="quick-list">
    <li><strong>Choose an Attacker:</strong> Only the card at <strong>rank 0</strong> (front) in a column can attack.</li>
    <li><strong>Choose a Defending Column:</strong> You target a column, not an individual card.</li>
    <li><strong>Resolve the Chain:</strong> Damage goes front card -> back card -> player LP.</li>
    <li><strong>Carryover Matters:</strong> If damage destroys a card, any remaining damage can continue through the next boundary.</li>
    <li><strong>Cleanup and Collapse:</strong> Destroyed cards are removed, then the column collapses forward.</li>
  </ol>
</section>

<section class="card">
  <h2>3. Learn the Suit Timing (Core Skill)</h2>
  <p>Suits trigger at boundaries during attack resolution. The canonical boundary order is <strong>Shield -> Weapon -> Clamp</strong>.</p>
  <ul class="quick-list">
    <li><strong>♦ Diamonds (Card -> Card):</strong> Reduce carryover before it reaches the next card.</li>
    <li><strong>♣ Clubs (Card -> Card):</strong> The attacking Club can double carryover once on the first eligible boundary after the first destruction.</li>
    <li><strong>♥ Hearts (Card -> Player):</strong> If the last destroyed card before the player is a Heart, it can reduce final player damage.</li>
    <li><strong>♠ Spades (Card -> Player):</strong> The attacking Spade doubles damage that reaches the player.</li>
  </ul>
</section>

<section class="card">
  <h2>4. Know the Turn Rhythm</h2>
  <p>Every turn follows the same 7-phase lifecycle: Start Turn, Attack Phase, Attack Resolution, Cleanup, Reinforcement, Draw, End Turn.</p>
  <p class="small-note">Even “nothing happened” phases still matter in digital play because the system logs deterministic turn events.</p>
</section>

<section class="card">
  <h2>5. First-Match Mistakes to Avoid</h2>
  <ul class="quick-list">
    <li><strong>Do not overfocus one column:</strong> Your front line is your attack access.</li>
    <li><strong>Hearts do not stack:</strong> Only the final eligible Heart mitigation applies to player damage.</li>
    <li><strong>Clubs do not repeat:</strong> A Club attack doubles carryover at most once per attack.</li>
    <li><strong>Empty deck is not an automatic loss:</strong> You only draw until hand limit or deck empty.</li>
    <li><strong>Pass pressure is real:</strong> Consecutive and total pass limits can forfeit the match.</li>
  </ul>
</section>

<div class="cta-row">
  <a class="button-link primary" href="https://play.phalanxduel.com" target="_blank" rel="noopener noreferrer">Play Your First Match &rarr;</a>
  <a class="button-link" href="{{ '/quick-reference/' | relative_url }}">Print Quick Reference</a>
  <a class="button-link secondary" href="{{ '/rules/' | relative_url }}">Rules v1.0 Summary</a>
</div>

<p class="small-note">Next step after your first games: study <a href="{{ '/suits-strategy/' | relative_url }}">Suits &amp; Strategy</a> and test scenarios in the <a href="{{ '/battle-calculator/' | relative_url }}">Battle Calculator</a>.</p>
