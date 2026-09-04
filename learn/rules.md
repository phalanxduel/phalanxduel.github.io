---
title: Tactical Briefing
description: "The core mechanics of Phalanx Duel. Red shields, Blue attacks. Master the grid."
---

# Tactical Briefing: The Grid System

<p class="small-note">Player-readable summary for Phalanx Duel Classic v3.0. The normative authority remains the versioned rules document in the game repository.</p>

<section class="hero" style="padding: 4rem 0;">
  <div class="hero-layout">
    <div class="hero-copy">
      <h2>1. The Battlefield</h2>
      <p>The game is played on a <strong>4x2 grid</strong>. Every column is a lane. Every slot is a tactical decision.</p>
      <ul class="proof-points">
        <li><strong>Front Rank:</strong> The first line of contact.</li>
        <li><strong>Back Rank:</strong> The reserve line / secondary shield.</li>
        <li><strong>The Player:</strong> The final target behind the lines.</li>
      </ul>
    </div>
    <div class="hero-preview">
      <h3 style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--color-offense);">// FORMATION LOGIC</h3>
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-top: 1.5rem;">
        <div style="border: 1px solid var(--color-defense); padding: 1rem; text-align: center;">
          <span class="suit-red" style="font-weight: 900;">RED</span><br>
          <small>SHIELDS (♦ ♥)</small>
        </div>
        <div style="border: 1px solid var(--color-offense); padding: 1rem; text-align: center;">
          <span class="suit-blue" style="font-weight: 900;">BLUE</span><br>
          <small>WEAPONS (♣ ♠)</small>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="card">
  <h2>2. Suit Roles (The Combat Engine)</h2>
  <p>Suits are timing rules, not passive keywords. Each fires only at the boundary it names, and only when the card carrying it is the one destroyed (shields) or the one attacking (weapons).</p>

  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 2rem; margin-top: 2rem;">
    <div style="border-top: 4px solid var(--color-defense); padding-top: 1rem;">
      <h3 class="suit-h">♥ HEARTS</h3>
      <p><strong>Shield: last guard.</strong> If the final card destroyed before the Player is a Heart, subtract its value from carryover before it hits Life Points.</p>
    </div>
    <div style="border-top: 4px solid var(--color-defense); padding-top: 1rem;">
      <h3 class="suit-d">♦ DIAMONDS</h3>
      <p><strong>Shield: formation.</strong> When a destroyed Diamond's carryover is headed to another card, subtract the Diamond's own value from it first.</p>
    </div>
    <div style="border-top: 4px solid var(--color-offense); padding-top: 1rem;">
      <h3 class="suit-c">♣ CLUBS</h3>
      <p><strong>Weapon: breakthrough.</strong> A Club attacker doubles its carryover once, the first time that carryover crosses from one card to another.</p>
    </div>
    <div style="border-top: 4px solid var(--color-offense); padding-top: 1rem;">
      <h3 class="suit-s">♠ SPADES</h3>
      <p><strong>Weapon: finishing blow.</strong> A Spade attacker doubles the carryover the instant it crosses from the cards into the Player's Life Points.</p>
    </div>
  </div>
</section>

<section class="two-col">
  <article class="card">
    <h2>3. The Cascade</h2>
    <p>Damage flows front-to-back in a deterministic sequence:</p>
    <ol class="quick-list">
      <li><strong>Meet the card:</strong> Compare remaining damage to the defender's value. If it survives, the attack stops.</li>
      <li><strong>Cross the boundary:</strong> If the defender is destroyed, apply the suit effect that names this boundary, then carry the remainder on.</li>
      <li><strong>Repeat at the back rank</strong>, then again at the boundary into Life Points.</li>
      <li><strong>Clear the field:</strong> Discard destroyed cards and slide the column forward. Surviving cards reset to full value next turn.</li>
    </ol>
  </article>

  <article class="card">
    <h2>4. Special Eligibility</h2>
    <ul class="quick-list">
      <li><strong>Aces:</strong> Only a front-rank Ace can destroy, or be destroyed by, another Ace. Any other matchup against an Ace is ineligible: the attack stops immediately, no damage and no carryover.</li>
      <li><strong>Face Cards:</strong> A Jack, Queen, or King can only destroy a face card of its own rank or lower (Jack → Jack; Queen → Jack or Queen; King → Jack, Queen, or King). An ineligible target survives and the attack stops.</li>
      <li><strong>Suit Shields:</strong> Diamond and Heart effects are <strong>boundary effects</strong>. They fire only if the card carrying the suit is the one <strong>destroyed</strong> at that boundary, not just any nearby card.</li>
      <li><strong>Hearts Do Not Stack:</strong> Only the last card destroyed before damage reaches the Player can provide a Heart shield.</li>
    </ul>
  </article>
</section>

<div class="cta-row" style="margin-top: 4rem;">
  <a class="button-link primary" href="{{ '/guide' | relative_url }}">Quick Players Guide &rarr;</a>
  <a class="button-link" href="{{ '/tools/battle-calculator/' | relative_url }}">Enter the Combat Lab</a>
  <a class="button-link" href="{{ '/play/' | relative_url }}">Launch Online Match</a>
</div>
