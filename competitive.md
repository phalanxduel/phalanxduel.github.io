---
title: Competitive Play
description: "Global Glicko-2 rankings, cross-platform matchmaking, and the Phalanx Duel ladder."
---

# Competitive Play

Phalanx Duel v1.0 introduces a production-grade competitive ecosystem designed for deterministic tactical combat across all platforms.

<section class="card">
  <h2>The Global Ladder</h2>
  <p>The Phalanx Duel ladder is a unified ranking system that spans Web, CLI, and Mobile operatives. Every ranked match contributes to your global standing.</p>
  <ul class="quick-list">
    <li><strong>Glicko-2 Ratings:</strong> We use the Glicko-2 system to track player skill, rating deviation (uncertainty), and volatility.</li>
    <li><strong>Public Lobbies:</strong> Join the global matchmaking pool from any official client to find an opponent of similar skill.</li>
    <li><strong>Ranked Tiers:</strong> Progress from Novice to Champion through consistent tactical execution.</li>
  </ul>
  <p class="small-note">Current rankings are viewable in-game via the <strong>Lobby</strong> interface and are updated in real-time after every match.</p>
</section>

<section class="card">
  <h2>Matchmaking Capabilities</h2>
  <p>Our matchmaking system is designed for speed and fairness, ensuring you spend less time waiting and more time in combat.</p>
  <ul class="quick-list">
    <li><strong>Fair Engagement:</strong> The system prioritizes matches between players with similar Glicko-2 ratings.</li>
    <li><strong>Global Pool:</strong> Connect with players from around the world across different time zones.</li>
    <li><strong>Session Re-entry:</strong> If you lose your connection, the system allows you to re-enter your active match from any platform using your persistent operative ID.</li>
  </ul>
</section>

<section class="card">
  <h2>Multi-Platform Operatives</h2>
  <p>Battle from the environment that suits your tactical needs. All official clients share the same rules engine and matchmaking pool.</p>
  
  <h3>🌐 Web Client (Standard)</h3>
  <p>The primary tactical interface. Rich visuals, integrated video briefings, and full lobby management. No installation required.</p>
  <p><a href="{{ '/play/' | relative_url }}" class="cta-link">Launch Web Operative</a></p>

  <h3>💻 Go CLI SDK (Advanced)</h3>
  <p>For operatives who prefer the terminal. High-performance, low-latency combat with full session persistence. Ideal for building bots or playing in resource-constrained environments.</p>
  <p><a href="https://github.com/phalanxduel/phalanxduel/tree/main/sdk/go" target="_blank" rel="noopener noreferrer">Get the Go SDK</a></p>

  <h3>📱 Mobile Operatives (Experimental)</h3>
  <p>Take the duel on the go. Native SwiftUI and Android wrappers are currently in active development for seamless cross-platform play.</p>
</section>

<section class="card">
  <h2>Ecosystem Integrity</h2>
  <p>Competitive integrity is maintained through server-authoritative validation and ledger-backed match state.</p>
  <ul class="quick-list">
    <li><strong>Anti-Cheat:</strong> All tactical moves are validated by the server-side rules engine.</li>
    <li><strong>Transparency:</strong> Match histories are recorded in an append-only ledger for post-match analysis and verification.</li>
    <li><strong>Open Standards:</strong> Use our OpenAPI contracts and SDKs to build your own tools or clients that interface with the global ladder.</li>
  </ul>
</section>
