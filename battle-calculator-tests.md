---
title: Battle Calculator Tests
description: In-browser unit test criteria and pass/fail results for the battle calculator.
qunit: true
---

## Battle Calculator Unit Tests

<section class="card">
  <h2>Test Runner</h2>
  <p>This page runs unit tests against the same pure battle resolver used by the calculator.</p>
  <ul class="quick-list">
    <li><strong>Common scenarios:</strong> expected battle flows and known suit interactions.</li>
    <li><strong>Edge cases:</strong> low/high damage bounds, empty slots, and clamp behavior.</li>
    <li><strong>Mode contrast checks:</strong> explicit pass/fail assertions that the Historical Prototype and deployed v1.4.0 / rules v3.0 relation produce different outputs at versioned boundaries.</li>
    <li><strong>Permutations:</strong> mode, suit, and defender-slot combinations.</li>
  </ul>
  <p><a href="{{ '/tools/battle-calculator/' | relative_url }}">Back to Battle Calculator</a></p>
</section>

<div id="qunit"></div>
<div id="qunit-fixture"></div>
