'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar/navbar';
import { Footer } from '@/components/footer/footer';
import { Breadcrumbs } from '@/components/home/breadcrumbs';
import { ProductGallery } from '@/components/product/product-gallery';
import { ProductInfo } from '@/components/product/product-info';
import { ProductMeta } from '@/components/product/product-meta';
import { SellerCard } from '@/components/product/seller-card';
import { ProductDescription } from '@/components/product/product-description';

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
  description: `MacBook Pro M1 2021 được sử dụng rất cẩn thận, máy hoạt động hoàn hảo như ngày đầu tiên.

Chi tiết tình trạng:
- CPU M1 8-core, GPU 7-core
- 8GB RAM LPDDR4X
- 256GB SSD
- Pin sạc 100%, thời gian sử dụng còn lâu

Phụ kiện kèm theo:
- Sạc 30W USB-C (chính hãng Apple)
- Cáp sạc original
- Hộp carton original (đầy đủ)

Dán film bảo vệ toàn bộ màn hình, không có trầy xước hay vết tì vết nào. Máy rất sạch sẽ, bảo quản kỹ lưỡng.

Mua từ Apple Store tháng 2/2021, còn bảo hành đến tháng 2/2025 (có thể chuyển quyền sở hữu).

Giá đã là tốt nhất, không thương lượng. Có thể giao tận nơi hoặc gặp tại campus.`,
};

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
    alert('Đã thêm vào giỏ hàng!');
  };

  const handleBuyNow = () => {
    alert('Chuyển đến trang thanh toán...');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <Breadcrumbs
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Đồ điện tử', href: '/' },
          { label: 'Chi tiết sản phẩm' },
        ]}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Gallery */}
          <ProductGallery images={MOCK_PRODUCT.images} alt={MOCK_PRODUCT.title} />

          {/* Right: Product Info */}
          <div className="space-y-6">
            <ProductInfo
              title={MOCK_PRODUCT.title}
              price={MOCK_PRODUCT.price}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
            />

            <ProductMeta
              productId={MOCK_PRODUCT.id}
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

      <Footer />
    </div>
  );
}
