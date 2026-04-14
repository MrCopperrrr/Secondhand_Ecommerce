import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/shop/Breadcrumbs';
import { BillingForm } from '../../components/shop/checkout/billing-form';
import { PaymentMethodSelector } from '../../components/shop/checkout/payment-method-selector';
import { CheckoutSummary } from '../../components/shop/checkout/checkout-summary';
import { useCart } from '../../context/CartContext';
// import { productService } from '../../services/product.services';
import { paymentServices } from '../../services/payment.services';
import { authService } from '../../services/auth.services';
import { orderServices } from '../../services/order.services';

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
  const [currentUser, setCurrentUser] = useState<any>(null);
  
  const itemsToCheckout = cartItems.filter(item => item.inStock);

  // Robust user check: Tự động hồi phục session nếu thiếu trong storage
  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      } else {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
          try {
            const res = await authService.getMe();
            const fetchedUser = res.data.result;
            localStorage.setItem('user', JSON.stringify(fetchedUser));
            setCurrentUser(fetchedUser);
          } catch (e) {
            console.error('Session expired', e);
          }
        }
      }
    };
    fetchUser();
  }, []);

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

  const handleCheckout = async () => {
    if (!isFormValid) {
      alert('Vui lòng điền đầy đủ và chính xác thông tin thanh toán.');
      return;
    }
    
    // Kiểm tra user từ state hoặc storage
    const finalUser = currentUser || JSON.parse(localStorage.getItem('user') || '{}');
    if (!finalUser._id) {
      alert('Vui lòng đăng nhập để thực hiện thanh toán.');
      navigate('/login');
      return;
    }

    try {
      const subtotal = itemsToCheckout.reduce((sum, item) => sum + item.price, 0);
      const serviceFee = Math.round(subtotal * 0.05); 
      const shippingFee = formData.deliveryMethod === 'shipping' ? 20000 : 0;
      const totalAmount = subtotal + shippingFee + serviceFee;

      // Group items by seller_id for multiple orders
      const itemsBySeller: Record<string, any[]> = {};
      itemsToCheckout.forEach(item => {
        const sid = item.seller_id || 'unknown_seller'; 
        if (!itemsBySeller[sid]) itemsBySeller[sid] = [];
        itemsBySeller[sid].push(item);
      });

      const vnpTxnRef = `VNP${Date.now()}`;

      if (paymentMethod === 'cod') {
        const orderPromises = Object.entries(itemsBySeller).map(async ([seller_id, items]) => {
          if (seller_id === 'unknown_seller') return null;

          const sellerSubtotal = items.reduce((s, i) => s + i.price, 0);
          return orderServices.createOrder({
            buyer_id: finalUser._id,
            seller_id,
            product_ids: items.map(i => i.id),
            total_amount: sellerSubtotal + (shippingFee / Object.keys(itemsBySeller).length) + (sellerSubtotal * 0.05),
            shipping_fee: shippingFee / Object.keys(itemsBySeller).length,
            service_fee: sellerSubtotal * 0.05,
            payment_method: 'cod',
            payment_status: 'Unpaid',
            status: 'Pending',
            shipping_details: formData
          });
        });

        await Promise.all(orderPromises.filter(p => p !== null));
        clearCart();
        navigate('/checkout/success');
      } else {
        const response: any = await paymentServices.createPaymentUrl({ 
          amount: totalAmount,
          orderId: vnpTxnRef
        });
        
        if (response.data?.result) {
          const orderPromises = Object.entries(itemsBySeller).map(async ([seller_id, items]) => {
            if (seller_id === 'unknown_seller') return null;
            
            const sellerSubtotal = items.reduce((s, i) => s + i.price, 0);
            return orderServices.createOrder({
              buyer_id: finalUser._id,
              seller_id,
              product_ids: items.map(i => i.id),
              total_amount: sellerSubtotal + (shippingFee / Object.keys(itemsBySeller).length) + (sellerSubtotal * 0.05),
              shipping_fee: shippingFee / Object.keys(itemsBySeller).length,
              service_fee: sellerSubtotal * 0.05,
              payment_method: 'vnpay',
              payment_status: 'Unpaid',
              status: 'Pending',
              vnp_txn_ref: vnpTxnRef,
              shipping_details: formData
            });
          });
          await Promise.all(orderPromises.filter(p => p !== null));
          window.location.href = response.data.result;
        }
      }
    } catch (error) {
      console.error('Lỗi khi xử lý thanh toán:', error);
      alert('Có lỗi xảy ra khi thanh toán. Vui lòng thử lại sau.');
    }
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

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            <BillingForm onFormChange={handleFormChange} />
            <PaymentMethodSelector
              selectedMethod={paymentMethod}
              onMethodChange={setPaymentMethod}
            />
          </div>

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
