import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/shop/Breadcrumbs';
import { BillingForm } from '../../components/shop/checkout/billing-form';
import { PaymentMethodSelector } from '../../components/shop/checkout/payment-method-selector';
import { CheckoutSummary } from '../../components/shop/checkout/checkout-summary';

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

const Checkout: React.FC = () => {
  const navigate = useNavigate();
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
    console.log('Checkout processed:', { formData, paymentMethod, items: CART_ITEMS });
    // After success, navigate to success page
    navigate('/checkout/success');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-outfit">
      <Breadcrumbs
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Giỏ hàng', href: '/cart' },
          { label: 'Thanh toán' },
        ]}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12">
        <h1 className="text-4xl font-bold text-[#191C1F] mb-12 uppercase tracking-tighter decoration-[#1E40AF] underline underline-offset-8">THANH TOÁN</h1>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Form (65%) */}
          <div className="lg:col-span-2 space-y-10">
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
    </div>
  );
}

export default Checkout;
