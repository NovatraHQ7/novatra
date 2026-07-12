import { MobileNav, Nav } from "./nav";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import Image from "next/image";
import { SignOutButton } from "./sign-out-button";
import { SignedInUser } from "./signed-in-user";

export function AppShell({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-0)]">
      <aside className="hidden w-72 shrink-0 border-r border-line bg-sidebar p-5 lg:block">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-line bg-surface text-white">
              <Image
                src="/brand/novatra-icon-transparent.png"
                alt="Novatra"
                width={32}
                height={32}
                priority
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Novatra</p>
              <p className="text-xs text-muted">Prototype</p>
            </div>
          </div>
          <Badge variant="brand">UK → NG</Badge>
        </div>

        <div className="mt-6">
          <Nav />
        </div>

        <div className="mt-6 rounded-2xl border border-line bg-surface p-4">
          <p className="text-sm font-semibold text-white">
            Instant settlement feel
          </p>
          <p className="mt-1 text-sm text-muted">
            We keep blockchain rails invisible and the UX familiar.
          </p>
          <div className="mt-3">
            <ButtonLink href="/send" variant="secondary" size="sm">
              Send money
            </ButtonLink>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 border-b border-line bg-background px-4 py-3 md:px-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="hidden min-w-0 md:block">
                {title ? (
                  <p className="truncate text-sm font-semibold text-white">
                    {title}
                  </p>
                ) : null}
                <p className="truncate text-xs text-muted">
                  Clean, premium, and secure — built for cross-border transfers.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <SignedInUser />
              <SignOutButton />
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 pb-24 md:px-6 lg:pb-6">
          {children}
        </main>
      </div>

      <MobileNav />
    </div>
  );
}
