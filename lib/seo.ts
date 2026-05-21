import type { Metadata } from 'next';

/**
 * ЦЕНТРАЛЬНЫЙ ФЛАГ ИНДЕКСАЦИИ САЙТА (production-safe, обратимый).
 *
 * По умолчанию индексация ЗАПРЕЩЕНА — пока сайт в разработке.
 * Это безопасно: даже если переменная окружения не задана, поисковики
 * (Google, Yandex, Bing и др.) не будут индексировать сайт.
 *
 * ЧТОБЫ ОТКРЫТЬ САЙТ ДЛЯ ИНДЕКСАЦИИ (один переключатель):
 *   1. Vercel → Project → Settings → Environment Variables
 *   2. Добавить переменную:  SITE_INDEXABLE = true   (scope: Production)
 *   3. Redeploy.
 *
 * Локально (по желанию) — в .env.local:  SITE_INDEXABLE=true
 *
 * Эта же константа управляет:
 *   - <meta name="robots"> глобально          → app/layout.tsx
 *   - HTTP-заголовком X-Robots-Tag            → middleware.ts
 *   - robots.txt (Disallow: / при блокировке) → app/robots.ts
 *   - sitemap.xml (пустой при блокировке)     → app/sitemap.ts
 */
export const SITE_INDEXABLE = process.env.SITE_INDEXABLE === 'true';

/** Значение HTTP-заголовка X-Robots-Tag, когда индексация запрещена. */
export const X_ROBOTS_TAG_BLOCK = 'noindex, nofollow';

/**
 * robots для Next Metadata API. Подключается ОДИН раз в app/layout.tsx
 * и наследуется всеми страницами (не нужно править каждую страницу).
 */
export const ROBOTS_METADATA: Metadata['robots'] = SITE_INDEXABLE
  ? {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    }
  : {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
      },
    };
