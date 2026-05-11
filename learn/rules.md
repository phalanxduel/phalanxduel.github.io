---
title: Tactical Briefing
description: "The core mechanics of Phalanx Duel. Red protects, Blue attacks. Master the grid."
---

# Tactical Briefing: The Grid System

<p class="small-note">This is an authoritative summary of Phalanx Duel v1.1.0. No luck. No RNG. Just geometric consequence.</p>

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
          <small>DEFENSE</small>
        </div>
        <div style="border: 1px solid var(--color-offense); padding: 1rem; text-align: center;">
          <span class="suit-blue" style="font-weight: 900;">BLUE</span><br>
          <small>OFFENSE</small>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="card">
  <h2>2. Suit Roles (The Combat Engine)</h2>
  <p>Suits are not decoration. They define the role of the card in the cascade.</p>
  
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 2rem; margin-top: 2rem;">
    <div style="border-top: 4px solid var(--color-defense); padding-top: 1rem;">
      <h3 class="suit-h">♥ HEARTS</h3>
      <p><strong>Shield: Player.</strong> Reduces damage directed at the Player LP. The final line of defense.</p>
    </div>
    <div style="border-top: 4px solid var(--color-defense); padding-top: 1rem;">
      <h3 class="suit-d">♦ DIAMONDS</h3>
      <p><strong>Shield: Formation.</strong> Reduces damage carryover from the Front Rank to the Back Rank.</p>
    </div>
    <div style="border-top: 4px solid var(--color-offense); padding-top: 1rem;">
      <h3 class="suit-c">♣ CLUBS</h3>
      <p><strong>Weapon: Impact.</strong> Doubles the carryover damage hitting the Back Rank defender.</p>
    </div>
    <div style="border-top: 4px solid var(--color-offense); padding-top: 1rem;">
      <h3 class="suit-s">♠ SPADES</h3>
      <p><strong>Weapon: Reach.</strong> Doubles the final damage hitting the Player LP.</p>
    </div>
  </div>
</section>

<section class="two-col">
  <article class="card">
    <h2>3. The Cascade</h2>
    <p>Damage flows front-to-back in a deterministic sequence:</p>
    <ol class="quick-list">
      <li><strong>Front Contact:</strong> Attacker hits Front Defender.</li>
      <li><strong>Suit Check:</strong> Diamonds or Clubs modify carryover.</li>
      <li><strong>Back Contact:</strong> Remaining damage hits Back Defender.</li>
      <li><strong>Final Breach:</strong> Remaining damage hits Player LP (modified by Spades/Hearts).</li>
    </ol>
  </article>

  <article class="card">
    <h2>4. Special Eligibility</h2>
    <ul class="quick-list">
      <li><strong>Aces:</strong> A front-rank Ace can only be destroyed by an Ace attack. If the attacker is not an Ace, the Ace survives but <strong>only absorbs 1 point of damage</strong>; the rest of the attack overflows to the next target.</li>
      <li><strong>Face Cards:</strong> Can only be destroyed by face cards of equal or higher rank (J < Q < K). If the attacker is ineligible, the Face Card survives and <strong>halts all carryover damage</strong>.</li>
      <li><strong>Suit Shields:</strong> Diamond and Heart shields are <strong>Boundary Effects</strong>. They only trigger if the card providing the shield is <strong>destroyed</strong> during the resolution.</li>
      <li><strong>Hearts Do Not Stack:</strong> Only the final destroyed card before damage hits the player can provide a Heart shield.</li>
    </ul>
  </article>
</section>

<div class="cta-row" style="margin-top: 4rem;">
  <a class="button-link primary" href="{{ '/guide' | relative_url }}">Quick Players Guide &rarr;</a>
  <a class="button-link" href="{{ '/tools/battle-calculator/' | relative_url }}">Enter the Combat Lab</a>
  <a class="button-link" href="{{ '/play/' | relative_url }}">Launch Online Match</a>
</div>
