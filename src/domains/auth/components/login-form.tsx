"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

const inputCls =
  "w-full h-11 px-3.5 rounded-[10px] border border-[#DEDBD6] bg-white " +
  "text-[15px] text-[#0D1F3C] placeholder:text-[#A09D99] " +
  "focus:outline-none focus:border-[#0D1F3C] transition-colors duration-150";

const labelCls = "block text-[13px] font-medium text-[#0D1F3C] mb-1.5 tracking-[0.01em]";

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  const handleGoogle = () => {
    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

      {/* Email */}
      <div>
        <label htmlFor="email" className={labelCls}>Email</label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          className={inputCls}
        />
      </div>

      {/* Password */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor="password" className="text-[13px] font-medium text-[#0D1F3C] tracking-[0.01em]">
            Password
          </label>
          <a href="#" className="text-[12px] text-[#6B6760] hover:text-[#0D1F3C] transition-colors underline underline-offset-4">
            Forgot password?
          </a>
        </div>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            autoComplete="current-password"
            className={inputCls + " pr-11"}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A09D99] hover:text-[#0D1F3C] transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword
              ? <EyeOff className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
              : <Eye    className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
            }
          </button>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full h-11 flex items-center justify-center gap-2 rounded-[10px] font-semibold text-[13px] tracking-[0.01em] transition-opacity duration-150 hover:opacity-80"
        style={{ backgroundColor: "#E8A838", color: "#0D1F3C" }}
      >
        Sign in
        <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-[#DEDBD6]" />
        <span className="text-[12px] text-[#A09D99] tracking-[0.015em]">or continue with</span>
        <div className="flex-1 h-px bg-[#DEDBD6]" />
      </div>

      {/* Google */}
      <button
        type="button"
        onClick={handleGoogle}
        className="w-full h-11 flex items-center justify-center gap-2.5 rounded-[10px] border border-[#DEDBD6] bg-[#F5F4F1] text-[13px] font-medium text-[#0D1F3C] hover:opacity-80 transition-opacity duration-150"
      >
        <GoogleIcon />
        Sign in with Google
      </button>

    </form>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}
