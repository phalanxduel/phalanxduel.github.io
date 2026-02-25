---
title: Phalanx
description: Phalanx is an open tactical card system for competitive and cooperative play.
---
{% assign homepage_data = site.data.homepage %}
{% assign variant_key = homepage_data.active_variant | default: "current" %}
{% assign hp = homepage_data.variants[variant_key] %}

<div class="homepage homepage--{{ variant_key | replace: '_', '-' }}">
  {% for section in hp.sections %}
    {% include home/render-section.html section=section %}
  {% endfor %}
</div>
