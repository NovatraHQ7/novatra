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
    muted: "bg-white/8 text-white/75 border-white/10",
    brand: "bg-cyan-300/15 text-cyan-100 border-cyan-200/20",
    ok: "bg-emerald-300/15 text-emerald-100 border-emerald-200/20",
    danger: "bg-rose-300/15 text-rose-100 border-rose-200/20",
    warning: "bg-amber-300/15 text-amber-100 border-amber-200/20",
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

