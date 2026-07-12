import Image from "next/image";
import Link from "next/link";
import { FlowLines } from "@/components/flow-lines";

export function AuthShell({
  eyebrow,
  headline,
  mobileHeadline,
  panel,
  children,
}: {
  eyebrow: string;
  headline: string;
  mobileHeadline: string;
  panel: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <div className="flex items-center gap-3 border-b border-line bg-surface px-6 py-5 lg:hidden">
        <Logo />
        <p className="text-sm font-semibold text-white">{mobileHeadline}</p>
      </div>

      <aside className="relative hidden overflow-hidden bg-surface px-10 py-8 lg:flex lg:w-[45%] lg:flex-col lg:justify-between">
        <FlowLines />

        <div className="relative">
          <Logo />
        </div>

        <div className="relative">
          <p className="text-xs text-muted">{eyebrow}</p>
          <h2 className="mt-2 max-w-sm text-2xl font-bold text-white">
            {headline}
          </h2>
          <div className="mt-5 max-w-sm">{panel}</div>
        </div>

        <p className="relative text-xs text-muted-2">
          © {new Date().getFullYear()} NovatraHQ
        </p>
      </aside>

      <div className="flex flex-1 flex-col items-center justify-center px-6 py-10">
        <div className="w-full max-w-sm">
          {children}

          <p className="mt-6 text-center text-xs text-muted-2">
            By continuing, you agree to Novatra’s terms and privacy policy
            (demo).
          </p>
        </div>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <Link href="/" className="group inline-flex items-center gap-2">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-background transition group-hover:bg-surface-2">
        <Image
          src="/brand/novatra-icon-transparent.png"
          alt="Novatra"
          width={22}
          height={22}
          priority
        />
      </div>
      <div className="leading-tight">
        <p className="text-sm font-semibold tracking-tight text-white">
          Novatra
        </p>
        <p className="text-xs text-muted">Borderless transfers</p>
      </div>
    </Link>
  );
}
