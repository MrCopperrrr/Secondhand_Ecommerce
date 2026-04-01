'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/navbar/navbar';
import { Footer } from '@/components/footer/footer';
import { Breadcrumbs } from '@/components/home/breadcrumbs';
import { CartItem } from '@/components/cart/cart-item';
import { OrderSummary } from '@/components/cart/order-summary';
import { EmptyCart } from '@/components/cart/empty-cart';

// Mock cart items data
const INITIAL_CART_ITEMS = [
  {
    id: 'product-1',
    name: 'iPhone 13 Pro Max',
    description: 'Điện thoại thông minh, màu đen, 256GB',
    price: 15000000,
    image: 'https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=400&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'product-2',
    name: 'MacBook Pro 14"',
    description: 'Laptop cao cấp, M1 Pro, 16GB RAM',
    price: 35000000,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'product-3',
    name: 'AirPods Pro',
    description: 'Tai nghe không dây, chống ồn',
    price: 4500000,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    inStock: false,
  },
  {
    id: 'product-4',
    name: 'iPad Air',
    description: 'Máy tính bảng, 64GB, WiFi',
    price: 12000000,
    image: 'https://images.unsplash.com/photo-1542032604-787d440170a3?w=400&h=400&fit=crop',
    inStock: true,
  },
];

const SHIPPING_FEE = 25000;
const SERVICE_FEE_PERCENTAGE = 0.05;

export default function CartPage() {
  const [cartItems] = useState(INITIAL_CART_ITEMS);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [removedItems, setRemovedItems] = useState<Set<string>>(new Set());

  const visibleItems = cartItems.filter((item) => !removedItems.has(item.id));

  const handleSelectItem = (id: string, selected: boolean) => {
    const newSelected = new Set(selectedItems);
    if (selected) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedItems(newSelected);
  };

  const handleRemoveItem = (id: string) => {
    const newRemoved = new Set(removedItems);
    newRemoved.add(id);
    setRemovedItems(newRemoved);
  };

  const calculations = useMemo(() => {
    let itemCount = 0;
    let subtotal = 0;

    selectedItems.forEach((itemId) => {
      const item = visibleItems.find((i) => i.id === itemId);
      if (item && item.inStock) {
        itemCount++;
        subtotal += item.price;
      }
    });

    const serviceFee = Math.round(subtotal * SERVICE_FEE_PERCENTAGE);
    const total = subtotal + SHIPPING_FEE + serviceFee;

    return {
      itemCount,
      subtotal,
      shippingFee: SHIPPING_FEE,
      serviceFee,
      total,
    };
  }, [selectedItems, visibleItems]);

  const hasAvailableItems = visibleItems.some((item) => item.inStock);

  if (visibleItems.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-[#F2F4F5]">
        <Navbar />
        <Breadcrumbs
          items={[
            { label: 'Trang chủ', href: '/' },
            { label: 'Giỏ hàng' },
          ]}
        />
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12">
          <EmptyCart />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F2F4F5]">
      <Navbar />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Giỏ hàng' },
        ]}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items - Left Column (70%) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-[#C9CFD2] overflow-hidden">
              {/* Table Header */}
              <div className="flex gap-4 p-4 border-b border-[#C9CFD2] bg-gray-50">
                <div className="w-5" /> {/* Checkbox placeholder */}
                <div className="w-16" /> {/* Image placeholder */}
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-[#191C1F]">Sản phẩm</h3>
                </div>
                <div className="w-24">
                  <h3 className="text-sm font-bold text-[#191C1F]">Tình trạng</h3>
                </div>
                <div className="w-32 text-right">
                  <h3 className="text-sm font-bold text-[#191C1F]">Giá tiền</h3>
                </div>
                <div className="w-10" />
              </div>

              {/* Cart Items */}
              <div>
                {visibleItems.map((item) => (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    image={item.image}
                    inStock={item.inStock}
                    selected={selectedItems.has(item.id)}
                    onSelect={handleSelectItem}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </div>

              {/* Footer Action */}
              <div className="p-4 border-t border-[#C9CFD2]">
                <Link href="/">
                  <button className="px-6 py-2 border-2 border-[#1E40AF] text-[#1E40AF] font-bold rounded hover:bg-blue-50 transition-colors">
                    QUAY VỀ TRANG CHỦ
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Order Summary - Right Column (30%) */}
          <div className="lg:col-span-1">
            <OrderSummary
              itemCount={calculations.itemCount}
              subtotal={calculations.subtotal}
              shippingFee={calculations.shippingFee}
              serviceFee={calculations.serviceFee}
              total={calculations.total}
              hasAvailableItems={hasAvailableItems}
              onCheckout={() => {
                alert('Tiến hành thanh toán - Tính năng đang được phát triển');
              }}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
