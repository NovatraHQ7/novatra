import { notFound } from "next/navigation";
import { PageHeader } from "@/components/app/page-header";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/icons";
import { transfers } from "@/lib/mock";
import { formatDateTime, formatMoney } from "@/lib/format";

export default async function TransferDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const transfer = transfers.find((t) => t.id === id);
  if (!transfer) return notFound();

  const statusVariant =
    transfer.status === "paid_out"
      ? "ok"
      : transfer.status === "failed"
        ? "danger"
        : transfer.status === "settling"
          ? "warning"
          : "muted";

  return (
    <div>
      <PageHeader
        title="Transfer details"
        subtitle="Receipt-style view with clear breakdown."
        right={
          <ButtonLink
            href="/transfers"
            variant="secondary"
            size="sm"
            leftIcon={<Icon name="chevronRight" />}
            className="w-full sm:w-auto"
          >
            Back to transfers
          </ButtonLink>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title={`${formatMoney(transfer.sendAmount.amount, "GBP")} → ${formatMoney(
              transfer.payoutAmount.amount,
              "NGN"
            )}`}
            subtitle={`Transfer ID: ${transfer.id}`}
            right={<Badge variant={statusVariant}>{transfer.status.replace("_", " ")}</Badge>}
          />

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Item label="Created" value={formatDateTime(transfer.createdAt)} />
            <Item label="Corridor" value="UK → Nigeria" />
            <Item label="Recipient" value={`${transfer.beneficiary.fullName}`} />
            <Item label="Payout" value={`${transfer.beneficiary.bankName} ${transfer.beneficiary.accountNumberMasked}`} />
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-semibold text-white">Cost breakdown</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <Item label="You send" value={formatMoney(transfer.sendAmount.amount, "GBP")} strong />
              <Item label="Fee" value={formatMoney(transfer.fee.amount, "GBP")} />
              <Item label="Rate" value={`₦${transfer.rate.toLocaleString()} / £`} />
              <div className="sm:col-span-3">
                <div className="mt-2 flex items-center justify-between rounded-xl border border-cyan-200/15 bg-cyan-300/10 px-4 py-3">
                  <span className="text-sm text-white/75">Recipient gets</span>
                  <span className="text-sm font-semibold text-white">
                    {formatMoney(transfer.payoutAmount.amount, "NGN")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader title="Next steps" subtitle="What happens behind the scenes." />
          <div className="mt-5 space-y-3 text-sm text-white/70">
            <Hint icon="shield" title="Compliance checks">
              KYC/AML and limits run before settlement and payout.
            </Hint>
            <Hint icon="bolt" title="Settlement">
              Stellar-backed settlement happens quickly once pay-in is confirmed.
            </Hint>
            <Hint icon="globe" title="Local payout">
              Recipient receives funds via local payout rails (bank/mobile money).
            </Hint>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Item({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs text-white/55">{label}</p>
      <p className={strong ? "mt-1 text-sm font-semibold text-white" : "mt-1 text-sm text-white/80"}>
        {value}
      </p>
    </div>
  );
}

function Hint({
  icon,
  title,
  children,
}: {
  icon: Parameters<typeof Icon>[0]["name"];
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-2 text-white/85">
        <Icon name={icon} className="h-4 w-4" />
        <p className="text-sm font-semibold text-white">{title}</p>
      </div>
      <p className="mt-2 text-sm leading-6 text-white/60">{children}</p>
    </div>
  );
}
