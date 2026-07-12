"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/app/page-header";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/icons";
import { beneficiaries, corridor } from "@/lib/mock";
import { formatMoney } from "@/lib/format";
import { ConfirmModal } from "@/components/ui/confirm-modal";

type FundingMethod = "card" | "bank" | "stablecoin";
type StableAsset = "USDC" | "USDT";

export default function SendPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [amount, setAmount] = useState<string>("250");
  const [method, setMethod] = useState<FundingMethod>("card");
  const [beneficiaryId, setBeneficiaryId] = useState<string>(beneficiaries[0]!.id);
  const [stableAsset, setStableAsset] = useState<StableAsset>("USDC");
  const [resetOpen, setResetOpen] = useState(false);
  const [payOpen, setPayOpen] = useState(false);

  const parsedAmount = Number(amount || "0");
  const rate = 1850;
  const fee = method === "card" ? 2.99 : method === "bank" ? 1.5 : 0.75;
  const payout = Math.max(0, Math.floor((parsedAmount - fee) * rate));

  const selectedBeneficiary = useMemo(
    () => beneficiaries.find((b) => b.id === beneficiaryId) ?? beneficiaries[0]!,
    [beneficiaryId]
  );

  return (
    <div>
      <ConfirmModal
        open={resetOpen}
        onClose={() => setResetOpen(false)}
        title="Reset quote?"
        description="This will clear the amount and selected funding method."
        confirmText="Reset"
        confirmVariant="danger"
        onConfirm={() => {
          setAmount("250");
          setMethod("card");
          setStableAsset("USDC");
          setResetOpen(false);
        }}
      />

      <ConfirmModal
        open={payOpen}
        onClose={() => setPayOpen(false)}
        title="Confirm transfer?"
        description="This is a demo action for now — we’ll wire real payments next."
        confirmText="Pay & send"
        confirmVariant="primary"
        onConfirm={() => {
          setStep(3);
          setPayOpen(false);
        }}
      />

      <PageHeader
        title="Send"
        subtitle="Quote → confirm → track. UI-only demo for now."
        badge={`${corridor.from.currency} → ${corridor.to.currency}`}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title={step === 1 ? "Create quote" : step === 2 ? "Confirm transfer" : "Status"}
            subtitle={
              step === 1
                ? "Enter amount, choose a recipient, and see a transparent quote."
                : step === 2
                  ? "Review details before you pay."
                  : "A realistic status view (mocked)."
            }
            right={<StepPills step={step} />}
          />

          <div className="mt-6">
            {step === 1 ? (
              <div className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    id="amount"
                    name="amount"
                    label={`You send (${corridor.from.currency})`}
                    inputMode="decimal"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    rightSlot={<span className="text-xs">{corridor.from.symbol}</span>}
                    hint="Mock quote uses a fixed rate for the prototype."
                  />

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-white/90">
                      Recipient (Nigeria)
                    </label>
                    <select
                      value={beneficiaryId}
                      onChange={(e) => setBeneficiaryId(e.target.value)}
                      className="h-11 w-full rounded-xl border border-line bg-surface px-3.5 text-sm text-white outline-none transition focus:border-accent/40 focus:bg-surface-2"
                    >
                      {beneficiaries.map((b) => (
                        <option key={b.id} value={b.id} className="bg-[#101014]">
                          {b.fullName} • {b.bankName} {b.accountNumberMasked}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-muted">
                      You’ll be able to add/edit beneficiaries in the next iteration.
                    </p>
                  </div>
                </div>

                <FundingTabs method={method} setMethod={setMethod} />
                {method === "stablecoin" ? (
                  <StablecoinDepositCard
                    asset={stableAsset}
                    onAssetChange={setStableAsset}
                  />
                ) : null}

                <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={() => {
                      setResetOpen(true);
                    }}
                  >
                    Reset
                  </Button>
                  <Button type="button" onClick={() => setStep(2)} rightIcon={<Icon name="arrowRight" />}>
                    Continue
                  </Button>
                </div>
              </div>
            ) : step === 2 ? (
              <div className="space-y-4">
                <div className="rounded-2xl border border-line bg-surface p-5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-muted">Sending</p>
                      <p className="text-xl font-semibold text-white">
                        {formatMoney(parsedAmount || 0, "GBP")}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted">
                      <Badge variant="muted">{methodLabel(method)}</Badge>
                      <span className="text-muted-2">•</span>
                      <span>UK → Nigeria</span>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <SummaryItem label="Rate" value={`₦${rate.toLocaleString()} / £`} />
                    <SummaryItem label="Fee" value={formatMoney(fee, "GBP")} />
                    <SummaryItem
                      label="Recipient gets"
                      value={formatMoney(payout, "NGN")}
                      highlight
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-line bg-surface p-5">
                  <p className="text-sm font-semibold text-white">Recipient</p>
                  <p className="mt-1 text-sm text-muted">
                    {selectedBeneficiary.fullName} • {selectedBeneficiary.bankName}{" "}
                    {selectedBeneficiary.accountNumberMasked}
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    Payout method: bank transfer (mock)
                  </p>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                  <Button variant="secondary" type="button" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button type="button" onClick={() => setPayOpen(true)} rightIcon={<Icon name="bolt" />}>
                    Pay & send (demo)
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="rounded-2xl border border-line bg-surface p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white">Transfer in progress</p>
                      <p className="mt-1 text-sm text-muted">
                        We’re settling your transfer and preparing payout.
                      </p>
                    </div>
                    <Badge variant="warning">settling</Badge>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <SummaryItem label="You send" value={formatMoney(parsedAmount || 0, "GBP")} />
                    <SummaryItem label="Recipient gets" value={formatMoney(payout, "NGN")} highlight />
                  </div>
                </div>

                <Card>
                  <CardHeader
                    title="Timeline"
                    subtitle="This is a mocked status timeline to demonstrate UX."
                  />
                  <div className="mt-5 space-y-3">
                    <TimelineItem done label="Created" description="Transfer created and queued." />
                    <TimelineItem done label="Paid" description="Payment authorized (mock)." />
                    <TimelineItem active label="Settling" description="Stellar-backed settlement in progress." />
                    <TimelineItem label="Paid out" description="Local payout to recipient bank." />
                  </div>
                </Card>

                <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                  <Button variant="secondary" type="button" onClick={() => setStep(1)}>
                    Start new quote
                  </Button>
                  <Button type="button" onClick={() => alert("Next: wire API + real settlement.")}>
                    Continue (next)
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>

        <Card>
          <CardHeader
            title="What users see"
            subtitle="We keep it simple and transparent."
          />
          <div className="mt-5 space-y-3 text-sm text-muted">
            <Callout icon="shield" title="Trust by design">
              Clear fees, visible FX, and predictable status updates.
            </Callout>
            <Callout icon="globe" title="Global rails, local payout">
              Settlement happens in seconds; payout uses familiar methods.
            </Callout>
            <Callout icon="wallet" title="Stablecoins (optional)">
              Available as an advanced funding method without crypto-heavy UX.
            </Callout>
          </div>
        </Card>
      </div>
    </div>
  );
}

function methodLabel(method: FundingMethod) {
  if (method === "card") return "Card";
  if (method === "bank") return "Bank transfer";
  return "Stablecoin deposit";
}

function StepPills({ step }: { step: 1 | 2 | 3 }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <Pill active={step === 1} label="Quote" />
      <Pill active={step === 2} label="Confirm" />
      <Pill active={step === 3} label="Status" />
    </div>
  );
}

function Pill({ active, label }: { active: boolean; label: string }) {
  return (
    <span
      className={[
        "rounded-full border px-2.5 py-1",
        active ? "border-accent/25 bg-accent-soft text-accent" : "border-line bg-surface text-muted",
      ].join(" ")}
    >
      {label}
    </span>
  );
}

function FundingTabs({
  method,
  setMethod,
}: {
  method: FundingMethod;
  setMethod: (m: FundingMethod) => void;
}) {
  const tab = (m: FundingMethod, label: string, icon: Parameters<typeof Icon>[0]["name"]) => (
    <button
      type="button"
      onClick={() => setMethod(m)}
      className={[
        "flex-1 rounded-xl border px-3 py-3 text-left text-sm transition",
        method === m
          ? "border-accent/25 bg-accent-soft text-accent"
          : "border-line bg-surface text-muted hover:bg-surface-2",
      ].join(" ")}
    >
      <div className="flex items-center gap-2">
        <Icon name={icon} className="h-4 w-4" />
        <span className="font-medium">{label}</span>
      </div>
      <p className="mt-1 text-xs text-muted">
        {m === "card"
          ? "Fastest checkout (demo)."
          : m === "bank"
            ? "Lower fees, slower confirmation."
            : "Advanced option for power users."}
      </p>
    </button>
  );

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-white/90">Funding method</p>
      <div className="grid gap-2 sm:grid-cols-3">
        {tab("card", "Card", "creditCard")}
        {tab("bank", "Bank transfer", "receipt")}
        {tab("stablecoin", "Stablecoin deposit", "wallet")}
      </div>
    </div>
  );
}

function StablecoinDepositCard({
  asset,
  onAssetChange,
}: {
  asset: StableAsset;
  onAssetChange: (a: StableAsset) => void;
}) {
  const depositAddress = "GBZXN7PIRZGNMHGA2L2FK3KQ3KQ2J6VY7H3G2WQZ3F2R6XQYJH4QWXYZ";
  const memo = "NV-UKNG-000742";

  return (
    <div className="rounded-2xl border border-line bg-surface p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-white">Stablecoin deposit</p>
          <p className="text-sm text-muted">
            UI-only demo. In production, you’d deposit to a unique address + memo for this transfer.
          </p>
        </div>
        <Badge variant="brand">Stellar</Badge>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-line bg-surface p-4">
          <p className="text-xs text-muted">Asset</p>
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={() => onAssetChange("USDC")}
              className={[
                "rounded-full border px-3 py-1 text-xs font-medium transition",
                asset === "USDC"
                  ? "border-accent/25 bg-accent-soft text-accent"
                  : "border-line bg-surface text-muted hover:bg-surface-2",
              ].join(" ")}
            >
              USDC
            </button>
            <button
              type="button"
              onClick={() => onAssetChange("USDT")}
              className={[
                "rounded-full border px-3 py-1 text-xs font-medium transition",
                asset === "USDT"
                  ? "border-accent/25 bg-accent-soft text-accent"
                  : "border-line bg-surface text-muted hover:bg-surface-2",
              ].join(" ")}
            >
              USDT
            </button>
          </div>
          <p className="mt-2 text-xs text-muted-2">
            We’ll support more assets later. For now: {asset}.
          </p>
        </div>

        <div className="rounded-xl border border-line bg-surface p-4">
          <p className="text-xs text-muted">Confirmations</p>
          <p className="mt-2 text-sm font-semibold text-white">~ seconds</p>
          <p className="mt-1 text-xs text-muted-2">
            Stellar settlement is near-instant once the deposit is seen.
          </p>
        </div>

        <div className="sm:col-span-2 rounded-xl border border-line bg-surface p-4">
          <p className="text-xs text-muted">Deposit address</p>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <code className="break-all rounded-lg bg-black/25 px-3 py-2 text-xs text-white/80">
              {depositAddress}
            </code>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(depositAddress);
                } catch {
                  // ignore in demo
                }
              }}
            >
              Copy
            </Button>
          </div>
          <p className="mt-2 text-xs text-muted-2">
            In production this would be a per-user/per-transfer address (or a shared address with a required memo).
          </p>
        </div>

        <div className="sm:col-span-2 rounded-xl border border-accent/15 bg-accent-soft p-4">
          <p className="text-xs text-muted">Memo (required)</p>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <code className="break-all rounded-lg bg-black/25 px-3 py-2 text-xs text-white/90">
              {memo}
            </code>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(memo);
                } catch {
                  // ignore in demo
                }
              }}
            >
              Copy
            </Button>
          </div>
          <p className="mt-2 text-xs text-muted">
            Without the memo, the deposit can’t be matched to your transfer.
          </p>
        </div>
      </div>
    </div>
  );
}

function SummaryItem({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={[
        "rounded-xl border bg-surface p-4",
        highlight ? "border-accent/20 bg-accent-soft" : "border-line",
      ].join(" ")}
    >
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

function Callout({
  icon,
  title,
  children,
}: {
  icon: Parameters<typeof Icon>[0]["name"];
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-4">
      <div className="flex items-center gap-2 text-white/85">
        <Icon name={icon} className="h-4 w-4" />
        <p className="text-sm font-semibold text-white">{title}</p>
      </div>
      <p className="mt-2 text-sm leading-6 text-muted">{children}</p>
    </div>
  );
}

function TimelineItem({
  label,
  description,
  done,
  active,
}: {
  label: string;
  description: string;
  done?: boolean;
  active?: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <div
        className={[
          "mt-0.5 flex h-7 w-7 items-center justify-center rounded-full border",
          done
            ? "border-accent/20 bg-accent-soft text-accent"
            : active
              ? "border-accent bg-accent/20 text-accent"
              : "border-line bg-surface text-muted",
        ].join(" ")}
      >
        {done ? <Icon name="check" className="h-4 w-4" /> : <span className="text-xs">•</span>}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium text-white">{label}</p>
        <p className="text-sm text-muted">{description}</p>
      </div>
    </div>
  );
}
