import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/data/products';
import { getProductImage } from '@/data/categoryImages';

interface Props {
  product: Product;
  oldPrice?: number;
  discount?: boolean;
  cityPrefix?: string;
}

export default function ProductCard({ product, oldPrice, discount, cityPrefix = '' }: Props) {
  const fmt = (n: number) =>
    n.toLocaleString('ru-RU', {
      minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
      maximumFractionDigits: 2,
    });

  return (
    <div className="bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-shadow group overflow-hidden flex flex-col">
      {/* Image placeholder */}
      <Link href={`${cityPrefix}/product/${product.slug}`} className="block bg-[#f5f5f5] aspect-[4/3] relative overflow-hidden">
        {discount && (
          <span className="absolute top-2 left-2 bg-[#CC0000] text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
            Акция
          </span>
        )}
        <Image
          src={getProductImage(product.categorySlug)}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-contain p-4"
        />
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <Link href={`${cityPrefix}/product/${product.slug}`}>
          <h3 className="font-semibold text-[#1a1a1a] text-sm leading-snug mb-2 group-hover:text-[#CC0000] transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <div className="text-xs text-gray-500 mb-3">
          Размер/вес: {product.size}
        </div>

        <div className="mt-auto flex items-end justify-between gap-2">
          <div>
            {oldPrice && (
              <div className="text-xs text-gray-500 line-through">{fmt(oldPrice)} ₽</div>
            )}
            <div className={`text-xl font-bold ${discount ? 'text-[#CC0000]' : 'text-[#1a1a1a]'}`}>
              {fmt(product.price)} ₽
            </div>
            <div className="text-xs text-gray-500">за {product.unit}</div>
          </div>
          <button className="bg-[#CC0000] hover:bg-[#aa0000] text-white text-[13px] font-bold px-4 py-2.5 sm:px-3 sm:py-2 sm:text-xs rounded-xl sm:rounded-lg transition-colors whitespace-nowrap">
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
}
