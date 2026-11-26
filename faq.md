---
title: FAQ
description: Frequently asked questions about Phalanx Duel, matchmaking, deterministic combat proof, and supported clients.
---

# Frequently Asked Questions

<section class="card">
  <h2>The System</h2>
  <article>
    <h3>Is there any RNG (Luck)?</h3>
    <p>No. Phalanx Duel is 100% deterministic. If you replay a match with the same inputs, you will get the exact same outcome every time. Victory is purely tactical.</p>
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
    <p>Yes. The web client is fully responsive. We are also developing native SwiftUI and Android operatives for the most high-performance mobile experience.</p>
  </article>

  <article>
    <h3>What is the Go client?</h3>
    <p>It is our official terminal-based operative (<code>duel-cli</code>). Perfect for developers, command-line enthusiasts, or playing on lower-powered hardware.</p>
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
    <p>We are open source. Visit our <a href="{{ '/contribute/' | relative_url }}">Contribution Page</a> to learn how to help with code, design, or playtesting.</p>
  </article>
</section>
