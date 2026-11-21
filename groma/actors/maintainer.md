---
type: C4 Actor
title: Maintainer
description: Site maintainer validating and publishing updates
status: stable
groma:
  id: maintainer
---

Authors content, runs Jekyll/RSpec/Playwright validation, and publishes releases via GitHub Pages.

## Relationships

| Source | Target | Description | Technology |
| --- | --- | --- | --- |
| [maintainer](maintainer.md) | [bin/smoke_playwright.cjs](../../bin/smoke_playwright.cjs) | Runs pre-deploy smoke checks | CLI / Playwright |
