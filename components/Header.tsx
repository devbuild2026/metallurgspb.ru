'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { categoryGroups } from '@/data/categories';
import { useCart } from '@/components/cart/CartProvider';
import { getCityBySlug } from '@/lib/cities';
import CityDropdown from '@/components/CityDropdown';
import { sendLead } from '@/lib/sendLead';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [priceModal, setPriceModal] = useState(false);
  const [callModal, setCallModal] = useState(false);
  const [modalSent, setModalSent] = useState(false);
  const [messenger, setMessenger] = useState<'whatsapp' | 'telegram' | 'max'>('whatsapp');
  const [catalogOpen, setCatalogOpen] = useState(false);
  const catalogRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { itemCount } = useCart();
  const pathname = usePathname();
  const citySlug = pathname.split('/')[1];
  const cityPrefix = getCityBySlug(citySlug) ? `/${citySlug}` : '';

  const handleCatalogEnter = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setCatalogOpen(true);
  };

  const handleCatalogLeave = () => {
    closeTimerRef.current = setTimeout(() => setCatalogOpen(false), 200);
  };

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const callHandler = () => setCallModal(true);
    const priceHandler = () => setPriceModal(true);
    window.addEventListener('open-call-modal', callHandler);
    window.addEventListener('open-price-modal', priceHandler);
    return () => {
      window.removeEventListener('open-call-modal', callHandler);
      window.removeEventListener('open-price-modal', priceHandler);
    };
  }, []);

  useEffect(() => {
    if (!catalogOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (catalogRef.current && !catalogRef.current.contains(event.target as Node)) {
        setCatalogOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [catalogOpen]);

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        {/* Top bar */}
        <div className="bg-[#1a1a1a] text-white text-sm">
          <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-1">
            <div className="flex items-center gap-4">
              <CityDropdown />
              <span className="text-gray-300 hidden sm:block">Пн–Пт: 9:00–18:00 · Сб, Вс — выходной</span>
              <span className="text-gray-300 sm:hidden">Пн–Пт: 9:00–18:00</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="mailto:info@metallurgspb.ru" className="text-gray-300 hover:text-white transition-colors">
                info@metallurgspb.ru
              </a>
              <a href="tel:+78121234567" className="text-white font-semibold hover:text-red-400 transition-colors">
                +7 (812) 123-45-67
              </a>
              <div className="flex items-center gap-2">
                <a
                  href="https://wa.me/78121234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:brightness-110 transition-all"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.52 3.48A11.82 11.82 0 0012.07 0C5.47 0 .1 5.37.1 11.98c0 2.11.55 4.18 1.6 6.01L0 24l6.22-1.63a11.88 11.88 0 005.85 1.49h.01c6.6 0 11.97-5.37 11.97-11.98 0-3.2-1.24-6.2-3.53-8.4zm-8.45 18.37h-.01a9.9 9.9 0 01-5.05-1.39l-.36-.21-3.69.97.98-3.6-.24-.37a9.86 9.86 0 01-1.51-5.27c0-5.46 4.44-9.9 9.9-9.9 2.65 0 5.14 1.03 7.01 2.9a9.83 9.83 0 012.9 7c0 5.47-4.45 9.9-9.92 9.9zm5.43-7.4c-.3-.15-1.78-.88-2.06-.97-.27-.1-.47-.15-.67.15-.2.3-.76.97-.93 1.17-.17.2-.35.22-.65.08-.3-.15-1.26-.46-2.4-1.46a8.98 8.98 0 01-1.67-2.06c-.17-.3-.02-.46.13-.61.13-.13.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.03 1-1.03 2.44s1.06 2.84 1.2 3.04c.15.2 2.1 3.2 5.08 4.48.71.31 1.27.49 1.7.63.71.23 1.35.2 1.86.12.57-.08 1.78-.73 2.03-1.43.25-.7.25-1.3.17-1.43-.08-.12-.27-.2-.57-.35z" />
                  </svg>
                </a>
                <a
                  href="https://max.ru"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="MAX Messenger"
                  className="w-8 h-8 rounded-full bg-[#1f2937] text-white flex items-center justify-center hover:bg-[#111827] transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6.5A2.5 2.5 0 016.5 4h11A2.5 2.5 0 0120 6.5v7A2.5 2.5 0 0117.5 16H11l-4.5 4V16H6.5A2.5 2.5 0 014 13.5v-7z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 12l2.2-3 1.8 2.4L13.8 9 16 12" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="max-w-7xl mx-auto px-4 py-2.5 sm:py-3 flex items-center justify-between gap-3 sm:gap-4 relative">
          {/* Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link href={cityPrefix ? `${cityPrefix}/` : '/'}>
              <Image
                src="/images/logo/main_logo.svg"
                alt="Металлург"
                width={160}
                height={48}
                className="h-10 sm:h-12 w-auto object-contain"
                priority
              />
            </Link>
            <div className="hidden sm:block leading-tight border-l border-gray-200 pl-3">
              <p className="text-[11px] text-gray-400">Оптовая и розничная</p>
              <p className="text-[11px] text-gray-400">продажа металлопроката</p>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#1a1a1a]">
            {/* Catalog dropdown */}
            <div
              ref={catalogRef}
              className="static"
              onMouseEnter={handleCatalogEnter}
              onMouseLeave={handleCatalogLeave}
            >
              <div className="flex items-center gap-0.5">
                <Link href={`${cityPrefix}/catalog`} className="hover:text-[#CC0000] transition-colors py-2 pr-1">
                  Каталог
                </Link>
                <button
                  type="button"
                  className="hover:text-[#CC0000] transition-colors py-2 px-1"
                  aria-expanded={catalogOpen}
                  aria-label="Открыть меню каталога"
                >
                  <svg className={`w-4 h-4 transition-transform ${catalogOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Invisible bridge so moving mouse down doesn't close menu */}
              <div className="absolute left-0 right-0 h-3 top-full" />

              <div
                className={`absolute left-1/2 -translate-x-1/2 top-[calc(100%+0.5rem)] w-[min(1180px,95vw)] transition-all duration-200 ${
                  catalogOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
                onMouseEnter={handleCatalogEnter}
                onMouseLeave={handleCatalogLeave}
              >
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {categoryGroups.map((group) => (
                      <div key={group.id}>
                        <Link
                          href={`${cityPrefix}/catalog/${group.slug}`}
                          className="font-bold text-[#1a1a1a] mb-3 block hover:text-[#CC0000] transition-colors"
                          onClick={() => setCatalogOpen(false)}
                        >
                          {group.name}
                        </Link>
                        <ul className="space-y-2">
                          {group.children.map((category) => (
                            <li key={category.id}>
                              <Link
                                href={`${cityPrefix}/catalog/${category.slug}`}
                                className="text-gray-600 hover:text-[#CC0000] transition-colors text-sm"
                                onClick={() => setCatalogOpen(false)}
                              >
                                {category.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Link href={`${cityPrefix}/delivery`} className="hover:text-[#CC0000] transition-colors">Доставка</Link>
            <Link href={`${cityPrefix}/about`} className="hover:text-[#CC0000] transition-colors">О компании</Link>
            <Link href={`${cityPrefix}/payment`} className="hover:text-[#CC0000] transition-colors">Способы оплаты</Link>
            <Link href={`${cityPrefix}/contacts`} className="hover:text-[#CC0000] transition-colors">Контакты</Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/cart"
              aria-label={`Корзина: ${itemCount} товаров`}
              suppressHydrationWarning
              className="relative w-11 h-11 sm:w-10 sm:h-10 rounded-lg border border-gray-200 text-[#1a1a1a] flex items-center justify-center hover:border-[#CC0000] hover:text-[#CC0000] transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.19 17.75H7.53999C6.54999 17.75 5.59999 17.33 4.92999 16.6C4.25999 15.87 3.92 14.89 4 13.9L4.83 3.94C4.86 3.63 4.74999 3.33001 4.53999 3.10001C4.32999 2.87001 4.04 2.75 3.73 2.75H2C1.59 2.75 1.25 2.41 1.25 2C1.25 1.59 1.59 1.25 2 1.25H3.74001C4.47001 1.25 5.15999 1.56 5.64999 2.09C5.91999 2.39 6.12 2.74 6.23 3.13H18.72C19.73 3.13 20.66 3.53 21.34 4.25C22.01 4.98 22.35 5.93 22.27 6.94L21.73 14.44C21.62 16.27 20.02 17.75 18.19 17.75ZM6.28 4.62L5.5 14.02C5.45 14.6 5.64 15.15 6.03 15.58C6.42 16.01 6.95999 16.24 7.53999 16.24H18.19C19.23 16.24 20.17 15.36 20.25 14.32L20.79 6.82001C20.83 6.23001 20.64 5.67001 20.25 5.26001C19.86 4.84001 19.32 4.60999 18.73 4.60999H6.28V4.62Z" />
                <path d="M16.25 22.75C15.15 22.75 14.25 21.85 14.25 20.75C14.25 19.65 15.15 18.75 16.25 18.75C17.35 18.75 18.25 19.65 18.25 20.75C18.25 21.85 17.35 22.75 16.25 22.75ZM16.25 20.25C15.97 20.25 15.75 20.47 15.75 20.75C15.75 21.03 15.97 21.25 16.25 21.25C16.53 21.25 16.75 21.03 16.75 20.75C16.75 20.47 16.53 20.25 16.25 20.25Z" />
                <path d="M8.25 22.75C7.15 22.75 6.25 21.85 6.25 20.75C6.25 19.65 7.15 18.75 8.25 18.75C9.35 18.75 10.25 19.65 10.25 20.75C10.25 21.85 9.35 22.75 8.25 22.75ZM8.25 20.25C7.97 20.25 7.75 20.47 7.75 20.75C7.75 21.03 7.97 21.25 8.25 21.25C8.53 21.25 8.75 21.03 8.75 20.75C8.75 20.47 8.53 20.25 8.25 20.25Z" />
                <path d="M21 8.75H9C8.59 8.75 8.25 8.41 8.25 8C8.25 7.59 8.59 7.25 9 7.25H21C21.41 7.25 21.75 7.59 21.75 8C21.75 8.41 21.41 8.75 21 8.75Z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] rounded-full bg-[#CC0000] text-white text-[10px] leading-none flex items-center justify-center px-1">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* CTA */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => setCallModal(true)}
                className="bg-[#CC0000] hover:bg-[#aa0000] text-white font-semibold text-sm px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap"
              >
                Заказать звонок
              </button>
            </div>

            {/* Burger */}
            <button
              className="lg:hidden p-2.5 sm:p-2 rounded text-[#1a1a1a]"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Меню"
              aria-expanded={menuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-1">
            <Link href={`${cityPrefix}/catalog`} className="text-sm font-medium hover:text-[#CC0000] py-3 border-b border-gray-50" onClick={() => setMenuOpen(false)}>Каталог</Link>
            <Link href={`${cityPrefix}/delivery`} className="text-sm font-medium hover:text-[#CC0000] py-3 border-b border-gray-50" onClick={() => setMenuOpen(false)}>Доставка</Link>
            <Link href={`${cityPrefix}/about`} className="text-sm font-medium hover:text-[#CC0000] py-3 border-b border-gray-50" onClick={() => setMenuOpen(false)}>О компании</Link>
            <Link href={`${cityPrefix}/payment`} className="text-sm font-medium hover:text-[#CC0000] py-3 border-b border-gray-50" onClick={() => setMenuOpen(false)}>Способы оплаты</Link>
            <Link href={`${cityPrefix}/contacts`} className="text-sm font-medium hover:text-[#CC0000] py-3" onClick={() => setMenuOpen(false)}>Контакты</Link>
            <button
              onClick={() => {
                setCallModal(true);
                setMenuOpen(false);
              }}
              className="bg-[#CC0000] text-white font-bold text-sm px-4 py-3.5 rounded-xl text-center mt-3"
            >
              Заказать звонок
            </button>
          </div>
        )}
      </header>

      {/* ── Popup: Получить прайс-лист ── */}
      {priceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" onClick={() => { setPriceModal(false); setModalSent(false); }}>
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
            {modalSent ? (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <div className="text-xl font-bold text-[#1a1a1a] mb-1">Заявка отправлена!</div>
                <p className="text-gray-500 text-sm">Свяжемся с&nbsp;вами в&nbsp;течение 15&nbsp;минут</p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-[#1a1a1a] mb-1">Получить прайс-лист</h2>
                <p className="text-gray-500 text-sm mb-6">Свяжемся с&nbsp;вами в&nbsp;течение 15&nbsp;минут</p>
                <form className="flex flex-col gap-4" onSubmit={(e) => {
                  e.preventDefault();
                  const f = e.target as HTMLFormElement;
                  sendLead({
                    name: (f.elements.namedItem('price-name') as HTMLInputElement)?.value ?? '',
                    phone: (f.elements.namedItem('price-phone') as HTMLInputElement)?.value ?? '',
                    type: 'Получить прайс-лист',
                    comment: `Способ связи: ${messenger}`,
                  });
                  setModalSent(true);
                }}>
                  <input type="text" name="price-name" placeholder="Ваше имя" required className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#CC0000]" />
                  <input type="tel" name="price-phone" placeholder="+7 (___) ___-__-__" required className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#CC0000]" />
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Удобный способ связи</p>
                    <div className="flex gap-2">
                      {([
                        { id: 'whatsapp' as const, label: 'WhatsApp', color: 'bg-[#25D366]' },
                        { id: 'telegram' as const, label: 'Telegram', color: 'bg-[#229ED9]' },
                        { id: 'max' as const, label: 'Max', color: 'bg-[#1f2937]' },
                      ]).map((m) => (
                        <button key={m.id} type="button" onClick={() => setMessenger(m.id)}
                          className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${messenger === m.id ? `${m.color} text-white shadow-md` : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                        >{m.label}</button>
                      ))}
                    </div>
                  </div>
                  <button type="submit" className="bg-[#CC0000] hover:bg-[#aa0000] text-white font-bold py-3.5 rounded-xl transition-colors">
                    Получить прайс-лист
                  </button>
                </form>
              </>
            )}
            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600" onClick={() => { setPriceModal(false); setModalSent(false); }} aria-label="Закрыть">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>
      )}

      {/* ── Popup: Заказать звонок ── */}
      {callModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" onClick={() => { setCallModal(false); setModalSent(false); }}>
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
            {modalSent ? (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <div className="text-xl font-bold text-[#1a1a1a] mb-1">Заявка отправлена!</div>
                <p className="text-gray-500 text-sm">Перезвоним в&nbsp;течение 15&nbsp;минут</p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-[#1a1a1a] mb-1">Заказать звонок</h2>
                <p className="text-gray-500 text-sm mb-6">Перезвоним в&nbsp;течение 15&nbsp;минут</p>
                <form className="flex flex-col gap-4" onSubmit={(e) => {
                  e.preventDefault();
                  const f = e.target as HTMLFormElement;
                  sendLead({
                    name: (f.elements.namedItem('call-name') as HTMLInputElement)?.value ?? '',
                    phone: (f.elements.namedItem('call-phone') as HTMLInputElement)?.value ?? '',
                    type: 'Заказать звонок',
                  });
                  setModalSent(true);
                }}>
                  <input type="text" name="call-name" placeholder="Ваше имя" required className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#CC0000]" />
                  <input type="tel" name="call-phone" placeholder="+7 (___) ___-__-__" required className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#CC0000]" />
                  <button type="submit" className="bg-[#CC0000] hover:bg-[#aa0000] text-white font-bold py-3.5 rounded-xl transition-colors">
                    Заказать звонок
                  </button>
                </form>
              </>
            )}
            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600" onClick={() => { setCallModal(false); setModalSent(false); }} aria-label="Закрыть">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
