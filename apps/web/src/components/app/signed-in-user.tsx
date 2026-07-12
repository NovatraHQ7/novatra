"use client";

import { useMe } from "@/lib/auth";

export function SignedInUser() {
  const me = useMe();

  return (
    <div className="hidden max-w-[220px] items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2 text-xs text-muted md:flex">
      <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
      <span className="truncate">
        {me.data?.user.email ?? (me.isLoading ? "Loading…" : "Signed in")}
      </span>
    </div>
  );
}

