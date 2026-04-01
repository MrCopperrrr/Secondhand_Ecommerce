'use client';

import { DecorationShape } from '@/components/auth/decoration-shape';
import { AuthCard } from '@/components/auth/auth-card';

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-[#F2FAFF] relative flex items-center justify-center overflow-hidden">
      {/* Decoration Shape */}
      <DecorationShape />

      {/* Content */}
      <div className="relative z-20 px-4">
        <AuthCard />
      </div>
    </div>
  );
}
