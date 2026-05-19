"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button, ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/icons";
import { useForgotPassword } from "@/lib/auth";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const forgot = useForgotPassword();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <Card className="p-6">
      <CardHeader
        title="Reset password"
        subtitle="We’ll email you a reset link (if the account exists)."
      />

      <div className="mt-5 space-y-4">
        <Input
          id="email"
          name="email"
          label="Email"
          placeholder="you@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

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
            } catch (e: any) {
              setError(e?.response?.data?.message ?? "Request failed");
            }
          }}
        >
          Send reset link
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
