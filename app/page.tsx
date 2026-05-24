import type { Metadata } from 'next';
import { defaultCity } from '@/lib/cities';
import HomePageContent from '@/components/pages/HomePageContent';

export const metadata: Metadata = {
  title: 'Металлопрокат в Санкт-Петербурге и Ленинградской области — купить оптом и в розницу',
  description: 'Продажа металлопроката в Санкт-Петербурге и ЛО. Арматура, трубы, лист, швеллер и др. Прямые поставки, доставка по России, отгрузка в день заказа.',
  openGraph: { images: ['/og-image.jpg'],
    title: 'Металлопрокат в Санкт-Петербурге и ЛО — Металлург',
    description: 'Арматура, трубы, листовой прокат, швеллер, уголок. Оптом и в розницу со склада в Санкт-Петербурге.',
  },
  alternates: { canonical: 'https://metallurgspb.ru' },
  other: {
    'geo.region': defaultCity.geoRegion,
    'geo.placename': defaultCity.name,
    'geo.position': defaultCity.coords,
    'ICBM': defaultCity.coords,
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Металлург',
  url: 'https://metallurgspb.ru',
  logo: {
    '@type': 'ImageObject',
    url: 'https://metallurgspb.ru/images/logo/main_logo.png',
  },
  telephone: defaultCity.phone,
  email: 'info@metallurgspb.ru',
  address: {
    '@type': 'PostalAddress',
    streetAddress: defaultCity.streetAddress,
    addressLocality: defaultCity.addressLocality,
    postalCode: defaultCity.postalCode,
    addressCountry: 'RU',
  },
  openingHours: 'Mo-Fr 09:00-18:00',
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Металлург',
  description: 'Продажа металлопроката в Санкт-Петербурге и ЛО. Арматура, трубы, листовой прокат, швеллер, уголок оптом и в розницу.',
  url: 'https://metallurgspb.ru',
  telephone: defaultCity.phone,
  email: 'info@metallurgspb.ru',
  address: {
    '@type': 'PostalAddress',
    streetAddress: defaultCity.streetAddress,
    addressLocality: defaultCity.addressLocality,
    postalCode: defaultCity.postalCode,
    addressCountry: 'RU',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: defaultCity.coords.split(';')[0],
    longitude: defaultCity.coords.split(';')[1],
  },
  openingHours: 'Mo-Fr 09:00-18:00',
  priceRange: '$$',
  currenciesAccepted: 'RUB',
  areaServed: { '@type': 'City', name: defaultCity.name },
  hasMap: defaultCity.mapLink,
  image: 'https://metallurgspb.ru/images/logo/main_logo.png',
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <HomePageContent city={defaultCity} cityPrefix="" />
    </>
  );
}
