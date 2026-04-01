import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/shop/Breadcrumbs';
import { ProductGallery } from '../../components/shop/product-detail/product-gallery';
import { ProductInfo } from '../../components/shop/product-detail/product-info';
import { ProductMeta } from '../../components/shop/product-detail/product-meta';
import { SellerCard } from '../../components/shop/product-detail/seller-card';
import { ProductDescription } from '../../components/shop/product-detail/product-description';

// Mock product data
const MOCK_PRODUCT = {
  id: 'PROD-001',
  title: 'Apple MacBook Pro M1 8GB RAM 256GB SSD - Like new 99%',
  price: 28500000,
  category: 'Đồ điện tử',
  status: 'Còn hàng' as const,
  condition: 'Like new 99%',
  location: 'Đại học Công nghệ, TP.HCM',
  proximity: '<1km',
  images: [
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1525373365065-eac3e64b6ebb?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=800&fit=crop',
  ],
  seller: {
    name: 'Nguyễn Văn A',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    rating: 5,
    isOnline: true,
  },
  description: `MacBook Pro M1 2021 được sử dụng rất cẩn thận, máy hoạt động hoàn hảo như ngày đầu tiên.\n\nChi tiết tình trạng:\n- CPU M1 8-core, GPU 7-core\n- 8GB RAM LPDDR4X\n- 256GB SSD\n- Pin sạc 100%, thời gian sử dụng còn lâu\n\nPhụ kiện kèm theo:\n- Sạc 30W USB-C (chính hãng Apple)\n- Cáp sạc original\n- Hộp carton original (đầy đủ)\n\nDán film bảo vệ toàn bộ màn hình, không có trầy xước hay vết tì vết nào. Máy rất sạch sẽ, bảo quản kỹ lưỡng.\n\nMua từ Apple Store tháng 2/2021, còn bảo hành đến tháng 2/2025 (có thể chuyển quyền sở hữu).\n\nGiá đã là tốt nhất, không thương lượng. Có thể giao tận nơi hoặc gặp tại campus.`,
};

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    alert('Đã thêm sản phẩm vào giỏ hàng!');
  };

  const handleBuyNow = () => {
    navigate('/checkout');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-outfit">
      <Breadcrumbs
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Đồ điện tử', href: '/' },
          { label: 'Chi tiết sản phẩm' },
        ]}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-10">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: Gallery */}
          <ProductGallery images={MOCK_PRODUCT.images} alt={MOCK_PRODUCT.title} />

          {/* Right: Product Info */}
          <div className="space-y-8">
            <ProductInfo
              title={MOCK_PRODUCT.title}
              price={MOCK_PRODUCT.price}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
            />

            <ProductMeta
              productId={id || MOCK_PRODUCT.id}
              category={MOCK_PRODUCT.category}
              status={MOCK_PRODUCT.status}
              condition={MOCK_PRODUCT.condition}
              location={MOCK_PRODUCT.location}
              proximity={MOCK_PRODUCT.proximity}
            />

            <SellerCard
              sellerName={MOCK_PRODUCT.seller.name}
              sellerAvatar={MOCK_PRODUCT.seller.avatar}
              rating={MOCK_PRODUCT.seller.rating}
              isOnline={MOCK_PRODUCT.seller.isOnline}
            />
          </div>
        </div>

        {/* Full Width Description */}
        <ProductDescription description={MOCK_PRODUCT.description} />
      </main>
    </div>
  );
}

export default ProductDetail;
