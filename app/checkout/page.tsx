'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useCart } from '@/components/cart/CartProvider';
import { sendLead } from '@/lib/sendLead';

function formatPrice(price: number) {
  return price.toLocaleString('ru-RU', {
    minimumFractionDigits: Number.isInteger(price) ? 0 : 2,
    maximumFractionDigits: 2,
  });
}

function formatPhoneMask(value: string): string {
  const digits = value.replace(/\D/g, '');
  const d = digits.startsWith('7') ? digits : digits.startsWith('8') ? '7' + digits.slice(1) : '7' + digits;
  let result = '+7';
  if (d.length > 1) result += ' (' + d.slice(1, 4);
  if (d.length >= 4) result += ') ' + d.slice(4, 7);
  if (d.length >= 7) result += '-' + d.slice(7, 9);
  if (d.length >= 9) result += '-' + d.slice(9, 11);
  return result;
}

function isValidPhone(value: string): boolean {
  return value.replace(/\D/g, '').length === 11;
}

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const phoneRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (phoneRef.current && items.length > 0) {
      phoneRef.current.focus();
    }
  }, [items.length]);

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhoneMask(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderLines = items.map((i) => `${i.name} × ${i.quantity}`).join('\n');
    sendLead({
      name,
      phone,
      type: 'Заказ с сайта',
      product: orderLines || '—',
      quantity: `${items.reduce((s, i) => s + i.quantity, 0)} поз.`,
      comment: `Сумма: ${formatPrice(totalPrice)} ₽`,
    });
    clearCart();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-black text-[#1a1a1a] mb-3">Заявка отправлена!</h1>
        <p className="text-gray-500 mb-8">
          Свяжемся с&nbsp;вами в&nbsp;течение 15&nbsp;минут.
        </p>
        <Link
          href="/"
          className="inline-block bg-[#CC0000] hover:bg-[#aa0000] text-white font-bold px-8 py-3 rounded-xl transition-colors"
        >
          На главную
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-[#1a1a1a] mb-4">Корзина пуста</h1>
        <Link href="/catalog" className="text-[#CC0000] hover:underline">Перейти в&nbsp;каталог</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-[#CC0000] transition-colors">Главная</Link>
        <span>/</span>
        <Link href="/cart" className="hover:text-[#CC0000] transition-colors">Корзина</Link>
        <span>/</span>
        <span className="text-[#1a1a1a]">Оформление заказа</span>
      </nav>

      <h1 className="text-3xl font-black text-[#1a1a1a] mb-8">Оформление заказа</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Форма — 2 поля */}
        <div className="flex-1">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-black text-[#1a1a1a] mb-6">Контактные данные</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label htmlFor="checkout-name" className="block text-sm font-medium text-gray-700 mb-1.5">Имя</label>
                <input
                  id="checkout-name"
                  type="text"
                  placeholder="Ваше имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="given-name"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#CC0000] transition-colors"
                />
              </div>
              <div>
                <label htmlFor="checkout-phone" className="block text-sm font-medium text-gray-700 mb-1.5">Телефон</label>
                <input
                  ref={phoneRef}
                  id="checkout-phone"
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={phone}
                  onChange={handlePhoneChange}
                  required
                  autoComplete="tel"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#CC0000] transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={!name.trim() || !isValidPhone(phone)}
                className="mt-2 bg-[#CC0000] hover:bg-[#aa0000] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-colors"
              >
                Оформить заказ
              </button>
              <p className="text-xs text-gray-400 text-center">Свяжемся с&nbsp;вами в&nbsp;течение 15&nbsp;минут</p>
            </form>
          </div>
        </div>

        {/* Состав заказа */}
        <div className="lg:w-[320px]">
          <div className="bg-[#f5f5f5] rounded-2xl p-6 sticky top-24">
            <h2 className="text-base font-bold text-[#1a1a1a] mb-4">Ваш заказ</h2>
            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div key={item.productId} className="flex justify-between gap-2 text-sm">
                  <span className="text-gray-600 flex-1 leading-snug">{item.name}</span>
                  <span className="font-semibold text-[#1a1a1a] whitespace-nowrap">
                    {item.quantity}&nbsp;&times;&nbsp;{formatPrice(item.price)}&nbsp;&#8381;
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
              <span className="text-sm text-gray-500">Итого</span>
              <span className="text-xl font-black text-[#CC0000]">{formatPrice(totalPrice)}&nbsp;&#8381;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
