---
title: Battle Calculator
description: "Simulate one Phalanx Duel column attack using canonical v1.0 or a legacy prototype reference mode."
battle_calculator: true
---

# Battle Calculator

<section class="card">
  <h2>Simulate One Column Attack</h2>
  <p>Select an attacker and the defending front/back cards, then run the battle simulation.</p>
  <p class="small-note"><strong>Rules Mode</strong> selects the battle logic profile. Use <strong>Canonical v1.0</strong> unless you are comparing old prototype examples.</p>
  <div class="calculator-grid">
    <label class="field">
      <span>Rules Mode</span>
      <select id="battle-mode" aria-label="Rules mode">
        <option value="canonical_v1_0">Canonical v1.0</option>
        <option value="legacy_reference">Historical Prototype</option>
      </select>
    </label>

    <label class="field">
      <span>Attacker Card</span>
      <select id="attacker-card" aria-label="Attacker card"></select>
    </label>

    <label class="field">
      <span>Defender Front Card</span>
      <select id="front-card" aria-label="Defender front card"></select>
    </label>

    <label class="field">
      <span>Defender Back Card</span>
      <select id="back-card" aria-label="Defender back card"></select>
    </label>
  </div>
  <p>
    <button id="simulate-battle" type="button" class="button-link">Simulate Battle</button>
  </p>
  <p><a href="{{ '/battle-calculator-tests/' | relative_url }}">Open calculator unit tests</a></p>
</section>

<section class="card">
  <h2>Mode Guide</h2>
  <p><strong>Canonical v1.0</strong> follows the authoritative Duel rules model used by the game docs. <strong>Historical Prototype</strong> preserves an older site-era timing model for comparison.</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Step</th><th>Historical Prototype</th><th>Canonical v1.0</th></tr>
      </thead>
      <tbody>
        <tr><td>Diamond shield vs Club bonus order</td><td>Club doubles overflow first, then Diamond absorbs.</td><td>Diamond absorbs overflow first, then Club can double the remaining carryover once.</td></tr>
        <tr><td>Heart trigger</td><td>Heart-style mitigation is modeled per site-era overflow rules.</td><td>Heart mitigation applies on the final Card -> Player boundary if the last destroyed card is a Heart.</td></tr>
        <tr><td>Ace / Face eligibility</td><td>Simplified legacy model.</td><td>Classic Ace and Classic Face Card destroy eligibility is modeled.</td></tr>
        <tr><td>Spade LP bonus</td><td>Doubles final LP damage.</td><td>Doubles final LP damage.</td></tr>
      </tbody>
    </table>
  </div>
  <p class="small-note"><strong>If you're unsure:</strong> use <strong>Canonical v1.0</strong>. Use <strong>Historical Prototype</strong> only when checking older examples or migration notes.</p>
</section>

<section class="card" aria-live="polite">
  <h2>Battle Result</h2>
  <p class="small-note">Result output includes stage-by-stage damage totals: attacker base, after front, after back, and final player LP damage.</p>
  <div id="battle-result">
    <p class="small-note">Run a simulation to see LP damage, suit effects, and which cards survive.</p>
  </div>
</section>

<section class="card">
  <h2>Canonical v1.0 Rules Mode Notes</h2>
  <ul class="quick-list">
    <li><strong>Diamond boundary:</strong> If a Diamond card was just destroyed and the next target is a card, it reduces carryover before that next card takes damage.</li>
    <li><strong>Club attacker:</strong> Doubles carryover once on the first eligible Card -> Card boundary after the first destruction.</li>
    <li><strong>Heart boundary:</strong> Reduces final player damage only if the last destroyed card before the player is a Heart.</li>
    <li><strong>Spade attacker:</strong> Doubles final LP damage once carryover reaches the player.</li>
    <li><strong>Classic Aces / Faces:</strong> Front-rank Ace and face-card destroy eligibility is enforced in canonical mode.</li>
  </ul>
  <p><strong>Boundary order (canonical):</strong> Shield -> Weapon -> Clamp.</p>
  <p><strong>Example (Historical Prototype):</strong> 10C into 1D with back 5S: overflow 9 -> Club 18 -> Diamond shields 1 -> 17 hits back.</p>
  <p><strong>Example (Canonical v1.0):</strong> 10C into 1D with back 5S: overflow 9 -> Diamond shields 1 -> Club 16 -> 16 hits back.</p>
  <p class="small-note">Use this tool to build intuition, then confirm final wording in the canonical rules spec in the game repository.</p>
</section>
