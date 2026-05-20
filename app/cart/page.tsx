'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/components/cart/CartProvider';

function formatPrice(price: number) {
  return price.toLocaleString('ru-RU', {
    minimumFractionDigits: Number.isInteger(price) ? 0 : 2,
    maximumFractionDigits: 2,
  });
}

export default function CartPage() {
  const { items, updateQuantity, removeFromCart } = useCart();
  const [rawInputs, setRawInputs] = useState<Record<number, string>>({});

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <svg className="w-20 h-20 mx-auto text-gray-200 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l2.4 10.2a2 2 0 001.95 1.55h7.9a2 2 0 001.95-1.55L22 6H7" />
          <circle cx="10" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" />
        </svg>
        <h1 className="text-2xl font-bold text-[#1a1a1a] mb-2">Корзина пуста</h1>
        <p className="text-gray-500 mb-8">Добавьте товары из каталога, чтобы оформить заказ</p>
        <Link
          href="/catalog"
          className="inline-block bg-[#CC0000] hover:bg-[#aa0000] text-white font-bold px-8 py-3 rounded-xl transition-colors"
        >
          Перейти в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-[#CC0000] transition-colors">Главная</Link>
        <span>/</span>
        <span className="text-[#1a1a1a]">Корзина</span>
      </nav>

      <h1 className="text-3xl font-black text-[#1a1a1a] mb-8">
        Корзина
        <span className="text-gray-400 font-normal text-lg ml-3">{items.length} позиций</span>
      </h1>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-2xl bg-white mb-6">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-[#f5f5f5] text-left text-[#1a1a1a]">
              <th className="px-4 py-3 font-semibold w-16"></th>
              <th className="px-4 py-3 font-semibold">Наименование</th>
              <th className="px-4 py-3 font-semibold whitespace-nowrap">Количество</th>
              <th className="px-4 py-3 font-semibold whitespace-nowrap text-right">Цена</th>
              <th className="px-4 py-3 font-semibold text-right whitespace-nowrap">Сумма</th>
              <th className="px-4 py-3 w-10"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr
                key={item.productId}
                className={`border-t border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
              >
                {/* Photo placeholder */}
                <td className="px-4 py-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </td>

                {/* Name */}
                <td className="px-4 py-3">
                  <Link href={`/product/${item.slug}`} className="font-medium text-[#1a1a1a] hover:text-[#CC0000] transition-colors">
                    {item.name}
                  </Link>
                  <div className="text-xs text-gray-400 mt-0.5">Размер: {item.size}</div>
                </td>

                {/* Quantity */}
                <td className="px-4 py-3">
                  <div className="inline-flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      type="button"
                      onClick={() => {
                        const newVal = Math.max(1, item.quantity - 1);
                        updateQuantity(item.productId, newVal);
                        setRawInputs((prev) => ({ ...prev, [item.productId]: String(newVal) }));
                      }}
                      className="w-8 h-8 text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min={1}
                      value={rawInputs[item.productId] ?? String(item.quantity)}
                      onChange={(e) =>
                        setRawInputs((prev) => ({ ...prev, [item.productId]: e.target.value }))
                      }
                      onBlur={() => {
                        const raw = rawInputs[item.productId];
                        if (raw !== undefined) {
                          const n = parseInt(raw, 10);
                          const safe = !isNaN(n) && n >= 1 ? n : 1;
                          updateQuantity(item.productId, safe);
                          setRawInputs((prev) => ({ ...prev, [item.productId]: String(safe) }));
                        }
                      }}
                      className="w-12 h-8 text-center text-sm border-x border-gray-200 focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newVal = item.quantity + 1;
                        updateQuantity(item.productId, newVal);
                        setRawInputs((prev) => ({ ...prev, [item.productId]: String(newVal) }));
                      }}
                      className="w-8 h-8 text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <span className="ml-2 text-xs text-gray-400">{item.unit}</span>
                </td>

                {/* Unit price */}
                <td className="px-4 py-3 text-right whitespace-nowrap text-gray-600">
                  {formatPrice(item.price)} ₽ / {item.unit}
                </td>

                {/* Total */}
                <td className="px-4 py-3 text-right whitespace-nowrap font-semibold text-[#1a1a1a]">
                  {formatPrice(item.price * item.quantity)} ₽
                </td>

                {/* Remove */}
                <td className="px-4 py-3 text-center">
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.productId)}
                    className="text-gray-300 hover:text-[#CC0000] transition-colors"
                    aria-label="Удалить"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="bg-[#f5f5f5] rounded-xl p-5 flex flex-col sm:flex-row gap-6 sm:items-center">
          <div>
            <div className="text-xs text-gray-400 mb-0.5">Общий вес</div>
            <div className="font-semibold text-[#1a1a1a]">Уточняется у менеджера</div>
          </div>
          <div className="w-px h-10 bg-gray-200 hidden sm:block" />
          <div>
            <div className="text-xs text-gray-400 mb-0.5">Итого к оплате</div>
            <div className="text-2xl font-black text-[#CC0000]">{formatPrice(totalPrice)} ₽</div>
          </div>
        </div>

        <Link
          href="/checkout"
          className="bg-[#CC0000] hover:bg-[#aa0000] text-white font-bold px-10 py-4 rounded-xl transition-colors whitespace-nowrap text-center"
        >
          Оформить заказ →
        </Link>
      </div>
    </div>
  );
}
