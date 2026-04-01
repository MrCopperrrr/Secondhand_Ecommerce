import { Star } from 'lucide-react';

interface SellerCardProps {
  sellerName: string;
  sellerAvatar: string;
  rating: number;
  isOnline: boolean;
  otherProductsCount?: number;
}

export function SellerCard({
  sellerName,
  sellerAvatar,
  rating,
  isOnline,
  otherProductsCount = 5,
}: SellerCardProps) {
  return (
    <div className="font-roboto pt-4">
      {/* Label - Bold, 686868 */}
      <h3 className="text-sm font-bold text-[#686868] mb-4">Thông tin người bán:</h3>

      <div className="flex justify-between items-start gap-8">
        {/* Left Column: Avatar & Info */}
        <div className="flex items-start gap-4 flex-1">
          {/* Avatar Area */}
          <div className="w-12 h-12 bg-gray-100 flex items-center justify-center border border-[#C9CFD2] flex-shrink-0">
             {/* Using img if available, otherwise icon */}
             <img src={sellerAvatar} alt={sellerName} className="w-full h-full object-cover" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-4">
              <span className="font-bold text-[#000000] text-sm">{sellerName}</span>
              <span className={`${isOnline ? 'text-[#2DB224]' : 'text-gray-400'} text-xs font-medium`}>
                {isOnline ? 'Đang hoạt động' : 'Ngoại tuyến'}
              </span>
            </div>
            
            {/* Rating Stars */}
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={12} 
                  className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                />
              ))}
            </div>

            {/* Other Products Text */}
            <p className="text-sm font-medium text-[#191C1F] pt-2 italic">
              Đang bán {otherProductsCount} sản phẩm khác
            </p>
          </div>
        </div>

        {/* Right Column: Action Buttons */}
        <div className="flex flex-col gap-2 w-48">
          <button className="w-full py-2 border border-[#1E40AF] text-[#1E40AF] text-[10px] font-bold uppercase hover:bg-blue-50 transition-colors bg-white">
            CHAT VỚI NGƯỜI BÁN
          </button>
          <button className="w-full py-2 border border-[#1E40AF] text-[#1E40AF] text-[10px] font-bold uppercase hover:bg-blue-50 transition-colors bg-white">
            XEM HỒ SƠ
          </button>
        </div>
      </div>
    </div>
  );
}
