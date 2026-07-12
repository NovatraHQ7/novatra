"use client";

import { AuthShell } from "@/components/auth/auth-shell";
import { Input } from "@/components/ui/input";
import { Button, ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSignUp } from "@/lib/auth";
import { isAxiosError } from "axios";

export default function SignUpPage() {
  const router = useRouter();
  const signUp = useSignUp();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  return (
    <AuthShell
      eyebrow="Join Novatra"
      headline="Send money home in seconds, not days."
      mobileHeadline="Join Novatra"
      panel={<ValueProps />}
    >
      <h1 className="text-xl font-semibold text-white">
        Create your account
      </h1>
      <p className="mt-1 text-sm text-muted">
        Start sending money in seconds (demo UI).
      </p>

      <div className="mt-6 space-y-4">
        <Input
          id="fullName"
          name="fullName"
          label="Full name"
          placeholder="Precious David"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
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
          placeholder="Create a secure password"
          hint="Minimum 8 characters."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error ? (
          <div className="rounded-xl border border-danger/20 bg-danger-soft px-3 py-2 text-sm text-danger">
            {error}
          </div>
        ) : null}

        <Button
          className="w-full"
          rightIcon={<Icon name="arrowRight" />}
          loading={signUp.isPending}
          loadingText="Creating account…"
          onClick={async () => {
            setError(null);
            try {
              await signUp.mutateAsync({ fullName, email, password });
              router.push("/dashboard");
            } catch (e: unknown) {
              if (isAxiosError<{ message?: string }>(e)) {
                setError(e.response?.data?.message ?? "Sign up failed");
              } else {
                setError("Sign up failed");
              }
            }
          }}
        >
          Create account
        </Button>

        <Button
          className="w-full"
          variant="secondary"
          leftIcon={<Icon name="google" className="h-4 w-4" />}
          onClick={() => {
            window.location.href =
              (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001") +
              "/auth/google/start";
          }}
        >
          Sign up with Google
        </Button>

        <p className="text-center text-sm text-muted">
          Already have an account?{" "}
          <ButtonLink href="/auth/sign-in" variant="ghost" size="sm">
            Sign in
          </ButtonLink>
        </p>
      </div>
    </AuthShell>
  );
}

function ValueProps() {
  const items = [
    "Transparent quotes before you pay",
    "Fast settlement feel, familiar payouts",
    "Clear status updates and receipts",
  ];
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-sm text-muted">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          {item}
        </li>
      ))}
    </ul>
  );
}
