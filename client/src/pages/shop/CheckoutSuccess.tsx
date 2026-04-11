import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SuccessCard } from '../../components/shop/checkout/success-card';
import { paymentServices } from '../../services/payment.services';
import { Loader2, XCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { productService } from '../../services/product.services';

const CheckoutSuccess: React.FC = () => {
    const location = useLocation();
    const { clearCart } = useCart();
    const [status, setStatus] = useState<'loading' | 'success' | 'failed' | 'normal'>('loading');
    const [orderId, setOrderId] = useState('1001');

    useEffect(() => {
        const queryParams = location.search;
        if (queryParams && queryParams.includes('vnp_ResponseCode')) {
            // This is a VNPAY return
            const verify = async () => {
                try {
                    const response = await paymentServices.verifyPayment(queryParams);
                    if (response.data.result.success) {
                        setStatus('success');
                        setOrderId(response.data.result.orderId);
                        
                        // If it's VNPAY success, we should mark products as sold out here too (if not done yet)
                        // This is a bit tricky without knowing all items, 
                        // but in a real system we'd use the orderId to find items on backend.
                        clearCart();
                    } else {
                        setStatus('failed');
                    }
                } catch (error) {
                    console.error("Verification failed", error);
                    setStatus('failed');
                }
            };
            verify();
        } else {
            // Normal success (COD)
            setStatus('normal');
        }
    }, [location.search]);

    if (status === 'loading') {
        return (
            <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50">
                <Loader2 size={48} className="animate-spin text-[#1E40AF] mb-4" />
                <p className="text-[#686868] font-medium">Đang xác thực giao dịch...</p>
            </div>
        );
    }

    if (status === 'failed') {
        return (
            <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50 px-4">
                <div className="bg-white p-10 shadow-2xl border-2 border-red-500 text-center max-w-lg w-full">
                    <XCircle size={80} className="text-red-500 mx-auto mb-6" />
                    <h1 className="text-3xl font-bold mb-4">Giao dịch thất bại</h1>
                    <p className="text-[#686868] mb-8">Rất tiếc, đã có lỗi xảy ra trong quá trình thanh toán hoặc giao dịch bị hủy.</p>
                    <button 
                        onClick={() => window.location.href = '/checkout'}
                        className="bg-[#1E40AF] text-white px-10 py-4 font-bold"
                    >
                        Quay lại trang thanh toán
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 font-roboto">
            <main className="flex-1 flex items-center justify-center px-4 py-20 pb-32">
                <SuccessCard orderId={orderId} />
            </main>
        </div>
    );
};

export default CheckoutSuccess;
