'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { City } from '@/lib/cities';
import { getCityUniqueData } from '@/lib/cities';
import { categoryGroups } from '@/data/categories';
import { getPopularProducts, getDiscountProducts, products } from '@/data/products';
import { getCategoryImage } from '@/data/categoryImages';
import PopularProductsTabs from '@/components/PopularProductsTabs';
import ReviewsBlock from '@/components/ReviewsBlock';
import CallbackForm from '@/components/CallbackForm';
import FaqAccordion from '@/components/FaqAccordion';
import { polishHeroTitle } from '@/lib/typography';

const ADV_ICONS = [
  <svg key="i0" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
  <svg key="i1" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>,
  <svg key="i2" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  <svg key="i3" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>,
];

interface Props { city: City; cityPrefix?: string; }

export default function HomePageContent({ city, cityPrefix = '' }: Props) {
  const popularProducts = getPopularProducts();
  const discountProducts = getDiscountProducts();
  const productCounts = products.reduce<Record<string, number>>((acc, p) => {
    acc[p.categorySlug] = (acc[p.categorySlug] ?? 0) + 1;
    return acc;
  }, {});
  const groupProductCounts = categoryGroups.map((g) => ({
    ...g,
    count: g.children.reduce((sum, ch) => sum + (productCounts[ch.slug] ?? 0), 0),
  }));

  const unique = getCityUniqueData(city);
  const { layout, hero } = unique;

  /* ── 1. HERO ─────────────────────────────────────────────── */
  const heroBlock = (
    <section key="hero" className="relative bg-[#1a1a1a] text-white py-14 sm:py-20 lg:py-28 overflow-hidden">
      <Image src="/images/background/background1.webp" alt={`Металлопрокат ${city.in} — склад Металлург`} fill priority sizes="100vw" className="object-cover object-center" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.80), rgba(0,0,0,0.30))' }} />
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="max-w-3xl">
          <div className="inline-flex items-center bg-white/15 backdrop-blur-sm text-white text-[11px] sm:text-xs font-semibold tracking-wide px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6 whitespace-nowrap border border-white/20">
            {hero.badge}
          </div>
          <h1 className="text-[28px] sm:text-4xl lg:text-5xl font-black leading-[1.15] mb-4 sm:mb-6 text-balance">
            <span className="text-white">{polishHeroTitle(hero.title)} </span>
            <br className="hidden sm:block" />
            <span className="inline-flex items-center bg-white/90 backdrop-blur-sm text-[#CC0000] text-[20px] sm:text-[30px] lg:text-[38px] font-bold px-5 sm:px-7 py-2 sm:py-3 rounded-full mt-2 sm:mt-3 whitespace-nowrap leading-none">{hero.utp}</span>
          </h1>
          <p className="text-gray-300 text-base sm:text-xl mb-6 sm:mb-8 leading-relaxed max-w-2xl">
            {hero.sub}. Отгрузка в&nbsp;день заказа.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mb-8 sm:mb-10">
            <Link href={`${cityPrefix}/catalog`} className="bg-[#CC0000] hover:bg-[#aa0000] text-white font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl transition-colors text-center text-sm sm:text-base">
              Смотреть каталог
            </Link>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event('open-price-modal'))}
              className="bg-white hover:bg-gray-100 text-[#1a1a1a] font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl transition-colors text-center text-sm sm:text-base"
            >
              Получить прайс
            </button>
          </div>
          {/* Плашки */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2.5 sm:gap-3">
            {unique.stats.map((s) => (
              <div key={s.label} className="bg-white/10 backdrop-blur-sm rounded-xl px-4 sm:px-6 py-2.5 sm:py-3 flex flex-col">
                <span className="text-xl sm:text-2xl font-black text-white leading-tight">{s.value}</span>
                <span className="text-gray-300 text-[11px] sm:text-xs mt-0.5">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  /* ── 2. КАТАЛОГ ──────────────────────────────────────────── */
  const catalogBlock = (
    <section key="catalog" className="py-12 sm:py-20 lg:py-24 bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-6 sm:mb-10">
          <div>
            <h2 className="text-xl sm:text-3xl font-black text-[#1a1a1a]">Каталог продукции</h2>
            <p className="text-gray-500 mt-1">{categoryGroups.length} категорий металлопроката</p>
          </div>
          <Link href={`${cityPrefix}/catalog`} className="text-[#CC0000] font-semibold text-sm hover:underline hidden sm:block">Весь каталог &rarr;</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {groupProductCounts.map((group) => {
            const img = getCategoryImage(group.slug);
            return (
              <Link key={group.id} href={`${cityPrefix}/catalog/${group.slug}`} className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md hover:border-[#CC0000]/30 transition-all group flex flex-col">
                <div className="w-full h-44 bg-white flex items-center justify-center overflow-hidden">
                  {img ? <Image src={img} alt={`${group.name} — металлопрокат ${city.name}`} width={200} height={144} className="w-full h-full object-contain p-3" /> : <svg viewBox="0 0 48 48" className="w-12 h-12 text-gray-200" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="8" y="16" width="32" height="16" rx="1" /><line x1="8" y1="24" x2="40" y2="24" /></svg>}
                </div>
                <div className="p-3 text-center">
                  <div className="font-semibold text-[#1a1a1a] text-sm group-hover:text-[#CC0000] transition-colors leading-snug">{group.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{group.count} позиций</div>
                </div>
              </Link>
            );
          })}
        </div>
        <p className="text-gray-500 text-sm mt-8 leading-relaxed max-w-4xl">
          Поставляем металлопрокат {city.in} и&nbsp;ближайшие районы Ленинградской области.
          Весь ассортимент доступен со&nbsp;склада в&nbsp;Санкт-Петербурге с&nbsp;доставкой {city.by}.
          Сроки&nbsp;&mdash; {city.deliveryTime}. Самовывоз&nbsp;&mdash; бесплатно.
        </p>
        <div className="mt-4 sm:hidden text-center">
          <Link href={`${cityPrefix}/catalog`} className="text-[#CC0000] font-semibold text-sm hover:underline">Весь каталог &rarr;</Link>
        </div>
      </div>
    </section>
  );

  const ctaBlock = <CallbackForm key="cta" />;

  /* ── ДОСТАВКА ────────────────────────────────────────────── */
  const deliveryBlock = (
    <section key="delivery" className="py-12 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative bg-[#1a1a1a] rounded-2xl overflow-hidden" style={{ minHeight: '320px' }}>
          <div className="relative z-10 w-full lg:w-[55%] p-5 sm:p-8 lg:p-10 text-white">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black mb-4 text-balance">Доставка {city.by} и&nbsp;Ленинградской области</h2>
            <p className="text-gray-300 leading-relaxed mb-6">{unique.text}</p>
            <ul className="flex flex-col gap-3 text-sm text-gray-300">
              {[
                <><span style={{ whiteSpace: 'nowrap' }}>{city.name}</span>&nbsp;&mdash; {city.deliveryTime}</>,
                <>Ленинградская область&nbsp;&mdash; от&nbsp;1–2&nbsp;рабочих дней</>,
                <>Самовывоз со&nbsp;склада в&nbsp;СПб&nbsp;&mdash; бесплатно</>,
                <>Регионы РФ&nbsp;&mdash; по&nbsp;согласованию</>,
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-[#CC0000] rounded-full flex items-center justify-center text-white text-xs flex-shrink-0">&#10003;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="absolute bottom-0 right-0 w-[52%] hidden lg:block">
            <Image src="/images/delivery/car.webp" alt="Доставка металлопроката собственным автопарком" width={900} height={514} className="w-full h-auto object-contain object-left-bottom" />
          </div>
        </div>
      </div>
    </section>
  );

  /* ── ПРЕИМУЩЕСТВА ────────────────────────────────────────── */
  const advantagesBlock = (
    <section key="advantages" className="py-12 sm:py-20 lg:py-24 bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#1a1a1a]">Почему выбирают Металлург</h2>
          <p className="text-gray-500 mt-2">12&nbsp;лет надёжных поставок металлопроката {city.in}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {unique.advantages.map((adv, i) => (
            <div key={adv.title} className="bg-white rounded-xl p-6 flex flex-col gap-4 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-[#CC0000]/10 text-[#CC0000] rounded-xl flex items-center justify-center">{ADV_ICONS[i % ADV_ICONS.length]}</div>
              <div>
                <h3 className="font-bold text-[#1a1a1a] mb-2">{adv.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{adv.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const productsBlock = <PopularProductsTabs key="products" popularProducts={popularProducts} discountProducts={discountProducts} />;
  const reviewsBlock = <ReviewsBlock key="reviews" reviews={unique.reviews} />;
  const faqBlock = <FaqAccordion key="faq" items={unique.faq} />;

  const flexMap: Record<string, React.ReactNode> = { delivery: deliveryBlock, advantages: advantagesBlock, products: productsBlock };

  /* ── СТРОГАЯ СТРУКТУРА ──────────────────────────────────── */
  return (
    <>
      {heroBlock}
      {layout.middle === 'catalog_first' ? <>{catalogBlock}{ctaBlock}</> : <>{ctaBlock}{catalogBlock}</>}
      {layout.flex.map((name) => flexMap[name])}
      {faqBlock}
      {reviewsBlock}
    </>
  );
}
