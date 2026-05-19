"use client";

import { Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button, ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/icons";
import { useResetPassword } from "@/lib/auth";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<ResetPasswordSkeleton />}>
      <ResetPasswordInner />
    </Suspense>
  );
}

function ResetPasswordInner() {
  const router = useRouter();
  const sp = useSearchParams();
  const reset = useResetPassword();

  const token = useMemo(() => sp.get("token") ?? "", [sp]);
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  return (
    <Card className="p-6">
      <CardHeader
        title="Set a new password"
        subtitle="Choose a new password to secure your account."
      />

      <div className="mt-5 space-y-4">
        <Input
          id="newPassword"
          name="newPassword"
          label="New password"
          type="password"
          placeholder="Minimum 8 characters"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

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

        <Button
          className="w-full"
          rightIcon={<Icon name="arrowRight" />}
          loading={reset.isPending}
          loadingText="Updating…"
          disabled={!token}
          onClick={async () => {
            setError(null);
            try {
              await reset.mutateAsync({ token, newPassword });
              setDone(true);
              setTimeout(() => router.push("/auth/sign-in"), 700);
            } catch (e: any) {
              setError(e?.response?.data?.message ?? "Reset failed");
            }
          }}
        >
          Update password
        </Button>

        <p className="text-center text-sm text-white/60">
          <ButtonLink href="/auth/sign-in" variant="ghost" size="sm">
            Back to sign in
          </ButtonLink>
        </p>
      </div>
    </Card>
  );
}

function ResetPasswordSkeleton() {
  return (
    <Card className="p-6">
      <CardHeader title="Set a new password" subtitle="Loading…" />
      <div className="mt-5 space-y-4">
        <div className="h-11 w-full rounded-xl border border-white/10 bg-white/5" />
        <div className="h-11 w-full rounded-xl border border-white/10 bg-white/5" />
      </div>
    </Card>
  );
}
