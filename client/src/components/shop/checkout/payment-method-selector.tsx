import React from 'react';
import { CreditCard, Wallet, Truck, DollarSign, PiggyBank, Banknote, Landmark } from 'lucide-react';

type PaymentMethod = 'cod' | 'bank' | 'ewallet' | 'card';

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod;
  onMethodChange: (method: PaymentMethod) => void;
}

const PAYMENT_METHODS = [
  {
    id: 'cod' as const,
    label: 'Thanh toán khi nhận hàng',
    icon: DollarSign,
  },
  {
    id: 'bank' as const,
    label: 'Tài khoản ngân hàng',
    icon: Landmark,
  },
  {
    id: 'ewallet' as const,
    label: 'Ví điện tử (MoMo/ZaloPay)',
    icon: Wallet,
  },
  {
    id: 'card' as const,
    label: 'Thẻ ghi nợ/Tín dụng',
    icon: CreditCard,
  },
];

export function PaymentMethodSelector({
  selectedMethod,
  onMethodChange,
}: PaymentMethodSelectorProps) {
  return (
    <div className="bg-white border border-[#C9CFD2] p-8 mt-12 font-roboto shadow-sm">
      <h2 className="text-2xl font-bold text-[#191C1F] mb-10">
        Phương thức thanh toán
      </h2>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {PAYMENT_METHODS.map((method) => {
          const Icon = method.icon;
          const isSelected = selectedMethod === method.id;

          return (
            <div
              key={method.id}
              className="flex flex-col items-center justify-between h-full group cursor-pointer"
              onClick={() => onMethodChange(method.id)}
            >
              <div className="flex flex-col items-center">
                <div className="mb-4">
                  {/* Custom color icons if needed, using lucide for now */}
                  <div className={`p-0 ${
                    method.id === 'cod' ? 'text-green-500' : 
                    method.id === 'bank' ? 'text-orange-500' :
                    method.id === 'ewallet' ? 'text-pink-500' :
                    'text-blue-500'
                  }`}>
                    <Icon size={40} strokeWidth={1.5} />
                  </div>
                </div>
                <span className="text-xs text-center font-normal text-[#191C1F] max-w-[100px] leading-tight">
                  {method.label}
                </span>
              </div>
              
              <div className="mt-4 pb-2">
                <div className="w-5 h-5 rounded-full border-2 border-[#C9CFD2] flex items-center justify-center bg-white transition-colors group-hover:border-[#1E40AF]">
                  {isSelected && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#1E40AF]" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
