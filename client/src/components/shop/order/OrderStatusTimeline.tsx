import React from 'react';
import { ClipboardList, Truck, PackageCheck, XCircle } from 'lucide-react';

export type StatusType = 'Pending' | 'Shipping' | 'Completed' | 'Cancelled';

interface OrderStatusTimelineProps {
  currentStatus: StatusType;
}

const OrderStatusTimeline: React.FC<OrderStatusTimelineProps> = ({ currentStatus }) => {
  const isCancelled = currentStatus === 'Cancelled';
  
  const steps = [
    { id: 'Pending', label: 'Chờ xác nhận', icon: ClipboardList },
    { id: 'Shipping', label: 'Đang giao hàng', icon: Truck },
    { id: 'Completed', label: 'Đã hoàn thành', icon: PackageCheck },
  ];

  const getStatusIndex = (status: string) => {
    return steps.findIndex(step => step.id === status);
  };

  const currentIndex = getStatusIndex(currentStatus);

  if (isCancelled) {
    return (
      <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-none">
        <XCircle className="text-red-500 w-6 h-6" />
        <div>
          <p className="text-red-700 font-bold text-sm">Đơn hàng đã hủy</p>
          <p className="text-red-600 text-xs">Giao dịch này không còn hiệu lực.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <div className="flex items-center justify-between relative px-6">
        {/* Progress Line - Fixed at 24px from top (center of 48px circle) */}
        <div className="absolute top-[24px] left-0 w-full h-[2px] bg-gray-100 -translate-y-1/2 z-0" />
        <div 
          className="absolute top-[24px] left-0 h-[4px] bg-[#1E40AF] -translate-y-1/2 z-0 transition-all duration-500" 
          style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index <= currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center group">
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border-4 ${
                  isActive 
                    ? 'bg-[#1E40AF] border-blue-100 text-white shadow-lg' 
                    : 'bg-white border-gray-100 text-gray-300'
                } ${isCurrent ? 'scale-110 ring-4 ring-blue-50' : ''}`}
              >
                <Icon size={20} />
              </div>
              <p 
                className={`mt-3 text-[11px] font-bold uppercase tracking-wider text-center transition-colors ${
                  isActive ? 'text-[#1E40AF]' : 'text-gray-400'
                }`}
              >
                {step.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderStatusTimeline;
