---
type: C4 Component
title: Verify reconnect
status: stable
groma:
  id: verify-reconnect
  parent: phalanxduel-site
  code:
    - scanner: javascript
      file: bin/verify_reconnect.cjs
      symbol: main
  group: Site Verification
---

## Relationships

| Source | Target | Description | Technology |
| --- | --- | --- | --- |
| [bin/verify_reconnect.cjs](../../../../bin/verify_reconnect.cjs) | [phalanx-duel-game](../../../externals/phalanx-duel-game.md) | Verifies live match reconnect | HTTPS / WebSocket |
