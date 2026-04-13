import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/shop/Breadcrumbs';
import { CartItem } from '../../components/shop/cart/cart-item';
import { OrderSummary } from '../../components/shop/cart/order-summary';
import { EmptyCart } from '../../components/shop/cart/empty-cart';
import { useCart } from '../../context/CartContext';

const SHIPPING_FEE = 25000;
const SERVICE_FEE_PERCENTAGE = 0.05;

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart } = useCart();
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  // Initialize selected items with all available in-stock items on mount
  useEffect(() => {
    const inStockIds = cartItems
      .filter(item => item.inStock)
      .map(item => item.id);
    setSelectedItems(new Set(inStockIds));
  }, [cartItems.length]); // Re-run if item count changes (e.g. from detail page)

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
    removeFromCart(id);
  };

  const calculations = useMemo(() => {
    let itemCount = 0;
    let subtotal = 0;

    selectedItems.forEach((itemId) => {
      const item = cartItems.find((i) => i.id === itemId);
      if (item && item.inStock) {
        itemCount += item.quantity;
        subtotal += item.price * item.quantity;
      }
    });

    const serviceFee = Math.round(subtotal * SERVICE_FEE_PERCENTAGE);
    const total = subtotal + serviceFee;

    return {
      itemCount,
      subtotal,
      shippingFee: SHIPPING_FEE,
      serviceFee,
      total,
    };
  }, [selectedItems, cartItems]);

  const hasAvailableItems = cartItems.some((item) => item.inStock);

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Breadcrumbs
          items={[
            { label: 'Trang chủ', href: '/' },
            { label: 'Giỏ hàng' },
          ]}
        />
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-20">
          <EmptyCart />
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white font-roboto">
      <Breadcrumbs
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Giỏ hàng' },
        ]}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items - Left Column (70%) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-none border border-[#C9CFD2] overflow-hidden shadow-sm">
              {/* Box Title inside */}
              <div className="p-6 pb-2">
                <h2 className="text-3xl font-bold text-[#191C1F] tracking-tighter">
                  Giỏ hàng
                </h2>
              </div>

              {/* Table Header Row - Background #F2F4F5 */}
              <div className="flex items-center gap-4 px-5 py-4 border-y border-gray-100 bg-[#F2F4F5] mt-4">
                <div className="w-10" /> {/* Space for radio button */}
                <div className="flex-1">
                  <h3 className="text-sm font-normal text-[#686868]">Sản phẩm</h3>
                </div>
                <div className="w-28 text-center px-2">
                  <h3 className="text-sm font-normal text-[#686868]">Tình trạng</h3>
                </div>
                <div className="w-32 text-right px-2">
                  <h3 className="text-sm font-normal text-[#686868]">Giá tiền</h3>
                </div>
                <div className="w-10" /> {/* Space for remove button */}
              </div>

              {/* Cart Items List */}
              <div className="divide-y divide-gray-50">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
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
              <div className="p-6 bg-gray-50/50">
                <Link to="/">
                  <button className="px-8 py-3 border-2 border-[#1E40AF] text-[#1E40AF] font-bold rounded-none hover:bg-blue-50 transition-all text-sm">
                    Tìm thêm sản phẩm
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
                navigate('/checkout');
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Cart;
