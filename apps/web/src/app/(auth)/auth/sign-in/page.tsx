"use client";

import { AuthShell } from "@/components/auth/auth-shell";
import { Input } from "@/components/ui/input";
import { Button, ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/icons";
import { useSignIn } from "@/lib/auth";
import { warmApi } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { isAxiosError } from "axios";

export default function SignInPage() {
  const router = useRouter();
  const signIn = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isWarmingEmail, setIsWarmingEmail] = useState(false);
  const [isWarmingGoogle, setIsWarmingGoogle] = useState(false);

  return (
    <AuthShell
      eyebrow="Welcome back"
      headline="Pick up right where you left off."
      mobileHeadline="Welcome back"
      panel={<LastQuoteCard />}
    >
      <h1 className="text-xl font-semibold text-white">Sign in</h1>
      <p className="mt-1 text-sm text-muted">Continue your transfer.</p>

      <div className="mt-6 space-y-4">
        <Input
          id="email"
          name="email"
          label="Email"
          placeholder="you@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          id="password"
          name="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error ? (
          <div className="rounded-xl border border-danger/20 bg-danger-soft px-3 py-2 text-sm text-danger">
            {error}
          </div>
        ) : null}

        {isWarmingEmail || isWarmingGoogle ? (
          <div className="rounded-xl border border-accent/20 bg-accent-soft px-3 py-2 text-sm text-accent">
            Waking server. This may take a few seconds on first request.
          </div>
        ) : null}

        <Button
          className="w-full"
          rightIcon={<Icon name="arrowRight" />}
          loading={signIn.isPending || isWarmingEmail}
          loadingText={isWarmingEmail ? "Waking server…" : "Signing in…"}
          disabled={isWarmingGoogle}
          onClick={async () => {
            setError(null);
            setIsWarmingEmail(true);
            try {
              await warmApi();
              setIsWarmingEmail(false);
              await signIn.mutateAsync({ email, password });
              router.push("/dashboard");
            } catch (e: unknown) {
              setIsWarmingEmail(false);
              if (isAxiosError<{ message?: string }>(e)) {
                setError(e.response?.data?.message ?? "Sign in failed");
              } else {
                setError("Sign in failed");
              }
            }
          }}
        >
          Sign in
        </Button>

        <Button
          className="w-full cursor-pointer"
          variant="secondary"
          leftIcon={<Icon name="google" className="h-4 w-4" />}
          loading={isWarmingGoogle}
          loadingText="Waking server…"
          disabled={signIn.isPending || isWarmingEmail}
          onClick={async () => {
            setError(null);
            setIsWarmingGoogle(true);
            await warmApi();
            window.location.href =
              (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001") +
              "/auth/google/start";
          }}
        >
          Continue with Google
        </Button>

        <div className="flex items-center gap-3 py-1">
          <div className="h-px flex-1 bg-line" />
          <span className="text-xs text-muted-2">Demo</span>
          <div className="h-px flex-1 bg-line" />
        </div>
        <Button className="w-full" variant="ghost">
          Continue as guest
        </Button>

        <p className="text-center text-sm text-muted">
          <ButtonLink href="/auth/forgot-password" variant="ghost" size="sm">
            Forgot password?
          </ButtonLink>
        </p>

        <p className="text-center text-sm text-muted">
          New to Novatra?{" "}
          <ButtonLink href="/auth/sign-up" variant="ghost" size="sm">
            Create an account
          </ButtonLink>
        </p>
      </div>
    </AuthShell>
  );
}

function LastQuoteCard() {
  return (
    <div className="rounded-2xl border border-line bg-background p-5">
      <p className="text-xs text-muted">Last quote</p>
      <p className="mt-1 text-xl font-semibold text-white">
        £250 → ₦457,000
      </p>
      <div className="mt-2 flex items-center justify-between text-xs text-muted">
        <span>Delivery</span>
        <span className="font-semibold text-accent">Under 1 min</span>
      </div>
    </div>
  );
}
