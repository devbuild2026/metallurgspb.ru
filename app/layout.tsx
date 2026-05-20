import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartProvider } from '@/components/cart/CartProvider';
import CartPopup from '@/components/cart/CartPopup';
import FloatingPopup from '@/components/FloatingPopup';
import CityDetector from '@/components/CityDetector';

export const metadata: Metadata = {
  metadataBase: new URL('https://metallurgspb.ru'),
  title: {
    default: 'Металлург — металлопрокат оптом и в розницу',
    template: '%s | Металлург',
  },
  description: 'Продажа металлопроката в Санкт-Петербурге и Ленинградской области. Арматура, трубы, листовой прокат, швеллер, уголок.',
  keywords: ['металлопрокат', 'арматура', 'трубы', 'швеллер', 'уголок', 'листовой прокат', 'купить металл', 'Санкт-Петербург'],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Металлург',
    images: [{ url: '/images/logo/main_logo.png', width: 400, height: 120, alt: 'Металлург — металлопрокат' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Металлург — металлопрокат оптом и в розницу',
    description: 'Продажа металлопроката в Санкт-Петербурге и ЛО.',
    images: ['/images/logo/main_logo.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: 'https://metallurgspb.ru',
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Металлург',
  url: 'https://metallurgspb.ru',
  description: 'Продажа металлопроката в Санкт-Петербурге и Ленинградской области',
  publisher: {
    '@type': 'Organization',
    name: 'Металлург',
    url: 'https://metallurgspb.ru',
    logo: {
      '@type': 'ImageObject',
      url: 'https://metallurgspb.ru/images/logo/main_logo.png',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="bg-white text-[#1a1a1a]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <CartProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CartPopup />
          <FloatingPopup />
          <CityDetector />
        </CartProvider>
      </body>
    </html>
  );
}
