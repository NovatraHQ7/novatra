"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/components/ui/cn";
import { Icon } from "@/components/icons";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: "sparkles" as const },
  { href: "/send", label: "Send", icon: "exchange" as const },
  { href: "/beneficiaries", label: "Beneficiaries", icon: "user" as const },
  { href: "/transfers", label: "Transfers", icon: "receipt" as const },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {items.map((it) => {
        const active =
          pathname === it.href ||
          (it.href !== "/dashboard" && pathname.startsWith(it.href));
        return (
          <Link
            key={it.href}
            href={it.href}
            className={cn(
              "flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition",
              active
                ? "border-l-2 border-accent bg-accent-soft text-white"
                : "text-muted hover:bg-surface hover:text-white"
            )}
          >
            <Icon name={it.icon} className="h-4 w-4" />
            <span>{it.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-background px-2 py-2 lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-4 gap-1">
        {items.map((it) => {
          const active =
            pathname === it.href ||
            (it.href !== "/dashboard" && pathname.startsWith(it.href));
          return (
            <Link
              key={it.href}
              href={it.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[11px] transition",
                active
                  ? "bg-accent-soft text-accent"
                  : "text-muted hover:bg-surface hover:text-white"
              )}
            >
              <Icon name={it.icon} className="h-4 w-4" />
              <span className="leading-none">{it.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
