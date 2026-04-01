'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar/navbar';
import { Footer } from '@/components/footer/footer';
import { Breadcrumbs } from '@/components/home/breadcrumbs';
import { BillingForm } from '@/components/checkout/billing-form';
import { PaymentMethodSelector } from '@/components/checkout/payment-method-selector';
import { CheckoutSummary } from '@/components/checkout/checkout-summary';

// Mock cart items
const CART_ITEMS = [
  {
    id: 'product-1',
    name: 'iPhone 13 Pro Max 256GB - Màu đen',
    price: 15000000,
    image: 'https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=400&h=400&fit=crop',
    quantity: 1,
  },
  {
    id: 'product-2',
    name: 'AirPods Pro - Wireless Earbuds',
    price: 5500000,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    quantity: 1,
  },
  {
    id: 'product-3',
    name: 'Apple Watch Series 7 - 45mm',
    price: 9800000,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    quantity: 1,
  },
];

interface BillingFormData {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  province: string;
  ward: string;
  deliveryMethod: 'shipping' | 'meetup';
  campus: string;
}

type PaymentMethod = 'cod' | 'bank' | 'ewallet' | 'card';

export default function CheckoutPage() {
  const [formData, setFormData] = useState<BillingFormData>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    province: '',
    ward: '',
    deliveryMethod: 'shipping',
    campus: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');

  const handleFormChange = (data: BillingFormData) => {
    setFormData(data);
  };

  const handleCheckout = () => {
    console.log('Checkout initiated:', {
      formData,
      paymentMethod,
      items: CART_ITEMS,
    });
    alert(`Đặt hàng thành công! Phương thức thanh toán: ${
      paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng' :
      paymentMethod === 'bank' ? 'Tài khoản ngân hàng' :
      paymentMethod === 'ewallet' ? 'Ví điện tử' :
      'Thẻ ghi nợ/Tín dụng'
    }`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F2F4F5]">
      <Navbar />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Giỏ hàng', href: '/cart' },
          { label: 'Thanh toán' },
        ]}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <h1 className="text-3xl font-bold text-[#191C1F] mb-8">Thanh toán</h1>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form (65%) */}
          <div className="lg:col-span-2">
            {/* Billing Form */}
            <BillingForm onFormChange={handleFormChange} />

            {/* Payment Method Selector */}
            <PaymentMethodSelector
              selectedMethod={paymentMethod}
              onMethodChange={setPaymentMethod}
            />
          </div>

          {/* Right Column - Summary (35%) */}
          <div className="lg:col-span-1">
            <CheckoutSummary items={CART_ITEMS} onCheckout={handleCheckout} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
