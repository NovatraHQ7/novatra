import Link from "next/link";
import { cn } from "./cn";

type CommonProps = {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  loadingText?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition will-change-transform active:translate-y-px disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<NonNullable<CommonProps["variant"]>, string> = {
  primary: "bg-accent text-accent-ink hover:bg-accent/90",
  secondary: "bg-surface text-white hover:bg-surface-2 border border-line",
  ghost: "bg-transparent text-white/90 hover:bg-surface",
  danger: "bg-danger text-white hover:bg-danger/90",
};

const sizes: Record<NonNullable<CommonProps["size"]>, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-base",
};

export function Button(
  props: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    leftIcon,
    rightIcon,
    loading,
    loadingText,
    ...rest
  } = props;
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={loading || rest.disabled}
      {...rest}
    >
      {loading ? <Spinner /> : leftIcon}
      <span>{loading && loadingText ? loadingText : children}</span>
      {loading ? null : rightIcon}
    </button>
  );
}

export function ButtonLink(
  props: CommonProps & { href: string; prefetch?: boolean }
) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    leftIcon,
    rightIcon,
    href,
    prefetch,
  } = props;
  return (
    <Link
      href={href}
      prefetch={prefetch}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {leftIcon}
      <span>{children}</span>
      {rightIcon}
    </Link>
  );
}

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="2"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
