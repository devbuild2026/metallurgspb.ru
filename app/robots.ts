import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = 'https://metallurgspb.ru';

  // Preview/staging — закрыть всё от индексации
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production') {
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
