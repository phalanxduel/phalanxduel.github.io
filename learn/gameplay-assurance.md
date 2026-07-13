---
title: Gameplay Assurance
description: "How Phalanx Duel v1.4.0 makes deterministic combat explainable, independently checkable, and replay-verifiable."
---

# Gameplay Assurance

Phalanx Duel v1.4.0 treats correctness as a chain: a versioned rule, an authoritative implementation, and evidence that can be inspected independently. Determinism means identical inputs produce identical outputs; it does not, by itself, prove that the rule is correct.

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

<div class="cta-row">
  <a class="button-link primary" href="{{ '/tools/battle-calculator/' | relative_url }}">Explore the Combat Lab</a>
  <a class="button-link" href="{{ '/technical-details/' | relative_url }}">Technical Details</a>
</div>
