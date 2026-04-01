'use client';

import Image from 'next/image';
import { Star, MessageCircle } from 'lucide-react';

interface SellerCardProps {
  sellerName: string;
  sellerAvatar: string;
  rating: number;
  isOnline: boolean;
}

export function SellerCard({
  sellerName,
  sellerAvatar,
  rating,
  isOnline,
}: SellerCardProps) {
  return (
    <div className="border border-[#C9CFD2] rounded-lg p-4 bg-white">
      {/* Seller Info */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="relative w-12 h-12">
            <Image
              src={sellerAvatar}
              alt={sellerName}
              fill
              className="rounded-full object-cover"
            />
          </div>

          {/* Seller Details */}
          <div>
            <p className="text-sm font-bold text-[#191C1F]">{sellerName}</p>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={`${
                    i < rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Online Status */}
        {isOnline && (
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-[#2DB224]"></div>
            <span className="text-xs text-[#2DB224] font-medium">
              Đang hoạt động
            </span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-[#1E40AF] text-[#1E40AF] rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium">
          <MessageCircle size={16} />
          Chat
        </button>
        <button className="flex-1 px-3 py-2 border border-[#1E40AF] text-[#1E40AF] rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium">
          Xem hồ sơ
        </button>
      </div>
    </div>
  );
}
