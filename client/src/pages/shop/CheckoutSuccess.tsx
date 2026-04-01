import React from 'react';
import { SuccessCard } from '../../components/shop/checkout/success-card';

const CheckoutSuccess: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 font-outfit">
            {/* Main Content - Center aligned */}
            <main className="flex-1 flex items-center justify-center px-4 py-20 pb-32">
                <SuccessCard orderId="1001" />
            </main>
        </div>
    );
};

export default CheckoutSuccess;
