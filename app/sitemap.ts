import type { MetadataRoute } from 'next';
import { categoryGroups, categories } from '@/data/categories';
import { products } from '@/data/products';
import { cities } from '@/lib/cities';

const BASE_URL = 'https://metallurgspb.ru';
// Стабильная дата — обновлять при реальных изменениях контента
const LAST_CONTENT_UPDATE = '2025-05-19';

// Статические страницы (без города)
const staticSlugs = ['catalog', 'delivery', 'about', 'payment', 'contacts'] as const;
// City static pages — все с уникальным контентом
const cityStaticSlugs = ['catalog', 'delivery', 'about', 'payment', 'contacts'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // ── Главная ────────────────────────────────────────────────
  entries.push({
    url: BASE_URL,
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency: 'weekly',
    priority: 1.0,
  });

  // ── Root static pages ──────────────────────────────────────
  for (const slug of staticSlugs) {
    entries.push({
      url: `${BASE_URL}/${slug}`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'monthly',
      priority: slug === 'catalog' ? 0.9 : 0.5,
    });
  }

  // ── Root category groups ───────────────────────────────────
  for (const g of categoryGroups) {
    entries.push({
      url: `${BASE_URL}/catalog/${g.slug}`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  }

  // ── Root categories ────────────────────────────────────────
  for (const c of categories) {
    entries.push({
      url: `${BASE_URL}/catalog/${c.slug}`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  }

  // ── Root products ──────────────────────────────────────────
  for (const p of products) {
    entries.push({
      url: `${BASE_URL}/product/${p.slug}`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'weekly',
      priority: 0.6,
    });
  }

  // ── City pages ─────────────────────────────────────────────
  for (const city of cities) {
    // City home
    entries.push({
      url: `${BASE_URL}/${city.slug}`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'weekly',
      priority: 0.9,
    });

    // City static pages (only unique content)
    for (const slug of cityStaticSlugs) {
      entries.push({
        url: `${BASE_URL}/${city.slug}/${slug}`,
        lastModified: LAST_CONTENT_UPDATE,
        changeFrequency: 'monthly',
        priority: slug === 'catalog' ? 0.7 : 0.5,
      });
    }

    // City category groups
    for (const g of categoryGroups) {
      entries.push({
        url: `${BASE_URL}/${city.slug}/catalog/${g.slug}`,
        lastModified: LAST_CONTENT_UPDATE,
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }

    // City categories
    for (const c of categories) {
      entries.push({
        url: `${BASE_URL}/${city.slug}/catalog/${c.slug}`,
        lastModified: LAST_CONTENT_UPDATE,
        changeFrequency: 'weekly',
        priority: 0.6,
      });
    }

    // City products
    for (const p of products) {
      entries.push({
        url: `${BASE_URL}/${city.slug}/product/${p.slug}`,
        lastModified: LAST_CONTENT_UPDATE,
        changeFrequency: 'weekly',
        priority: 0.5,
      });
    }
  }

  return entries;
}
