import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/shop/Breadcrumbs';
import { BillingForm } from '../../components/shop/checkout/billing-form';
import { PaymentMethodSelector } from '../../components/shop/checkout/payment-method-selector';
import { CheckoutSummary } from '../../components/shop/checkout/checkout-summary';
import { useCart } from '../../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronRight } from 'lucide-react';

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

// Success Modal Component
const SuccessModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white w-full max-w-md p-10 text-center shadow-2xl"
          >
            <div className="flex justify-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
              >
                <CheckCircle2 className="w-20 h-20 text-[#2DB224]" />
              </motion.div>
            </div>
            
            <h3 className="text-2xl font-bold text-[#191C1F] mb-4">
              Thanh toán thành công!
            </h3>
            <p className="text-[#686868] mb-8">
              Đơn hàng của bạn đã được ghi nhận. Chúng tôi sẽ sớm liên hệ để xác nhận thông tin.
            </p>
            
            <button
              onClick={onClose}
              className="w-full flex items-center justify-center gap-2 bg-[#1E40AF] text-white py-4 font-bold hover:bg-[#1e3a8a] transition-colors"
            >
              Tiếp tục mua sắm
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  
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
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleFormChange = (data: BillingFormData) => {
    setFormData(data);
  };

  const validateForm = () => {
    const requiredFields: (keyof BillingFormData)[] = ['fullName', 'phone', 'email', 'address', 'province', 'ward'];
    for (const field of requiredFields) {
      if (!formData[field] || formData[field].trim() === '') {
        return false;
      }
    }
    // Simple email/phone check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return false;
    if (!/^\d{10,11}$/.test(formData.phone)) return false;
    
    return true;
  };

  const handleCheckout = () => {
    if (!validateForm()) {
      alert('Vui lòng điền đầy đủ và chính xác tất cả các thông tin bắt buộc.');
      return;
    }

    console.log('Checkout processed:', { formData, paymentMethod, items: itemsToCheckout });
    setShowSuccessModal(true);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    clearCart();
    navigate('/');
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

      <SuccessModal isOpen={showSuccessModal} onClose={handleCloseModal} />

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
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Checkout;
