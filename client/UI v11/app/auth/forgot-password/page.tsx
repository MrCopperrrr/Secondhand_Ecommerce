'use client';

import { BlobBackground } from '@/components/auth/blob-background';
import { ForgotPasswordCard } from '@/components/auth/forgot-password-card';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen relative flex items-center justify-center">
      <BlobBackground />
      <ForgotPasswordCard />
    </div>
  );
}
