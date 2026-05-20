'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { cities, getCityBySlug, type City } from '@/lib/cities';

function getActiveCityFromPath(pathname: string): City {
  const segment = pathname.split('/')[1];
  return getCityBySlug(segment) ?? cities[0];
}

/** Заменить /old-city/... → /new-city/... или / → /new-city/ */
function switchCityPath(pathname: string, newSlug: string): string {
  const segments = pathname.split('/').filter(Boolean);
  const firstIsCity = segments.length > 0 && !!getCityBySlug(segments[0]);
  if (firstIsCity) {
    segments[0] = newSlug;
    return '/' + segments.join('/');
  }
  // Корневые маршруты: /catalog → /new-city/catalog, / → /new-city
  if (segments.length === 0) return `/${newSlug}`;
  return `/${newSlug}/${segments.join('/')}`;
}

export default function CityDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const activeCity = getActiveCityFromPath(pathname);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const handleSelect = (slug: string) => {
    setOpen(false);
    const target = switchCityPath(pathname, slug);
    localStorage.setItem('rusmet_city', slug);
    router.push(target);
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors text-sm"
        aria-expanded={open}
        aria-label="Выбрать город"
      >
        <svg className="w-3.5 h-3.5 flex-shrink-0 text-[#CC0000]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
        </svg>
        <span>{activeCity.name}</span>
        <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+8px)] z-50 w-52 bg-white rounded-xl shadow-2xl border border-gray-100 py-1 max-h-80 overflow-y-auto">
          {cities.map((city) => (
            <button
              key={city.slug}
              type="button"
              onClick={() => handleSelect(city.slug)}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                city.slug === activeCity.slug
                  ? 'text-[#CC0000] font-semibold bg-red-50'
                  : 'text-[#1a1a1a] hover:bg-gray-50 hover:text-[#CC0000]'
              }`}
            >
              {city.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
