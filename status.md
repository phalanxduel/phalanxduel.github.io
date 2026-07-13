---
title: Status
description: "Current project phase, stability, and what to expect from Phalanx: Duel v1.4.0."
---

# Project Status

<section class="card">
  <h2>Current Phase</h2>
  <p><strong>v1.4.0 Stable (Production).</strong> The deployed build reports schema version 1.4.0 and rules spec v3.0. This release adds authoritative combat mathematics, scientific gameplay assurance, corrected boundary semantics, and polished narration/effect/terminal choreography.</p>
</section>

<section class="card">
  <h2>What Works Today</h2>
  <ul class="quick-list">
    <li>Full deterministic combat lifecycle (Deployment through EndTurn).</li>
    <li><strong>Beta:</strong> Glicko-2 ranked matchmaking and public lobby system. (<a href="{{ '/competitive/' | relative_url }}">See Competitive Play</a>)</li>
    <li>Resilient state rehydration and session re-entry.</li>
    <li>High-fidelity in-game video tutorials and pedagogical briefings.</li>
    <li>Arithmetic damage proofs shown in previews, combat narration, event details, and post-match review.</li>
    <li>Independent combat reference verification across 2,355,388 declared finite checks.</li>
    <li>Official Golang terminal client and TypeScript SDK.</li>
  </ul>
</section>

<section class="card">
  <h2>Production Stability</h2>
  <p>Matches are backed by a persistent action ledger, ensuring tactical progress can be rehydrated across server restarts or connection drops. Releases promote a tested immutable image directly to production; staging is retired.</p>
  <p><a href="{{ '/CHANGELOG/' | relative_url }}">View the latest release notes in the Changelog.</a></p>
</section>

<section class="card">
  <h2>Next Horizons</h2>
  <ul class="quick-list">
    <li>Hardening of native mobile (SwiftUI) and Android operatives (In-Progress).</li>
    <li>Expansion of automated tournament and bracket support.</li>
    <li>Advanced strategic AI heuristics for solo play.</li>
  </ul>
</section>

<section class="card">
  <h2>Canonical Technical References</h2>
  <ul class="quick-list">
    <li><a href="https://github.com/phalanxduel/phalanxduel/blob/main/docs/gameplay/rules.md" target="_blank" rel="noopener noreferrer">Rules Specification</a></li>
    <li><a href="https://github.com/phalanxduel/phalanxduel/blob/main/docs/api/openapi.json" target="_blank" rel="noopener noreferrer">OpenAPI Contract</a></li>
    <li><a href="https://github.com/phalanxduel/phalanxduel/blob/main/docs/architecture/principles.md" target="_blank" rel="noopener noreferrer">System Architecture</a></li>
    <li><a href="https://github.com/phalanxduel/phalanxduel/blob/main/docs/ops/slo.md" target="_blank" rel="noopener noreferrer">Telemetry & Observability</a></li>
    <li><a href="{{ '/learn/gameplay-assurance/' | relative_url }}">Gameplay Assurance & Proof Boundaries</a></li>
  </ul>
</section>
