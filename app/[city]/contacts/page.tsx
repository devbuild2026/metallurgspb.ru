import type { Metadata } from 'next';
import { getCityBySlug } from '@/lib/cities';
import ContactsPageContent from '@/components/pages/ContactsPageContent';

interface Props {
  params: { city: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = getCityBySlug(params.city)!;
  return {
    title: `Контакты Металлург ${city.in} — адрес, телефон, email`,
    description: `Контактные данные Металлург ${city.in}. Адрес склада, телефон, email. Металлопрокат оптом и в розницу.`,
    alternates: { canonical: `https://metallurgspb.ru/${params.city}/contacts` },
    openGraph: { images: ['/og-image.jpg'],
      title: `Контакты Металлург ${city.in}`,
      description: `Адрес, телефон и email Металлург ${city.in}.`,
    },
  };
}

export default function CityContactsPage({ params }: Props) {
  const city = getCityBySlug(params.city)!;
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: `https://metallurgspb.ru/${params.city}` },
      { '@type': 'ListItem', position: 2, name: 'Контакты', item: `https://metallurgspb.ru/${params.city}/contacts` },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ContactsPageContent city={city} cityPrefix={`/${params.city}`} />
    </>
  );
}
