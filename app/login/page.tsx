"use client";

import Image from "next/image";
import { LoginForm } from "@/app/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen w-full bg-[#f8f9fc]">
      {/* ===== DESKTOP LAYOUT (lg and up) ===== */}
      <div className="hidden lg:block">
        {/* Background Image - Left Half */}
        <div className="absolute inset-y-0 left-0 w-1/2">
          <Image
            src="/images/login-bg.jpg"
            alt="Industrial metal coils"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right Panel with Form */}
        <div className="absolute inset-y-0 right-0 flex w-1/2 items-center justify-center bg-white/80 backdrop-blur-[50px] px-26">
          <div className="w-full max-w-[504px]">
            <LoginForm variant="desktop" />
          </div>
        </div>
      </div>

      {/* ===== TABLET LAYOUT (md to lg) ===== */}
      <div className="hidden md:flex lg:hidden min-h-screen">
        {/* Full Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/login-bg.jpg"
            alt="Industrial metal coils"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[rgba(36,42,55,0.7)]" />

        {/* Centered Modal */}
        <div className="relative z-10 flex min-h-screen w-full items-center justify-center p-8">
          <div className="w-full max-w-[345px]">
            <LoginForm variant="tablet" showCloseButton />
          </div>
        </div>
      </div>

      {/* ===== MOBILE LAYOUT (below md) ===== */}
      <div className="flex md:hidden min-h-screen flex-col">
        {/* Background Image - Top portion */}
        <div className="relative h-[40vh] w-full flex-shrink-0">
          <Image
            src="/images/login-bg.jpg"
            alt="Industrial metal coils"
            fill
            className="object-cover"
            priority
          />
          {/* Subtle overlay for better text contrast if needed */}
          <div className="absolute inset-0 bg-[rgba(36,42,55,0.3)]" />
        </div>

        {/* Form Card - Bottom portion */}
        <div className="relative z-10 -mt-6 flex-1 rounded-t-2xl bg-white">
          <div className="p-6">
            <LoginForm variant="mobile" showCloseButton />
          </div>
        </div>
      </div>
    </div>
  );
}
