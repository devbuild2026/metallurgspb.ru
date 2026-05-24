import type { Metadata } from 'next';
import { defaultCity } from '@/lib/cities';
import ContactsPageContent from '@/components/pages/ContactsPageContent';

export const metadata: Metadata = {
  title: 'Контакты Металлург в Санкт-Петербурге — адрес, телефон, email',
  description: 'Контактные данные компании Металлург. Адрес склада, телефон, email. Металлопрокат оптом и в розницу в Санкт-Петербурге.',
  alternates: { canonical: 'https://metallurgspb.ru/contacts' },
  openGraph: { images: ['/og-image.jpg'],
    title: 'Контакты — Металлург',
    description: 'Адрес, телефон и email компании Металлург в Санкт-Петербурге.',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://metallurgspb.ru' },
    { '@type': 'ListItem', position: 2, name: 'Контакты', item: 'https://metallurgspb.ru/contacts' },
  ],
};

export default function ContactsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ContactsPageContent city={defaultCity} cityPrefix="" />
    </>
  );
}
