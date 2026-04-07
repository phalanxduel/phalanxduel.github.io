---
title: Playtesting and Feedback
description: "How to run a playtest and submit actionable feedback."
---

# Playtesting and Feedback

The most valuable contribution you can make without writing code is providing structured, actionable feedback from real matches.

## How to Playtest

1.  **Play with intent:** Don't just play to win. Play to test edge cases. Try weird suit combinations. Try passing multiple times to see how the system handles the limit.
2.  **Note the friction:** When did the UI confuse you? When did the rules feel ambiguous? When did a combat outcome surprise you?
3.  **Capture the state:** If a bug occurs, write down the exact board state (Attacker suit/value, Defender suits/values, current LP).

## Submitting Feedback

We use GitHub Issues to track all feedback and bugs.

*   **For Bugs:** Use the [Bug Report Template](https://github.com/phalanxduel/game/issues/new?template=bug_report.yml). Be as specific as possible about the board state and what you expected to happen versus what actually happened.
*   **For Balance/Mechanics:** Use the [Balance Proposal Template](https://github.com/phalanxduel/game/issues/new?template=balance_proposal.yml). Do not just say "Spades are too strong." Explain *why*, provide an example from a match, and suggest a specific mathematical or timing change.

Your feedback ensures the canonical rules remain fair, deep, and deterministic.
