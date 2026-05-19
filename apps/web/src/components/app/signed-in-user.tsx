"use client";

import { useMe } from "@/lib/auth";

export function SignedInUser() {
  const me = useMe();

  return (
    <div className="hidden max-w-[220px] items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70 md:flex">
      <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-300/70" />
      <span className="truncate">
        {me.data?.user.email ?? (me.isLoading ? "Loading…" : "Signed in")}
      </span>
    </div>
  );
}

