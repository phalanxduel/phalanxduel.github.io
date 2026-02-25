# Task: Enable `play.phalanxduel.com` Homepage Iframe Embed

## Goal
Allow `phalanxduel.com` (this marketing/docs site) to embed a playable Phalanx Duel experience from `https://play.phalanxduel.com` in an `<iframe>` on the homepage.

This task is for the **other project** (the app served at `play.phalanxduel.com`).

## Why This Matters
- Visitors should understand what the game is and what happens when they click `Create Match`.
- Embedding the game reduces friction (no cross-domain click before first interaction).
- The homepage strategy now includes an embed-first variant (`embed_conversion_v1`) that is ready to render an iframe once the app allows it.

## Current State (in this repo)
- Homepage content is data-driven in `_data/homepage.yml`.
- A new variant `embed_conversion_v1` includes an iframe section pointing to `https://play.phalanxduel.com`.
- Homepage templates render iframe attributes (`sandbox`, `referrerpolicy`, `allow`) and responsive embed styling.
- The remaining blocker is enabling embed support on the app subdomain.

## Scope (other project: `play.phalanxduel.com`)
Implement iframe support safely for embedding from `https://phalanxduel.com`.

## Requirements

### 1. Allow Framing by `https://phalanxduel.com`
The app must allow being framed by the parent site.

Required behavior:
- `Content-Security-Policy` includes `frame-ancestors https://phalanxduel.com`
- If preview/staging is needed, optionally also allow:
  - `https://www.phalanxduel.com` (if used)
  - local dev hosts used for testing (explicitly, not wildcard)

Do **not** rely on `X-Frame-Options: SAMEORIGIN` for this use case.
- `SAMEORIGIN` will block `phalanxduel.com` -> `play.phalanxduel.com` framing.
- If `X-Frame-Options` is present, it must not conflict with the CSP `frame-ancestors` policy.

### 2. Support an Embed-Friendly Entry Route (Recommended)
Provide a dedicated route for embedding, e.g.:
- `https://play.phalanxduel.com/embed`

Recommended route behavior:
- Optimized for first-time visitors creating/joining a match
- Minimal chrome/navigation (focus on `Create Match` flow)
- Safe defaults for mobile viewport sizing
- Preserves the same create/share/join functionality as the full app

If a dedicated route is not created, the root route must still embed cleanly and not break inside an iframe.

### 3. Iframe Compatibility (Runtime)
The embedded app should function inside an iframe without requiring top-level navigation for core flow:
- Enter name
- Create match
- Generate player link + spectator link
- Friend can join via shared link (outside iframe is acceptable)

If the app intentionally opens links in new tabs/windows (for share flows), behavior should remain clear and not trap the user.

### 4. Authentication / Session / Cookie Behavior
If cookies or storage are used for player/session state:
- Verify the create-match flow works in an iframe context on current target browsers.
- Do not assume third-party cookie behavior if the app depends on cross-site cookies.

Preferred:
- Core guest flow works without requiring cross-site cookie persistence.

### 5. Embed Security Posture
Document which browser capabilities the embed actually needs so the homepage iframe `sandbox` can be minimized.

Current homepage sandbox proposal (in this repo):
- `allow-scripts allow-same-origin allow-forms allow-popups allow-downloads`

The app project should confirm:
- Which flags are required
- Which flags can be removed
- Whether `allow-popups` is actually needed

### 6. Optional (Recommended): Parent/Child Messaging Contract
Define a minimal `postMessage` contract for better homepage UX.

Examples:
- child -> parent: `phalanx.embed.ready`
- child -> parent: `phalanx.match.created`
- child -> parent: `phalanx.embed.resize` (if dynamic height is needed)
- child -> parent: `phalanx.error`

This is not required for initial launch, but it will improve analytics and UX polish.

## Acceptance Criteria (other project)
- `https://play.phalanxduel.com` (or `/embed`) loads inside an iframe on `https://phalanxduel.com` without browser frame-policy errors.
- Create Match flow works from inside iframe:
  - enter name
  - create match
  - player link generated
  - spectator link generated (if feature enabled)
- No blocking console errors related to:
  - `X-Frame-Options`
  - CSP `frame-ancestors`
  - iframe-restricted APIs required by core flow
- Mobile viewport is usable inside iframe (no impossible-to-use clipped UI)
- Security review confirms framing is restricted to approved parent origin(s), not wildcard origins.

## Deliverables From Other Project (handoff back to this repo)
Please provide all of the following when this task is completed:
- The exact iframe URL to use (root or `/embed`)
- Confirmed required iframe sandbox flags
- Confirmed `referrerpolicy` preference (if app has a requirement)
- Any known limitations in iframe mode (e.g. popups, auth, share flow behavior)
- Screenshot(s) of embedded app on desktop and mobile
- Confirmation of headers/policies applied (`frame-ancestors`, `X-Frame-Options` behavior)

## Resume Work in This Repo (`phalanxduel.com` site)
After the app project is ready, resume here to complete homepage embed launch:

1. Set `_data/homepage.yml` `active_variant` to `embed_conversion_v1` (or create `embed_conversion_v2`)
2. Update the iframe `src` in `_data/homepage.yml` to the final embed URL (e.g. `/embed`)
3. Tighten iframe `sandbox` flags in `_data/homepage.yml` to the confirmed minimum
4. Verify copy and CTAs match actual embed behavior (`Create Match`, join flow, spectator link availability)
5. Add analytics instrumentation for:
   - `Create Match` CTA clicks
   - iframe section visibility
   - outbound `Open Full App` clicks
6. Test homepage on desktop + mobile
7. Ship

## Notes for I18n / Translation Readiness
This site now keeps homepage copy in `_data/homepage.yml` to prepare for internationalization.

When finalizing iframe-related text, keep strings:
- short and literal
- behavior-accurate (especially create/share/join flow)
- free of embedded HTML where possible

This will make translation extraction and locale variants easier later.
