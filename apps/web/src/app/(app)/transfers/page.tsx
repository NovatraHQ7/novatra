import Link from "next/link";
import { PageHeader } from "@/components/app/page-header";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/icons";
import { transfers } from "@/lib/mock";
import { formatDateTime, formatMoney } from "@/lib/format";

export default function TransfersPage() {
  return (
    <div>
      <PageHeader
        title="Transfers"
        subtitle="Status tracking and receipts (demo data)."
      />

      <Card>
        <CardHeader
          title="All transfers"
          subtitle="Click a transfer to view details."
          right={<Badge variant="muted">{transfers.length} total</Badge>}
        />

        <div className="mt-5 divide-y divide-line">
          {transfers.map((t) => (
            <Link
              key={t.id}
              href={`/transfers/${t.id}`}
              className="flex items-start justify-between gap-3 py-4 transition hover:bg-surface-2 sm:-mx-5 sm:px-5"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  {formatMoney(t.sendAmount.amount, "GBP")} →{" "}
                  {formatMoney(t.payoutAmount.amount, "NGN")}
                </p>
                <p className="mt-1 text-sm text-muted">
                  To {t.beneficiary.fullName} • {t.beneficiary.bankName}
                </p>
                <p className="mt-1 text-xs text-muted">
                  {formatDateTime(t.createdAt)} • Fee {formatMoney(t.fee.amount, "GBP")} • Rate ₦{t.rate.toLocaleString()}/£
                </p>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={t.status} />
                <Icon name="chevronRight" className="h-4 w-4 text-muted-2" />
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const variant =
    status === "paid_out"
      ? "ok"
      : status === "failed"
        ? "danger"
        : status === "settling"
          ? "warning"
          : "muted";
  return <Badge variant={variant}>{status.replace("_", " ")}</Badge>;
}
