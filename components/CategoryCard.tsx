import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/data/categories';
import { getCategoryImage } from '@/data/categoryImages';

interface Props {
  category: Category;
  productCount?: number;
  cityPrefix?: string;
  cityName?: string;
}

export default function CategoryCard({ category, productCount, cityPrefix = '', cityName = 'Санкт-Петербург' }: Props) {
  const imageSrc = getCategoryImage(category.slug, category.parentSlug);

  return (
    <Link
      href={`${cityPrefix}/catalog/${category.slug}`}
      className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md hover:border-[#CC0000]/30 transition-all group flex flex-col"
    >
      <div className="w-full h-44 bg-white flex items-center justify-center overflow-hidden transition-colors">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={`${category.name} — металлопрокат ${cityName}`}
            width={200}
            height={144}
            className="w-full h-full object-contain p-3"
          />
        ) : (
          <svg viewBox="0 0 48 48" className="w-12 h-12 text-gray-200" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="8" y="16" width="32" height="16" rx="1" />
            <line x1="8" y1="24" x2="40" y2="24" />
          </svg>
        )}
      </div>
      <div className="p-3 text-center">
        <div className="font-semibold text-[#1a1a1a] text-sm group-hover:text-[#CC0000] transition-colors leading-snug">
          {category.name}
        </div>
        <div className="text-xs text-gray-400 mt-0.5">
          {typeof productCount === 'number' ? `${productCount} позиций` : category.parentName}
        </div>
      </div>
    </Link>
  );
}
