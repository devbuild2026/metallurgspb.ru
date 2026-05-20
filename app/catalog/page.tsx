import type { Metadata } from 'next';
import { defaultCity } from '@/lib/cities';
import CatalogPageContent from '@/components/pages/CatalogPageContent';

export const metadata: Metadata = {
  title: 'Каталог металлопроката в Санкт-Петербурге — цены, наличие | Металлург',
  description: 'Полный каталог металлопроката: арматура, трубы, листовой прокат и др. Актуальные цены и наличие на складе в Санкт-Петербурге.',
  alternates: { canonical: 'https://metallurgspb.ru/catalog' },
  openGraph: {
    title: 'Каталог металлопроката — Металлург',
    description: 'Полный каталог металлопроката со склада в Санкт-Петербурге. Актуальные цены.',
  },
};

export default function CatalogPage() {
  return <CatalogPageContent city={defaultCity} cityPrefix="" />;
}
