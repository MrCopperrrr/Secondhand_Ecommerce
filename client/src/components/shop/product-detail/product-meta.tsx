import React from 'react';

interface ProductMetaProps {
  productId: string;
  category: string;
  status: 'Còn hàng' | 'Hết hàng';
  condition: string;
  location: string;
  proximity: string;
}

export function ProductMeta({
  productId,
  category,
  status,
  condition,
  location,
  proximity,
}: ProductMetaProps) {
  return (
    <div className="space-y-4 font-outfit">
      {/* Meta Info Grid */}
      <div className="grid grid-cols-2 gap-4 border border-[#C9CFD2] rounded-none p-6 bg-white">
        <div>
          <p className="text-sm text-[#686868] mb-1">ID sản phẩm</p>
          <p className="text-sm font-bold text-[#191C1F]">{productId}</p>
        </div>
        <div>
          <p className="text-sm text-[#686868] mb-1">Danh mục</p>
          <a
            href="#"
            className="text-sm font-bold text-[#1E40AF] hover:underline"
          >
            {category}
          </a>
        </div>
        <div>
          <p className="text-sm text-[#686868] mb-1">Trạng thái</p>
          <span
            className={`inline-block text-xs font-bold px-2 py-1 ${
              status === 'Còn hàng'
                ? 'bg-green-100 text-[#2DB224]'
                : 'bg-red-100 text-red-600'
            }`}
          >
            {status.toUpperCase()}
          </span>
        </div>
        <div>
          <p className="text-sm text-[#686868] mb-1">Tình trạng</p>
          <p className="text-sm font-bold text-[#191C1F]">{condition}</p>
        </div>
      </div>

      {/* Location & Proximity */}
      <div className="border border-[#C9CFD2] rounded-none p-6 bg-white">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-[#686868] mb-2">Vị trí</p>
            <p className="text-base font-bold text-[#191C1F]">{location}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-[#686868] mb-2">Khoảng cách</p>
            <p className="text-base font-bold text-[#2DB224]">{proximity}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
