'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getCategoryImage } from '@/data/categoryImages';
import PriceRangeSlider from '@/components/ui/PriceRangeSlider';
import type { Category, CategoryGroup } from '@/data/categories';
import type { Product } from '@/data/products';
import { useCart } from '@/components/cart/CartProvider';
import { polishHeroTitle } from '@/lib/typography';

interface Props {
  category?: Category;
  group?: CategoryGroup;
  categoryGroups: CategoryGroup[];
  products: Product[];
  cityPrefix?: string;
  cityIn?: string;
  cityBy?: string;
  deliveryTime?: string;
}

function formatPrice(price: number) {
  return price.toLocaleString('ru-RU', {
    minimumFractionDigits: Number.isInteger(price) ? 0 : 2,
    maximumFractionDigits: 2,
  });
}

export default function CategoryCatalogView({ category, group, categoryGroups, products, cityPrefix = '', cityIn = 'в\u00a0Санкт-Петербурге', cityBy = 'по\u00a0Санкт-Петербургу', deliveryTime = 'в\u00a0день заказа' }: Props) {
  const { addToCart } = useCart();

  // Режим группы — дополнительный фильтр по подкатегории (client-side)
  const [selectedSubSlug, setSelectedSubSlug] = useState<string | null>(null);

  // Базовый пул для ценовых фильтров — все переданные товары
  const minPrice = useMemo(() => (products.length ? Math.min(...products.map((p) => p.price)) : 0), [products]);
  const maxPrice = useMemo(() => (products.length ? Math.max(...products.map((p) => p.price)) : 0), [products]);
  const priceStep = useMemo(() => (products.some((p) => !Number.isInteger(p.price)) ? 0.01 : 1), [products]);

  const activeParentSlug = group?.slug ?? category!.parentSlug;
  const [openGroups, setOpenGroups] = useState<string[]>([activeParentSlug]);
  const [priceFrom, setPriceFrom] = useState(minPrice);
  const [priceTo, setPriceTo] = useState(maxPrice);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [rawInputs, setRawInputs] = useState<Record<number, string>>({});
  const [filtersOpen, setFiltersOpen] = useState(true);

  // Подкатегория изменилась — сбросить ценовые/размерные фильтры
  useEffect(() => {
    setPriceFrom(minPrice);
    setPriceTo(maxPrice);
    setSelectedSizes([]);
    setQuantities({});
    setRawInputs({});
  }, [selectedSubSlug, minPrice, maxPrice]);

  // При смене category — сбросить всё
  useEffect(() => {
    setSelectedSubSlug(null);
    setPriceFrom(minPrice);
    setPriceTo(maxPrice);
    setSelectedSizes([]);
    setQuantities({});
    setRawInputs({});
  }, [category?.slug, minPrice, maxPrice]);

  // Убедиться что активная группа раскрыта
  useEffect(() => {
    setOpenGroups((prev) => prev.includes(activeParentSlug) ? prev : [...prev, activeParentSlug]);
  }, [activeParentSlug]);

  // Товары с учётом подкатегории (только в групповом режиме)
  const baseProducts = useMemo(() => {
    if (!group || !selectedSubSlug) return products;
    return products.filter((p) => p.categorySlug === selectedSubSlug);
  }, [products, group, selectedSubSlug]);

  const uniqueSizes = useMemo(
    () => Array.from(new Set(baseProducts.map((p) => p.size))).sort((a, b) => a.localeCompare(b, 'ru')),
    [baseProducts]
  );

  const filteredProducts = useMemo(() => {
    return baseProducts.filter((p) => {
      const byPrice = p.price >= priceFrom && p.price <= priceTo;
      const bySize = selectedSizes.length === 0 || selectedSizes.includes(p.size);
      return byPrice && bySize;
    });
  }, [baseProducts, priceFrom, priceTo, selectedSizes]);

  const toggleGroup = (groupSlug: string) => {
    setOpenGroups((prev) =>
      prev.includes(groupSlug) ? prev.filter((s) => s !== groupSlug) : [...prev, groupSlug]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const getQuantity = (productId: number) => quantities[productId] ?? 1;

  const handleAddToCart = (product: Product) => {
    addToCart(
      { productId: product.id, slug: product.slug, name: product.name, price: product.price, unit: product.unit, size: product.size },
      getQuantity(product.id)
    );
  };

  const handlePriceChange = useCallback((from: number, to: number) => {
    setPriceFrom(from);
    setPriceTo(to);
  }, []);

  const hasActiveFilters = selectedSizes.length > 0 || priceFrom !== minPrice || priceTo !== maxPrice;

  const resetFilters = () => {
    setPriceFrom(minPrice);
    setPriceTo(maxPrice);
    setSelectedSizes([]);
  };

  // Заголовок страницы
  const pageTitle = group ? group.name : category!.name;
  const pageSubtitle = group
    ? selectedSubSlug
      ? group.children.find((c) => c.slug === selectedSubSlug)?.name ?? group.name
      : group.name
    : category!.parentName;

  // Изображение: выбранная подкатегория → подкатегория → группа
  const activeImageSlug = selectedSubSlug ?? category?.slug ?? group?.slug;
  const headerImageSrc = activeImageSlug
    ? getCategoryImage(activeImageSlug, category?.parentSlug)
    : undefined;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2 flex-wrap">
        <Link href={`${cityPrefix}/`} className="hover:text-[#CC0000] transition-colors">Главная</Link>
        <span>/</span>
        <Link href={`${cityPrefix}/catalog`} className="hover:text-[#CC0000] transition-colors">Каталог</Link>
        {category && (
          <>
            <span>/</span>
            <Link href={`${cityPrefix}/catalog/${category.parentSlug}`} className="hover:text-[#CC0000] transition-colors">
              {category.parentName}
            </Link>
            <span>/</span>
            <span className="text-[#1a1a1a]">{category.name}</span>
          </>
        )}
        {group && (
          <>
            <span>/</span>
            <span className="text-[#1a1a1a]">{group.name}</span>
            {selectedSubSlug && (
              <>
                <span>/</span>
                <span className="text-[#1a1a1a]">
                  {group.children.find((c) => c.slug === selectedSubSlug)?.name}
                </span>
              </>
            )}
          </>
        )}
      </nav>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* ─── Dark sidebar ─── */}
        <aside className="w-full lg:w-[220px] lg:flex-shrink-0">
          <div className="bg-[#1C1C1C] rounded-2xl p-4">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-1">Категории</h2>
            <div className="space-y-1">
              {categoryGroups.map((grp) => {
                const isOpen = openGroups.includes(grp.slug);
                const isActiveParent = grp.slug === activeParentSlug;

                return (
                  <div key={grp.id}>
                    <div className="flex items-center">
                      {/* В групповом режиме название группы сбрасывает подкатегорию */}
                      {group && isActiveParent ? (
                        <button
                          type="button"
                          onClick={() => { setSelectedSubSlug(null); setOpenGroups((prev) => prev.includes(grp.slug) ? prev : [...prev, grp.slug]); }}
                          className="flex-1 px-3 py-2 text-left text-sm font-bold rounded-l-lg transition-colors text-[#CC0000]"
                        >
                          {grp.name}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => toggleGroup(grp.slug)}
                          className={`flex-1 px-3 py-2 text-left text-sm font-bold rounded-l-lg transition-colors ${
                            isActiveParent ? 'text-[#CC0000]' : 'text-white hover:text-[#CC0000]'
                          }`}
                        >
                          {grp.name}
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => toggleGroup(grp.slug)}
                        className={`px-2 py-2 transition-colors ${isActiveParent ? 'text-[#CC0000]' : 'text-white hover:text-[#CC0000]'}`}
                      >
                        <svg
                          className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                          fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>

                    {isOpen && (
                      <ul className="pl-3 pb-1 space-y-0.5">
                        {grp.children.map((child) => {
                          // В групповом режиме — кнопки-фильтры; в режиме подкатегории — ссылки
                          const isActiveSub = group
                            ? selectedSubSlug === child.slug
                            : child.slug === category!.slug;

                          if (group && isActiveParent) {
                            return (
                              <li key={child.id}>
                                <button
                                  type="button"
                                  onClick={() => setSelectedSubSlug(isActiveSub ? null : child.slug)}
                                  className={`w-full text-left text-xs py-1.5 px-2 rounded transition-colors ${
                                    isActiveSub ? 'text-[#CC0000] font-semibold' : 'text-[#AAAAAA] hover:text-[#CC0000]'
                                  }`}
                                >
                                  {child.name}
                                </button>
                              </li>
                            );
                          }

                          return (
                            <li key={child.id}>
                              <Link
                                href={`${cityPrefix}/catalog/${child.slug}`}
                                className={`block text-xs py-1.5 px-2 rounded transition-colors ${
                                  isActiveSub ? 'text-[#CC0000] font-semibold' : 'text-[#AAAAAA] hover:text-[#CC0000]'
                                }`}
                              >
                                {child.name}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        {/* ─── Main content ─── */}
        <section className="flex-1 min-w-0">
          {/* Header card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 mb-5">
            <div className="flex flex-col sm:flex-row gap-5">
              {headerImageSrc && (
                <div className="w-[200px] max-w-full h-[160px] rounded-xl bg-white flex items-center justify-center overflow-hidden flex-shrink-0">
                  <Image
                    src={headerImageSrc}
                    alt={pageTitle}
                    width={200}
                    height={160}
                    className="w-full h-full object-contain p-3"
                  />
                </div>
              )}
              <div className="flex-1">
                <p className="text-sm text-[#CC0000] font-semibold mb-1">{pageSubtitle}</p>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#1a1a1a] mb-2 text-balance [overflow-wrap:normal]">{polishHeroTitle(pageTitle)}</h1>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {group
                    ? `${group.name} ${cityIn} — широкий ассортимент в\u00a0наличии на\u00a0складе. Доставка ${cityBy} — ${deliveryTime}. Менеджеры помогут подобрать нужную позицию.`
                    : `${category!.name} ${cityIn} — востребованная позиция из\u00a0раздела «${category!.parentName}». Доставка ${cityBy} — ${deliveryTime}.`
                  }
                </p>
                {group && (
                  <div className="relative mt-3">
                    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide sm:flex-wrap sm:overflow-visible">
                      <button
                        type="button"
                        onClick={() => setSelectedSubSlug(null)}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-colors whitespace-nowrap flex-shrink-0 ${
                          !selectedSubSlug
                            ? 'bg-[#CC0000] text-white border-[#CC0000]'
                            : 'border-gray-200 text-gray-600 hover:border-[#CC0000] hover:text-[#CC0000]'
                        }`}
                      >
                        Все
                      </button>
                      {group.children.map((child) => (
                        <button
                          key={child.slug}
                          type="button"
                          onClick={() => setSelectedSubSlug(selectedSubSlug === child.slug ? null : child.slug)}
                          className={`text-xs px-3 py-1.5 rounded-full border transition-colors whitespace-nowrap flex-shrink-0 ${
                            selectedSubSlug === child.slug
                              ? 'bg-[#CC0000] text-white border-[#CC0000]'
                              : 'border-gray-200 text-gray-600 hover:border-[#CC0000] hover:text-[#CC0000]'
                          }`}
                        >
                          {child.name}
                        </button>
                      ))}
                    </div>
                    {/* Mobile scroll hint */}
                    <div className="absolute right-0 top-0 bottom-1 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none sm:hidden" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ─── Filters bar ─── */}
          {products.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <button
                  type="button"
                  onClick={() => setFiltersOpen((v) => !v)}
                  className="flex items-center gap-2 text-sm font-semibold text-[#1a1a1a] hover:text-[#CC0000] transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                  </svg>
                  Фильтры
                  {hasActiveFilters && (
                    <span className="bg-[#CC0000] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">!</span>
                  )}
                  <svg className={`w-3.5 h-3.5 transition-transform ${filtersOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <span className="text-xs text-gray-500">
                  {filteredProducts.length} из {baseProducts.length} позиций
                </span>
              </div>

              {filtersOpen && (
                <div className="flex flex-col sm:flex-row gap-6 pt-3 border-t border-gray-100">
                  <div className="flex-1 min-w-[200px]">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Цена, ₽</h3>
                    <PriceRangeSlider
                      min={minPrice}
                      max={maxPrice}
                      step={priceStep}
                      valueFrom={priceFrom}
                      valueTo={priceTo}
                      onChange={handlePriceChange}
                    />
                  </div>

                  {uniqueSizes.length > 0 && (
                    <div className="flex-1 min-w-[180px]">
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Размер</h3>
                      <div className="max-h-40 overflow-y-auto flex flex-wrap gap-2">
                        {uniqueSizes.map((size) => (
                          <button key={size} type="button" onClick={() => toggleSize(size)}
                            className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                              selectedSizes.includes(size)
                                ? 'bg-[#CC0000] text-white border-[#CC0000]'
                                : 'border-gray-200 text-gray-600 hover:border-[#CC0000] hover:text-[#CC0000]'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={resetFilters}
                      className={`text-xs text-[#CC0000] hover:underline whitespace-nowrap transition-opacity duration-200 ${
                        hasActiveFilters ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                      }`}
                    >
                      Сбросить фильтры
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ─── Products table ─── */}
          {products.length === 0 ? (
            <div className="text-center py-20 text-gray-500 border border-gray-200 rounded-2xl bg-white">
              <div className="text-5xl mb-4">📦</div>
              <p className="text-lg font-semibold mb-1">Товары добавляются</p>
              <p className="text-sm">Позвоните нам, чтобы уточнить наличие</p>
            </div>
          ) : (
            <div className="overflow-x-auto border border-gray-200 rounded-2xl bg-white">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-[#f5f5f5] text-left text-[#1a1a1a]">
                    <th className="px-4 py-3 font-semibold">Наименование</th>
                    <th className="px-4 py-3 font-semibold whitespace-nowrap">Размер/вес</th>
                    <th className="px-4 py-3 font-semibold whitespace-nowrap">Цена</th>
                    <th className="px-4 py-3 font-semibold whitespace-nowrap">Количество</th>
                    <th className="px-4 py-3 font-semibold text-right whitespace-nowrap">Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product, index) => (
                    <tr key={product.id} className={`border-t border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      <td className="px-4 py-3 font-medium text-[#1a1a1a]">
                        <Link href={`${cityPrefix}/product/${product.slug}`} className="hover:text-[#CC0000] transition-colors">
                          {product.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{product.size}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="font-semibold text-[#1a1a1a]">{formatPrice(product.price)} ₽</span>
                        <span className="text-gray-500"> / {product.unit}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="inline-flex items-center border border-gray-200 rounded-lg overflow-hidden">
                          <button type="button" onClick={() => {
                            const newVal = Math.max(1, getQuantity(product.id) - 1);
                            setQuantities((prev) => ({ ...prev, [product.id]: newVal }));
                            setRawInputs((prev) => ({ ...prev, [product.id]: String(newVal) }));
                          }} className="w-8 h-8 text-gray-600 hover:bg-gray-100 transition-colors">−</button>
                          <input
                            type="number" min={1}
                            value={rawInputs[product.id] ?? String(getQuantity(product.id))}
                            onChange={(e) => setRawInputs((prev) => ({ ...prev, [product.id]: e.target.value }))}
                            onBlur={() => {
                              const raw = rawInputs[product.id];
                              if (raw !== undefined) {
                                const n = parseInt(raw, 10);
                                const safe = !isNaN(n) && n >= 1 ? n : 1;
                                setQuantities((prev) => ({ ...prev, [product.id]: safe }));
                                setRawInputs((prev) => ({ ...prev, [product.id]: String(safe) }));
                              }
                            }}
                            className="w-12 h-8 text-center text-sm border-x border-gray-200 focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                          />
                          <button type="button" onClick={() => {
                            const newVal = getQuantity(product.id) + 1;
                            setQuantities((prev) => ({ ...prev, [product.id]: newVal }));
                            setRawInputs((prev) => ({ ...prev, [product.id]: String(newVal) }));
                          }} className="w-8 h-8 text-gray-600 hover:bg-gray-100 transition-colors">+</button>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button type="button" onClick={() => handleAddToCart(product)}
                          className="inline-flex bg-[#CC0000] hover:bg-[#aa0000] text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors whitespace-nowrap">
                          В корзину
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredProducts.length === 0 && (
                <div className="text-center py-8 text-sm text-gray-500">
                  По выбранным фильтрам товары не найдены.
                  <button onClick={resetFilters} className="ml-2 text-[#CC0000] hover:underline">Сбросить</button>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
