---
title: History
description: "How Phalanx: Duel evolved from notebook sketches to modern digital and tabletop rules."
---

# History

<section class="card">
  <h2>Evolution Timeline</h2>
  <ul class="quick-list">
    <li><strong>July 9, 2022:</strong> Initial physical concepts and notebook design work began.</li>
    <li><strong>July 11, 2022:</strong> Project renamed from <em>Panoplia</em> to <strong>Phalanx: Duel</strong>.</li>
    <li><strong>July-August 2022:</strong> Legacy Ruby implementation explored combat logic and test-driven behavior.</li>
    <li><strong>February 2026:</strong> Modern TypeScript engine established with real-time multiplayer support.</li>
    <li><strong>April 27, 2026:</strong> <strong>v1.0.0 Stable Release.</strong> Global matchmaking, state persistence, and legal hardening.</li>
    <li><strong>July 22, 2026:</strong> <strong>v1.5.0.</strong> The engine gained explainable combat mathematics, independent assurance checks, replay/liveness evidence, and a stronger tactical bot.</li>
    <li><strong>August 2026:</strong> The project entered a maintenance and presentation phase: production remains the canonical runtime while the local harness can record complete, narrated games for teaching and demonstration.</li>
  </ul>
</section>

<section class="card">
  <h2>From Game Idea to Living System</h2>
  <p>The history is also a history of changing the medium. The Camp Tesomas notebook established the physical language: formations, four suit roles, and damage that could travel through a line. Friendly tabletop matches made those rules playable. The Ruby implementation turned the notebook into an executable experiment, where combat behavior could be tested and revised.</p>
  <p>The current TypeScript system carries that same idea into a server-authoritative virtual tabletop. A web client, bot opponents, Go terminal client, persistent action ledger, replay checks, and OpenTelemetry diagnostics all consume the same deterministic state transitions. The result is not merely a digital adaptation: it is a continuously testable record of the original tabletop design.</p>
  <p>For the artifact trail behind this narrative, see the <a href="https://github.com/phalanxduel/wiki/blob/master/Project-Timeline-and-Continuity.md">cross-repository project timeline</a>.</p>
</section>

<section class="hero">
  <h2>The Design Journey</h2>
  <p>Explore the complete sequential history of Phalanx: Duel. This immersive viewer follows the project from the first tabletop card layouts to the final 28-page design notebook.</p>
  <div class="cta-row">
    <a class="button-link primary" href="{{ '/history/notebook/' | relative_url }}">View Design Journey (32 Images) &rarr;</a>
  </div>
</section>

<section class="card">
  <h2>Archived Technical Artifacts</h2>
  <p>To preserve implementation history, selected source artifacts are maintained as historical references:</p>
  <ul class="quick-list">
    <li><code>assets/history/primary/resources/</code> (Early scratch/resource files)</li>
    <li><code>assets/history/legacy/code/</code> (Legacy Ruby combat and spec files)</li>
  </ul>
  <p class="small-note">Note: These archives represent previous iterations and may not reflect current v1 rules.</p>
</section>
