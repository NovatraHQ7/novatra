"use client";

import { AuthShell } from "@/components/auth/auth-shell";
import { Input } from "@/components/ui/input";
import { Button, ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/icons";
import { useForgotPassword } from "@/lib/auth";
import { useState } from "react";
import { isAxiosError } from "axios";

export default function ForgotPasswordPage() {
  const forgot = useForgotPassword();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <AuthShell
      eyebrow="Account recovery"
      headline="We'll get you back in, securely."
      mobileHeadline="Account recovery"
      panel={
        <p className="text-sm leading-6 text-muted">
          No stress — resetting your password takes less than a minute.
        </p>
      }
    >
      <h1 className="text-xl font-semibold text-white">Reset password</h1>
      <p className="mt-1 text-sm text-muted">
        We’ll email you a reset link (if the account exists).
      </p>

      <div className="mt-6 space-y-4">
        <Input
          id="email"
          name="email"
          label="Email"
          placeholder="you@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

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

        <Button
          className="w-full"
          rightIcon={<Icon name="arrowRight" />}
          loading={forgot.isPending}
          loadingText="Sending…"
          onClick={async () => {
            setError(null);
            try {
              await forgot.mutateAsync({ email });
              setDone(true);
            } catch (e: unknown) {
              if (isAxiosError<{ message?: string }>(e)) {
                setError(e.response?.data?.message ?? "Request failed");
              } else {
                setError("Request failed");
              }
            }
          }}
        >
          Send reset link
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
