import { cn } from "./cn";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
  rightSlot?: React.ReactNode;
};

export function Input({
  label,
  hint,
  error,
  className,
  rightSlot,
  ...rest
}: InputProps) {
  const describedBy = [
    hint ? `${rest.name ?? rest.id}-hint` : null,
    error ? `${rest.name ?? rest.id}-error` : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="space-y-1.5">
      {label ? (
        <label
          className="text-sm font-medium text-white/90"
          htmlFor={rest.id}
        >
          {label}
        </label>
      ) : null}
      <div className="relative">
        <input
          {...rest}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy || undefined}
          className={cn(
            "h-11 w-full rounded-xl border border-line bg-surface px-3.5 text-sm text-white placeholder:text-muted outline-none transition focus:border-accent/40 focus:bg-surface-2 focus:ring-2 focus:ring-accent/20",
            rightSlot ? "pr-11" : null,
            error ? "border-danger/50 ring-2 ring-danger/15" : null,
            className
          )}
        />
        {rightSlot ? (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted">
            {rightSlot}
          </div>
        ) : null}
      </div>
      {hint ? (
        <p id={`${rest.name ?? rest.id}-hint`} className="text-xs text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p
          id={`${rest.name ?? rest.id}-error`}
          className="text-xs text-danger"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

