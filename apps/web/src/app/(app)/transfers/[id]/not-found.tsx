import { PageHeader } from "@/components/app/page-header";
import { Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/icons";

export default function TransferNotFound() {
  return (
    <div>
      <PageHeader
        title="Transfer details"
        subtitle="Receipt-style view with clear breakdown."
      />

      <Card className="flex flex-col items-center gap-4 py-12 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface text-muted">
          <Icon name="search" className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <p className="text-base font-semibold text-white">Transfer not found</p>
          <p className="text-sm text-muted">
            We couldn&apos;t find a transfer with that ID. It may have been removed or the link is incorrect.
          </p>
        </div>
        <ButtonLink href="/transfers" variant="secondary" size="sm">
          Back to transfers
        </ButtonLink>
      </Card>
    </div>
  );
}
