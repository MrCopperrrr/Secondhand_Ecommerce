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
    <div className="space-y-4 font-roboto pb-4 border-b border-gray-100">
      {/* First Grid Row: ID and Category */}
      <div className="grid grid-cols-2 gap-x-8 gap-y-3">
        <div className="flex gap-2 text-sm">
          <span className="font-bold text-[#686868]">ID:</span>
          <span className="font-bold text-[#000000]">{productId}</span>
        </div>
        <div className="flex gap-2 text-sm">
          <span className="font-bold text-[#686868]">Danh mục:</span>
          <span className="font-bold text-[#000000]">{category}</span>
        </div>

        {/* Second Row: Status and Condition */}
        <div className="flex gap-2 text-sm">
          <span className={`${status === 'Còn hàng' ? 'text-[#2DB224]' : 'text-red-500'} font-bold`}>{status}</span>
        </div>
        <div className="flex gap-2 text-sm">
          <span className="font-bold text-[#686868]">Tình trạng:</span>
          <span className="font-bold text-[#000000]">{condition}</span>
        </div>
      </div>

      {/* Location and Distance Row */}
      <div className="flex justify-between items-center text-sm pt-2">
        <div className="flex gap-2">
          <span className="font-bold text-[#686868]">Trường/Campus:</span>
          <span className="font-bold text-[#000000]">{location}</span>
        </div>
        <div className="font-bold text-[#2DB224]">
          {proximity}
        </div>
      </div>
    </div>
  );
}
