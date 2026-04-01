import React from 'react';
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
    <div className="border border-[#C9CFD2] rounded-none p-6 bg-white font-outfit">
      {/* Seller Info */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="relative w-14 h-14">
            <img
              src={sellerAvatar}
              alt={sellerName}
              className="w-full h-full rounded-full object-cover border border-[#C9CFD2]"
            />
          </div>

          {/* Seller Details */}
          <div>
            <p className="text-base font-bold text-[#191C1F]">{sellerName}</p>
            <div className="flex items-center gap-1 mt-1">
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
            <span className="text-xs text-[#2DB224] font-bold uppercase tracking-wider">
              Trực tuyến
            </span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border-2 border-[#1E40AF] text-[#1E40AF] rounded-none hover:bg-blue-50 transition-colors text-sm font-bold uppercase overflow-hidden">
          <MessageCircle size={18} />
          CHAT NGAY
        </button>
        <button className="flex-1 px-4 py-2 border-2 border-[#1E40AF] text-[#1E40AF] rounded-none hover:bg-blue-50 transition-colors text-sm font-bold uppercase overflow-hidden">
          XEM HỒ SƠ
        </button>
      </div>
    </div>
  );
}
