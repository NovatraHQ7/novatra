import { PageHeader } from "@/components/app/page-header";
import { Card } from "@/components/ui/card";

export default function TransferDetailsLoading() {
  return (
    <div>
      <PageHeader
        title="Transfer details"
        subtitle="Receipt-style view with clear breakdown."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 animate-pulse">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-2">
              <div className="h-4 w-48 rounded bg-surface-2" />
              <div className="h-3 w-32 rounded bg-surface" />
            </div>
            <div className="h-6 w-20 rounded-full bg-surface-2" />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-line bg-surface p-4">
                <div className="h-3 w-16 rounded bg-surface-2" />
                <div className="mt-2 h-4 w-28 rounded bg-surface-2" />
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-line bg-surface p-5">
            <div className="h-4 w-32 rounded bg-surface-2" />
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-line bg-surface p-4">
                  <div className="h-3 w-14 rounded bg-surface-2" />
                  <div className="mt-2 h-4 w-20 rounded bg-surface-2" />
                </div>
              ))}
              <div className="sm:col-span-3 h-11 rounded-xl bg-surface" />
            </div>
          </div>
        </Card>

        <Card className="animate-pulse">
          <div className="space-y-2">
            <div className="h-4 w-24 rounded bg-surface-2" />
            <div className="h-3 w-40 rounded bg-surface" />
          </div>
          <div className="mt-5 space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-line bg-surface p-4">
                <div className="h-4 w-32 rounded bg-surface-2" />
                <div className="mt-2 h-3 w-full rounded bg-surface" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
