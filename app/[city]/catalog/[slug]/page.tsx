import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCityBySlug } from '@/lib/cities';
import { getCategoryBySlug, getCategoryGroupBySlug } from '@/data/categories';
import CatalogSlugContent from '@/components/pages/CatalogSlugContent';

interface Props {
  params: { city: string; slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = getCityBySlug(params.city);
  if (!city) return {};

  const category = getCategoryBySlug(params.slug);
  if (category) {
    return {
      title: `${category.name} ${city.in} — купить оптом и в розницу`,
      description: `Купить ${category.name.toLowerCase()} ${city.in}. Актуальные цены, доставка, большой ассортимент.`,
      alternates: { canonical: `https://metallurgspb.ru/${params.city}/catalog/${params.slug}` },
      openGraph: { images: ['/og-image.jpg'],
        title: `${category.name} ${city.in} — Металлург`,
        description: `Купить ${category.name.toLowerCase()} ${city.in}. Цены, наличие, доставка.`,
      },
    };
  }
  const group = getCategoryGroupBySlug(params.slug);
  if (group) {
    return {
      title: `${group.name} ${city.in} — купить оптом и в розницу`,
      description: `Купить ${group.name.toLowerCase()} ${city.in}. Все виды и размеры, актуальные цены, наличие на складе.`,
      alternates: { canonical: `https://metallurgspb.ru/${params.city}/catalog/${params.slug}` },
      openGraph: { images: ['/og-image.jpg'],
        title: `${group.name} ${city.in} — Металлург`,
        description: `${group.name} оптом и в розницу ${city.in}. Актуальные цены.`,
      },
    };
  }
  return {};
}

export default function CityCatalogSlugPage({ params }: Props) {
  if (!getCityBySlug(params.city)) notFound();
  return <CatalogSlugContent slug={params.slug} cityPrefix={`/${params.city}`} citySlug={params.city} />;
}
