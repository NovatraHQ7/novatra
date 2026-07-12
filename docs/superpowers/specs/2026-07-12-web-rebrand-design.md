# Web App Rebrand — Design Spec

**Date:** 2026-07-12
**Scope:** `apps/web` only (full app restyle). Mobile and marketing surfaces are out of scope for this pass.

## Goal

Full visual rebrand of the Novatra web app, moving away from the current dark glassmorphic look (gradient blurs, translucent surfaces, cyan/purple accent, rounded font) to a flat, premium-minimal dark aesthetic. This is a **restyle**, not a UX rework — page structure, layout, and flows stay as they are; only visual treatment changes.

## Visual Identity

- **Direction:** Premium Minimal — flat near-black surfaces, no glassmorphism/blur, no gradients. Depth is conveyed with borders and subtle flat shadows instead of blur/glow.
- **Base palette:**
  - Background: `#101014`
  - Card/surface: `#1a1a20`
  - Border: `#2a2a30`
  - Sidebar background (slightly darker than surface): `#0c0c10`
  - Primary text: `#ffffff`
  - Muted text: `#8a8a92`
- **Accent — Emerald:**
  - Primary accent: `#10b981`
  - Text-on-accent: `#06251a`
  - Used for: primary buttons, links, active nav indicator, focus rings, positive/completed status
- **Status colors** (desaturated, quiet until needed):
  - Pending/warning: amber `#f5b93d`
  - Failed/danger: red `#fb7185`
  - Each status renders as a soft tinted pill: ~15% opacity background of the status color, full-opacity text in that color
- **Typography:** Geometric Sans (Inter or equivalent neutral grotesque) replaces the current rounded font (`ui-rounded`/SF Pro Rounded), used uniformly for UI text and numeric values.
- **Theming:** Dark only. No light mode, no theme toggle.

## Design System Components (`apps/web/src/components/ui/*`)

- `button.tsx` — variants: primary (emerald fill, `#06251a` text), secondary (flat surface + border), ghost (text-only), destructive (red fill). Remove glass/gradient button styles. Corner radius ~8px (down from current pill-shaped rounding).
- `card.tsx` — flat `#1a1a20` surface, 1px `#2a2a30` border, subtle flat shadow only — no `backdrop-filter: blur`, no `box-shadow` glow.
- `badge.tsx` — flat tinted pill per status color (emerald/amber/red), as described above.
- `input.tsx` — flat surface, border, emerald focus ring (replace glow-style focus states).
- `modal.tsx` / `confirm-modal.tsx` — plain dim overlay backdrop (no blur), flat card body matching `card.tsx`.
- `components/icons.tsx` — no shape changes; icons continue to use `currentColor` so they inherit the new palette automatically.

## Theme Tokens (`apps/web/src/app/globals.css`)

- Replace `--bg`, `--surface`, `--surface-2`, `--border`, `--text`, `--muted`, `--muted-2`, `--brand`, `--brand-2` with the near-black + emerald values above.
- Remove the radial-gradient `body` background — replace with flat `var(--bg)`.
- Remove `.nv-grid` (decorative grid overlay) and `.nv-ring` (glow ring) utilities — they don't fit the flat aesthetic and have no replacement (drop usages entirely).
- Update `.nv-card` to the new flat card treatment described above (or fold its styles into `card.tsx` directly if that's cleaner — implementer's call).
- Font stack: swap `--font-sans` from the rounded stack to a geometric sans stack (e.g. `Inter, "Helvetica Neue", Arial, system-ui, sans-serif`).

## Navigation & Shell (`components/app/app-shell.tsx`, `nav.tsx`, `page-header.tsx`)

- Sidebar background one shade darker than card surfaces (`#0c0c10`), separated from main content by a 1px `#2a2a30` border.
- Active nav item: emerald left-border accent (2px) + subtle filled background, no gradient/glow indicator.
- Inactive nav items: muted text/icon color, flat background.
- Page headers: title in Geometric Sans, no decorative background grid or gradient behind the header.

## Pages In Scope

All pages get the token/component swap applied — layout and structure unchanged:

- Dashboard (`app/(app)/dashboard/page.tsx`)
- Send (`app/(app)/send/page.tsx`)
- Beneficiaries (`app/(app)/beneficiaries/page.tsx`)
- Transfers list + detail (`app/(app)/transfers/page.tsx`, `app/(app)/transfers/[id]/page.tsx`)
- Auth: sign-in, sign-up, forgot-password, reset-password (`app/(auth)/auth/**`)

For each page: replace any direct usage of old tokens/utility classes (`.nv-card`, `.nv-grid`, `.nv-ring`, hardcoded `--brand`/`--brand-2` gradients) with the new flat/emerald equivalents via the updated `components/ui/*` and CSS tokens. Verify contrast for emerald-on-dark interactive elements (buttons, links, focus states) meets accessible contrast ratios.

## Out of Scope

- Mobile app (`apps/mobile`) — separate future pass if this direction is adopted there.
- Marketing/landing pages — none currently exist in `apps/web`; not part of this spec.
- Light mode / theme toggle.
- Any change to page layout, information architecture, or user flows — this is styling only.

## Verification

- `pnpm --filter web typecheck` and `pnpm --filter web lint` pass.
- Manually walk through each in-scope page in the running dev server to confirm the new palette/typography renders correctly and no leftover glass/gradient styling remains.
- Spot-check color contrast (text on emerald, status badges) against WCAG AA for normal text.
