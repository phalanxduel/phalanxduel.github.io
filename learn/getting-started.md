---
title: Getting Started
description: "Learn Phalanx Duel in five minutes: the 4x2 grid, the damage cascade, and the four suits. Play free in your browser or with a standard 52-card deck."
---

# Getting Started with Phalanx Duel

Phalanx Duel is a two-player tactical card game with **no randomness in combat**. Every attack resolves by fixed arithmetic, so you can predict a strike before you make it. Play free in your browser, or at a table with a standard 52-card deck.

<div class="cta-row">
  <a class="button-link primary" href="{{ '/play/' | relative_url }}">Play Now (No Signup)</a>
  <a class="button-link" href="{{ '/learn/first-match/' | relative_url }}">First Match Walkthrough</a>
  <a class="button-link" href="{{ '/assets/pdf/phalanx-duel-face-to-face-quickstart.pdf' | relative_url }}">Tabletop Quickstart (PDF)</a>
</div>

{% assign first_ep = site.data.tutorials.seasons[0].episodes[0] %}
{% if first_ep.youtube_id != "" %}

## Watch First (about 25 seconds)

<p>
  <a href="https://youtu.be/{{ first_ep.youtube_id }}" target="_blank" rel="noopener noreferrer">
    <img src="https://i.ytimg.com/vi/{{ first_ep.youtube_id }}/hqdefault.jpg" alt="Video: {{ first_ep.title }}" loading="lazy" width="480" height="360" style="max-width: 100%; height: auto; border: 1px solid var(--color-border-up);">
  </a>
</p>
<p class="small-note">{{ first_ep.title }}: {{ first_ep.summary }} More in the <a href="{{ '/learn/tutorials/' | relative_url }}">{{ site.data.tutorials.total_episodes }}-episode video series</a>.</p>
{% endif %}

## What You Need

- **Online:** a browser. Choose **Quick Start** to play a practice match against a bot immediately.
- **Tabletop:** one standard 52-card deck. Each player gets 12 cards and deploys 8 of them into a 4x2 formation. Use the [printable quickstart and suit cards]({{ '/learn/rules/' | relative_url }}) and the [Combat Lab]({{ '/tools/battle-calculator/' | relative_url }}) to check any tricky exchange.

## The Three Rules That Matter

### 1. The grid is the strategy

You build a **4x2 formation**: four columns, each with a front card and a back card.

- **Front rank:** the only cards that attack. They also take the first hit.
- **Back rank:** the second line of defense for that column.
- **Life Points (LP):** the final target. A column that falls opens a path to you.

### 2. Damage cascades

1. Select a front-rank attacker and a target **column**. You target a lane, not a single card.
2. The attack's value is compared with the front defender. If the defender survives, the attack stops.
3. If the defender is destroyed, the leftover damage ("carryover") continues to the back card.
4. If the back card is also destroyed, the remaining carryover hits the opponent's Life Points.

Surviving cards are not permanently worn down in Classic mode; they return to full strength next turn.

### 3. Suits fire at specific boundaries

Suits are timing rules, not passive bonuses. Each one triggers only at the boundary it names.

| Suit | Role | When it fires |
| ---- | ---- | ------------- |
| ♦ Diamonds | Shield | A destroyed Diamond subtracts its own value from carryover headed to the next card. |
| ♥ Hearts | Shield | If a Heart is the last card destroyed before Life Points, its value is subtracted from carryover. Hearts do not stack. |
| ♣ Clubs | Weapon | A Club attacker doubles its carryover once, the first time it passes from one card to another. |
| ♠ Spades | Weapon | A Spade attacker doubles carryover the moment it passes into Life Points. |

Aces and face cards have extra eligibility limits. See the [Rules Summary]({{ '/learn/rules/' | relative_url }}) for the full summary, and note that the versioned rules document in the game repository is the normative authority.

## Learn the Interface

The game client does not interrupt you with pop-up tutorials. Instead:

- Selecting an attacker previews the target lane before you commit.
- The **engagement log** records every attack. Open **Analyst** to see the subtraction step by step, including which suit rules fired.
- Use the **Help** control in the game to reopen the phase-by-phase guide at any time.
- Open **Settings** for card backs, account options, and display preferences.

## Where to Go Next

1. [Play your first match]({{ '/play/' | relative_url }}) against a bot.
2. Read the [First Match Walkthrough]({{ '/learn/first-match/' | relative_url }}) for a worked cascade example.
3. Work through the [video tutorials]({{ '/learn/tutorials/' | relative_url }}) in order, starting with Season 1.
4. Go deeper with [Tactical Depth]({{ '/learn/tactical-depth/' | relative_url }}) and [Road to Champion]({{ '/improve/road-to-champion/' | relative_url }}).

<p class="small-note">Phalanx Duel v{{ site.data.meta.version }}, rules spec v3.0.</p>
