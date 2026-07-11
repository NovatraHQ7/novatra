"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button, ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/icons";
import { useSignIn } from "@/lib/auth";
import { warmApi } from "@/lib/api";
import { getEmailError, getRequiredError } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { isAxiosError } from "axios";

export default function SignInPage() {
  const router = useRouter();
  const signIn = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isWarmingEmail, setIsWarmingEmail] = useState(false);
  const [isWarmingGoogle, setIsWarmingGoogle] = useState(false);

  const emailError = getEmailError(email);
  const passwordError = getRequiredError(password, "Password");
  const isFormValid = !emailError && !passwordError;

  return (
    <Card className="p-6">
      <CardHeader
        title="Welcome back"
        subtitle="Sign in to continue your transfer."
      />

      <div className="mt-5 space-y-4">
        <Input
          id="email"
          name="email"
          label="Email"
          placeholder="you@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
          error={touched.email || submitted ? emailError : undefined}
        />
        <Input
          id="password"
          name="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, password: true }))}
          error={touched.password || submitted ? passwordError : undefined}
        />

        {error ? (
          <div className="rounded-xl border border-rose-200/15 bg-rose-300/10 px-3 py-2 text-sm text-rose-100">
            {error}
          </div>
        ) : null}

        {isWarmingEmail || isWarmingGoogle ? (
          <div className="rounded-xl border border-cyan-200/15 bg-cyan-300/10 px-3 py-2 text-sm text-cyan-100">
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
            setSubmitted(true);
            if (!isFormValid) return;
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
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-white/45">Demo</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>
        <Button className="w-full" variant="ghost">
          Continue as guest
        </Button>

        <p className="text-center text-sm text-white/60">
          <ButtonLink href="/auth/forgot-password" variant="ghost" size="sm">
            Forgot password?
          </ButtonLink>
        </p>

        <p className="text-center text-sm text-white/60">
          New to Novatra?{" "}
          <ButtonLink href="/auth/sign-up" variant="ghost" size="sm">
            Create an account
          </ButtonLink>
        </p>
      </div>
    </Card>
  );
}
