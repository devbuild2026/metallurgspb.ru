'use client';

import { useState } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/data/products';

type DiscountProduct = Product & { discount: true; oldPrice: number };

interface Props {
  popularProducts: Product[];
  discountProducts: DiscountProduct[];
}

export default function PopularProductsTabs({ popularProducts, discountProducts }: Props) {
  const [activeTab, setActiveTab] = useState<'popular' | 'discount'>('popular');

  const items = activeTab === 'popular' ? popularProducts : discountProducts;

  return (
    <section className="py-12 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex gap-1 bg-[#f5f5f5] rounded-xl p-1 inline-flex w-fit">
              <button
                type="button"
                onClick={() => setActiveTab('popular')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  activeTab === 'popular'
                    ? 'bg-white text-[#1a1a1a] shadow-sm'
                    : 'text-gray-500 hover:text-[#1a1a1a]'
                }`}
              >
                Популярные товары
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('discount')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  activeTab === 'discount'
                    ? 'bg-white text-[#CC0000] shadow-sm'
                    : 'text-gray-500 hover:text-[#CC0000]'
                }`}
              >
                Товары по акции
              </button>
            </div>
            <p className="text-gray-500 mt-2 text-sm">
              {activeTab === 'popular' ? 'Наиболее востребованные позиции' : 'Специальные цены на выбранные товары'}
            </p>
          </div>
          <Link href="/catalog" className="text-[#CC0000] font-semibold text-sm hover:underline hidden sm:block">
            Весь каталог →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((product) => {
            const dp = product as DiscountProduct;
            return (
              <ProductCard
                key={product.id}
                product={product}
                discount={dp.discount}
                oldPrice={dp.oldPrice}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
