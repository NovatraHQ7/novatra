import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-[calc(100vh-0px)] items-center justify-center px-6 py-12">
      <div className="nv-grid absolute inset-0" />
      <div className="relative w-full max-w-md">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/" className="group inline-flex items-center gap-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/5 transition group-hover:bg-white/7">
              <Image
                src="/brand/novatra-icon-transparent.png"
                alt="Novatra"
                width={32}
                height={32}
                priority
              />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold tracking-tight text-white">
                Novatra
              </p>
              <p className="text-xs text-white/55">Secure sign in</p>
            </div>
          </Link>
        </div>

        {children}

        <p className="mt-6 text-center text-xs text-white/45">
          By continuing, you agree to Novatra’s terms and privacy policy (demo).
        </p>
      </div>
    </div>
  );
}
