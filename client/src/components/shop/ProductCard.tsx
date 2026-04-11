import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { useLocationContext, calculateDistance } from '../../context/LocationContext';

interface ProductCardProps {
  product_id: string;
  name: string;
  price: number;
  images: string[];
  status: string;
  campus: string;
  province?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product_id,
  name,
  price,
  images,
  status,
  campus,
  province,
}) => {
  const { userLocation, provinces } = useLocationContext();
  const inStock = status === 'Active';
  const mainImage = images && images.length > 0 ? images[0] : 'https://via.placeholder.com/400';

  // Calculate Distance
  const distance = React.useMemo(() => {
    if (!userLocation || !provinces || provinces.length === 0) return null;
    
    // Find campus coordinates
    const pData = provinces.find(p => p.name === province);
    if (!pData) return null;

    const cData = pData.campus_data?.find((c: any) => c.name === campus) || {lat: pData.lat, lng: pData.lng};
    if (!cData || cData.lat === undefined) return null;

    return calculateDistance(userLocation.lat, userLocation.lng, cData.lat, cData.lng);
  }, [userLocation, provinces, campus, province]);

  return (
    <Link 
      to={`/product/${product_id}`}
      className="bg-white rounded-none border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group cursor-pointer block font-roboto"
    >
      {/* Product Image */}
      <div className="relative w-full aspect-square bg-gray-100 overflow-hidden rounded-none">
        <img
          src={mainImage}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="text-sm font-medium text-[#191C1F] line-clamp-2 mb-2 h-10">
          {name}
        </h3>

        {/* Price */}
        <p className="text-base font-bold text-[#1E40AF] mb-3">
          {price.toLocaleString('vi-VN')} VND
        </p>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-xs mb-2">
          {inStock ? (
            <span className="text-[#2DB224] font-medium italic">Còn hàng</span>
          ) : (
            <span className="text-[#EE1919] font-medium italic">Hết hàng</span>
          )}
          
          {distance !== null && (
            <div className="flex items-center gap-1 text-[11px] text-[#1E40AF] font-bold bg-blue-50 px-2 py-0.5 rounded-full">
              <MapPin size={10} className="fill-[#1E40AF] text-white" />
              <span>{distance < 1 ? '< 1' : Math.round(distance)} km</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
