import { getProductBySlug } from '@/data/products';
import type { Metadata } from 'next';
import ProductPageContent from '@/components/pages/ProductPageContent';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: `${product.name} — цена в Санкт-Петербурге`,
    description: `Купить ${product.name} в Санкт-Петербурге. Характеристики, цена, доставка по России.`,
    alternates: { canonical: `https://metallurgspb.ru/product/${params.slug}` },
    openGraph: { images: ['/og-image.jpg'],
      title: `${product.name} — Металлург`,
      description: `Купить ${product.name} в Санкт-Петербурге. Цена ${product.price.toLocaleString('ru-RU')} ₽ / ${product.unit}.`,
    },
  };
}

export default function ProductPage({ params }: Props) {
  return <ProductPageContent slug={params.slug} cityPrefix="" />;
}
