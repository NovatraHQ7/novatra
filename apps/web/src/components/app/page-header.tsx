import { Badge } from "@/components/ui/badge";

export function PageHeader({
  title,
  subtitle,
  right,
  badge,
}: {
  title: string;
  subtitle?: string;
  badge?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div className="min-w-0 space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="min-w-0 truncate text-2xl font-semibold tracking-tight text-white">
            {title}
          </h1>
          {badge ? (
            <Badge variant="muted" className="shrink-0">
              {badge}
            </Badge>
          ) : null}
        </div>
        {subtitle ? <p className="text-sm text-white/60">{subtitle}</p> : null}
      </div>
      {right ? (
        <div className="flex w-full flex-wrap items-center gap-2 md:w-auto md:justify-end">
          {right}
        </div>
      ) : null}
    </div>
  );
}
