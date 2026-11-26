---
title: Video Tutorials & Masterclass Series
description: "Watch the 33-episode Phalanx Duel video series — 16 quick-start Shorts and 17 deep-dive guides covering gameplay, suits, tournaments, architecture, and contributing with full searchable transcripts."
---

# Video Tutorials &amp; Masterclass Series

<p class="small-note">
  {{ site.data.tutorials.total_episodes }} episodes across {{ site.data.tutorials.seasons | size }} seasons - {{ site.data.tutorials.shorts_count }} quick-start Shorts (9:16) and {{ site.data.tutorials.longform_count }} deep-dive guides (16:9). Every episode includes a complete searchable transcript and companion guide, published to the <a href="https://www.youtube.com/playlist?list=PLHenvAZhJjHo" target="_blank" rel="noopener noreferrer">official Phalanx Duel YouTube playlist</a> on <a href="https://www.youtube.com/@just3ws-mike" target="_blank" rel="noopener noreferrer">@just3ws-mike</a>.
</p>

<section class="card" aria-labelledby="series-overview-heading">
  <h2 id="series-overview-heading">Series Overview</h2>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin: 1.25rem 0;">
    <div style="border: 1px solid var(--color-border); background: var(--color-surface); padding: 1rem;">
      <div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--color-text-muted); text-transform: uppercase;">Episodes</div>
      <div style="font-family: var(--font-display); font-size: 2rem; font-weight: 900; color: var(--color-gold);">{{ site.data.tutorials.total_episodes }}</div>
    </div>
    <div style="border: 1px solid var(--color-border); background: var(--color-surface); padding: 1rem;">
      <div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--color-text-muted); text-transform: uppercase;">Quick-Start Shorts</div>
      <div style="font-family: var(--font-display); font-size: 2rem; font-weight: 900; color: var(--color-offense);">{{ site.data.tutorials.shorts_count }}</div>
    </div>
    <div style="border: 1px solid var(--color-border); background: var(--color-surface); padding: 1rem;">
      <div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--color-text-muted); text-transform: uppercase;">Deep-Dive Guides</div>
      <div style="font-family: var(--font-display); font-size: 2rem; font-weight: 900; color: var(--color-text);">{{ site.data.tutorials.longform_count }}</div>
    </div>
    <div style="border: 1px solid var(--color-border); background: var(--color-surface); padding: 1rem;">
      <div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--color-text-muted); text-transform: uppercase;">Transcripts</div>
      <div style="font-family: var(--font-display); font-size: 2rem; font-weight: 900; color: var(--color-gold);">100%</div>
    </div>
  </div>
  <nav aria-label="Jump to season" style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1rem;">
    {% for season in site.data.tutorials.seasons %}
    <a href="#{{ season.slug }}" style="font-family: var(--font-mono); font-size: 0.75rem; border: 1px solid var(--color-border-up); padding: 0.35rem 0.75rem; text-decoration: none;">S{{ season.number }}</a>
    {% endfor %}
  </nav>
  <div role="group" aria-label="Filter episodes by format" style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1rem;">
    <button type="button" class="tutorial-filter-btn" data-filter="all" aria-pressed="true" style="font-family: var(--font-mono); font-size: 0.75rem; font-weight: 700; padding: 0.4rem 0.85rem; background: var(--color-gold); color: #000; border: 1px solid var(--color-gold); cursor: pointer;">All ({{ site.data.tutorials.total_episodes }})</button>
    <button type="button" class="tutorial-filter-btn" data-filter="9:16" aria-pressed="false" style="font-family: var(--font-mono); font-size: 0.75rem; padding: 0.4rem 0.85rem; background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border-up); cursor: pointer;">Shorts 9:16 ({{ site.data.tutorials.shorts_count }})</button>
    <button type="button" class="tutorial-filter-btn" data-filter="16:9" aria-pressed="false" style="font-family: var(--font-mono); font-size: 0.75rem; padding: 0.4rem 0.85rem; background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border-up); cursor: pointer;">Deep Dives 16:9 ({{ site.data.tutorials.longform_count }})</button>
  </div>
</section>

{% for season in site.data.tutorials.seasons %}
<section id="{{ season.slug }}" class="card" aria-labelledby="heading-{{ season.slug }}" style="margin-top: 2rem;">
  <h2 id="heading-{{ season.slug }}">{{ season.name }}</h2>
  <p class="small-note">{{ season.description }}</p>

  <div style="display: grid; gap: 1.25rem; margin-top: 1.25rem;">
    {% for ep in season.episodes %}
    <article class="tutorial-episode" data-format="{{ ep.format }}" style="border: 1px solid var(--color-border); background: var(--color-surface); padding: 1.25rem;">
      <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: baseline; gap: 0.5rem; margin-bottom: 0.5rem;">
        <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--color-gold); text-transform: uppercase;">Episode {{ ep.episode_number }} &middot; {{ ep.format_label }} &middot; {{ ep.duration_label }}</span>
        {% if ep.youtube_id != "" %}
        <span style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--color-offense); border: 1px solid var(--color-offense); padding: 0.15rem 0.5rem;">ON YOUTUBE</span>
        {% else %}
        <span style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--color-text-muted); border: 1px solid var(--color-border-up); padding: 0.15rem 0.5rem;">QUEUED FOR PUBLICATION</span>
        {% endif %}
      </div>

      <h3 style="margin-bottom: 0.5rem; font-size: 1.2rem;">{{ ep.title }}</h3>
      <p style="margin-top: 0; color: var(--color-text-muted);">{{ ep.summary }}</p>

      {% if ep.youtube_id != "" %}
      <div class="yt-facade" data-youtube-id="{{ ep.youtube_id }}" data-title="{{ ep.title | escape }}" style="position: relative; aspect-ratio: 16 / 9; max-width: 640px; margin: 1rem 0; background: #000; border: 1px solid var(--color-border-up); overflow: hidden;">
        <button type="button" class="yt-facade-play" aria-label="Play video: {{ ep.title | escape }}" style="width: 100%; height: 100%; border: 0; padding: 0; cursor: pointer; background: transparent; position: relative; display: flex; align-items: center; justify-content: center;">
          <img src="https://i.ytimg.com/vi/{{ ep.youtube_id }}/hqdefault.jpg" alt="{{ ep.title | escape }}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.85;">
          <span style="position: absolute; background: rgba(0, 122, 255, 0.9); color: #fff; font-family: var(--font-mono); font-size: 0.8rem; font-weight: 700; padding: 0.6rem 1.1rem; letter-spacing: 0.08em;">PLAY VIDEO</span>
        </button>
      </div>
      {% endif %}

      <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; margin-top: 0.75rem; font-family: var(--font-mono); font-size: 0.78rem;">
        {% if ep.companion_url != "" %}
        <a href="{{ ep.companion_url | relative_url }}">Companion Guide &rarr;</a>
        {% endif %}
        <a href="{{ '/play/' | relative_url }}">Try It Live &rarr;</a>
      </div>

      {% if ep.transcript and ep.transcript.size > 0 %}
      <details style="margin-top: 1rem; border-top: 1px solid var(--color-border); padding-top: 0.75rem;">
        <summary style="cursor: pointer; font-family: var(--font-mono); font-size: 0.78rem; color: var(--color-offense);">Read Full Transcript ({{ ep.transcript.size }} segments)</summary>
        <div style="margin-top: 0.75rem; font-size: 0.92rem; line-height: 1.65; color: var(--color-text);">
          {% for segment in ep.transcript %}
          <p style="margin: 0.45rem 0;">{{ segment }}</p>
          {% endfor %}
        </div>
      </details>
      {% endif %}
    </article>
    {% endfor %}
  </div>
</section>
{% endfor %}

<section class="card" style="margin-top: 2rem;">
  <h2>Continue Learning</h2>
  <p>Pair these tutorials with the <a href="{{ '/tools/battle-calculator/' | relative_url }}">Interactive Combat Lab</a>, the <a href="{{ '/library/' | relative_url }}">Architecture &amp; Visual Library</a>, the <a href="{{ '/library/architecture/' | relative_url }}">Interactive C4 Architecture Map</a>, or jump directly into a training match at <a href="{{ '/play/' | relative_url }}">play.phalanxduel.com</a>.</p>
</section>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    var buttons = document.querySelectorAll('.tutorial-filter-btn');
    var episodes = document.querySelectorAll('.tutorial-episode');

    buttons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var filter = btn.getAttribute('data-filter');
        buttons.forEach(function(b) {
          var active = b === btn;
          b.setAttribute('aria-pressed', String(active));
          b.style.background = active ? 'var(--color-gold)' : 'var(--color-surface)';
          b.style.borderColor = active ? 'var(--color-gold)' : 'var(--color-border-up)';
          b.style.color = active ? '#000' : 'var(--color-text)';
          b.style.fontWeight = active ? '700' : '400';
        });
        episodes.forEach(function(ep) {
          var match = filter === 'all' || ep.getAttribute('data-format') === filter;
          ep.style.display = match ? '' : 'none';
        });
      });
    });

    document.querySelectorAll('.yt-facade-play').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var container = btn.closest('.yt-facade');
        var id = container && container.getAttribute('data-youtube-id');
        var title = (container && container.getAttribute('data-title')) || 'Phalanx Duel Tutorial';
        if (!id) return;
        var iframe = document.createElement('iframe');
        iframe.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) + '?autoplay=1&rel=0';
        iframe.title = title;
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = '0';
        container.innerHTML = '';
        container.appendChild(iframe);
      });
    });
  });
</script>
