import { Link } from "@/i18n/routing";
import { LoginForm } from "@/domains/auth/components/login-form";
import { Globe2, Mic, HeartPulse } from "lucide-react";

export const metadata = {
  title: "Sign in — Gle",
  description: "Sign in to your Gle account",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex bg-[#F8F9FA]">

      {/* ── Left panel — brand/visual ── */}
      <div className="hidden lg:flex lg:w-[45%] flex-col justify-between p-12 relative overflow-hidden bg-[var(--gle-primary)]">

        {/* Playful Background Elements */}
        <div className="absolute top-20 -left-10 text-white/20 rotate-12">
          <Globe2 size={160} strokeWidth={2} />
        </div>
        <div className="absolute bottom-32 -right-10 text-[var(--gle-primary-hover)] opacity-50 -rotate-12">
          <Mic size={200} strokeWidth={2} />
        </div>
        <div className="absolute top-1/2 left-1/2 text-white/10 -translate-x-1/2 -translate-y-1/2 scale-150">
          <HeartPulse size={300} strokeWidth={1} />
        </div>

        {/* Logo — top left */}
        <div className="relative z-10 flex items-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-[0_4px_0_rgba(0,0,0,0.1)]">
            <span className="text-[var(--gle-primary)] font-black text-2xl leading-none pt-1">g</span>
          </div>
          <span className="text-white text-2xl font-black tracking-tight">
            Gle
          </span>
        </div>

        {/* Headline — vertically centered */}
        <div className="relative z-10 flex-1 flex flex-col justify-center py-12">
          <h1 className="text-white text-5xl font-black leading-[1.1] tracking-tight mb-6 max-w-[400px]">
            Welcome back to the exchange!
          </h1>
          <p className="text-white/90 text-lg font-bold leading-relaxed max-w-[360px]">
            Log in to continue building your conversational confidence with native speakers.
          </p>
        </div>

        {/* Footer — bottom left */}
        <div className="relative z-10">
          <p className="text-white/60 text-sm font-bold tracking-widest uppercase">
            © 2026 Gle
          </p>
        </div>
      </div>

      {/* ── Right panel — form ── */}
      <div className="flex-1 flex items-center justify-center p-8 bg-[#F8F9FA]">
        <div className="w-full max-w-[440px] bg-white border-2 border-[#E5E5E5] rounded-[2rem] p-10 shadow-[0_12px_40px_rgba(0,0,0,0.04)]">

          {/* Logo — mobile only */}
          <div className="lg:hidden flex items-center gap-2 mb-10 justify-center">
            <div className="w-12 h-12 rounded-2xl bg-[var(--gle-primary)] flex items-center justify-center shadow-[0_4px_0_var(--gle-primary-hover)]">
              <span className="text-white font-black text-2xl leading-none pt-1">g</span>
            </div>
            <span className="text-[#4B4B4B] text-3xl font-black tracking-tight">
              Gle
            </span>
          </div>

          {/* Page header */}
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-[#4B4B4B] text-3xl font-black tracking-tight mb-3">
              Log in
            </h2>
            <p className="text-[#AFAFAF] text-[15px] font-bold">
              We're excited to see you again.
            </p>
          </div>

          {/* Form */}
          <LoginForm />

          {/* Footer link */}
          <div className="mt-8 pt-8 border-t-2 border-[#F3F4F4] text-center">
            <p className="text-[14px] font-bold text-[#AFAFAF]">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-[var(--gle-primary)] hover:text-[var(--gle-primary-hover)] transition-colors uppercase tracking-widest ml-1"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
