import type { Metadata } from 'next';
import Link from 'next/link';
import { getCityBySlug, getCityDeliveryContent } from '@/lib/cities';
import DeliveryCalculator from '@/components/DeliveryCalculator';
import { polishHeroTitle } from '@/lib/typography';

interface Props {
  params: { city: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = getCityBySlug(params.city)!;
  return {
    title: `Доставка металлопроката ${city.in} — сроки и условия`,
    description: `Условия доставки металлопроката ${city.by} и Ленинградской области. Собственный автопарк, отгрузка ${city.deliveryTime}.`,
    alternates: { canonical: `https://metallurgspb.ru/${params.city}/delivery` },
    openGraph: { images: ['/og-image.jpg'],
      title: `Доставка металлопроката ${city.in} — Металлург`,
      description: `Быстрая доставка металлопроката ${city.by}. Отгрузка ${city.deliveryTime}.`,
    },
  };
}

export default function CityDeliveryPage({ params }: Props) {
  const city = getCityBySlug(params.city)!;
  const content = getCityDeliveryContent(city);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: `https://metallurgspb.ru/${params.city}` },
      { '@type': 'ListItem', position: 2, name: 'Доставка', item: `https://metallurgspb.ru/${params.city}/delivery` },
    ],
  };

  const zones = [
    { zone: city.name, term: city.deliveryTime, details: 'Доставка собственным транспортом со\u00a0склада в\u00a0Санкт-Петербурге.' },
    { zone: `${city.name} и\u00a0окрестности (до\u00a030\u00a0км)`, term: '1–2 рабочих дня', details: 'Стоимость рассчитывается по\u00a0километражу от\u00a0склада.' },
    { zone: 'Ленинградская область', term: '1–3 рабочих дня', details: 'Согласование времени разгрузки заранее.' },
    { zone: 'Регионы РФ', term: 'от\u00a02\u00a0дней', details: 'Отправка через проверенные транспортные компании.' },
  ];

  return (
    <div className="bg-[#f5f5f5] min-h-screen py-16 sm:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="max-w-7xl mx-auto px-4">
        <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2">
          <Link href={`/${params.city}`} className="hover:text-[#CC0000] transition-colors">Главная</Link>
          <span>/</span>
          <span className="text-[#1a1a1a]">Доставка</span>
        </nav>
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-black text-[#1a1a1a] mb-3 text-balance [overflow-wrap:normal]">{polishHeroTitle(`Доставка металлопроката ${city.in}`)}</h1>
          <p className="text-gray-600 max-w-3xl leading-relaxed">{content.intro}</p>
        </div>

        <section className="bg-white rounded-2xl p-6 sm:p-8 mb-8 shadow-sm border border-gray-100">
          <h2 className="text-2xl sm:text-3xl font-black text-[#1a1a1a] mb-5">Условия доставки {city.in}</h2>
          <ul className="space-y-3 text-gray-700">
            {content.conditions.map((c, i) => (
              <li key={i}>• {c}</li>
            ))}
          </ul>
        </section>

        <section className="bg-white rounded-2xl p-6 sm:p-8 mb-8 shadow-sm border border-gray-100">
          <h2 className="text-2xl sm:text-3xl font-black text-[#1a1a1a] mb-5">Зоны и&nbsp;сроки доставки</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {zones.map((item) => (
              <article key={item.zone} className="border border-gray-100 rounded-xl p-5 bg-[#fafafa]">
                <h3 className="font-semibold text-[#1a1a1a] mb-1">{item.zone}</h3>
                <p className="text-[#CC0000] font-bold text-sm mb-1">{item.term}</p>
                <p className="text-gray-600 text-sm">{item.details}</p>
              </article>
            ))}
          </div>
        </section>

        <DeliveryCalculator />

        <section className="bg-[#1a1a1a] text-white rounded-2xl p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-black mb-3">Самовывоз</h2>
          <p className="text-gray-300 leading-relaxed mb-3">{content.selfPickupNote}</p>
          <p className="text-sm text-gray-400 mb-5">Адрес склада: {city.address}</p>
          <a
            href={city.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Найти на&nbsp;карте
          </a>
        </section>
      </div>
    </div>
  );
}
