'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { categoryGroups } from '@/data/categories';
import { cities, getCityBySlug, defaultCity } from '@/lib/cities';
import { sendLead } from '@/lib/sendLead';

const mainCities = cities.filter(c => ['vsevolozhsk','gatchina','vyborg','sosnovy-bor','kolpino','pushkin','pavlovsk','kronshtadt'].includes(c.slug));
const secondCities = cities.filter(c => ['kingisepp','tosno','kirovsk','volhov','luga','priozersk','lomonosov','sertolovo'].includes(c.slug));

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const pathname = usePathname();
  const citySlug = pathname.split('/')[1];
  const currentCity = getCityBySlug(citySlug) ?? defaultCity;

  return (
    <footer className="bg-[#1a1a1a] text-white">
      {/* ── Верхняя часть: лого + подписка ── */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-10 sm:py-14">
          <div className="flex flex-col lg:flex-row gap-10 items-start lg:items-center">
            {/* Лого + контакты */}
            <div className="flex-1 order-2 lg:order-1">
              <Link href="/" className="inline-flex mb-4">
                <Image src="/images/logo/main_logo.svg" alt="Металлург" width={140} height={42} className="h-10 w-auto object-contain brightness-0 invert" />
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                Металлопрокат с&nbsp;доставкой по&nbsp;Санкт-Петербургу и&nbsp;Ленинградской области
              </p>
              <div className="flex flex-col gap-2 text-sm mt-4">
                <a href={`tel:${currentCity.phone}`} className="text-white hover:text-red-400 font-semibold transition-colors">{currentCity.phoneFormatted}</a>
                <a href="mailto:info@metallurgspb.ru" className="text-gray-400 hover:text-white transition-colors">info@metallurgspb.ru</a>
                <span className="text-gray-500 text-xs">Пн–Пт: 9:00–18:00</span>
              </div>
            </div>

            {/* Подписка */}
            <div className="flex-1 w-full order-1 lg:order-2">
              {subscribed ? (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                  <div className="text-2xl mb-2">&#10003;</div>
                  <div className="text-base font-bold mb-1">Вы&nbsp;подписаны!</div>
                  <div className="text-gray-400 text-sm">Будем присылать актуальные цены и&nbsp;спецпредложения</div>
                </div>
              ) : (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const f = e.target as HTMLFormElement;
                  sendLead({
                    name: (f.elements.namedItem('sub-name') as HTMLInputElement)?.value ?? '',
                    phone: (f.elements.namedItem('sub-email') as HTMLInputElement)?.value ?? '',
                    type: 'Подписка на рассылку',
                  });
                  setSubscribed(true);
                }} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <p className="font-bold text-white mb-1">Актуальные цены и&nbsp;акции</p>
                  <p className="text-gray-400 text-xs mb-4">Новые поступления, изменения цен и&nbsp;специальные предложения</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input type="text" name="sub-name" placeholder="Ваше имя" required className="flex-1 bg-white/10 border border-white/20 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#CC0000]" />
                    <input type="email" name="sub-email" placeholder="Email" required className="flex-1 bg-white/10 border border-white/20 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#CC0000]" />
                    <button type="submit" className="bg-[#CC0000] hover:bg-[#aa0000] text-white font-semibold px-6 py-3 rounded-xl transition-colors whitespace-nowrap text-sm">
                      Подписаться
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Навигация: каталог + города ── */}
      <div className="max-w-7xl mx-auto px-4 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-10">
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider mb-3 text-gray-300">Каталог</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm text-gray-400">
              {categoryGroups.map((g) => (
                <Link key={g.id} href={`/catalog/${g.slug}`} className="hover:text-white transition-colors">{g.name}</Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider mb-3 text-gray-300">Города</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm text-gray-400">
              {mainCities.map((c) => (
                <Link key={c.slug} href={`/${c.slug}`} className="hover:text-white transition-colors">{c.name}</Link>
              ))}
              {secondCities.map((c) => (
                <Link key={c.slug} href={`/${c.slug}`} className="hover:text-white transition-colors">{c.name}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Копирайт ── */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-5 sm:py-6">
          <p className="text-xs text-gray-600 mb-3 leading-relaxed">
            Металлопрокат в&nbsp;Санкт-Петербурге и&nbsp;Ленинградской области оптом и&nbsp;в&nbsp;розницу&nbsp;&mdash; арматура, трубы, листовой прокат, швеллер, уголок, балка. Доставка по&nbsp;СПб, ЛО и&nbsp;всей России. Самовывоз со&nbsp;склада бесплатно.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-sm text-gray-500">
            <span>Металлург&nbsp;&mdash; все права защищены</span>
            <span>Металлопрокат оптом и&nbsp;в&nbsp;розницу</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
