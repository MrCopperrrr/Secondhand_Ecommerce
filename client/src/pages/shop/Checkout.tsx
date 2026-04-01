import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/shop/Breadcrumbs';
import { BillingForm } from '../../components/shop/checkout/billing-form';
import { PaymentMethodSelector } from '../../components/shop/checkout/payment-method-selector';
import { CheckoutSummary } from '../../components/shop/checkout/checkout-summary';
import { useCart } from '../../context/CartContext';

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
  const { cartItems, clearCart } = useCart();
  
  // Filter only in-stock and selected items? 
  // For now, let's just use all items in cart that are inStock
  const itemsToCheckout = cartItems.filter(item => item.inStock);

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
  const [isFormValid, setIsFormValid] = useState(false);

  const handleFormChange = (data: BillingFormData, isValid: boolean) => {
    setFormData(data);
    setIsFormValid(isValid);
  };

  const handleCheckout = () => {
    if (!isFormValid) {
      alert('Vui lòng điền đầy đủ và chính xác thông tin thanh toán.');
      return;
    }
    console.log('Checkout processed:', { formData, paymentMethod, items: itemsToCheckout });
    // After success, navigate to success page
    clearCart();
    navigate('/checkout/success');
  };

  const shippingFee = formData.deliveryMethod === 'shipping' ? 20000 : 0;

  return (
    <div className="flex flex-col min-h-screen bg-white font-roboto">
      <Breadcrumbs
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Giỏ hàng', href: '/cart' },
          { label: 'Thanh toán' },
        ]}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12 bg-white">
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
            <CheckoutSummary 
              items={itemsToCheckout} 
              shippingFee={shippingFee}
              onCheckout={handleCheckout} 
              isFormValid={isFormValid}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Checkout;
