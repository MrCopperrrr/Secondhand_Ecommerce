import React from 'react';
import { CreditCard, Wallet, Truck, DollarSign } from 'lucide-react';

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
    icon: Truck,
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
    <div className="bg-white rounded-none border border-[#C9CFD2] p-8 mt-8 font-outfit shadow-sm">
      <h2 className="text-xl font-bold text-[#191C1F] mb-8 pb-4 border-b-2 border-[#1E40AF] inline-block uppercase">
        Phương thức thanh toán
      </h2>

      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {PAYMENT_METHODS.map((method) => {
          const Icon = method.icon;
          const isSelected = selectedMethod === method.id;

          return (
            <button
              key={method.id}
              onClick={() => onMethodChange(method.id)}
              className={`flex flex-col items-center justify-center p-6 rounded-none border-2 transition-all duration-300 ${
                isSelected
                  ? 'border-[#1E40AF] bg-blue-50 shadow-md'
                  : 'border-gray-100 bg-gray-50 hover:border-gray-300 hover:bg-gray-100'
              }`}
            >
              <div className={`p-4 rounded-full mb-4 bg-white shadow-sm border border-gray-100 ${
                  isSelected ? 'text-[#1E40AF]' : 'text-[#686868]'
                }`}>
                <Icon
                  size={32}
                />
              </div>
              <span
                className={`text-xs text-center font-bold uppercase tracking-wider ${
                  isSelected ? 'text-[#1E40AF]' : 'text-[#191C1F]'
                }`}
              >
                {method.label}
              </span>
              <div className="mt-4 w-6 h-6 rounded-full border-2 border-[#C9CFD2] flex items-center justify-center bg-white">
                {isSelected && (
                  <div className="w-3 h-3 rounded-full bg-[#1E40AF]" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
