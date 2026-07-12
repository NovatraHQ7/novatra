"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useMe } from "@/lib/auth";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const me = useMe();

  useEffect(() => {
    if (me.isLoading) return;
    if (!me.isError) return;

    const next = encodeURIComponent(pathname || "/dashboard");
    router.replace(`/auth/sign-in?next=${next}`);
  }, [me.isError, me.isLoading, pathname, router]);

  if (me.isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="nv-card w-full max-w-md rounded-2xl p-5 text-center">
          <p className="text-sm font-semibold text-white">Loading…</p>
          <p className="mt-1 text-sm text-muted">Checking your session.</p>
        </div>
      </div>
    );
  }

  if (me.isError) return null;

  return <>{children}</>;
}

