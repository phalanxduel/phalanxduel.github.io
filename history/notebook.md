---
title: The Design Journey
description: The origin story of Phalanx, from a rainy afternoon at Camp Tesomas to the design notebook.
---

# The Design Journey (2022)

<section class="hero" style="text-align: left; padding: 2.5rem;">
  <p>Phalanx started because it was raining. In July 2022, I was up at <strong>Camp Tesomas</strong> as an adult leader with my son's troop. A sudden storm pushed everyone into their tents. With no phone service and no distractions, I really wished I had brought my <strong>Magic: The Gathering</strong> cards for a tournament later that week. That boredom turned into a specific challenge. I wanted to see if I could capture the tactical tension of a collectible card game using only a standard deck of cards from the camp trading post.</p>

  <p>I grabbed a pen and a notebook I had packed and started writing. For the next week, that book and those cards went everywhere. I sketched formations, calculated damage chains, and convinced anyone who would listen to sit down for a match. The field testing proved the concept. The game was not just functional. It was fun. These photos show that original notebook exactly as it looked when I finally made it home.</p>
</section>

<section class="card">
  <h2>The Core Combat</h2>
  <p>The first few pages were all about defining how one card hits another. I knew I wanted deterministic subtraction. No dice. No luck. Just value against value. I needed a system where a 10 hitting a 3 felt powerful, but predictable. This led to the concept of <strong>Combat Math</strong> and overflow damage, which became the foundation of every turn.</p>
</section>

<section class="card">
  <h2>The Formation</h2>
  <p>I realized early on that a single line of cards was too simple. I needed depth. I needed a Phalanx. This led to the <strong>4x2 grid</strong>—four columns, two ranks deep. This structure created the need for rules about <strong>Column Collapse</strong> (how reserves step up) and <strong>Targeting Logic</strong> (you attack a column, not a specific card). The 4x2 grid has remained the standard battlefield ever since.</p>
</section>

<section class="card">
  <h2>The Power of Suits</h2>
  <p>Standard cards have four suits, and I needed them to mean something tactical. In the notebook, I finalized their roles:
  <ul>
    <li><strong>Diamonds</strong> became the shield, absorbing overflow damage.</li>
    <li><strong>Clubs</strong> became the weapon, doubling carryover damage to break lines.</li>
    <li><strong>Hearts</strong> became the final defense, mitigating damage to the player.</li>
    <li><strong>Spades</strong> became the finisher, doubling damage directly to Life Points.</li>
  </ul>
  These roles gave every card a distinct tactical identity beyond its number.</p>
</section>

<section class="card">
  <h2>Special Units and Determinism</h2>
  <p>To make Aces and Face cards feel special, I introduced <strong>Rank Eligibility</strong>. A 10 cannot kill a King; the attack simply stops. An Ace can only be killed by another Ace. This added a layer of rock-paper-scissors strategy to the raw math. Finally, as I playtested, I realized players could stall forever. This led to the <strong>Pass Limit</strong>, ensuring that the game always moves toward a conclusion. This commitment to <strong>determinism</strong>—removing mid-turn luck—became the guiding philosophy of Phalanx Duel.</p>
</section>

<section class="hero" style="margin-top: 4rem;">
  <h2>The Notebook Archive</h2>
  <p>Below is the complete visual record of that week at Camp Tesomas. From the first cover sketch to the final playtest logs, this is how Phalanx Duel was born.</p>
</section>

<div class="notebook-viewer">
  <figure class="notebook-page">
    <img src="{{ '/assets/history/primary/images/pen.jpg' | relative_url }}" alt="The Pen" loading="lazy">
  </figure>
  <figure class="notebook-page">
    <img src="{{ '/assets/history/primary/images/cards.jpg' | relative_url }}" alt="The Cards" loading="lazy">
  </figure>
  <figure class="notebook-page">
    <img src="{{ '/assets/history/primary/images/toolset.jpg' | relative_url }}" alt="Field Prototyping" loading="lazy">
  </figure>
  <figure class="notebook-page">
    <img src="{{ '/assets/history/primary/notebook/cover_01_front.png' | relative_url }}" alt="Notebook Cover" loading="lazy">
  </figure>
  <figure class="notebook-page">
    <img src="{{ '/assets/history/primary/notebook/page_01.png' | relative_url }}" alt="Page 01" loading="lazy">
    <figcaption>Page 01</figcaption>
  </figure>
  <figure class="notebook-page">
    <img src="{{ '/assets/history/primary/notebook/page_02.png' | relative_url }}" alt="Page 02" loading="lazy">
    <figcaption>Page 02</figcaption>
  </figure>
  <figure class="notebook-page">
    <img src="{{ '/assets/history/primary/notebook/page_03.png' | relative_url }}" alt="Page 03" loading="lazy">
    <figcaption>Page 03</figcaption>
  </figure>
  <figure class="notebook-page">
    <img src="{{ '/assets/history/primary/notebook/page_04.png' | relative_url }}" alt="Page 04" loading="lazy">
    <figcaption>Page 04</figcaption>
  </figure>
  <figure class="notebook-page">
    <img src="{{ '/assets/history/primary/notebook/page_05.png' | relative_url }}" alt="Page 05" loading="lazy">
    <figcaption>Page 05</figcaption>
  </figure>
  <figure class="notebook-page">
    <img src="{{ '/assets/history/primary/notebook/page_06.png' | relative_url }}" alt="Page 06" loading="lazy">
    <figcaption>Page 06</figcaption>
  </figure>
  <figure class="notebook-page">
    <img src="{{ '/assets/history/primary/notebook/page_07.png' | relative_url }}" alt="Page 07" loading="lazy">
    <figcaption>Page 07</figcaption>
  </figure>
  <figure class="notebook-page">
    <img src="{{ '/assets/history/primary/notebook/page_08.png' | relative_url }}" alt="Page 08" loading="lazy">
    <figcaption>Page 08</figcaption>
  </figure>
  <figure class="notebook-page">
    <img src="{{ '/assets/history/primary/notebook/page_09.png' | relative_url }}" alt="Page 09" loading="lazy">
    <figcaption>Page 09</figcaption>
  </figure>
  <figure class="notebook-page">
    <img src="{{ '/assets/history/primary/notebook/page_10.png' | relative_url }}" alt="Page 10" loading="lazy">
    <figcaption>Page 10</figcaption>
  </figure>
  <figure class="notebook-page">
    <img src="{{ '/assets/history/primary/notebook/page_11.png' | relative_url }}" alt="Page 11" loading="lazy">
    <figcaption>Page 11</figcaption>
  </figure>
  <figure class="notebook-page">
    <img src="{{ '/assets/history/primary/notebook/page_12.png' | relative_url }}" alt="Page 12" loading="lazy">
    <figcaption>Page 12</figcaption>
  </figure>
  <figure class="notebook-page">
    <img src="{{ '/assets/history/primary/notebook/page_13.png' | relative_url }}" alt="Page 13" loading="lazy">
    <figcaption>Page 13</figcaption>
  </figure>
  <figure class="notebook-page">
    <img src="{{ '/assets/history/primary/notebook/page_14.png' | relative_url }}" alt="Page 14" loading="lazy">
    <figcaption>Page 14</figcaption>
  </figure>
  <figure class="notebook-page">
    <img src="{{ '/assets/history/primary/notebook/page_15.png' | relative_url }}" alt="Page 15" loading="lazy">
    <figcaption>Page 15</figcaption>
  </figure>
  <figure class="notebook-page">
    <img src="{{ '/assets/history/primary/notebook/page_16.png' | relative_url }}" alt="Page 16" loading="lazy">
    <figcaption>Page 16</figcaption>
  </figure>
  <figure class="notebook-page">
    <img src="{{ '/assets/history/primary/notebook/page_17.png' | relative_url }}" alt="Page 17" loading="lazy">
    <figcaption>Page 17</figcaption>
  </figure>
  <figure class="notebook-page">
    <img src="{{ '/assets/history/primary/notebook/page_18.png' | relative_url }}" alt="Page 18" loading="lazy">
    <figcaption>Page 18</figcaption>
  </figure>
  <figure class="notebook-page">
    <img src="{{ '/assets/history/primary/notebook/page_19.png' | relative_url }}" alt="Page 19" loading="lazy">
    <figcaption>Page 19</figcaption>
  </figure>
  <figure class="notebook-page">
    <img src="{{ '/assets/history/primary/notebook/page_20.png' | relative_url }}" alt="Page 20" loading="lazy">
    <figcaption>Page 20</figcaption>
  </figure>
  <figure class="notebook-page">
    <img src="{{ '/assets/history/primary/notebook/page_21.png' | relative_url }}" alt="Page 21" loading="lazy">
    <figcaption>Page 21</figcaption>
  </figure>
  <figure class="notebook-page">
    <img src="{{ '/assets/history/primary/notebook/page_22.png' | relative_url }}" alt="Page 22" loading="lazy">
    <figcaption>Page 22</figcaption>
  </figure>
  <figure class="notebook-page">
    <img src="{{ '/assets/history/primary/notebook/page_23.png' | relative_url }}" alt="Page 23" loading="lazy">
    <figcaption>Page 23</figcaption>
  </figure>
  <figure class="notebook-page">
    <img src="{{ '/assets/history/primary/notebook/page_24.png' | relative_url }}" alt="Page 24" loading="lazy">
    <figcaption>Page 24</figcaption>
  </figure>
  <figure class="notebook-page">
    <img src="{{ '/assets/history/primary/notebook/page_25.png' | relative_url }}" alt="Page 25" loading="lazy">
    <figcaption>Page 25</figcaption>
  </figure>
  <figure class="notebook-page">
    <img src="{{ '/assets/history/primary/notebook/page_26.png' | relative_url }}" alt="Page 26" loading="lazy">
    <figcaption>Page 26</figcaption>
  </figure>
  <figure class="notebook-page">
    <img src="{{ '/assets/history/primary/notebook/cover_02_back.png' | relative_url }}" alt="Back Cover" loading="lazy">
  </figure>
</div>

<style>
.notebook-viewer {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  align-items: center;
  max-width: 900px;
  margin: 2rem auto;
}

.notebook-page {
  margin: 0;
  width: 100%;
  border: 1px solid var(--border);
  border-bottom: 4px solid var(--border-up);
  border-radius: 4px;
  overflow: hidden;
  background: var(--surface);
  box-shadow: 0 16px 48px rgba(0,0,0,0.6);
  transition: transform var(--transition-med), border-color var(--transition-med);
}

.notebook-page:hover {
  transform: translateY(-4px) scale(1.01);
  border-color: var(--gold-dim);
}

.notebook-page img {
  display: block;
  width: 100%;
  height: auto;
  cursor: pointer;
}

.notebook-page figcaption {
  padding: 1rem 1.5rem;
  background: var(--surface-up);
  color: var(--muted);
  font-family: var(--font-display);
  font-size: 0.9rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border-top: 1px solid var(--border);
  text-align: center;
  line-height: 1.5;
}
</style>

<div class="cta-row" style="justify-content: center; margin-top: 5rem;">
  <a class="button-link" href="{{ '/history/' | relative_url }}">&larr; Back to Timeline</a>
  <a class="button-link primary" href="https://play.phalanxduel.com" target="_blank" rel="noopener noreferrer">Play Phalanx Online &rarr;</a>
</div>
