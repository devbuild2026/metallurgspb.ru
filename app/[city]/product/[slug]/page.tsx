import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCityBySlug } from '@/lib/cities';
import { getProductBySlug } from '@/data/products';
import ProductPageContent from '@/components/pages/ProductPageContent';

interface Props {
  params: { city: string; slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = getCityBySlug(params.city);
  if (!city) return {};
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: `${product.name} — цена ${city.in}`,
    description: `Купить ${product.name} ${city.in}. Характеристики, цена, доставка по России.`,
    alternates: { canonical: `https://metallurgspb.ru/${params.city}/product/${params.slug}` },
    openGraph: { images: ['/og-image.jpg'],
      title: `${product.name} ${city.in} — Металлург`,
      description: `Купить ${product.name} ${city.in}. Цена ${product.price.toLocaleString('ru-RU')} ₽ / ${product.unit}.`,
    },
  };
}

export default function CityProductPage({ params }: Props) {
  if (!getCityBySlug(params.city)) notFound();
  return (
    <ProductPageContent
      slug={params.slug}
      cityPrefix={`/${params.city}`}
      cityName={getCityBySlug(params.city)?.in}
      citySlug={params.city}
    />
  );
}
