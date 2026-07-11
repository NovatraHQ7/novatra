"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button, ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/icons";
import { useSignIn } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { isAxiosError } from "axios";

export default function SignInPage() {
  const router = useRouter();
  const signIn = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

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
          <div className="rounded-xl border border-rose-200/15 bg-rose-300/10 px-3 py-2 text-sm text-rose-100">
            {error}
          </div>
        ) : null}

        <Button
          className="w-full"
          rightIcon={<Icon name="arrowRight" />}
          loading={signIn.isPending}
          loadingText="Signing in…"
          onClick={async () => {
            setError(null);
            try {
              await signIn.mutateAsync({ email, password });
              router.push("/dashboard");
            } catch (e: unknown) {
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
          loading={false}
          onClick={() => {
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
