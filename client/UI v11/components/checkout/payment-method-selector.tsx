'use client';

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
    <div className="bg-white rounded-lg border border-[#C9CFD2] p-6 mt-6">
      <h2 className="text-lg font-bold text-[#191C1F] mb-6">Phương thức thanh toán</h2>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {PAYMENT_METHODS.map((method) => {
          const Icon = method.icon;
          const isSelected = selectedMethod === method.id;

          return (
            <button
              key={method.id}
              onClick={() => onMethodChange(method.id)}
              className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
                isSelected
                  ? 'border-[#1E40AF] bg-blue-50'
                  : 'border-[#C9CFD2] bg-white hover:border-[#1E40AF]'
              }`}
            >
              <Icon
                size={32}
                className={`mb-3 ${
                  isSelected ? 'text-[#1E40AF]' : 'text-[#686868]'
                }`}
              />
              <span
                className={`text-xs text-center font-medium ${
                  isSelected ? 'text-[#1E40AF]' : 'text-[#191C1F]'
                }`}
              >
                {method.label}
              </span>
              <div className="mt-2 w-4 h-4 rounded-full border-2 border-[#C9CFD2] flex items-center justify-center">
                {isSelected && (
                  <div className="w-2 h-2 rounded-full bg-[#1E40AF]" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
