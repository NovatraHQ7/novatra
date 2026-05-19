 "use client";

import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/icons";
import { PageHeader } from "@/components/app/page-header";
import { corridor, transfers } from "@/lib/mock";
import { formatMoney } from "@/lib/format";
import { useMe } from "@/lib/auth";

export default function DashboardPage() {
  const me = useMe();
  const last = transfers[0]!;
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
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">
                    {formatMoney(last.sendAmount.amount, "GBP")} →{" "}
                    {formatMoney(last.payoutAmount.amount, "NGN")}
                  </p>
                  <p className="mt-1 text-sm text-white/60">
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
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-2 text-white/80">
        <Icon name={icon} className="h-4 w-4" />
        <p className="text-xs">{label}</p>
      </div>
      <p className="mt-2 text-sm font-semibold text-white">{value}</p>
      <p className="mt-1 text-xs leading-5 text-white/55">{hint}</p>
    </div>
  );
}
