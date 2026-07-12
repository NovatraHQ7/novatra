import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/icons";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative flex flex-1 items-center justify-center px-6 py-10">
      <main className="relative w-full max-w-6xl">
        <TopBar />

        <section className="mx-auto grid items-center gap-10 pt-10 lg:grid-cols-2 lg:pt-14">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs text-white/80">
              <Icon name="sparkles" className="h-4 w-4" />
              MVP prototype — UK → Nigeria corridor
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Borderless transfers,{" "}
              <span className="text-accent">built for speed</span>.
            </h1>
            <p className="max-w-xl text-base leading-7 text-muted">
              Novatra is a modern cross-border financial platform for emerging
              markets. The experience is fintech-first; Stellar-backed
              settlement runs quietly in the background.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href="/auth/sign-up"
                rightIcon={<Icon name="arrowRight" />}
              >
                Create account
              </ButtonLink>
              <ButtonLink href="/auth/sign-in" variant="secondary">
                Sign in
              </ButtonLink>
            </div>
            <div className="grid grid-cols-3 gap-3 pt-2">
              <MiniStat icon="bolt" label="Settlement" value="Seconds" />
              <MiniStat icon="exchange" label="Fees" value="Low" />
              <MiniStat
                icon="shield"
                label="Experience"
                value="Fintech-first"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-muted">
              <Pill icon="shield" label="KYC/AML-ready architecture" />
              <Pill icon="globe" label="Transparent quotes" />
              <Pill icon="wallet" label="Stablecoins (optional)" />
            </div>
          </div>

          <div className="grid gap-4">
            <QuotePreview />
            <Card className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-white">
                    Not a “crypto app”
                  </p>
                  <p className="text-sm text-muted">
                    Stablecoin liquidity and Stellar rails power settlement
                    behind the scenes.
                  </p>
                </div>
                <div className="rounded-xl border border-line bg-surface p-3 text-white/85">
                  <Icon name="wallet" className="h-5 w-5" />
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section className="mt-14 grid gap-4 lg:mt-20 lg:grid-cols-3">
          <Card className="p-6">
            <Feature
              icon="exchange"
              title="Transparent, before you pay"
              desc="We show the rate, fee, and recipient amount upfront with a quote expiry."
            />
          </Card>
          <Card className="p-6">
            <Feature
              icon="bolt"
              title="Instant settlement feel"
              desc="Transfers feel immediate; settlement runs on modern rails designed for speed."
            />
          </Card>
          <Card className="p-6">
            <Feature
              icon="shield"
              title="Built for trust"
              desc="Clear statuses, clean receipts, and compliance hooks from day one."
            />
          </Card>
        </section>

        <section className="mt-14 lg:mt-20">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted">
                    How it works
                  </p>
                  <h2 className="text-lg font-semibold text-white">
                    Quote → Confirm → Track
                  </h2>
                  <p className="mt-2 text-sm text-muted">
                    A simple flow that feels like a modern fintech product.
                  </p>
                </div>
                <div className="rounded-xl border border-line bg-surface p-3 text-white/85">
                  <Icon name="receipt" className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <Step
                  n="01"
                  title="Get a quote"
                  desc="Enter amount and recipient, see the exact fee + FX."
                />
                <Step
                  n="02"
                  title="Fund your transfer"
                  desc="Card and bank transfer first; stablecoin deposit remains optional."
                />
                <Step
                  n="03"
                  title="Track status"
                  desc="Clear progress states with a receipt-style details view."
                />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted">
                    Why this matters
                  </p>
                  <h2 className="text-lg font-semibold text-white">
                    Built for diaspora and families back home
                  </h2>
                  <p className="mt-2 text-sm text-muted">
                    Remittances power rent, school, healthcare, and emergencies.
                    Sending support shouldn’t be slow or expensive.
                  </p>
                </div>
                <div className="rounded-xl border border-line bg-surface p-3 text-white/85">
                  <Icon name="globe" className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <MiniStat icon="sparkles" label="Focus" value="Africa-first" />
                <MiniStat
                  icon="exchange"
                  label="Pricing"
                  value="Clear & fair"
                />
                <MiniStat icon="bolt" label="Delivery" value="Fast" />
                <MiniStat icon="shield" label="Security" value="Serious" />
              </div>
            </Card>
          </div>
        </section>

        <section className="mt-14 lg:mt-20">
          <Card className="p-6">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted">
                  Try the prototype
                </p>
                <h2 className="text-lg font-semibold text-white">
                  Explore the send flow and transfer receipts
                </h2>
                <p className="mt-1 text-sm text-muted">
                  UI-only for now — we’ll wire APIs next.
                </p>
              </div>
              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                <ButtonLink href="/send" rightIcon={<Icon name="arrowRight" />}>
                  Start a transfer
                </ButtonLink>
                <ButtonLink href="/transfers" variant="secondary">
                  View transfers
                </ButtonLink>
              </div>
            </div>
          </Card>
        </section>

        <footer className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-line py-8 text-xs text-muted md:flex-row">
          <p>© {new Date().getFullYear()} NovatraHQ • Prototype UI</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent" />
              UK → NG corridor
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent/50" />
              Stellar-backed rails
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
}

function TopBar() {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-line bg-surface">
            <Image
              src="/brand/novatra-icon-transparent.png"
              alt="Novatra"
              width={32}
              height={32}
              priority
            />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold tracking-tight text-white">
              Novatra
            </p>
            <p className="text-xs text-muted">Borderless transfers</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <ButtonLink href="/auth/sign-in" variant="secondary" size="sm">
          Sign in
        </ButtonLink>
      </div>
    </div>
  );
}

function QuotePreview() {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted">Send</p>
          <p className="text-3xl font-semibold tracking-tight text-white">
            £250.00
          </p>
        </div>
        <div className="rounded-xl border border-line bg-surface p-3 text-white/85">
          <Icon name="globe" className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-line bg-surface p-4">
          <p className="text-xs text-muted">Rate</p>
          <p className="mt-1 text-sm font-medium text-white">₦1,850 / £</p>
        </div>
        <div className="rounded-xl border border-line bg-surface p-4">
          <p className="text-xs text-muted">Fee</p>
          <p className="mt-1 text-sm font-medium text-white">£2.99</p>
        </div>
        <div className="col-span-2 rounded-xl border border-line bg-surface p-4">
          <p className="text-xs text-muted">Recipient gets</p>
          <p className="mt-1 text-lg font-semibold text-white">₦457,000</p>
          <p className="mt-1 text-xs text-muted">
            Estimated delivery: under 1 minute
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-xs text-muted">
        <span>Corridor</span>
        <span className="text-white/80">UK → Nigeria</span>
      </div>
    </Card>
  );
}

function Pill({
  icon,
  label,
}: {
  icon: Parameters<typeof Icon>[0]["name"];
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1">
      <Icon name={icon} className="h-4 w-4 text-muted" />
      <span>{label}</span>
    </span>
  );
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: Parameters<typeof Icon>[0]["name"];
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-xl border border-line bg-surface p-3 text-white/85">
        <Icon name={icon} className="h-5 w-5" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="text-sm leading-6 text-muted">{desc}</p>
      </div>
    </div>
  );
}

function Step({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-4">
      <div className="rounded-xl border border-line bg-surface-2 px-2.5 py-1 text-xs font-medium text-white/80">
        {n}
      </div>
      <div>
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="mt-1 text-sm text-muted">{desc}</p>
      </div>
    </div>
  );
}

function MiniStat({
  icon,
  label,
  value,
}: {
  icon: Parameters<typeof Icon>[0]["name"];
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-4">
      <div className="flex items-center gap-2 text-white/80">
        <Icon name={icon} className="h-4 w-4" />
        <span className="text-xs">{label}</span>
      </div>
      <p className="mt-2 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}
