---
title: Changelog
permalink: /CHANGELOG/
---

# Changelog

## [1.5.0] - 2026-07-22

### Added

- Documented the explainable combat, independent assurance, replay/liveness evidence, and stronger deterministic bot introduced by the current game release line.
- Linked the public history narrative to the cross-repository continuity record.

## [1.4.0] - 2026-07-13

### Changed

- Synchronized public status, rules, lifecycle, roadmap, and release language with the deployed Phalanx Duel v1.4.0 build and competitive rules spec v3.0.
- Updated the Combat Lab to corrected v3.0 Club and Diamond boundary scope while preserving historical mode identifiers as compatibility aliases.
- Added player-readable combat formulas, calculation-provenance context, and scientific assurance boundaries.
- Removed staging as a supported public environment; production is the canonical deployment target.

All notable changes to the Phalanx Duel website and simulation engine will be documented in this file.

## [1.1.0] - 2026-05-08

### Added
- **Tutorial Progression Engine**: Introduced `PedagogicalAdapter` and `ProgressionManager` to support multi-stage learning (Foundations -> Tactics -> Mastery).
- **Canonical Asset Registry**: Centralized asset management in `_data/assets.yml` with support for metadata, multiple media types, and status tracking.
- **High-Fidelity Visuals**: Integrated ray-traced `.webm` video assets for key tutorial phases and a cinematic hero breach.
- **Mastery Dashboard**: New analytical metrics in the Combat Lab, including Damage Efficiency (LP/Atk) and Ace Protection stability analysis.
- **Spectator Mode Roadmap**: Architected the foundation for real-time match observation.
- **GitHub Integration**: Added stylized `[ Source ]` link to header for improved open-source discoverability and issue reporting.

### Changed
- **Modularized Engine**: Refactored `battle-resolver.js` into a modern ES module with full testability in Node/Vitest environments.
- **Modernized Infrastructure**: Upgraded to Jekyll 4 and refined `bin/server` for improved stability and LiveReload performance.
- **UI/Logic Decoupling**: Extracted `SimulationPresenter` to separate raw simulation data from DOM rendering.

### Fixed
- **A11y/Contrast**: Resolved color contrast failures in the final CTA and secondary buttons to meet WCAG AA standards.
- **CSS Variables**: Added missing `--color-muted` and other semantic aliases required by the a11y contract.
- **GHA Stability**: Fixed homepage tests that were failing due to structural layout changes.

## [1.0.0] - 2026-04-27

### Added
- Initial stable release of the Phalanx Duel website.
- Core deterministic combat simulator (Combat Lab).
- Foundation rules documentation and getting started guides.
- GHA pipeline for validation and automated deployment.

---

*Revision: 1 | Build: 110*
