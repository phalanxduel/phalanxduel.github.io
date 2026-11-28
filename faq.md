---
title: FAQ
description: Frequently asked questions about Phalanx Duel, matchmaking, deterministic combat proof, and supported clients.
---

# Frequently Asked Questions

<section class="card">
  <h2>The Basics</h2>
  <article>
    <h3>Is there any luck in combat?</h3>
    <p>No. Every attack resolves by fixed arithmetic. If you replay a match with the same setup and the same moves, it ends the same way every time.</p>
  </article>

  <article>
    <h3>How does matchmaking work?</h3>
    <p>Phalanx Duel v{{ site.data.meta.version }} uses Elo and Glicko-2 ratings across four ladder categories (PvP, Easy, Medium, and Expert MCTS). Matchmaking remains Beta while the player population and balance evidence grow.</p>
  </article>

  <article>
    <h3>Are there Jokers?</h3>
    <p>No. Jokers are excluded from the v{{ site.data.meta.version }} competitive rules. Optional expansion concepts remain outside the proved 52-card domain.</p>
  </article>
</section>

<section class="card">
  <h2>Platforms</h2>
  <article>
    <h3>Can I play on my phone?</h3>
    <p>Yes. The web client is fully responsive. Native SwiftUI and Android clients are in development.</p>
  </article>

  <article>
    <h3>What is the Go client?</h3>
    <p>It is the official terminal client (<code>duel-cli</code>). It suits developers, command-line fans, and lower-powered hardware.</p>
  </article>
</section>

<section class="card">
  <h2>Development</h2>
  <article>
    <h3>Is the engine stable?</h3>
    <p><strong>v{{ site.data.meta.version }} Stable (Production).</strong> The deployed engine is versioned, replay-verifiable, and independently checked over its declared combat domain.</p>
  </article>

  <article>
    <h3>How can I contribute?</h3>
    <p>Phalanx Duel is open source. Visit the <a href="{{ '/contribute/' | relative_url }}">Contribution Page</a> to see how to help with code, design, docs, or playtesting.</p>
  </article>
</section>
