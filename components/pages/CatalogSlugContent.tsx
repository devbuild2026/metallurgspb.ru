import { notFound } from 'next/navigation';
import { categoryGroups, getCategoryBySlug, getCategoryGroupBySlug } from '@/data/categories';
import { getProductsByCategory } from '@/data/products';
import CategoryCatalogView from '@/components/catalog/CategoryCatalogView';
import CategorySeoBlock from '@/components/CategorySeoBlock';
import FaqAccordion from '@/components/FaqAccordion';
import { defaultCity, getCityBySlug, getCategoryFaq, type City } from '@/lib/cities';

const BASE_URL = 'https://metallurgspb.ru';

interface Props {
  slug: string;
  cityPrefix?: string;
  citySlug?: string;
}

function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export default function CatalogSlugContent({ slug, cityPrefix = '', citySlug }: Props) {
  const city: City = (citySlug ? getCityBySlug(citySlug) : undefined) ?? defaultCity;

  const category = getCategoryBySlug(slug);
  if (category) {
    const categoryProducts = getProductsByCategory(slug);
    const faq = getCategoryFaq(category.name, city);
    const breadcrumb = buildBreadcrumbSchema([
      { name: 'Главная', url: `${BASE_URL}${cityPrefix}/` },
      { name: 'Каталог', url: `${BASE_URL}${cityPrefix}/catalog` },
      { name: category.parentName, url: `${BASE_URL}${cityPrefix}/catalog/${category.parentSlug}` },
      { name: category.name, url: `${BASE_URL}${cityPrefix}/catalog/${category.slug}` },
    ]);
    return (
      <div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
        <CategoryCatalogView
          category={category}
          categoryGroups={categoryGroups}
          products={categoryProducts}
          cityPrefix={cityPrefix}
          cityIn={city.in}
          cityBy={city.by}
          deliveryTime={city.deliveryTime}
        />
        <div className="max-w-7xl mx-auto px-4 pb-10">
          <CategorySeoBlock groupSlug={category.parentSlug} cityIn={city.in} cityBy={city.by} />
        </div>
        <FaqAccordion items={faq} />
      </div>
    );
  }

  const group = getCategoryGroupBySlug(slug);
  if (!group) notFound();

  const groupProducts = group.children.flatMap((child) => getProductsByCategory(child.slug));
  const faq = getCategoryFaq(group.name, city);
  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Главная', url: `${BASE_URL}${cityPrefix}/` },
    { name: 'Каталог', url: `${BASE_URL}${cityPrefix}/catalog` },
    { name: group.name, url: `${BASE_URL}${cityPrefix}/catalog/${group.slug}` },
  ]);
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <CategoryCatalogView
        group={group}
        categoryGroups={categoryGroups}
        products={groupProducts}
        cityPrefix={cityPrefix}
        cityIn={city.in}
        cityBy={city.by}
        deliveryTime={city.deliveryTime}
      />
      <div className="max-w-7xl mx-auto px-4 pb-10">
        <CategorySeoBlock groupSlug={group.slug} cityIn={city.in} cityBy={city.by} />
      </div>
      <FaqAccordion items={faq} />
    </div>
  );
}
