import Link from 'next/link';
import { categoryGroups } from '@/data/categories';
import { products } from '@/data/products';
import CategoryCard from '@/components/CategoryCard';
import type { City } from '@/lib/cities';

const BASE_URL = 'https://metallurgspb.ru';

interface Props {
  city: City;
  cityPrefix?: string;
}

export default function CatalogPageContent({ city, cityPrefix = '' }: Props) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: `${BASE_URL}${cityPrefix}/` },
      { '@type': 'ListItem', position: 2, name: 'Каталог', item: `${BASE_URL}${cityPrefix}/catalog` },
    ],
  };
  const productCounts = products.reduce<Record<string, number>>((acc, product) => {
    acc[product.categorySlug] = (acc[product.categorySlug] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-16 lg:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2">
        <Link href={`${cityPrefix}/`} className="hover:text-[#CC0000] transition-colors">Главная</Link>
        <span>/</span>
        <span className="text-[#1a1a1a]">Каталог</span>
      </nav>

      <div className="mb-10">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1a1a1a] text-balance">
          Каталог металлопроката {city.in}
        </h1>
        <p className="text-gray-500 mt-2">
          {categoryGroups.length} групп · {products.length} позиций
        </p>
      </div>

      <div className="space-y-10">
        {categoryGroups.map((group) => (
          <div key={group.id}>
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-2xl font-black text-[#1a1a1a]">{group.name}</h2>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {group.children.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  productCount={productCounts[category.slug] ?? 0}
                  cityPrefix={cityPrefix}
                  cityName={city.name}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-[#f5f5f5] rounded-2xl p-8">
        <h3 className="text-base font-bold text-[#1a1a1a] mb-3">Нужна помощь с выбором?</h3>
        <p className="text-gray-500 text-sm mb-4">
          Наши специалисты помогут подобрать металлопрокат под ваши задачи и рассчитают стоимость.
        </p>
        <a
          href={`tel:${city.phone}`}
          className="inline-flex items-center gap-2 bg-[#CC0000] hover:bg-[#aa0000] text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          {city.phoneFormatted}
        </a>
      </div>
    </div>
  );
}
