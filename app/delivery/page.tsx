import Link from 'next/link';
import DeliveryCalculator from '@/components/DeliveryCalculator';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Доставка металлопроката в Санкт-Петербурге — сроки и условия | Металлург',
  description: 'Условия доставки металлопроката по Санкт-Петербургу, Ленинградской области и регионам России. Отгрузка в день заказа, собственный автопарк.',
  alternates: { canonical: 'https://metallurgspb.ru/delivery' },
  openGraph: {
    title: 'Доставка металлопроката — Металлург',
    description: 'Быстрая доставка металлопроката по СПб и ЛО. Отгрузка в день заказа.',
  },
};

const zones = [
  { zone: 'Санкт-Петербург (в пределах КАД)', term: '1 рабочий день', details: 'Доставка собственным транспортом.' },
  { zone: 'Ленинградская область (до 50 км от КАД)', term: '1–2 рабочих дня', details: 'Стоимость рассчитывается по километражу.' },
  { zone: 'Ленинградская область (50–150 км)', term: '2 рабочих дня', details: 'Согласование времени разгрузки заранее.' },
  { zone: 'Регионы РФ', term: 'от 2 дней', details: 'Отправка через проверенные транспортные компании.' },
];

export default function DeliveryPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://metallurgspb.ru' },
      { '@type': 'ListItem', position: 2, name: 'Доставка', item: 'https://metallurgspb.ru/delivery' },
    ],
  };

  return (
    <div className="bg-[#f5f5f5] min-h-screen py-16 sm:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="max-w-7xl mx-auto px-4">
        <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-[#CC0000] transition-colors">Главная</Link>
          <span>/</span>
          <span className="text-[#1a1a1a]">Доставка</span>
        </nav>
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-black text-[#1a1a1a] mb-3">Доставка</h1>
          <p className="text-gray-600 max-w-3xl leading-relaxed">
            Организуем быструю и безопасную доставку металлопроката по Санкт-Петербургу, Ленинградской области и в регионы России.
            Отгружаем со склада ежедневно, помогаем с подбором транспорта под объём и тип продукции.
          </p>
        </div>

        <section className="bg-white rounded-2xl p-6 sm:p-8 mb-8 shadow-sm border border-gray-100">
          <h2 className="text-2xl sm:text-3xl font-black text-[#1a1a1a] mb-5">Условия доставки</h2>
          <ul className="space-y-3 text-gray-700">
            <li>• Минимальный объём заказа для доставки — от 1 позиции.</li>
            <li>• Возможны отгрузки день в день при подтверждении заказа до 12:00.</li>
            <li>• Разгрузка на объекте согласуется заранее (кран, манипулятор, бригада).</li>
            <li>• Для постоянных клиентов доступны персональные тарифы на логистику.</li>
          </ul>
        </section>

        <section className="bg-white rounded-2xl p-6 sm:p-8 mb-8 shadow-sm border border-gray-100">
          <h2 className="text-2xl sm:text-3xl font-black text-[#1a1a1a] mb-5">Зоны и сроки</h2>
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

        {/* Калькулятор — клиентский компонент */}
        <DeliveryCalculator />

        <section className="bg-[#1a1a1a] text-white rounded-2xl p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-black mb-3">Самовывоз</h2>
          <p className="text-gray-300 leading-relaxed mb-3">
            Самовывоз доступен бесплатно со склада в Санкт-Петербурге в рабочие дни с 9:00 до 18:00.
            Подготовим документы и заказ к вашему приезду.
          </p>
          <p className="text-sm text-gray-400 mb-5">Адрес склада: г. Санкт-Петербург, ул. Складская, д. 10, лит. А</p>
          <a
            href="https://yandex.ru/maps/?text=Санкт-Петербург+Складская+10"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Найти на карте
          </a>
        </section>
      </div>
    </div>
  );
}
