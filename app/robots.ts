import type { MetadataRoute } from 'next';
import { SITE_INDEXABLE } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = 'https://metallurgspb.ru';

  // Индексация запрещена централизованным флагом SITE_INDEXABLE (lib/seo.ts)
  // или это preview/staging-окружение → закрыть ВЕСЬ сайт.
  const isPreview = !!process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production';
  if (!SITE_INDEXABLE || isPreview) {
    return {
      rules: { userAgent: '*', disallow: '/' },
    };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/cart',
          '/checkout',
          '/_next/',
          '/404',
          '/500',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/cart',
          '/checkout',
          '/_next/',
        ],
      },
      {
        userAgent: 'Yandex',
        allow: '/',
        disallow: [
          '/api/',
          '/cart',
          '/checkout',
          '/_next/',
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
