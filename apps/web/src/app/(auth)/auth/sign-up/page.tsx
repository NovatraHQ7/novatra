 "use client";

import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button, ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSignUp } from "@/lib/auth";

export default function SignUpPage() {
  const router = useRouter();
  const signUp = useSignUp();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  return (
    <Card className="p-6">
      <CardHeader
        title="Create your account"
        subtitle="Start sending money in seconds (demo UI)."
      />

      <div className="mt-5 space-y-4">
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
          <div className="rounded-xl border border-rose-200/15 bg-rose-300/10 px-3 py-2 text-sm text-rose-100">
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
            } catch (e: any) {
              setError(e?.response?.data?.message ?? "Sign up failed");
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

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-sm font-semibold text-white">What you’ll get</p>
          <ul className="mt-2 space-y-2 text-sm text-white/60">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/70" />
              Transparent quotes before you pay
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400/70" />
              Fast settlement feel, familiar payouts
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300/70" />
              Clear status updates and receipts
            </li>
          </ul>
        </div>

        <p className="text-center text-sm text-white/60">
          Already have an account?{" "}
          <ButtonLink href="/auth/sign-in" variant="ghost" size="sm">
            Sign in
          </ButtonLink>
        </p>
      </div>
    </Card>
  );
}
