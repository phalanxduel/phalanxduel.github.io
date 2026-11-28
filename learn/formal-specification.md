---
title: Formal Mathematical Specification
description: "Navigable web edition of the Phalanx Duel Classic v3.0 mathematical specification, Suit Boundary algebra, Liveness theorem, and 8 Z3 SMT-LIB2 unbounded proofs over ℤ."
---

<style>
  .spec-toc {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 1.5rem 0 2rem;
    padding: 1rem;
    background: var(--color-surface);
    border: 1px solid var(--color-border-up);
    border-radius: 6px;
  }
  .spec-toc a {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    padding: 0.35rem 0.65rem;
    border: 1px solid var(--color-border-up);
    border-radius: 4px;
    color: var(--color-gold);
    text-decoration: none;
  }
  .spec-toc a:hover,
  .spec-toc a:focus-visible {
    border-color: var(--color-offense);
    color: #fff;
    background: var(--color-surface-up);
  }
  .math-card {
    background: var(--color-surface-up);
    border-left: 3px solid var(--color-gold);
    border-top: 1px solid var(--color-border);
    border-right: 1px solid var(--color-border);
    border-bottom: 1px solid var(--color-border);
    padding: 1rem 1.25rem;
    margin: 1rem 0;
    border-radius: 4px;
  }
  .math-card.defense { border-left-color: var(--color-defense); }
  .math-card.offense { border-left-color: var(--color-offense); }
  .math-formula {
    font-family: var(--font-mono);
    font-size: 0.95rem;
    color: var(--color-gold-bright);
    background: var(--color-bg);
    padding: 0.75rem 1rem;
    border-radius: 4px;
    overflow-x: auto;
    margin: 0.65rem 0;
    border: 1px solid var(--color-border);
  }
  .proof-accordion {
    background: var(--color-surface);
    border: 1px solid var(--color-border-up);
    border-radius: 6px;
    margin: 0.65rem 0;
    padding: 0.75rem 1rem;
  }
  .proof-accordion summary {
    cursor: pointer;
    font-family: var(--font-mono);
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--color-text);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }
  .proof-badge {
    font-size: 0.72rem;
    padding: 0.15rem 0.5rem;
    border-radius: 3px;
    background: rgba(15, 118, 110, 0.25);
    border: 1px solid #0f766e;
    color: #5eead4;
    white-space: nowrap;
  }
  .diagram-mat {
    background: #fffdf8;
    padding: 1rem;
    border-radius: 6px;
    margin: 1rem 0;
    overflow-x: auto;
  }
  .diagram-mat img {
    display: block;
    max-width: 100%;
    height: auto;
    margin: 0 auto;
  }
  .spec-table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
    font-size: 0.9rem;
  }
  .spec-table th,
  .spec-table td {
    border: 1px solid var(--color-border-up);
    padding: 0.6rem 0.75rem;
    text-align: left;
  }
  .spec-table th {
    background: var(--color-surface-up);
    color: var(--color-gold);
    font-family: var(--font-mono);
    font-size: 0.8rem;
  }
</style>

# Formal Mathematical &amp; Algorithmic Specification

<p class="small-note">Web-native, deep-linkable edition of Phalanx Duel Classic v3.0 (Engine v{{ site.data.meta.version }}). Every formula below is bound to <code>@phalanxduel/engine</code>, verified across 2,355,388 finite combat transitions, and proved unbounded over all integers ℤ by Z3 SMT-LIB2.</p>

<nav class="spec-toc" aria-label="On this page">
  <a href="#geometry">1. Geometry &amp; Deck Axioms</a>
  <a href="#turn-lifecycle">2. Turn Lifecycle FSM</a>
  <a href="#combat-algebra">3. Suit Boundary Algebra</a>
  <a href="#theorem-1">4. Non-Commutativity Theorem</a>
  <a href="#liveness">5. Liveness Theorem</a>
  <a href="#fog-of-war">6. Fog-of-War &amp; Replay</a>
  <a href="#z3-proofs">7. Z3 Unbounded Proofs (8/8)</a>
  <a href="#worked-examples">8. Verified Examples</a>
  <a href="#downloads">9. Print &amp; Source</a>
</nav>

<section class="card" id="geometry">
  <h2>1. State Space, Geometry &amp; Deck Axioms</h2>
  <p>A Phalanx Duel match is a finite-state, zero-RNG-after-deal deterministic transition system <code>ℳ = (𝒮, 𝒜, δ, s₀, ℰ)</code> on a rectangular <code>r × c</code> battlefield (Classic: <code>r = 2, c = 4, LP₀ = 20</code>).</p>
  <div class="math-card">
    <strong>Axiom 1 — Global Geometry &amp; Scarcity Invariants (PD-RULE-005..008)</strong>
    <div class="math-formula">r · c ≤ 48   ∧   h_max ≤ c   ∧   D₀ = r·c + c   ∧   52 − D₀ ≥ 4</div>
    <p class="small-note">In Classic v3.0 (<code>r = 2, c = 4</code>): 8 battlefield slots, max hand 4, opening draw <code>D₀ = 12</code>, leaving a 40-card reserve (<code>40 ≥ 4</code>). Deck values: <code>A = 1</code>, <code>2–10 = face value</code>, <code>J = Q = K = 11</code>.</p>
  </div>
</section>

<section class="card" id="turn-lifecycle">
  <h2>2. Deterministic 8-Phase Turn Lifecycle</h2>
  <p>The authoritative transition function <code>δ : 𝒮 × 𝒜 → 𝒮 × ℰ*</code> advances through eight phases enforced by <code>engine/src/state-machine.ts</code> and verified deadlock-free:</p>
  <div class="math-formula">StartTurn → DeploymentPhase → (AttackPhase → AttackResolution → CleanupPhase → ReinforcementPhase → DrawPhase → EndTurn)* → gameOver</div>
  <details class="proof-accordion">
    <summary>View Single-Source Turn Lifecycle &amp; Cascade Diagram (SVG) <span class="proof-badge">D2 · Build-Time SVG</span></summary>
    <div class="diagram-mat">
      <img src="{{ '/assets/diagrams/turn-lifecycle-and-cascade.svg' | relative_url }}" alt="Deterministic 8-phase turn lifecycle and v3.0 column cascade diagram" loading="lazy">
    </div>
    <p class="small-note"><a href="{{ '/assets/diagrams/turn-lifecycle-and-cascade.svg' | relative_url }}" target="_blank" rel="noopener noreferrer">Open full-resolution SVG in new tab</a> · <a href="{{ '/assets/diagrams/engine-fsm-verified.svg' | relative_url }}" target="_blank" rel="noopener noreferrer">Open live TypeScript STATE_MACHINE Graphviz SVG</a></p>
  </details>
</section>

<section class="card" id="combat-algebra">
  <h2>3. Combat Cascade &amp; Suit Boundary Algebra</h2>
  <p>For ordinary contact with incoming damage <code>d ≥ 0</code> and target card HP <code>h ≥ 1</code>:</p>
  <div class="math-formula">absorbed = min(d, h)   |   hp′ = h − absorbed   |   carryover = d − absorbed   |   destroyed ⇔ (hp′ = 0)</div>

  <div class="two-col">
    <div class="math-card offense">
      <strong>Card-to-Card Boundary — ℬ_card^(v3)</strong>
      <p>Fired between opposing Front and Back cards. Diamond shield (<code>♦</code>) resolves <em>before</em> Club weapon (<code>♣</code>):</p>
      <div class="math-formula">ℬ_card^(v3)(c₁) = 2 · max(0, c₁ − δ_♦)   if I_♣ = 1 and c₁ &gt; δ_♦
                = max(0, c₁ − δ_♦)       otherwise</div>
    </div>
    <div class="math-card defense">
      <strong>Player LP Boundary — ℬ_player^(v3)</strong>
      <p>Fired into Opponent LP. Last-destroyed Heart ward (<code>♥</code>) resolves <em>before</em> Spade finisher (<code>♠</code>):</p>
      <div class="math-formula">ℬ_player^(v3)(c₂) = 2 · max(0, c₂ − δ_♥)   if I_♠ = 1 and c₂ &gt; δ_♥
                  = max(0, c₂ − δ_♥)       otherwise</div>
    </div>
  </div>

  <ul>
    <li><strong>Face-Card Eligibility (<code>isFaceCardEligible</code>):</strong> On face-card defenders <code>{J, Q, K}</code>, <code>Jack</code> can destroy <code>{J}</code>, <code>Queen</code> can destroy <code>{J, Q}</code>, and <code>King</code> can destroy <code>{J, Q, K}</code> (non-face attackers are unrestricted). Ineligible targets survive with <code>carryover = 0</code>.</li>
    <li><strong>Ace Duality (<code>modeClassicAces</code>):</strong> Only a front-rank Ace can destroy another Ace. Any non-Ace attacker deals at most 1 absorbed damage; the Ace remains at <code>hp′ = 1</code> (undestroyed) and passes <code>d − 1</code> carryover through.</li>
  </ul>
</section>

<section class="card" id="theorem-1">
  <h2>4. Theorem 1 — Non-Commutativity of Shield &amp; Weapon Operators</h2>
  <div class="math-card">
    <p>Let <code>S_δ(x) = max(0, x − δ)</code> be a boundary shield and <code>W(x) = 2x</code> be a weapon multiplier. For <strong>all</strong> integers <code>x ≥ 0, δ ≥ 0</code>:</p>
    <div class="math-formula">(S_δ ∘ W)(x) − (W ∘ S_δ)(x) = max(0, 2x − δ) − 2·max(0, x − δ) = min(δ, max(0, 2x − δ)) ≥ 0</div>
    <p>Strict inequality <code>(W ∘ S_δ)(x) &lt; (S_δ ∘ W)(x)</code> holds <strong>if and only if</strong> <code>0 &lt; δ &lt; 2x</code>.</p>
    <p class="small-note"><strong>Design consequence:</strong> Classic v3.0 applies Shield-before-Weapon (<code>W ∘ S_δ</code>), strictly capping burst variance vs. legacy v1.0 (<code>S_δ ∘ W</code>) and guaranteeing that any shield with <code>δ ≥ x</code> zeroes out the weapon doubling trigger completely.</p>
  </div>
</section>

<section class="card" id="liveness">
  <h2>5. Theorem 2 — Guaranteed Finite Termination (Liveness)</h2>
  <p>At every v3.0 <code>AttackPhase</code> turn boundary, <code>engine/src/liveness.ts</code> evaluates a collision-free canonical position witness <code>σ(s)</code> and a four-coordinate progress vector:</p>
  <div class="math-formula">Φ(s) = ( ∑ LP_p,  ∑ hp_(p,k),  ∑ |Draw_p|,  −∑ |Discard_p| )</div>
  <div class="math-card">
    <strong>Precedence Lattice (Guaranteed Termination ≤ 200 Turns)</strong>
    <div class="math-formula">count(σ(s)) ≥ 3 ⇒ repetitionDraw   ≻   noProgressTurns ≥ 50 ⇒ noProgressDraw   ≻   t ≥ 200 ⇒ turnLimitDraw</div>
    <p class="small-note">No infinite loop is reachable in v3.0. Every match terminates in at most 200 completed turns.</p>
  </div>
</section>

<section class="card" id="fog-of-war">
  <h2>6. Authority Ledger, Fog-of-War &amp; Cryptographic Replay</h2>
  <p>Every match is an immutable fold from its initial seed over the server-authoritative action log, with per-turn canonical SHA-256 hashes:</p>
  <div class="math-formula">s_n = δ*(s₀, ⟨a₁, …, a_n⟩)   |   h_t = SHA-256(canonical(s_t))</div>
  <p>Each player receives only the redacted projection <code>π_p(s_t)</code> stripping opponent hidden hands and drawpile order; spectators receive delayed frames via <code>replayGameAtOrBeforeTurn</code>.</p>
  <details class="proof-accordion">
    <summary>View Authority Ledger &amp; Fog-of-War Diagram (SVG) <span class="proof-badge">D2 · Build-Time SVG</span></summary>
    <div class="diagram-mat">
      <img src="{{ '/assets/diagrams/authority-ledger-and-fog-of-war.svg' | relative_url }}" alt="Server-authoritative action ledger, Fog-of-War projection functor, MCP surface, and replay verification chain" loading="lazy">
    </div>
  </details>
</section>

<section class="card" id="z3-proofs">
  <h2>7. Unbounded Mathematical Proofs (Z3 SMT-LIB2 · 8/8 Q.E.D.)</h2>
  <p>Each theorem below is proved over <strong>all unbounded mathematical integers ℤ</strong> in <a href="https://github.com/phalanxduel/phalanxduel/blob/main/docs/formal/phalanx_duel_proofs.smt2" target="_blank" rel="noopener noreferrer"><code>docs/formal/phalanx_duel_proofs.smt2</code></a> by asserting its negation and verifying Z3 returns <code>unsat</code> (re-verify locally with <code>pnpm verify:proofs</code>):</p>

  <details class="proof-accordion">
    <summary>Proof 1 — Shield-Zeroes-Weapon Theorem <span class="proof-badge">Z3 · Q.E.D. (unsat)</span></summary>
    <div class="math-formula">∀ c ≥ 0, δ ≥ 0 :  (δ ≥ c) ⇒ ℬ^(v3)(c, δ) = 0</div>
    <p class="small-note">Proves that whenever a Diamond or Heart shield meets or exceeds incoming carryover, the Club or Spade ×2 multiplier can never fire.</p>
  </details>

  <details class="proof-accordion">
    <summary>Proof 2 — v3.0 Burst-Dominance Theorem <span class="proof-badge">Z3 · Q.E.D. (unsat)</span></summary>
    <div class="math-formula">∀ c ≥ 0, δ ≥ 0 :  ℬ^(v3)(c, δ) ≤ ℬ^(v1)(c, δ)</div>
    <p class="small-note">Proves Shield-before-Weapon never produces higher burst damage than legacy Weapon-before-Shield.</p>
  </details>

  <details class="proof-accordion">
    <summary>Proof 3 — Exact Non-Commutativity Closed-Form Identity <span class="proof-badge">Z3 · Q.E.D. (unsat)</span></summary>
    <div class="math-formula">∀ c ≥ 0, δ ≥ 0 :  ℬ^(v1)(c, δ) − ℬ^(v3)(c, δ) = min(δ, max(0, 2c − δ))</div>
    <p class="small-note">Proves the exact integer delta between v1.0 and v3.0 across all non-negative integers.</p>
  </details>

  <details class="proof-accordion">
    <summary>Proof 4 — Strict Non-Commutativity Biconditional (iff) <span class="proof-badge">Z3 · Q.E.D. (unsat)</span></summary>
    <div class="math-formula">∀ c ≥ 0, δ ≥ 0 :  (ℬ^(v3)(c, δ) &lt; ℬ^(v1)(c, δ)) ⇔ (0 &lt; δ &lt; 2c)</div>
    <p class="small-note">Establishes the exact necessary and sufficient boundary where operator order changes combat output.</p>
  </details>

  <details class="proof-accordion">
    <summary>Proof 5 — Damage Conservation &amp; Surviving-Card Stop <span class="proof-badge">Z3 · Q.E.D. (unsat)</span></summary>
    <div class="math-formula">∀ d ≥ 0, h ≥ 1 :  (abs + carry = d) ∧ (hp′ + abs = h) ∧ (hp′ &gt; 0 ⇒ carry = 0)</div>
    <p class="small-note">Proves zero damage is created or lost during standard contact, and any surviving card halts carryover.</p>
  </details>

  <details class="proof-accordion">
    <summary>Proof 6 — Ace Invulnerability Conservation <span class="proof-badge">Z3 · Q.E.D. (unsat)</span></summary>
    <div class="math-formula">∀ d ≥ 1 :  (abs_ace = 1) ∧ (abs_ace + carry_ace = d) ∧ (carry_ace ≥ 0)</div>
    <p class="small-note">Proves non-Ace strikes against an Ace conserve total damage while keeping the Ace at 1 HP.</p>
  </details>

  <details class="proof-accordion">
    <summary>Proof 7 — Liveness Bounded Termination (≤ 200 Turns) <span class="proof-badge">Z3 · Q.E.D. (unsat)</span></summary>
    <div class="math-formula">∀ t ≥ 0, n ≥ 0, r ≥ 1 :  (¬draw ⇒ t &lt; 200 ∧ n &lt; 50 ∧ r &lt; 3) ∧ (t ≥ 200 ⇒ draw)</div>
    <p class="small-note">Proves no active v3.0 match can ever exceed the 200-turn hard termination bound.</p>
  </details>

  <details class="proof-accordion">
    <summary>Proof 8 — Fog-of-War Projection Non-Interference <span class="proof-badge">Z3 · Q.E.D. (unsat)</span></summary>
    <div class="math-formula">∀ h₀, h₁ₐ, h₁_b, d₁ₐ, d₁_b :  π₀(h₀, h₁ₐ, d₁ₐ, …) = π₀(h₀, h₁_b, d₁_b, …)</div>
    <p class="small-note">Proves perturbing opponent hidden hands or drawpile order cannot alter Player 0's projected view.</p>
  </details>
</section>

<section class="card" id="worked-examples">
  <h2>8. Machine-Checked Worked Cascade Examples</h2>
  <p>Every example below is executed against the live TypeScript engine on every <code>pnpm verify:formal</code> run:</p>
  <table class="spec-table">
    <thead>
      <tr>
        <th>Attacker</th>
        <th>Defending Column</th>
        <th>Step-by-Step Resolution (v3.0)</th>
        <th>LP Loss</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>9♣</strong></td>
        <td>Front <strong>4♦</strong>, Back <strong>5♠</strong></td>
        <td>9 hits 4♦ → destroyed, carryover 5. <strong>♦ Shield:</strong> 5 − 4 = 1. <strong>♣ Weapon:</strong> 1 × 2 = 2. Hits 5♠ → survives at 3 HP.</td>
        <td><strong>0 LP</strong></td>
      </tr>
      <tr>
        <td><strong>10♠</strong></td>
        <td>Front <strong>6♣</strong>, Back <strong>2♥</strong></td>
        <td>10 hits 6♣ → destroyed, carryover 4. Hits 2♥ → destroyed, carryover 2. <strong>♥ Ward:</strong> 2 − 2 = 0. <strong>♠ Weapon:</strong> 0 × 2 = 0.</td>
        <td><strong>0 LP</strong></td>
      </tr>
      <tr>
        <td><strong>10♠</strong></td>
        <td>Front <strong>5♣</strong>, Back <strong>2♦</strong></td>
        <td>10 hits 5♣ → destroyed, carryover 5. Hits 2♦ → destroyed, carryover 3. No Heart at LP boundary. <strong>♠ Weapon:</strong> 3 × 2 = 6.</td>
        <td><strong>6 LP</strong></td>
      </tr>
      <tr>
        <td><strong>8♥</strong></td>
        <td>Front <strong>A♦</strong>, Back <strong>3♣</strong></td>
        <td>Non-Ace vs Ace: A♦ absorbs 1, survives (1 HP, no Diamond shield), carryover 7 destroys 3♣ → carryover 4 hits LP.</td>
        <td><strong>4 LP</strong></td>
      </tr>
    </tbody>
  </table>
</section>

<section class="card" id="downloads">
  <h2>9. Companion Print Editions &amp; Source Artifacts</h2>
  <p>Prefer a printable sheet for tabletop play or offline archival review? Every artifact below compiles from the same canonical source:</p>
  <div class="cta-row">
    <a class="button-link primary" href="{{ '/tools/battle-calculator/' | relative_url }}">Try the Live Combat Lab</a>
    <a class="button-link" href="{{ '/assets/pdf/phalanx-duel-formal-specification.pdf' | relative_url }}">Formal Spec (PDF)</a>
    <a class="button-link" href="{{ '/assets/pdf/phalanx-duel-face-to-face-quickstart.pdf' | relative_url }}">2-Page Quickstart (PDF)</a>
    <a class="button-link" href="{{ '/assets/pdf/phalanx-duel-suit-reference-cards.pdf' | relative_url }}">Poker Reference Cards (PDF)</a>
  </div>
  <p class="small-note" style="margin-top: 1rem;">
    Canonical sources:
    <a href="https://github.com/phalanxduel/phalanxduel/blob/main/docs/formal/phalanx_duel_proofs.smt2" target="_blank" rel="noopener noreferrer">Z3 SMT-LIB2 Proofs</a> ·
    <a href="https://github.com/phalanxduel/phalanxduel/blob/main/docs/formal/PhalanxDuelV3.tla" target="_blank" rel="noopener noreferrer">TLA+ Specification</a> ·
    <a href="https://github.com/phalanxduel/phalanxduel/blob/main/scripts/ci/verify-formal-properties.ts" target="_blank" rel="noopener noreferrer">Executable Engine Verifier</a>
  </p>
</section>
