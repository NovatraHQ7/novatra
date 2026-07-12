# Landing Page Redesign — Design Spec

**Date:** 2026-07-12
**Scope:** `apps/web/src/app/page.tsx` only (the marketing landing page). No other pages, no color/token changes — this redesign is purely structural.

## Goal

The landing page (post-rebrand) currently reads as a repetitive stack of identically-styled bordered cards (icon-in-a-box + title + description, repeated 6+ times). Restructure the page's layout so each section has a distinct visual treatment, while keeping the existing Premium Minimal color palette (near-black surfaces, white text, single emerald accent) and copy completely unchanged.

## Hero Section

- Headline, subheading, and the two CTA buttons ("Create account" / "Sign in") stay as-is — same copy, same components.
- Replace the current "2-column: text | quote-card + info-card" layout with an **asymmetric bento grid** below the CTAs:
  - One large tile spanning two grid rows: the existing quote/transfer preview (send amount → payout amount, rate, fee, "recipient gets", estimated delivery).
  - One bold, solid-emerald stat tile: "<1min" / "Settlement time".
  - One neutral stat tile: "3 steps" / "Quote → Confirm → Track".
  - A row of 3 smaller feature tiles below (transparent pricing, built for trust, not a "crypto app") — same content as today's 3 feature cards and the hero's small info card, consolidated into this row.
- **Animated background:** two thin SVG paths (one emerald `#10b981`, one faint white at low opacity) positioned behind the hero content, animated with a continuous CSS `stroke-dashoffset` loop so they appear to flow left-to-right — evoking money/data moving across the UK→Nigeria corridor. Purely decorative, sits behind text (no interaction, no mouse/scroll reactivity). Implemented with plain CSS `@keyframes` — no new npm dependency (no Framer Motion, no GSAP).

## Below-the-Fold Sections

- **Features:** replace the current 3-identical-cards section. One emphasized card ("Transparent, before you pay" — full description) sits next to a plain, divider-separated list of the other two features ("Instant settlement feel", "Built for trust") with no card wrapper, no icon boxes.
- **How it works:** replace the current bordered-card + stacked-step-boxes with a horizontal 3-column flow: large numerals (01/02/03, with 03 in accent color), title, and description per column, separated by thin vertical dividers. No card wrapper, no per-step bordered box.
- **Why it matters:** replace the current second matching card with one wide highlight band (`bg-surface`, rounded, no border needed beyond the existing surface treatment) combining the "Built for diaspora..." copy on one side with a large stat callout ("Africa-first") on the other.
- **CTA ("Explore the send flow..."):** replace the bordered `Card` wrapper with a full-width centered banner framed by hairline top/bottom borders (`border-line`), same copy and buttons.
- **Footer:** unchanged.

## Explicitly Unchanged

- Color tokens, typography, spacing scale, and all existing UI primitives (`Button`, `ButtonLink`, `Card` where still used, `Icon`) — no new design tokens.
- All copy/microcopy across every section.
- `TopBar` (logo + sign-in button) — unchanged.
- No new npm dependencies (background animation is pure CSS/SVG).

## Verification

- `pnpm --filter web typecheck` and `pnpm --filter web lint` pass.
- Manually load `/` in the dev server and confirm: bento hero renders with the animated background lines looping smoothly, no layout shift/overlap, all sections below render with their new distinct treatments, and no leftover `Card`-wrapped sections that were supposed to be de-carded.
- Confirm the animation doesn't hurt readability (text remains fully legible over the animated lines) and doesn't cause excessive CPU usage (pure CSS transform/opacity-driven, not JS-driven per-frame).
