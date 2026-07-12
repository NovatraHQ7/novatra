import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/icons";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative flex flex-1 items-center justify-center px-6 py-10">
      <main className="relative w-full max-w-6xl">
        <TopBar />

        <section className="relative overflow-hidden rounded-3xl pb-4 pt-10 lg:pt-14">
          <FlowLines />

          <div className="relative space-y-6 px-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs text-white/80">
              <Icon name="sparkles" className="h-4 w-4" />
              MVP prototype — UK → Nigeria corridor
            </div>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
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
          </div>

          <div className="relative mt-10 grid gap-4 px-2 lg:grid-cols-3 lg:grid-rows-2">
            <div className="lg:col-span-2 lg:row-span-2">
              <QuotePreview />
            </div>
            <StatTile value="<1min" label="Settlement time" emphasized />
            <StatTile value="3 steps" label="Quote → Confirm → Track" />
          </div>

          <div className="relative mt-4 grid gap-4 px-2 sm:grid-cols-3">
            <MiniFeature
              title="Transparent pricing"
              desc="Rate, fee, and amount shown before you pay."
            />
            <MiniFeature
              title="Built for trust"
              desc="Clear statuses, clean receipts, KYC-ready."
            />
            <MiniFeature
              title={'Not a "crypto app"'}
              desc="Stellar rails run quietly behind the scenes."
            />
          </div>
        </section>

        <section className="mt-16 lg:mt-24">
          <SectionLabel>Why Novatra</SectionLabel>
          <div className="mt-4 grid gap-4 lg:grid-cols-[1.3fr_1fr]">
            <div className="rounded-2xl border border-line bg-surface p-7">
              <h2 className="text-xl font-semibold text-white">
                Transparent, before you pay
              </h2>
              <p className="mt-2 max-w-md text-sm leading-6 text-muted">
                We show the rate, fee, and recipient amount upfront with a
                quote expiry — no surprises after you commit.
              </p>
            </div>
            <div className="flex flex-col justify-center gap-5 px-1">
              <div className="border-b border-line pb-5">
                <p className="text-sm font-semibold text-white">
                  Instant settlement feel
                </p>
                <p className="mt-1 text-sm text-muted">
                  Transfers feel immediate; settlement runs on modern rails
                  designed for speed.
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  Built for trust
                </p>
                <p className="mt-1 text-sm text-muted">
                  Clear statuses, clean receipts, and compliance hooks from
                  day one.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16 lg:mt-24">
          <SectionLabel>How it works</SectionLabel>
          <div className="mt-6 grid gap-8 sm:grid-cols-3 sm:divide-x sm:divide-line">
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
              accent
            />
          </div>
        </section>

        <section className="mt-16 lg:mt-24">
          <div className="flex flex-col items-center gap-8 rounded-3xl bg-surface p-8 sm:flex-row sm:p-10">
            <div className="flex-1">
              <SectionLabel>Why it matters</SectionLabel>
              <h2 className="mt-3 text-xl font-semibold text-white">
                Built for diaspora and families back home
              </h2>
              <p className="mt-2 max-w-md text-sm leading-6 text-muted">
                Remittances power rent, school, healthcare, and emergencies.
                Sending support shouldn’t be slow or expensive.
              </p>
            </div>
            <div className="shrink-0 text-center">
              <p className="text-4xl font-bold text-accent">Africa-first</p>
              <p className="mt-2 max-w-55 text-xs text-muted">
                Focus and pricing built around one corridor, done right.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-16 border-y border-line py-10 text-center lg:mt-24">
          <h2 className="text-xl font-semibold text-white">
            Explore the send flow and transfer receipts
          </h2>
          <p className="mt-1 text-sm text-muted">
            UI-only for now — we’ll wire APIs next.
          </p>
          <div className="mt-5 flex flex-col items-center justify-center gap-2 sm:flex-row">
            <ButtonLink href="/send" rightIcon={<Icon name="arrowRight" />}>
              Start a transfer
            </ButtonLink>
            <ButtonLink href="/transfers" variant="secondary">
              View transfers
            </ButtonLink>
          </div>
        </section>

        <footer className="mt-10 flex flex-col items-center justify-between gap-3 py-8 text-xs text-muted md:flex-row">
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

function FlowLines() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 800 500"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M -50 380 C 150 280, 250 420, 420 260 S 650 140, 900 200"
        stroke="#10b981"
        strokeWidth="2"
        fill="none"
        opacity="0.35"
        strokeDasharray="14 10"
        className="nv-flow-line"
        style={{ animationDuration: "9s" }}
      />
      <path
        d="M -50 260 C 200 380, 300 120, 480 300 S 700 360, 900 260"
        stroke="#ffffff"
        strokeWidth="1"
        fill="none"
        opacity="0.12"
        strokeDasharray="10 14"
        className="nv-flow-line"
        style={{ animationDuration: "13s", animationDirection: "reverse" }}
      />
    </svg>
  );
}

function QuotePreview() {
  return (
    <div className="h-full rounded-2xl border border-line bg-surface p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted">Send</p>
          <p className="text-3xl font-semibold tracking-tight text-white">
            £250.00
          </p>
        </div>
        <div className="rounded-xl border border-line bg-surface-2 p-3 text-white/85">
          <Icon name="globe" className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-line bg-surface-2 p-4">
          <p className="text-xs text-muted">Rate</p>
          <p className="mt-1 text-sm font-medium text-white">₦1,850 / £</p>
        </div>
        <div className="rounded-xl border border-line bg-surface-2 p-4">
          <p className="text-xs text-muted">Fee</p>
          <p className="mt-1 text-sm font-medium text-white">£2.99</p>
        </div>
        <div className="col-span-2 rounded-xl border border-line bg-surface-2 p-4">
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
    </div>
  );
}

function StatTile({
  value,
  label,
  emphasized,
}: {
  value: string;
  label: string;
  emphasized?: boolean;
}) {
  return (
    <div
      className={
        emphasized
          ? "flex flex-col justify-center rounded-2xl bg-accent p-6 text-accent-ink"
          : "flex flex-col justify-center rounded-2xl border border-line bg-surface p-6"
      }
    >
      <p
        className={
          emphasized
            ? "text-2xl font-bold"
            : "text-2xl font-bold text-white"
        }
      >
        {value}
      </p>
      <p
        className={
          emphasized
            ? "mt-1 text-xs font-medium"
            : "mt-1 text-xs text-muted"
        }
      >
        {label}
      </p>
    </div>
  );
}

function MiniFeature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-5">
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="mt-1.5 text-xs leading-5 text-muted">{desc}</p>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-wider text-accent">
      {children}
    </p>
  );
}

function Step({
  n,
  title,
  desc,
  accent,
}: {
  n: string;
  title: string;
  desc: string;
  accent?: boolean;
}) {
  return (
    <div className="pl-0 sm:pl-8 first:pl-0">
      <p
        className={
          accent
            ? "text-4xl font-extrabold text-accent"
            : "text-4xl font-extrabold text-line"
        }
      >
        {n}
      </p>
      <p className="mt-2 text-sm font-semibold text-white">{title}</p>
      <p className="mt-1 text-sm leading-6 text-muted">{desc}</p>
    </div>
  );
}
