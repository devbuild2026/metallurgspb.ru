import type { Metadata } from 'next';
import { getCityBySlug } from '@/lib/cities';
import HomePageContent from '@/components/pages/HomePageContent';

interface Props {
  params: { city: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = getCityBySlug(params.city)!;
  return {
    title: `Металлопрокат ${city.in} — купить с доставкой`,
    description: `Купить металлопрокат ${city.in}. Доставка ${city.by} и Ленинградской области. Всегда в наличии. Опт и розница.`,
    openGraph: { images: ['/og-image.jpg'],
      title: `Металлопрокат ${city.in} — Металлург`,
      description: `Арматура, трубы, листовой прокат, швеллер, уголок. Оптом и в розницу со склада ${city.in}.`,
    },
    alternates: { canonical: `https://metallurgspb.ru/${params.city}` },
  };
}

export default function CityHomePage({ params }: Props) {
  const city = getCityBySlug(params.city)!;
  return <HomePageContent city={city} cityPrefix={`/${params.city}`} />;
}
