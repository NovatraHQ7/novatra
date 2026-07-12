# Auth Screens Redesign — Design Spec

**Date:** 2026-07-12
**Scope:** `apps/web/src/app/(auth)/auth/**` (layout + sign-in, sign-up, forgot-password, reset-password pages). No color/token changes, no changes to form fields, validation, or submit behavior — this is a structural/visual redesign only.

## Goal

Replace the current single narrow centered card (same shape on all 4 auth pages) with a full-height **split layout**: a left "brand panel" carrying page-specific visual/emotional content, and a right panel with the plain form. Reuses the landing page's animated flow-line motif and quote-preview visual language so auth feels like part of the same product rather than a bolted-on login modal.

## Shared Shell (`AuthShell` component)

New component: `apps/web/src/components/auth/auth-shell.tsx`, used by all 4 auth pages (replacing the current `AuthLayout` + `Card` wrapper approach).

- **Desktop (`lg:` and up):** two-column flex layout, full viewport height.
  - **Left brand panel** (`bg-surface`, roughly 45% width): contains, top to bottom:
    - Logo block (icon-box + "Novatra" wordmark + "Borderless transfers" tagline) — same visual treatment as the current `TopBar`/`AuthLayout` logo, sitting at the top of this panel.
    - Animated flow-line background (two SVG paths, emerald + faint white, looping via the existing `.nv-flow-line` CSS animation from `globals.css`) positioned behind the panel's content.
    - Page-specific content block (see "Per-Page Panel Content" below), vertically centered in the remaining space.
    - A small copyright line ("© {year} NovatraHQ") pinned to the bottom of the panel.
  - **Right form panel** (remaining width): the page's actual form content (heading, fields, buttons, links), centered, no card/border wrapper — the split itself provides the frame.
- **Mobile (below `lg:`):** the elaborate brand panel collapses to a compact header strip above the form: logo + a single-line page-specific headline only (no quote card, no bullet list, no flow-line animation — keeps things fast/simple on small screens).
- **Terms/privacy line** ("By continuing, you agree to Novatra's terms and privacy policy (demo).") stays as a small centered line below the whole split, on all 4 pages, matching today's behavior.

## Per-Page Panel Content

- **Sign-in:** eyebrow "Welcome back", headline "Pick up right where you left off.", and a static demo "last quote" mini-card (£250 → ₦457,000, "Under 1 min" delivery) reusing the same visual style as the landing page's quote preview tile.
- **Sign-up:** eyebrow "Join Novatra", headline "Send money home in seconds, not days.", and the existing 3-bullet value-prop list (same copy as today's "What you'll get" list: transparent quotes, fast settlement, clear status updates).
- **Forgot-password / Reset-password:** eyebrow "Account recovery", headline "We'll get you back in, securely.", and one reassurance line ("No stress — resetting your password takes less than a minute."). No quote card, no bullet list — lighter panel matching their lower-stakes, transactional nature.

## Component Changes

- `apps/web/src/app/(auth)/auth/layout.tsx`: simplified drastically — no longer renders the logo/card/terms chrome itself (that moves into `AuthShell`), just passes `children` through inside a full-height wrapper. The terms/privacy line moves to live inside `AuthShell` instead (still renders on every auth page, per the "include all 4" decision).
- `apps/web/src/components/flow-lines.tsx` (new, extracted from the landing page): the two-path animated SVG background, so it's shared between `app/page.tsx` (landing hero) and `AuthShell` (brand panel) instead of duplicated.
- Each of the 4 page files (`sign-in/page.tsx`, `sign-up/page.tsx`, `forgot-password/page.tsx`, `reset-password/page.tsx`): restructured to use `AuthShell` instead of `Card`/`CardHeader`, supplying their panel content and form content as described above. All existing form logic (state, mutations, error/success handling, loading states, Google OAuth redirect, the "warming server" flow) is preserved exactly — only the surrounding markup/layout changes.

## Explicitly Unchanged

- Color tokens, typography, and all existing UI primitives (`Button`, `ButtonLink`, `Input`) — no new design tokens.
- All form fields, their labels/placeholders/hints, validation, and submit behavior.
- The "Continue with Google" / "Continue as guest" / "Demo" divider on sign-in.
- Every other page in the app.
- No new npm dependencies (flow-line animation is the same pure CSS/SVG approach already used on the landing page).

## Verification

- `pnpm --filter web typecheck` and `pnpm --filter web lint` pass.
- Manually load `/auth/sign-in`, `/auth/sign-up`, `/auth/forgot-password`, `/auth/reset-password` in the dev server and confirm: split layout renders correctly at desktop width, collapses to the compact mobile header at narrow widths, flow-line animation loops smoothly behind the desktop brand panel, and every form still functions (typing into fields, submit button states, error/success message rendering) exactly as before.
- Confirm no regressions to the existing auth logic — this is styling/layout only.
