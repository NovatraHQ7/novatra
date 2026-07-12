import { cn } from "./cn";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("nv-card rounded-2xl p-5", className)}>{children}</div>;
}

export function CardHeader({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div className="space-y-1">
        <h2 className="text-base font-semibold text-white">{title}</h2>
        {subtitle ? <p className="text-sm text-muted">{subtitle}</p> : null}
      </div>
      {right ? <div className="sm:shrink-0 sm:self-start">{right}</div> : null}
    </div>
  );
}
