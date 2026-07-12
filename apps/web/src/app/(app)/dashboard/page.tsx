 "use client";

import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/icons";
import { PageHeader } from "@/components/app/page-header";
import { beneficiaries, corridor, transfers } from "@/lib/mock";
import { formatMoney } from "@/lib/format";
import { useMe } from "@/lib/auth";
import Link from "next/link";

export default function DashboardPage() {
  const me = useMe();
  const last = transfers[0]!;
  const recent = transfers.slice(0, 3);
  const savedBeneficiaries = beneficiaries.slice(0, 3);
  const last30TotalSend = transfers.reduce((sum, t) => sum + t.sendAmount.amount, 0);
  const last30Fees = transfers.reduce((sum, t) => sum + t.fee.amount, 0);
  const avgRate = Math.round(
    transfers.reduce((sum, t) => sum + t.rate, 0) / Math.max(1, transfers.length)
  );
  const name =
    me.data?.user.fullName?.split(" ")[0] ||
    me.data?.user.email?.split("@")[0] ||
    "there";
  return (
    <div>
      <PageHeader
        title={`Welcome, ${name}`}
        subtitle="A clean, premium preview of Novatra’s remittance experience."
        right={
          <div className="flex w-full flex-col gap-2 sm:flex-row md:w-auto md:justify-end">
            <ButtonLink
              href="/send"
              rightIcon={<Icon name="arrowRight" />}
              className="w-full sm:w-auto"
            >
              New transfer
            </ButtonLink>
            <ButtonLink
              href="/transfers"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              View transfers
            </ButtonLink>
          </div>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="UK → Nigeria corridor"
            subtitle="Hardcoded for MVP to keep UX tight and fast."
            right={<Badge variant="brand">{corridor.from.currency} → {corridor.to.currency}</Badge>}
          />
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <Stat
              icon="bolt"
              label="Delivery target"
              value="Under 1 minute"
              hint="Settlement rails are instant; payout depends on partners."
            />
            <Stat
              icon="exchange"
              label="Pricing"
              value="Transparent"
              hint="Users see the rate, fee, and recipient amount before paying."
            />
            <Stat
              icon="shield"
              label="Experience"
              value="Fintech-first"
              hint="No crypto words. Compliance-ready from day one."
            />
          </div>
        </Card>

        <Card>
          <CardHeader title="Recent transfer" subtitle="Most recent activity in your account." />
          <div className="mt-5 space-y-3">
            <div className="rounded-xl border border-line bg-surface p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">
                    {formatMoney(last.sendAmount.amount, "GBP")} →{" "}
                    {formatMoney(last.payoutAmount.amount, "NGN")}
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    To {last.beneficiary.fullName} • {last.beneficiary.bankName}
                  </p>
                </div>
                <Badge
                  variant={
                    last.status === "paid_out"
                      ? "ok"
                      : last.status === "failed"
                        ? "danger"
                        : "warning"
                  }
                >
                  {last.status.replace("_", " ")}
                </Badge>
              </div>
            </div>
            <ButtonLink href={`/transfers/${last.id}`} variant="secondary" size="sm">
              View details
            </ButtonLink>
          </div>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Quick actions"
            subtitle="The fastest way to send support home."
            right={
              <ButtonLink href="/send" size="sm" rightIcon={<Icon name="arrowRight" />}>
                Start
              </ButtonLink>
            }
          />
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <QuickAction
              href="/send"
              icon="bolt"
              title="New transfer"
              subtitle="Get a quote in seconds."
            />
            <QuickAction
              href="/beneficiaries"
              icon="user"
              title="Add beneficiary"
              subtitle="Save recipients for next time."
            />
            <QuickAction
              href="/transfers"
              icon="receipt"
              title="Track status"
              subtitle="See receipts and updates."
            />
          </div>
        </Card>

        <Card>
          <CardHeader title="Account snapshot" subtitle="A lightweight overview (demo)." />
          <div className="mt-5 space-y-3">
            <SnapshotRow label="Total sent (recent)" value={formatMoney(last30TotalSend, "GBP")} />
            <SnapshotRow label="Fees paid (recent)" value={formatMoney(last30Fees, "GBP")} />
            <SnapshotRow label="Avg FX rate" value={`₦${avgRate.toLocaleString()} / £`} />
            <div className="rounded-xl border border-line bg-surface p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">Next step</p>
                  <p className="mt-1 text-sm text-muted">
                    Add a beneficiary and complete your first transfer.
                  </p>
                </div>
                <Badge variant="muted">MVP</Badge>
              </div>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <ButtonLink href="/beneficiaries" variant="secondary" size="sm">
                  Add beneficiary
                </ButtonLink>
                <ButtonLink href="/send" size="sm">
                  Send money
                </ButtonLink>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Recent activity" subtitle="Transfers and their latest status." />
          <div className="mt-5 divide-y divide-line">
            {recent.map((t) => (
              <div key={t.id} className="flex items-start justify-between gap-3 py-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">
                    {formatMoney(t.sendAmount.amount, "GBP")} →{" "}
                    {formatMoney(t.payoutAmount.amount, "NGN")}
                  </p>
                  <p className="mt-1 truncate text-sm text-muted">
                    To {t.beneficiary.fullName} • {t.beneficiary.bankName}
                  </p>
                  <p className="mt-1 text-xs text-muted-2">
                    Fee {formatMoney(t.fee.amount, "GBP")} • Rate ₦{t.rate.toLocaleString()} / £
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-2">
                  <Badge
                    variant={
                      t.status === "paid_out"
                        ? "ok"
                        : t.status === "failed"
                          ? "danger"
                          : "warning"
                    }
                  >
                    {t.status.replace("_", " ")}
                  </Badge>
                  <ButtonLink href={`/transfers/${t.id}`} variant="ghost" size="sm">
                    View
                  </ButtonLink>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <ButtonLink href="/transfers" variant="secondary" size="sm">
              View all transfers
            </ButtonLink>
          </div>
        </Card>

        <Card>
          <CardHeader title="Saved beneficiaries" subtitle="People you can send to (demo)." />
          <div className="mt-5 space-y-3">
            {savedBeneficiaries.map((b) => (
              <div key={b.id} className="rounded-xl border border-line bg-surface p-4">
                <p className="text-sm font-semibold text-white">{b.fullName}</p>
                <p className="mt-1 text-sm text-muted">
                  {b.bankName} • {b.accountNumberMasked}
                </p>
              </div>
            ))}
            <ButtonLink href="/beneficiaries" variant="secondary" size="sm">
              Manage beneficiaries
            </ButtonLink>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
  hint,
}: {
  icon: Parameters<typeof Icon>[0]["name"];
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-4">
      <div className="flex items-center gap-2 text-white/80">
        <Icon name={icon} className="h-4 w-4" />
        <p className="text-xs">{label}</p>
      </div>
      <p className="mt-2 text-sm font-semibold text-white">{value}</p>
      <p className="mt-1 text-xs leading-5 text-muted">{hint}</p>
    </div>
  );
}

function SnapshotRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-line bg-surface px-4 py-3">
      <p className="text-sm text-muted">{label}</p>
      <p className="text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

function QuickAction({
  href,
  icon,
  title,
  subtitle,
}: {
  href: string;
  icon: Parameters<typeof Icon>[0]["name"];
  title: string;
  subtitle: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-line bg-surface p-4 transition hover:border-line hover:bg-surface-2"
    >
      <div className="flex items-center gap-2 text-white/85">
        <Icon name={icon} className="h-4 w-4" />
        <p className="text-sm font-semibold text-white">{title}</p>
      </div>
      <p className="mt-1 text-sm text-muted">{subtitle}</p>
      <div className="mt-3 flex items-center gap-2 text-xs text-muted">
        <span>Open</span>
        <Icon name="arrowRight" className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}
