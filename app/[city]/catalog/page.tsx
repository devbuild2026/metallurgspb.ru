import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCityBySlug } from '@/lib/cities';
import CatalogPageContent from '@/components/pages/CatalogPageContent';

interface Props {
  params: { city: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = getCityBySlug(params.city);
  if (!city) return {};
  return {
    title: `Каталог металлопроката ${city.in} — цены, наличие`,
    description: `Полный каталог металлопроката: арматура, трубы, листовой прокат и др. Актуальные цены и наличие ${city.in}.`,
    alternates: { canonical: `https://metallurgspb.ru/${params.city}/catalog` },
    openGraph: { images: ['/og-image.jpg'],
      title: `Каталог металлопроката ${city.in} — Металлург`,
      description: `Полный каталог металлопроката с доставкой ${city.by}. Актуальные цены.`,
    },
  };
}

export default function CityCatalogPage({ params }: Props) {
  const city = getCityBySlug(params.city);
  if (!city) notFound();
  return <CatalogPageContent city={city} cityPrefix={`/${params.city}`} />;
}
