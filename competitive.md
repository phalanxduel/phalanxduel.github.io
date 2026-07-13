---
title: Competitive Play
description: "Phalanx Duel v1.4.0 global ladder, Glicko-2 ratings, and tournament ecosystem."
---

# Competitive Play (The Ladder)

Phalanx Duel v1.4.0 runs a production competitive ecosystem designed for deterministic tactical combat across supported clients. The **Ladder and Matchmaking system remains Beta** while population and balance evidence grows.

<section class="card">
  <h2>1. Global Rankings (Glicko-2)</h2>
  <p>Every match you play in a public lobby contributes to your global rating. We use the Glicko-2 system to ensure that your rank accurately reflects your tactical proficiency.</p>
  <ul class="quick-list">
    <li><strong>Rating:</strong> Your core tactical score.</li>
    <li><strong>Volatility:</strong> Tracking the consistency of your performance.</li>
    <li><strong>Rating Deviation (RD):</strong> Ensuring your rank is current and active.</li>
  </ul>
  <p><a href="{{ '/play/' | relative_url }}">Enter the Lobby &rarr;</a></p>
</section>

<section class="card">
  <h2>2. In-Game Briefings</h2>
  <p>Phalanx Duel v1.4.0 combines high-fidelity briefings with engine-authored combat narration and arithmetic proof, providing phase-specific intelligence without asking the client to rederive outcomes.</p>
  <p><a href="{{ '/learn/getting-started/' | relative_url }}">Launch Tactical Briefings</a></p>
</section>

<section class="card">
  <h2>3. Cross-Platform Operatives</h2>
  <p>The ladder is unified. Whether you are playing via the **Command Line (Go SDK)**, the **Web Terminal**, or the **Mobile Operative**, your rating follows your account. A master of the terminal is a master of the web.</p>
</section>

<section class="card">
  <h2>4. Fair Play & Integrity</h2>
  <p>Because Phalanx Duel is 100% deterministic, every match can be replay-verified. We maintain an append-only action ledger for every ranked duel, ensuring the absolute integrity of the global ladder.</p>
</section>

<div class="cta-row" style="margin-top: 4rem;">
  <a class="button-link primary" href="{{ '/play/' | relative_url }}">Join the Ladder</a>
  <a class="button-link" href="{{ '/status/' | relative_url }}">System Status</a>
</div>
