'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useCart } from '@/components/cart/CartProvider';

function formatPrice(price: number) {
  return price.toLocaleString('ru-RU', {
    minimumFractionDigits: Number.isInteger(price) ? 0 : 2,
    maximumFractionDigits: 2,
  });
}

export default function CartPopup() {
  const { lastAdded, clearLastAdded } = useCart();

  useEffect(() => {
    if (!lastAdded) return;
    const timer = setTimeout(clearLastAdded, 5000);
    return () => clearTimeout(timer);
  }, [lastAdded, clearLastAdded]);

  if (!lastAdded) return null;

  const { item, quantity } = lastAdded;
  const total = item.price * quantity;

  return (
    <>
      <div
        className="fixed inset-0 z-[99] bg-black/50"
        onClick={clearLastAdded}
      />
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
      <div className="w-[340px] max-w-full pointer-events-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-[#CC0000] text-white px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Товар добавлен в корзину
          </div>
          <button onClick={clearLastAdded} className="text-white/70 hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4">
          <p className="font-semibold text-[#1a1a1a] text-sm leading-snug mb-3">{item.name}</p>

          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <span>Количество: <span className="font-medium text-[#1a1a1a]">{quantity} {item.unit}</span></span>
            <span>Итого: <span className="font-bold text-[#CC0000]">{formatPrice(total)} ₽</span></span>
          </div>

          <div className="flex gap-2">
            <Link
              href="/cart"
              onClick={clearLastAdded}
              className="flex-1 bg-[#CC0000] hover:bg-[#aa0000] text-white text-sm font-semibold py-2.5 rounded-xl transition-colors text-center"
            >
              Перейти в корзину
            </Link>
            <button
              onClick={clearLastAdded}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-[#1a1a1a] text-sm font-semibold py-2.5 rounded-xl transition-colors"
            >
              Продолжить
            </button>
          </div>
        </div>
      </div>
      </div>
      </div>
    </>
  );
}
