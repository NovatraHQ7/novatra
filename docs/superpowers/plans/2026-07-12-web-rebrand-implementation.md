# Web App Rebrand Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle `apps/web` from its current dark glassmorphic look to the Premium Minimal aesthetic (flat near-black surfaces, Emerald accent, Geometric Sans) approved in `docs/superpowers/specs/2026-07-12-web-rebrand-design.md`. Layout, routes, and behavior are unchanged — this is styling only.

**Architecture:** Introduce a set of named Tailwind v4 theme color tokens in `globals.css` (`surface`, `surface-2`, `line`, `sidebar`, `muted`, `muted-2`, `accent`, `accent-ink`, `accent-soft`, `danger`, `danger-soft`, `warning`, `warning-soft`), then mechanically replace every occurrence of the old glass-style utilities (`bg-white/X`, `border-white/X`, `text-white/X` opacity variants, `cyan-*`/`violet-*`/`rose-*`/`emerald-*` literal color utilities, `backdrop-blur`, `.nv-ring`, `.nv-grid`) with the new tokens, file by file, starting from the design-system primitives and working out to pages. No component prop signatures, route structure, or client logic changes.

**Tech Stack:** Next.js 16 (App Router), Tailwind CSS 4 (`@theme inline` tokens in `globals.css`), React 19, TypeScript.

**No unit tests are added or changed in this plan** — these are pure Tailwind class / CSS token edits with no new logic, so "tests" here means: `pnpm --filter web typecheck` and `pnpm --filter web lint` after each task, plus a final manual visual walkthrough task at the end (Task 10). This is a deliberate adaptation of the TDD steps described in the writing-plans skill to a no-new-behavior styling task.

---

## Token Mapping Reference

Used throughout every task below. Defined once in Task 1, referenced (not redefined) after that.

| Old | New |
|---|---|
| `border-white/10`, `border-white/15` | `border-line` |
| `bg-white/5` | `bg-surface` |
| `bg-white/7`, `bg-white/8`, `bg-white/10` (as background, not nav-active) | `bg-surface-2` |
| `hover:bg-white/7`, `hover:bg-white/15` | `hover:bg-surface-2` |
| `text-white/70`, `text-white/60`, `text-white/55` | `text-muted` |
| `text-white/45`, `text-white/50` | `text-muted-2` |
| `divide-white/10` | `divide-line` |
| `bg-[rgba(11,15,23,0.65)] ... backdrop-blur` | `bg-background` (blur dropped) |
| `bg-[rgba(11,15,23,0.72)] ... backdrop-blur` | `bg-background` (blur dropped) |
| `nv-ring` | removed (class deleted from globals.css; usages dropped or replaced with a solid border/bg as noted per-file) |
| `nv-grid` | removed (class deleted from globals.css; usages dropped) |
| `border-cyan-200/15`, `border-cyan-200/20`, `border-cyan-200/25` | `border-accent/15` / `border-accent/20` / `border-accent/25` (match existing opacity) |
| `bg-cyan-300/10`, `bg-cyan-300/15` | `bg-accent-soft` |
| `text-cyan-100` | `text-accent` |
| `bg-emerald-300/15`, `border-emerald-200/20`, `text-emerald-100` | `bg-accent-soft`, `border-accent/20`, `text-accent` |
| `border-rose-200/15`, `bg-rose-300/10`, `text-rose-100`, `text-rose-300` | `border-danger/20`, `bg-danger-soft`, `text-danger` |
| `bg-rose-500` | `bg-danger` |

---

### Task 1: Theme tokens

**Files:**
- Modify: `apps/web/src/app/globals.css`

- [ ] **Step 1: Replace the full token/body/utility section**

Replace the entire contents of `apps/web/src/app/globals.css` with:

```css
@import "tailwindcss";

:root {
  --bg: #101014;
  --sidebar: #0c0c10;
  --surface: #1a1a20;
  --surface-2: #202027;
  --line: #2a2a30;
  --text: #ffffff;
  --muted: #8a8a92;
  --muted-2: #6f6f78;
  --accent: #10b981;
  --accent-ink: #06251a;
  --accent-soft: rgba(16, 185, 129, 0.12);
  --danger: #fb7185;
  --danger-soft: rgba(251, 113, 133, 0.12);
  --warning: #f5b93d;
  --warning-soft: rgba(245, 185, 61, 0.12);
}

@theme inline {
  --color-background: var(--bg);
  --color-foreground: var(--text);
  --color-sidebar: var(--sidebar);
  --color-surface: var(--surface);
  --color-surface-2: var(--surface-2);
  --color-line: var(--line);
  --color-muted: var(--muted);
  --color-muted-2: var(--muted-2);
  --color-accent: var(--accent);
  --color-accent-ink: var(--accent-ink);
  --color-accent-soft: var(--accent-soft);
  --color-danger: var(--danger);
  --color-danger-soft: var(--danger-soft);
  --color-warning: var(--warning);
  --color-warning-soft: var(--warning-soft);
  --font-sans: Inter, "Helvetica Neue", Arial, system-ui, -apple-system,
    "Segoe UI", Roboto, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji";
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-sans);
  overflow-x: hidden;
}

::selection {
  background: var(--accent-soft);
}

/* Flat card surface used by components/ui/card.tsx and components/ui/modal.tsx */
.nv-card {
  background: var(--surface);
  border: 1px solid var(--line);
}
```

This removes the radial-gradient background, `.nv-grid`, and `.nv-ring` utilities entirely (they have no replacement — usages are removed in later tasks).

- [ ] **Step 2: Typecheck (no logic touched, sanity check only)**

Run: `pnpm --filter web typecheck`
Expected: PASS (CSS changes don't affect TS, this just confirms the workspace is otherwise healthy before mass edits)

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/app/globals.css
git commit -m "style(web): replace glassmorphic tokens with premium-minimal palette"
```

---

### Task 2: Button and Card primitives

**Files:**
- Modify: `apps/web/src/components/ui/button.tsx`
- Modify: `apps/web/src/components/ui/card.tsx`

- [ ] **Step 1: Update `button.tsx` base radius and variants**

In `apps/web/src/components/ui/button.tsx`, replace:

```ts
const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition will-change-transform active:translate-y-px disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<NonNullable<CommonProps["variant"]>, string> = {
  primary:
    "bg-white text-black hover:bg-white/90 shadow-[0_16px_60px_rgba(0,0,0,0.45)]",
  secondary: "bg-white/10 text-white hover:bg-white/15 border border-white/15",
  ghost: "bg-transparent text-white/90 hover:bg-white/10",
  danger: "bg-rose-500 text-white hover:bg-rose-500/90",
};
```

with:

```ts
const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition will-change-transform active:translate-y-px disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<NonNullable<CommonProps["variant"]>, string> = {
  primary: "bg-accent text-accent-ink hover:bg-accent/90",
  secondary: "bg-surface text-white hover:bg-surface-2 border border-line",
  ghost: "bg-transparent text-white/90 hover:bg-surface",
  danger: "bg-danger text-white hover:bg-danger/90",
};
```

- [ ] **Step 2: Update `card.tsx` subtitle color**

In `apps/web/src/components/ui/card.tsx`, replace:

```tsx
        {subtitle ? <p className="text-sm text-white/60">{subtitle}</p> : null}
```

with:

```tsx
        {subtitle ? <p className="text-sm text-muted">{subtitle}</p> : null}
```

- [ ] **Step 3: Typecheck and lint**

Run: `pnpm --filter web typecheck && pnpm --filter web lint`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add apps/web/src/components/ui/button.tsx apps/web/src/components/ui/card.tsx
git commit -m "style(web): restyle Button and Card primitives to premium-minimal"
```

---

### Task 3: Badge, Input, Modal primitives

**Files:**
- Modify: `apps/web/src/components/ui/badge.tsx`
- Modify: `apps/web/src/components/ui/input.tsx`
- Modify: `apps/web/src/components/ui/modal.tsx`

- [ ] **Step 1: Update `badge.tsx` variant styles**

In `apps/web/src/components/ui/badge.tsx`, replace:

```ts
  const styles: Record<string, string> = {
    muted: "bg-white/8 text-white/75 border-white/10",
    brand: "bg-cyan-300/15 text-cyan-100 border-cyan-200/20",
    ok: "bg-emerald-300/15 text-emerald-100 border-emerald-200/20",
    danger: "bg-rose-300/15 text-rose-100 border-rose-200/20",
    warning: "bg-amber-300/15 text-amber-100 border-amber-200/20",
  };
```

with:

```ts
  const styles: Record<string, string> = {
    muted: "bg-surface text-white/75 border-line",
    brand: "bg-surface-2 text-white border-line",
    ok: "bg-accent-soft text-accent border-accent/20",
    danger: "bg-danger-soft text-danger border-danger/20",
    warning: "bg-warning-soft text-warning border-warning/20",
  };
```

- [ ] **Step 2: Update `input.tsx` field styling**

In `apps/web/src/components/ui/input.tsx`, replace:

```tsx
          className={cn(
            "h-11 w-full rounded-xl border border-white/15 bg-white/5 px-3.5 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-white/25 focus:bg-white/7 focus:ring-2 focus:ring-cyan-300/20",
            rightSlot ? "pr-11" : null,
            error ? "border-rose-400/50 ring-2 ring-rose-400/15" : null,
            className
          )}
```

with:

```tsx
          className={cn(
            "h-11 w-full rounded-xl border border-line bg-surface px-3.5 text-sm text-white placeholder:text-muted outline-none transition focus:border-accent/40 focus:bg-surface-2 focus:ring-2 focus:ring-accent/20",
            rightSlot ? "pr-11" : null,
            error ? "border-danger/50 ring-2 ring-danger/15" : null,
            className
          )}
```

Also in the same file, replace:

```tsx
      {hint ? (
        <p id={`${rest.name ?? rest.id}-hint`} className="text-xs text-white/55">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p
          id={`${rest.name ?? rest.id}-error`}
          className="text-xs text-rose-300"
        >
          {error}
        </p>
      ) : null}
```

with:

```tsx
      {hint ? (
        <p id={`${rest.name ?? rest.id}-hint`} className="text-xs text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p
          id={`${rest.name ?? rest.id}-error`}
          className="text-xs text-danger"
        >
          {error}
        </p>
      ) : null}
```

- [ ] **Step 3: Update `modal.tsx` backdrop and dialog surface**

In `apps/web/src/components/ui/modal.tsx`, replace:

```tsx
      <button
        aria-label="Close modal"
        className="fixed inset-0 bg-black/55 backdrop-blur-sm"
        onClick={onClose}
        type="button"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          "nv-card fixed left-1/2 top-1/2 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl p-5",
          "shadow-[0_30px_120px_rgba(0,0,0,0.6)]",
          "max-h-[calc(100vh-2rem)] overflow-auto",
        )}
      >
        <div className="space-y-1">
          <p className="text-base font-semibold text-white">{title}</p>
          {description ? (
            <p className="text-sm text-white/60">{description}</p>
          ) : null}
        </div>
```

with:

```tsx
      <button
        aria-label="Close modal"
        className="fixed inset-0 bg-black/70"
        onClick={onClose}
        type="button"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          "nv-card fixed left-1/2 top-1/2 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl p-5",
          "max-h-[calc(100vh-2rem)] overflow-auto",
        )}
      >
        <div className="space-y-1">
          <p className="text-base font-semibold text-white">{title}</p>
          {description ? (
            <p className="text-sm text-muted">{description}</p>
          ) : null}
        </div>
```

- [ ] **Step 4: Typecheck and lint**

Run: `pnpm --filter web typecheck && pnpm --filter web lint`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add apps/web/src/components/ui/badge.tsx apps/web/src/components/ui/input.tsx apps/web/src/components/ui/modal.tsx
git commit -m "style(web): restyle Badge, Input, Modal primitives to premium-minimal"
```

---

### Task 4: App shell, nav, page header

**Files:**
- Modify: `apps/web/src/components/app/app-shell.tsx`
- Modify: `apps/web/src/components/app/nav.tsx`
- Modify: `apps/web/src/components/app/page-header.tsx`

- [ ] **Step 1: Update `app-shell.tsx` sidebar and header**

In `apps/web/src/components/app/app-shell.tsx`, replace:

```tsx
      <aside className="hidden w-72 shrink-0 border-r border-white/10 p-5 lg:block">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-white">
```

with:

```tsx
      <aside className="hidden w-72 shrink-0 border-r border-line bg-sidebar p-5 lg:block">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-line bg-surface text-white">
```

Also replace:

```tsx
            <div>
              <p className="text-sm font-semibold text-white">Novatra</p>
              <p className="text-xs text-white/55">Prototype</p>
            </div>
```

with:

```tsx
            <div>
              <p className="text-sm font-semibold text-white">Novatra</p>
              <p className="text-xs text-muted">Prototype</p>
            </div>
```

Also replace:

```tsx
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-sm font-semibold text-white">
            Instant settlement feel
          </p>
          <p className="mt-1 text-sm text-white/60">
            We keep blockchain rails invisible and the UX familiar.
          </p>
```

with:

```tsx
        <div className="mt-6 rounded-2xl border border-line bg-surface p-4">
          <p className="text-sm font-semibold text-white">
            Instant settlement feel
          </p>
          <p className="mt-1 text-sm text-muted">
            We keep blockchain rails invisible and the UX familiar.
          </p>
```

Also replace:

```tsx
        <header className="sticky top-0 z-10 border-b border-white/10 bg-[rgba(11,15,23,0.65)] px-4 py-3 backdrop-blur md:px-6">
```

with:

```tsx
        <header className="sticky top-0 z-10 border-b border-line bg-background px-4 py-3 md:px-6">
```

Also replace:

```tsx
                <p className="truncate text-xs text-white/55">
                  Clean, premium, and secure — built for cross-border transfers.
                </p>
```

with:

```tsx
                <p className="truncate text-xs text-muted">
                  Clean, premium, and secure — built for cross-border transfers.
                </p>
```

- [ ] **Step 2: Update `nav.tsx` active/inactive states**

In `apps/web/src/components/app/nav.tsx`, replace (desktop `Nav`):

```tsx
              active
                ? "bg-white/10 text-white nv-ring"
                : "text-white/70 hover:bg-white/7 hover:text-white"
```

with:

```tsx
              active
                ? "border-l-2 border-accent bg-accent-soft text-white"
                : "text-muted hover:bg-surface hover:text-white"
```

Replace (mobile `MobileNav` wrapper):

```tsx
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-white/10 bg-[rgba(11,15,23,0.72)] px-2 py-2 backdrop-blur lg:hidden">
```

with:

```tsx
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-background px-2 py-2 lg:hidden">
```

Replace (mobile item states):

```tsx
                active
                  ? "bg-white/10 text-white nv-ring"
                  : "text-white/60 hover:bg-white/7 hover:text-white"
```

with:

```tsx
                active
                  ? "bg-accent-soft text-accent"
                  : "text-muted hover:bg-surface hover:text-white"
```

- [ ] **Step 3: Update `page-header.tsx` subtitle color**

In `apps/web/src/components/app/page-header.tsx`, replace:

```tsx
        {subtitle ? <p className="text-sm text-white/60">{subtitle}</p> : null}
```

with:

```tsx
        {subtitle ? <p className="text-sm text-muted">{subtitle}</p> : null}
```

- [ ] **Step 4: Typecheck and lint**

Run: `pnpm --filter web typecheck && pnpm --filter web lint`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add apps/web/src/components/app/app-shell.tsx apps/web/src/components/app/nav.tsx apps/web/src/components/app/page-header.tsx
git commit -m "style(web): restyle app shell, nav, and page header to premium-minimal"
```

---

### Task 5: Auth layout and auth pages

**Files:**
- Modify: `apps/web/src/app/(auth)/auth/layout.tsx`
- Modify: `apps/web/src/app/(auth)/auth/sign-in/page.tsx`
- Modify: `apps/web/src/app/(auth)/auth/sign-up/page.tsx`
- Modify: `apps/web/src/app/(auth)/auth/forgot-password/page.tsx`
- Modify: `apps/web/src/app/(auth)/auth/reset-password/page.tsx`

- [ ] **Step 1: Update `layout.tsx`**

In `apps/web/src/app/(auth)/auth/layout.tsx`, replace:

```tsx
    <div className="relative flex min-h-[calc(100vh-0px)] items-center justify-center px-6 py-12">
      <div className="nv-grid absolute inset-0" />
      <div className="relative w-full max-w-md">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/" className="group inline-flex items-center gap-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/5 transition group-hover:bg-white/7">
```

with:

```tsx
    <div className="relative flex min-h-[calc(100vh-0px)] items-center justify-center px-6 py-12">
      <div className="relative w-full max-w-md">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/" className="group inline-flex items-center gap-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-line bg-surface transition group-hover:bg-surface-2">
```

Also replace:

```tsx
            <div className="leading-tight">
              <p className="text-sm font-semibold tracking-tight text-white">
                Novatra
              </p>
              <p className="text-xs text-white/55">Secure sign in</p>
            </div>
          </Link>
        </div>

        {children}

        <p className="mt-6 text-center text-xs text-white/45">
          By continuing, you agree to Novatra’s terms and privacy policy (demo).
        </p>
```

with:

```tsx
            <div className="leading-tight">
              <p className="text-sm font-semibold tracking-tight text-white">
                Novatra
              </p>
              <p className="text-xs text-muted">Secure sign in</p>
            </div>
          </Link>
        </div>

        {children}

        <p className="mt-6 text-center text-xs text-muted-2">
          By continuing, you agree to Novatra’s terms and privacy policy (demo).
        </p>
```

- [ ] **Step 2: Update `sign-in/page.tsx`**

Replace:

```tsx
        {error ? (
          <div className="rounded-xl border border-rose-200/15 bg-rose-300/10 px-3 py-2 text-sm text-rose-100">
            {error}
          </div>
        ) : null}
```

with:

```tsx
        {error ? (
          <div className="rounded-xl border border-danger/20 bg-danger-soft px-3 py-2 text-sm text-danger">
            {error}
          </div>
        ) : null}
```

Replace:

```tsx
        <div className="flex items-center gap-3 py-1">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-white/45">Demo</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>
```

with:

```tsx
        <div className="flex items-center gap-3 py-1">
          <div className="h-px flex-1 bg-line" />
          <span className="text-xs text-muted-2">Demo</span>
          <div className="h-px flex-1 bg-line" />
        </div>
```

Replace both occurrences of:

```tsx
        <p className="text-center text-sm text-white/60">
```

with:

```tsx
        <p className="text-center text-sm text-muted">
```

- [ ] **Step 3: Update `sign-up/page.tsx`**

Replace:

```tsx
        {error ? (
          <div className="rounded-xl border border-rose-200/15 bg-rose-300/10 px-3 py-2 text-sm text-rose-100">
            {error}
          </div>
        ) : null}
```

with:

```tsx
        {error ? (
          <div className="rounded-xl border border-danger/20 bg-danger-soft px-3 py-2 text-sm text-danger">
            {error}
          </div>
        ) : null}
```

Replace:

```tsx
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-sm font-semibold text-white">What you’ll get</p>
          <ul className="mt-2 space-y-2 text-sm text-white/60">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/70" />
              Transparent quotes before you pay
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400/70" />
              Fast settlement feel, familiar payouts
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300/70" />
              Clear status updates and receipts
            </li>
          </ul>
        </div>

        <p className="text-center text-sm text-white/60">
```

with:

```tsx
        <div className="rounded-2xl border border-line bg-surface p-4">
          <p className="text-sm font-semibold text-white">What you’ll get</p>
          <ul className="mt-2 space-y-2 text-sm text-muted">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
              Transparent quotes before you pay
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
              Fast settlement feel, familiar payouts
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
              Clear status updates and receipts
            </li>
          </ul>
        </div>

        <p className="text-center text-sm text-muted">
```

- [ ] **Step 4: Update `forgot-password/page.tsx`**

Replace:

```tsx
        {error ? (
          <div className="rounded-xl border border-rose-200/15 bg-rose-300/10 px-3 py-2 text-sm text-rose-100">
            {error}
          </div>
        ) : null}

        {done ? (
          <div className="rounded-xl border border-emerald-200/15 bg-emerald-300/10 px-3 py-2 text-sm text-emerald-100">
            If that email exists, a reset link has been sent.
          </div>
        ) : null}
```

with:

```tsx
        {error ? (
          <div className="rounded-xl border border-danger/20 bg-danger-soft px-3 py-2 text-sm text-danger">
            {error}
          </div>
        ) : null}

        {done ? (
          <div className="rounded-xl border border-accent/20 bg-accent-soft px-3 py-2 text-sm text-accent">
            If that email exists, a reset link has been sent.
          </div>
        ) : null}
```

Replace:

```tsx
        <p className="text-center text-sm text-white/60">
          <ButtonLink href="/auth/sign-in" variant="ghost" size="sm">
            Back to sign in
          </ButtonLink>
        </p>
```

with:

```tsx
        <p className="text-center text-sm text-muted">
          <ButtonLink href="/auth/sign-in" variant="ghost" size="sm">
            Back to sign in
          </ButtonLink>
        </p>
```

- [ ] **Step 5: Update `reset-password/page.tsx`**

Replace:

```tsx
        {error ? (
          <div className="rounded-xl border border-rose-200/15 bg-rose-300/10 px-3 py-2 text-sm text-rose-100">
            {error}
          </div>
        ) : null}

        {done ? (
          <div className="rounded-xl border border-emerald-200/15 bg-emerald-300/10 px-3 py-2 text-sm text-emerald-100">
            Password updated. You can now sign in.
          </div>
        ) : null}
```

with:

```tsx
        {error ? (
          <div className="rounded-xl border border-danger/20 bg-danger-soft px-3 py-2 text-sm text-danger">
            {error}
          </div>
        ) : null}

        {done ? (
          <div className="rounded-xl border border-accent/20 bg-accent-soft px-3 py-2 text-sm text-accent">
            Password updated. You can now sign in.
          </div>
        ) : null}
```

Replace:

```tsx
        <p className="text-center text-sm text-white/60">
          <ButtonLink href="/auth/sign-in" variant="ghost" size="sm">
            Back to sign in
          </ButtonLink>
        </p>
```

with:

```tsx
        <p className="text-center text-sm text-muted">
          <ButtonLink href="/auth/sign-in" variant="ghost" size="sm">
            Back to sign in
          </ButtonLink>
        </p>
```

Replace (skeleton):

```tsx
      <div className="mt-5 space-y-4">
        <div className="h-11 w-full rounded-xl border border-white/10 bg-white/5" />
        <div className="h-11 w-full rounded-xl border border-white/10 bg-white/5" />
      </div>
```

with:

```tsx
      <div className="mt-5 space-y-4">
        <div className="h-11 w-full rounded-xl border border-line bg-surface" />
        <div className="h-11 w-full rounded-xl border border-line bg-surface" />
      </div>
```

- [ ] **Step 6: Typecheck and lint**

Run: `pnpm --filter web typecheck && pnpm --filter web lint`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add "apps/web/src/app/(auth)"
git commit -m "style(web): restyle auth layout and pages to premium-minimal"
```

---

### Task 6: Dashboard page

**Files:**
- Modify: `apps/web/src/app/(app)/dashboard/page.tsx`

- [ ] **Step 1: Replace every glass-style utility occurrence**

In `apps/web/src/app/(app)/dashboard/page.tsx`, apply these literal replacements (each appears once or more — replace every occurrence in the file):

| Find | Replace with |
|---|---|
| `rounded-xl border border-white/10 bg-white/5 p-4` | `rounded-xl border border-line bg-surface p-4` |
| `rounded-2xl border border-white/10 bg-white/5 p-4` | `rounded-2xl border border-line bg-surface p-4` |
| `divide-y divide-white/10` | `divide-y divide-line` |
| `text-sm text-white/60` | `text-sm text-muted` |
| `text-xs text-white/55` | `text-xs text-muted` |
| `text-xs text-white/45` | `text-xs text-muted-2` |
| `border border-white/10 bg-white/5 px-4 py-3` | `border border-line bg-surface px-4 py-3` |
| `border border-white/10 bg-white/5 transition hover:border-white/15 hover:bg-white/7` | `border border-line bg-surface transition hover:border-line hover:bg-surface-2` |
| `text-xs text-white/55` (inside `Stat`, `mt-1 text-xs leading-5 text-white/55`) | `text-xs text-muted` |

Note: several distinct JSX blocks share the exact string `rounded-xl border border-white/10 bg-white/5 p-4` (the "Recent transfer" block and `SnapshotRow`'s "Next step" block) and `rounded-2xl border border-white/10 bg-white/5 p-4` (`Stat`, `QuickAction`, `Callout`-style blocks in this file). Replace all of them — they all get the same treatment.

- [ ] **Step 2: Typecheck and lint**

Run: `pnpm --filter web typecheck && pnpm --filter web lint`
Expected: PASS

- [ ] **Step 3: Manual visual check**

Run: `pnpm --filter web dev`
Visit `/dashboard` and confirm: flat surfaces (no blur/glow), emerald badges for "Completed"-equivalent status, muted gray secondary text, no leftover cyan/violet colors.

- [ ] **Step 4: Commit**

```bash
git add "apps/web/src/app/(app)/dashboard/page.tsx"
git commit -m "style(web): restyle dashboard page to premium-minimal"
```

---

### Task 7: Send page

**Files:**
- Modify: `apps/web/src/app/(app)/send/page.tsx`

- [ ] **Step 1: Replace select element styling**

Replace:

```tsx
                    <select
                      value={beneficiaryId}
                      onChange={(e) => setBeneficiaryId(e.target.value)}
                      className="h-11 w-full rounded-xl border border-white/15 bg-white/5 px-3.5 text-sm text-white outline-none transition focus:border-white/25 focus:bg-white/7"
                    >
                      {beneficiaries.map((b) => (
                        <option key={b.id} value={b.id} className="bg-[#0b0f17]">
```

with:

```tsx
                    <select
                      value={beneficiaryId}
                      onChange={(e) => setBeneficiaryId(e.target.value)}
                      className="h-11 w-full rounded-xl border border-line bg-surface px-3.5 text-sm text-white outline-none transition focus:border-accent/40 focus:bg-surface-2"
                    >
                      {beneficiaries.map((b) => (
                        <option key={b.id} value={b.id} className="bg-[#101014]">
```

Also replace the two adjacent label/hint lines:

```tsx
                    <label className="text-sm font-medium text-white/90">
                      Recipient (Nigeria)
                    </label>
```
(no change needed — `text-white/90` stays as-is, it's near-full-opacity white, not a glass token)

Replace:

```tsx
                    <p className="text-xs text-white/55">
                      You’ll be able to add/edit beneficiaries in the next iteration.
                    </p>
```

with:

```tsx
                    <p className="text-xs text-muted">
                      You’ll be able to add/edit beneficiaries in the next iteration.
                    </p>
```

- [ ] **Step 2: Replace step-2/step-3 summary card surfaces**

Replace every occurrence of:

```tsx
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
```

with:

```tsx
                <div className="rounded-2xl border border-line bg-surface p-5">
```

(this exact string appears for the "Sending" summary block, the "Recipient" block, and the "Transfer in progress" block — replace all three).

Replace:

```tsx
                    <div className="flex items-center gap-2 text-sm text-white/70">
                      <Badge variant="muted">{methodLabel(method)}</Badge>
                      <span className="text-white/35">•</span>
```

with:

```tsx
                    <div className="flex items-center gap-2 text-sm text-muted">
                      <Badge variant="muted">{methodLabel(method)}</Badge>
                      <span className="text-muted-2">•</span>
```

Replace:

```tsx
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm font-semibold text-white">Recipient</p>
                  <p className="mt-1 text-sm text-white/70">
                    {selectedBeneficiary.fullName} • {selectedBeneficiary.bankName}{" "}
                    {selectedBeneficiary.accountNumberMasked}
                  </p>
                  <p className="mt-1 text-xs text-white/55">
                    Payout method: bank transfer (mock)
                  </p>
                </div>
```

with:

```tsx
                <div className="rounded-2xl border border-line bg-surface p-5">
                  <p className="text-sm font-semibold text-white">Recipient</p>
                  <p className="mt-1 text-sm text-muted">
                    {selectedBeneficiary.fullName} • {selectedBeneficiary.bankName}{" "}
                    {selectedBeneficiary.accountNumberMasked}
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    Payout method: bank transfer (mock)
                  </p>
                </div>
```

Replace:

```tsx
                      <p className="mt-1 text-sm text-white/60">
                        We’re settling your transfer and preparing payout.
                      </p>
```

with:

```tsx
                      <p className="mt-1 text-sm text-muted">
                        We’re settling your transfer and preparing payout.
                      </p>
```

- [ ] **Step 3: Replace `StepPills`/`Pill` and `FundingTabs` accent colors**

Replace:

```tsx
        active ? "border-cyan-200/25 bg-cyan-300/15 text-cyan-100" : "border-white/10 bg-white/5 text-white/60",
```

with:

```tsx
        active ? "border-accent/25 bg-accent-soft text-accent" : "border-line bg-surface text-muted",
```

Replace:

```tsx
        method === m
          ? "border-cyan-200/25 bg-cyan-300/10 text-white nv-ring"
          : "border-white/10 bg-white/5 text-white/70 hover:bg-white/7",
```

with:

```tsx
        method === m
          ? "border-accent/25 bg-accent-soft text-white"
          : "border-line bg-surface text-muted hover:bg-surface-2",
```

Replace:

```tsx
      <p className="mt-1 text-xs text-white/55">
        {m === "card"
```

with:

```tsx
      <p className="mt-1 text-xs text-muted">
        {m === "card"
```

- [ ] **Step 4: Replace `StablecoinDepositCard` surfaces and accents**

Replace:

```tsx
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-white">Stablecoin deposit</p>
          <p className="text-sm text-white/60">
```

with:

```tsx
    <div className="rounded-2xl border border-line bg-surface p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-white">Stablecoin deposit</p>
          <p className="text-sm text-muted">
```

Replace every occurrence of:

```tsx
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
```

with:

```tsx
        <div className="rounded-xl border border-line bg-surface p-4">
```

(this appears for the "Asset", "Confirmations", and "Deposit address" blocks — replace all three).

Replace both occurrences of:

```tsx
                asset === "USDC"
                  ? "border-cyan-200/25 bg-cyan-300/15 text-cyan-100"
                  : "border-white/10 bg-white/5 text-white/70 hover:bg-white/7",
```

and

```tsx
                asset === "USDT"
                  ? "border-cyan-200/25 bg-cyan-300/15 text-cyan-100"
                  : "border-white/10 bg-white/5 text-white/70 hover:bg-white/7",
```

with (respectively):

```tsx
                asset === "USDC"
                  ? "border-accent/25 bg-accent-soft text-accent"
                  : "border-line bg-surface text-muted hover:bg-surface-2",
```

```tsx
                asset === "USDT"
                  ? "border-accent/25 bg-accent-soft text-accent"
                  : "border-line bg-surface text-muted hover:bg-surface-2",
```

Replace every remaining `text-xs text-white/55` and `text-xs text-white/45` in this component (Asset caption, Confirmations caption, Deposit address caption, Memo caption) with `text-xs text-muted` and `text-xs text-muted-2` respectively, matching the mapping table.

Replace:

```tsx
        <div className="sm:col-span-2 rounded-xl border border-cyan-200/15 bg-cyan-300/10 p-4">
          <p className="text-xs text-white/55">Memo (required)</p>
```

with:

```tsx
        <div className="sm:col-span-2 rounded-xl border border-accent/15 bg-accent-soft p-4">
          <p className="text-xs text-muted">Memo (required)</p>
```

Replace:

```tsx
          <p className="mt-2 text-xs text-white/55">
            Without the memo, the deposit can’t be matched to your transfer.
          </p>
```

with:

```tsx
          <p className="mt-2 text-xs text-muted">
            Without the memo, the deposit can’t be matched to your transfer.
          </p>
```

- [ ] **Step 5: Replace `SummaryItem`, `Callout`, `TimelineItem` styling**

Replace:

```tsx
    <div
      className={[
        "rounded-xl border bg-white/5 p-4",
        highlight ? "border-cyan-200/20 nv-ring" : "border-white/10",
      ].join(" ")}
    >
      <p className="text-xs text-white/55">{label}</p>
```

with:

```tsx
    <div
      className={[
        "rounded-xl border bg-surface p-4",
        highlight ? "border-accent/20 bg-accent-soft" : "border-line",
      ].join(" ")}
    >
      <p className="text-xs text-muted">{label}</p>
```

Replace:

```tsx
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-2 text-white/85">
        <Icon name={icon} className="h-4 w-4" />
        <p className="text-sm font-semibold text-white">{title}</p>
      </div>
      <p className="mt-2 text-sm leading-6 text-white/60">{children}</p>
    </div>
  );
}

function TimelineItem
```

with:

```tsx
    <div className="rounded-2xl border border-line bg-surface p-4">
      <div className="flex items-center gap-2 text-white/85">
        <Icon name={icon} className="h-4 w-4" />
        <p className="text-sm font-semibold text-white">{title}</p>
      </div>
      <p className="mt-2 text-sm leading-6 text-muted">{children}</p>
    </div>
  );
}

function TimelineItem
```

Replace:

```tsx
        className={[
          "mt-0.5 flex h-7 w-7 items-center justify-center rounded-full border",
          done
            ? "border-emerald-200/20 bg-emerald-300/15 text-emerald-100"
            : active
              ? "border-cyan-200/25 bg-cyan-300/15 text-cyan-100"
              : "border-white/10 bg-white/5 text-white/50",
        ].join(" ")}
      >
        {done ? <Icon name="check" className="h-4 w-4" /> : <span className="text-xs">•</span>}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium text-white">{label}</p>
        <p className="text-sm text-white/60">{description}</p>
```

with:

```tsx
        className={[
          "mt-0.5 flex h-7 w-7 items-center justify-center rounded-full border",
          done
            ? "border-accent/20 bg-accent-soft text-accent"
            : active
              ? "border-accent bg-accent/20 text-accent"
              : "border-line bg-surface text-muted",
        ].join(" ")}
      >
        {done ? <Icon name="check" className="h-4 w-4" /> : <span className="text-xs">•</span>}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium text-white">{label}</p>
        <p className="text-sm text-muted">{description}</p>
```

- [ ] **Step 6: Typecheck and lint**

Run: `pnpm --filter web typecheck && pnpm --filter web lint`
Expected: PASS

- [ ] **Step 7: Manual visual check**

Run: `pnpm --filter web dev`
Visit `/send`, walk through all 3 steps (quote → confirm → status) and the stablecoin funding tab. Confirm no cyan/violet remains, timeline "active" step is visually distinct from "done" steps.

- [ ] **Step 8: Commit**

```bash
git add "apps/web/src/app/(app)/send/page.tsx"
git commit -m "style(web): restyle send page to premium-minimal"
```

---

### Task 8: Beneficiaries page

**Files:**
- Modify: `apps/web/src/app/(app)/beneficiaries/page.tsx`

- [ ] **Step 1: Replace list and text styling**

Replace:

```tsx
          <div className="mt-5 divide-y divide-white/10">
            {filtered.map((b) => (
              <div key={b.id} className="flex items-start justify-between gap-3 py-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">{b.fullName}</p>
                  <p className="mt-1 text-sm text-white/60">
                    {b.bankName} • {b.accountNumberMasked}
                  </p>
                </div>
```

with:

```tsx
          <div className="mt-5 divide-y divide-line">
            {filtered.map((b) => (
              <div key={b.id} className="flex items-start justify-between gap-3 py-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">{b.fullName}</p>
                  <p className="mt-1 text-sm text-muted">
                    {b.bankName} • {b.accountNumberMasked}
                  </p>
                </div>
```

Replace:

```tsx
              <div className="py-10 text-center text-sm text-white/60">
                No beneficiaries found.
              </div>
```

with:

```tsx
              <div className="py-10 text-center text-sm text-muted">
                No beneficiaries found.
              </div>
```

Replace:

```tsx
            <p className="text-xs leading-5 text-white/55">
              Next iteration: validate bank details, support payout methods, and sync to API.
            </p>
```

with:

```tsx
            <p className="text-xs leading-5 text-muted">
              Next iteration: validate bank details, support payout methods, and sync to API.
            </p>
```

- [ ] **Step 2: Typecheck and lint**

Run: `pnpm --filter web typecheck && pnpm --filter web lint`
Expected: PASS

- [ ] **Step 3: Manual visual check**

Run: `pnpm --filter web dev`
Visit `/beneficiaries`, search, add, and remove an entry — confirm flat styling throughout including the `ConfirmModal`.

- [ ] **Step 4: Commit**

```bash
git add "apps/web/src/app/(app)/beneficiaries/page.tsx"
git commit -m "style(web): restyle beneficiaries page to premium-minimal"
```

---

### Task 9: Transfers list and detail pages

**Files:**
- Modify: `apps/web/src/app/(app)/transfers/page.tsx`
- Modify: `apps/web/src/app/(app)/transfers/[id]/page.tsx`

- [ ] **Step 1: Update `transfers/page.tsx`**

Replace:

```tsx
        <div className="mt-5 divide-y divide-white/10">
          {transfers.map((t) => (
            <Link
              key={t.id}
              href={`/transfers/${t.id}`}
              className="flex items-start justify-between gap-3 py-4 transition hover:bg-white/5 sm:-mx-5 sm:px-5"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  {formatMoney(t.sendAmount.amount, "GBP")} →{" "}
                  {formatMoney(t.payoutAmount.amount, "NGN")}
                </p>
                <p className="mt-1 text-sm text-white/60">
                  To {t.beneficiary.fullName} • {t.beneficiary.bankName}
                </p>
                <p className="mt-1 text-xs text-white/45">
```

with:

```tsx
        <div className="mt-5 divide-y divide-line">
          {transfers.map((t) => (
            <Link
              key={t.id}
              href={`/transfers/${t.id}`}
              className="flex items-start justify-between gap-3 py-4 transition hover:bg-surface sm:-mx-5 sm:px-5"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  {formatMoney(t.sendAmount.amount, "GBP")} →{" "}
                  {formatMoney(t.payoutAmount.amount, "NGN")}
                </p>
                <p className="mt-1 text-sm text-muted">
                  To {t.beneficiary.fullName} • {t.beneficiary.bankName}
                </p>
                <p className="mt-1 text-xs text-muted-2">
```

Replace:

```tsx
                <Icon name="chevronRight" className="h-4 w-4 text-white/40" />
```

with:

```tsx
                <Icon name="chevronRight" className="h-4 w-4 text-muted" />
```

- [ ] **Step 2: Update `transfers/[id]/page.tsx`**

Replace every occurrence of:

```tsx
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs text-white/55">{label}</p>
```

with:

```tsx
    <div className="rounded-2xl border border-line bg-surface p-4">
      <p className="text-xs text-muted">{label}</p>
```

(this exact block is used by both the `Item` and `Hint` helper components — replace both).

Replace:

```tsx
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-semibold text-white">Cost breakdown</p>
```

with:

```tsx
          <div className="mt-6 rounded-2xl border border-line bg-surface p-5">
            <p className="text-sm font-semibold text-white">Cost breakdown</p>
```

Replace:

```tsx
                <div className="mt-2 flex items-center justify-between rounded-xl border border-cyan-200/15 bg-cyan-300/10 px-4 py-3">
                  <span className="text-sm text-white/75">Recipient gets</span>
```

with:

```tsx
                <div className="mt-2 flex items-center justify-between rounded-xl border border-accent/15 bg-accent-soft px-4 py-3">
                  <span className="text-sm text-white/75">Recipient gets</span>
```

Replace:

```tsx
      <p className={strong ? "mt-1 text-sm font-semibold text-white" : "mt-1 text-sm text-white/80"}>
```

(no change — `text-white/80` stays, it's near-full-opacity white, not a glass surface token)

Replace:

```tsx
      <p className="mt-2 text-sm leading-6 text-white/60">{children}</p>
```

with:

```tsx
      <p className="mt-2 text-sm leading-6 text-muted">{children}</p>
```

- [ ] **Step 3: Typecheck and lint**

Run: `pnpm --filter web typecheck && pnpm --filter web lint`
Expected: PASS

- [ ] **Step 4: Manual visual check**

Run: `pnpm --filter web dev`
Visit `/transfers` and click into a transfer detail page. Confirm hover states on the list, flat cards, and the "Recipient gets" highlight all render correctly with no cyan remaining.

- [ ] **Step 5: Commit**

```bash
git add "apps/web/src/app/(app)/transfers"
git commit -m "style(web): restyle transfers list and detail pages to premium-minimal"
```

---

### Task 10: Full-app verification pass

**Files:** none (verification only)

- [ ] **Step 1: Run full typecheck and lint**

Run: `pnpm --filter web typecheck && pnpm --filter web lint`
Expected: PASS with zero errors/warnings

- [ ] **Step 2: Grep for any leftover old tokens**

Run:
```bash
grep -rn "nv-ring\|nv-grid\|cyan-\|violet-\|rose-\|emerald-\|backdrop-blur\|bg-white/\|border-white/\|text-white/[0-9]" apps/web/src --include="*.tsx" --include="*.css"
```
Expected: no matches (aside from any deliberately-kept near-full-opacity `text-white/8X` / `text-white/9X` values called out in Tasks 6–9 as intentionally unchanged — review any hits against this plan's mapping table before treating them as a miss)

- [ ] **Step 3: Full manual walkthrough**

Run: `pnpm --filter web dev`
Walk through, in order: sign-in, sign-up, forgot-password, reset-password, dashboard, send (all 3 steps), beneficiaries (search/add/remove), transfers list, transfer detail. Confirm:
- No glassmorphism/blur/gradient remnants anywhere
- Emerald is the only accent color in use
- Geometric sans font renders (check computed `font-family` in devtools on a heading)
- Status badges (completed/pending/failed) are visually distinct and use emerald/amber/red respectively

- [ ] **Step 4: Commit (only if Step 2 or 3 surfaced fixes)**

```bash
git add apps/web/src
git commit -m "style(web): final cleanup pass for premium-minimal rebrand"
```

If no fixes were needed, skip this commit — the rebrand is complete as of Task 9.
