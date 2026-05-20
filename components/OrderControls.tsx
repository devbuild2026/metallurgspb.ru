'use client';

import { useState } from 'react';
import { useCart } from '@/components/cart/CartProvider';
import { sendLead } from '@/lib/sendLead';

interface Props {
  productId: number;
  slug: string;
  name: string;
  price: number;
  unit: string;
  size: string;
}

export default function OrderControls({ productId, slug, name, price, unit, size }: Props) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [qtyInput, setQtyInput] = useState('1');
  const [orderName, setOrderName] = useState('');
  const [phone, setPhone] = useState('');
  const [quickSent, setQuickSent] = useState(false);

  const handleAddToCart = () => {
    addToCart({ productId, slug, name, price, unit, size }, qty);
  };

  const handleQuickOrder = (e: React.FormEvent) => {
    e.preventDefault();
    sendLead({
      name: orderName,
      phone,
      type: 'Быстрый заказ',
      product: name,
      quantity: `${qty} ${unit}`,
    });
    setQuickSent(true);
  };

  return (
    <div className="space-y-4">
      {/* Quantity stepper */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => {
              const newVal = Math.max(1, qty - 1);
              setQty(newVal);
              setQtyInput(String(newVal));
            }}
            className="w-10 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-50 text-xl font-bold transition-colors"
          >
            −
          </button>
          <input
            type="number"
            min={1}
            value={qtyInput}
            onChange={(e) => setQtyInput(e.target.value)}
            onBlur={() => {
              const n = parseInt(qtyInput, 10);
              const safe = !isNaN(n) && n >= 1 ? n : 1;
              setQty(safe);
              setQtyInput(String(safe));
            }}
            className="w-14 h-12 text-center font-semibold text-[#1a1a1a] border-x border-gray-200 focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <button
            onClick={() => {
              const newVal = qty + 1;
              setQty(newVal);
              setQtyInput(String(newVal));
            }}
            className="w-10 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-50 text-xl font-bold transition-colors"
          >
            +
          </button>
        </div>
        <span className="text-sm text-gray-400">{unit}</span>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-[#CC0000] hover:bg-[#aa0000] text-white font-bold py-3.5 rounded-xl transition-colors text-sm sm:text-base"
        >
          В корзину
        </button>
        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event('open-call-modal'))}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-[#1a1a1a] font-bold py-3.5 rounded-xl transition-colors text-sm sm:text-base"
        >
          Заказать звонок
        </button>
      </div>

      {/* Quick order */}
      <div className="border border-gray-200 rounded-xl p-4 sm:p-5">
        <h3 className="font-bold text-[#1a1a1a] mb-3 text-sm">Быстрый заказ</h3>
        {quickSent ? (
          <p className="text-sm text-green-600 font-medium">Спасибо! Менеджер свяжется с вами в ближайшее время.</p>
        ) : (
          <form onSubmit={handleQuickOrder} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Ваше имя"
              value={orderName}
              onChange={(e) => setOrderName(e.target.value)}
              required
              className="flex-1 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#CC0000] transition-colors"
            />
            <input
              type="tel"
              placeholder="+7 (___) ___-__-__"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="flex-1 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#CC0000] transition-colors"
            />
            <button
              type="submit"
              className="bg-[#CC0000] hover:bg-[#aa0000] text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors whitespace-nowrap w-full sm:w-auto"
            >
              Отправить
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
