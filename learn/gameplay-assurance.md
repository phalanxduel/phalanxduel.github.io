---
title: Gameplay Assurance
description: "How Phalanx Duel makes deterministic combat explainable, independently checkable, and replay-verifiable."
---

# Gameplay Assurance

Phalanx Duel v{{ site.data.meta.version }} treats correctness as a chain: a versioned rule, an authoritative implementation, and evidence that can be inspected independently. Determinism means identical inputs produce identical outputs; it does not, by itself, prove that the rule is correct.

## The Damage Witness

Every competitive attack can carry a schema-versioned arithmetic witness. The server records ordered integer operations, named operands, results, visibility, and stable rule identifiers. The client displays that same evidence in previews, narration, event details, replay, and the post-match **Proof of Damage** instead of re-creating the answer locally.

For ordinary contact with incoming damage `d` and target HP `h`:

- `absorbed = min(d, h)`
- `remainingHp = max(0, h - d)`
- `carryover = max(0, d - h)`

At a Card -> Card boundary, an eligible Diamond shield subtracts before an eligible Club doubles. At Card -> Player, the final destroyed Heart subtracts before a Spade doubles. Classic Ace and Face rules create explicit eligibility branches.

## What Is Checked

- An independent reference model checks the production combat relation across 2,355,388 declared finite cases.
- Property tests exercise legal state transitions, liveness, terminal outcomes, replay equivalence, and mutation resistance.
- Observer noninterference tests ensure players, bots, and delayed spectators cannot learn hidden hands, deck order, seeds, or private proof steps.
- Event fingerprints commit to the full replay payload, including calculation provenance.
- Production health and OpenTelemetry provide operational evidence without being confused for a gameplay proof.

## Honest Proof Boundaries

The exhaustive combat result applies to the declared two-rank competitive domain and supported historical dispatches. It does not prove balance, strategy optimality, network availability, every possible custom geometry, or future rules. Those claims require statistical or operational evidence of their own.

Implementation-grade sources:

- [Gameplay Assurance Charter](https://github.com/phalanxduel/phalanxduel/blob/main/docs/reference/gameplay-assurance.md)
- [Combat Reference Proof Boundary](https://github.com/phalanxduel/phalanxduel/blob/main/docs/quality/combat-reference-proof.md)
- [Canonical Rules](https://github.com/phalanxduel/phalanxduel/blob/main/docs/gameplay/rules.md)
- [Formal Mathematical &amp; Algorithmic Specification (Interactive Web Edition)]({{ '/learn/formal-specification/' | relative_url }})
- [Formal TLA+ Specification (`PhalanxDuelV3.tla`)](https://github.com/phalanxduel/phalanxduel/blob/main/docs/formal/PhalanxDuelV3.tla)
- [Unbounded Z3 SMT-LIB2 Proofs (`phalanx_duel_proofs.smt2` — 8/8 Q.E.D. over ℤ)](https://github.com/phalanxduel/phalanxduel/blob/main/docs/formal/phalanx_duel_proofs.smt2)
- [Formal Mathematical &amp; Algorithmic Specification (PDF)]({{ '/assets/pdf/phalanx-duel-formal-specification.pdf' | relative_url }})

## Single-Source Architecture & Assurance Diagrams

<figure>
  <img src="{{ '/assets/diagrams/authority-ledger-and-fog-of-war.svg' | relative_url }}" alt="Server-authoritative action ledger, Fog-of-War projection functor, MCP surface, and replay verification chain" loading="lazy" style="max-width: 100%; height: auto;">
  <figcaption>Server-authoritative action ledger, Fog-of-War projection boundary, and offline replay verification.</figcaption>
</figure>

<figure>
  <img src="{{ '/assets/diagrams/observability-and-truth-gate.svg' | relative_url }}" alt="Truth Gate QA assurance pyramid and OpenTelemetry to OpenObserve and Jaeger telemetry pipeline" loading="lazy" style="max-width: 100%; height: auto;">
  <figcaption>Truth Gate QA assurance stack and OpenTelemetry observability pipeline.</figcaption>
</figure>

<div class="cta-row">
  <a class="button-link primary" href="{{ '/learn/formal-specification/' | relative_url }}">Read Formal Spec (Web)</a>
  <a class="button-link" href="{{ '/tools/battle-calculator/' | relative_url }}">Explore the Combat Lab</a>
  <a class="button-link" href="{{ '/assets/pdf/phalanx-duel-formal-specification.pdf' | relative_url }}">Formal Spec (PDF)</a>
</div>
