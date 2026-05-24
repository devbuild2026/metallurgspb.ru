import type { Metadata } from 'next';
import Link from 'next/link';
import { getCityBySlug, getCityAboutContent } from '@/lib/cities';
import { polishHeroTitle } from '@/lib/typography';

interface Props {
  params: { city: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = getCityBySlug(params.city)!;
  return {
    title: `О компании Металлург — металлопрокат ${city.in}`,
    description: `Металлург — поставщик металлопроката ${city.in} и Ленинградской области с 2012 года. 500+ товарных позиций, доставка ${city.deliveryTime}.`,
    alternates: { canonical: `https://metallurgspb.ru/${params.city}/about` },
    openGraph: { images: ['/og-image.jpg'],
      title: `О компании Металлург — ${city.name}`,
      description: `Поставщик металлопроката ${city.in} и Ленинградской области.`,
    },
  };
}

const milestones = [
  { year: '2012', text: 'Основание компании и\u00a0первые прямые контракты с\u00a0металлургическими комбинатами.' },
  { year: '2017', text: 'Запуск собственного складского комплекса в\u00a0Санкт-Петербурге и\u00a0расширение ассортимента до\u00a0300+ позиций.' },
  { year: '2021', text: 'Рост логистической сети и\u00a0регулярные поставки в\u00a0более чем 40\u00a0регионов РФ.' },
  { year: '2024', text: 'Цифровизация продаж и\u00a0автоматизация обработки заказов для\u00a0B2B-клиентов.' },
];

const metrics = [
  { value: '12+', label: 'лет на\u00a0рынке' },
  { value: '15\u00a0000\u00a0т', label: 'металла на\u00a0складе' },
  { value: '500+', label: 'товарных позиций' },
  { value: '40+', label: 'регионов поставок' },
];

const team = [
  { role: 'Отдел продаж', desc: 'Консультирует по\u00a0ассортименту, срокам и\u00a0коммерческим условиям.' },
  { role: 'Логистика', desc: 'Планирует маршруты и\u00a0контролирует своевременную отгрузку.' },
  { role: 'Склад и\u00a0контроль качества', desc: 'Отвечает за\u00a0комплектацию и\u00a0проверку соответствия заказа.' },
];

export default function CityAboutPage({ params }: Props) {
  const city = getCityBySlug(params.city)!;
  const content = getCityAboutContent(city);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: `https://metallurgspb.ru/${params.city}` },
      { '@type': 'ListItem', position: 2, name: 'О компании', item: `https://metallurgspb.ru/${params.city}/about` },
    ],
  };

  return (
    <div className="bg-[#f5f5f5] py-16 sm:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="max-w-7xl mx-auto px-4">
        <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2">
          <Link href={`/${params.city}`} className="hover:text-[#CC0000] transition-colors">Главная</Link>
          <span>/</span>
          <span className="text-[#1a1a1a]">О компании</span>
        </nav>
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-black text-[#1a1a1a] mb-3 text-balance [overflow-wrap:normal]">{polishHeroTitle(`О компании Металлург — ${city.name}`)}</h1>
          <p className="text-gray-600 max-w-3xl leading-relaxed">{content.intro}</p>
        </div>

        <section className="bg-white rounded-2xl p-6 sm:p-8 mb-8 shadow-sm border border-gray-100">
          <h2 className="text-2xl sm:text-3xl font-black text-[#1a1a1a] mb-5">Наша история</h2>
          <div className="space-y-4">
            {milestones.map((item) => (
              <article key={item.year} className="flex gap-4">
                <div className="w-16 flex-shrink-0 text-[#CC0000] font-black">{item.year}</div>
                <p className="text-gray-700">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#1a1a1a] text-white rounded-2xl p-6 sm:p-8 mb-8">
          <h2 className="text-2xl sm:text-3xl font-black mb-5">Ключевые цифры</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((item) => (
              <article key={item.label} className="bg-white/5 border border-white/10 rounded-xl p-5">
                <p className="text-2xl font-black text-white mb-1">{item.value}</p>
                <p className="text-sm text-gray-300">{item.label}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl p-6 sm:p-8 mb-8 shadow-sm border border-gray-100">
          <h2 className="text-2xl sm:text-3xl font-black text-[#1a1a1a] mb-5">Доставка {city.in}</h2>
          <p className="text-gray-600 leading-relaxed">{content.deliveryNote}</p>
        </section>

        <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
          <h2 className="text-2xl sm:text-3xl font-black text-[#1a1a1a] mb-5">Команда</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {team.map((item) => (
              <article key={item.role} className="bg-[#fafafa] border border-gray-100 rounded-xl p-5">
                <h3 className="font-semibold text-[#1a1a1a] mb-2">{item.role}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
