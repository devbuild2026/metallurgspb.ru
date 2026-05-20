import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getCityBySlug, getCityStaticParams, type City } from '@/lib/cities';

export function generateStaticParams() {
  return getCityStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: { city: string };
}): Promise<Metadata> {
  const city = getCityBySlug(params.city);
  if (!city) return {};
  return {
    other: {
      'geo.region': city.geoRegion,
      'geo.placename': city.name,
      'geo.position': city.coords,
      'ICBM': city.coords,
    },
  };
}

function buildLocalBusinessSchema(city: City, citySlug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Металлург',
    description: `Продажа металлопроката ${city.in}. Арматура, трубы, листовой прокат, швеллер, уголок оптом и в розницу.`,
    url: `https://metallurgspb.ru/${citySlug}`,
    telephone: city.phone,
    email: 'info@metallurgspb.ru',
    address: {
      '@type': 'PostalAddress',
      streetAddress: city.streetAddress,
      addressLocality: city.addressLocality,
      postalCode: city.postalCode,
      addressCountry: 'RU',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: city.coords.split(';')[0],
      longitude: city.coords.split(';')[1],
    },
    openingHours: 'Mo-Fr 09:00-18:00',
    priceRange: '$$',
    currenciesAccepted: 'RUB',
    areaServed: {
      '@type': 'City',
      name: city.name,
    },
    hasMap: city.mapLink,
    image: 'https://metallurgspb.ru/images/logo/main_logo.png',
    sameAs: ['https://metallurgspb.ru'],
  };
}

export default function CityLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { city: string };
}) {
  const city = getCityBySlug(params.city);
  if (!city) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildLocalBusinessSchema(city, params.city)),
        }}
      />
      {children}
    </>
  );
}
