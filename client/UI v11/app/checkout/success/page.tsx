'use client';

import { Navbar } from '@/components/navbar/navbar';
import { Footer } from '@/components/footer/footer';
import { SuccessCard } from '@/components/checkout/success-card';

export default function CheckoutSuccessPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F2F4F5]">
      <Navbar />

      {/* Main Content - Center aligned */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <SuccessCard orderId="1001" />
      </main>

      <Footer />
    </div>
  );
}
