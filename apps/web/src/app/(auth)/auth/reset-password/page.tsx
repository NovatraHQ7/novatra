"use client";

import { Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthShell } from "@/components/auth/auth-shell";
import { Input } from "@/components/ui/input";
import { Button, ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/icons";
import { useResetPassword } from "@/lib/auth";
import { isAxiosError } from "axios";

const RECOVERY_PANEL = (
  <p className="text-sm leading-6 text-muted">
    No stress — resetting your password takes less than a minute.
  </p>
);

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
    <AuthShell
      eyebrow="Account recovery"
      headline="We'll get you back in, securely."
      mobileHeadline="Account recovery"
      panel={RECOVERY_PANEL}
    >
      <h1 className="text-xl font-semibold text-white">
        Set a new password
      </h1>
      <p className="mt-1 text-sm text-muted">
        Choose a new password to secure your account.
      </p>

      <div className="mt-6 space-y-4">
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
          <div className="rounded-xl border border-danger/20 bg-danger-soft px-3 py-2 text-sm text-danger">
            {error}
          </div>
        ) : null}

        {done ? (
          <div className="rounded-xl border border-accent/20 bg-accent-soft px-3 py-2 text-sm text-accent">
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
            } catch (e: unknown) {
              if (isAxiosError<{ message?: string }>(e)) {
                setError(e.response?.data?.message ?? "Reset failed");
              } else {
                setError("Reset failed");
              }
            }
          }}
        >
          Update password
        </Button>

        <p className="text-center text-sm text-muted">
          <ButtonLink href="/auth/sign-in" variant="ghost" size="sm">
            Back to sign in
          </ButtonLink>
        </p>
      </div>
    </AuthShell>
  );
}

function ResetPasswordSkeleton() {
  return (
    <AuthShell
      eyebrow="Account recovery"
      headline="We'll get you back in, securely."
      mobileHeadline="Account recovery"
      panel={RECOVERY_PANEL}
    >
      <h1 className="text-xl font-semibold text-white">
        Set a new password
      </h1>
      <p className="mt-1 text-sm text-muted">Loading…</p>
      <div className="mt-6 space-y-4">
        <div className="h-11 w-full rounded-xl border border-line bg-surface" />
        <div className="h-11 w-full rounded-xl border border-line bg-surface" />
      </div>
    </AuthShell>
  );
}
