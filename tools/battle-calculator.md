---
title: Battle Simulator
description: "The Phalanx Battle Simulator. High-fidelity combat analysis for the mastery-minded player."
battle_calculator: true
---

# Combat Lab: The Cascade Simulator

<div class="simulator-panel">
  <span class="simulator-title">// ANALYSIS ENGINE INITIALIZED</span>
  <h2>The Geometry of Collision</h2>
  <p>In Phalanx Duel, there are no coin flips. Predict the outcome of a single lane before you commit your cards.</p>
  
  <div class="calculator-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 4rem; margin: 3rem 0;">
    
    <!-- Lane Visualization (Simulation Surface) -->
    <div class="tactical-lane-visualizer" style="position: relative;">
      {% include home/cascade-visualizer.html %}
    </div>

    <!-- Logic Controls & Settings -->
    <div class="controls-panel">
      <!-- Suit Logic Reference -->
      <div class="suit-briefing" style="margin-bottom: 3rem;">
        <h3 style="font-size: 0.7rem; letter-spacing: 0.2em; color: var(--color-text-dim); text-transform: uppercase;">Suit Logic Reference</h3>
        <ul style="list-style: none; padding: 0; font-family: var(--font-mono); font-size: 0.8rem;">
          <li style="margin-bottom: 1rem;"><span class="suit-d">♦ DIAMOND:</span> Blocks carryover to next card.</li>
          <li style="margin-bottom: 1rem;"><span class="suit-c">♣ CLUB:</span> Doubles carryover to next card.</li>
          <li style="margin-bottom: 1rem;"><span class="suit-h">♥ HEART:</span> Blocks damage to the player.</li>
          <li style="margin-bottom: 1rem;"><span class="suit-s">♠ SPADE:</span> Doubles damage to the player.</li>
        </ul>
      </div>

      <!-- Card Selectors (Primary Inputs) -->
      <div class="visualizer-inputs" style="display: grid; grid-template-columns: 1fr; gap: 1rem; margin-bottom: 2rem;">
        <div class="slot-attacker" style="border: 1px solid var(--color-offense); padding: 1rem; text-align: center;">
          <span style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--color-offense); display: block; margin-bottom: 0.5rem;">ATTACKER (OFFENSE)</span>
          <select id="attacker-card" aria-label="Attacker card" style="width: 100%; border-color: var(--color-offense);"></select>
        </div>

        <div class="slot-front" style="border: 1px solid var(--color-defense); padding: 1rem; text-align: center;">
          <span style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--color-defense); display: block; margin-bottom: 0.5rem;">FRONT RANK (DEFENSE)</span>
          <select id="front-card" aria-label="Defender front card" style="width: 100%; border-color: var(--color-defense);"></select>
        </div>

        <div class="slot-back" style="border: 1px solid var(--color-defense); padding: 1rem; text-align: center;">
          <span style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--color-defense); display: block; margin-bottom: 0.5rem;">BACK RANK (DEFENSE)</span>
          <select id="back-card" aria-label="Defender back card" style="width: 100%; border-color: var(--color-defense);"></select>
        </div>
      </div>

      <button id="simulate-battle" type="button" class="button-link" style="width: 100%;">Execute Simulation</button>

      <!-- Advanced Environment Settings (Minimized) -->
      <div class="advanced-settings" style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid var(--grid-line);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <h3 style="font-size: 0.6rem; color: var(--color-text-dim); text-transform: uppercase; margin: 0; letter-spacing: 0.1em;">Simulation Environment</h3>
          <button type="button" id="rules-help-toggle" class="small-note" style="background: transparent; border: 1px solid var(--color-border-up); color: var(--color-offense); cursor: pointer; padding: 2px 6px;">[?] SYSTEM_INFO</button>
        </div>
        
        <div id="rules-help-panel" style="display: none; background: var(--color-surface-up); border: 1px solid var(--color-offense); padding: 1rem; margin-bottom: 1.5rem; font-family: var(--font-mono); font-size: 0.7rem; line-height: 1.4;">
          <p style="margin-top: 0;"><strong style="color: var(--color-offense);">Canonical v1.1.0:</strong> Direct 0% RNG. Enforces Classic Ace/Face card invulnerability rules and strict Shield-before-Weapon resolution order.</p>
          <p style="margin-bottom: 0;"><strong style="color: var(--color-text-dim);">Legacy Prototype:</strong> The original carryover math. No special protection for Aces or Face cards. Used for historical regression testing.</p>
        </div>

        <select id="battle-mode" aria-label="Rules mode" style="width: 100%; background: transparent; color: var(--color-text-dim); border: 1px solid var(--color-border-up); font-family: var(--font-mono); font-size: 0.7rem; padding: 0.5rem;">
          <option value="canonical_v1_0">Canonical v1.1.0 Rules</option>
          <option value="legacy_reference">Legacy Prototype</option>
        </select>
      </div>
    </div>
  </div>
</div>

<section style="padding: 4rem 0;">
  <div id="battle-result" class="simulator-panel" style="border-color: var(--color-offense);">
    <p class="small-note" style="text-align: center; font-family: var(--font-mono);">WAITING FOR EXECUTION...</p>
  </div>
</section>
