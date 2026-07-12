import { cn } from "./cn";

export function Badge({
  variant = "muted",
  children,
  className,
}: {
  variant?: "muted" | "brand" | "ok" | "danger" | "warning";
  children: React.ReactNode;
  className?: string;
}) {
  const styles: Record<string, string> = {
    muted: "bg-surface text-white/75 border-line",
    brand: "bg-surface-2 text-white border-line",
    ok: "bg-accent-soft text-accent border-accent/20",
    danger: "bg-danger-soft text-danger border-danger/20",
    warning: "bg-warning-soft text-warning border-warning/20",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

