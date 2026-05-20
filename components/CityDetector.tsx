'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { detectCityByName, getCityBySlug, type City } from '@/lib/cities';

const STORAGE_KEY = 'rusmet_city';

export default function CityDetector() {
  const router = useRouter();
  const pathname = usePathname();
  const [detectedCity, setDetectedCity] = useState<City | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Если выбор уже сохранён — не показывать
    if (localStorage.getItem(STORAGE_KEY)) return;

    // Если уже на городской странице — запомнить и не спрашивать
    const segment = pathname.split('/')[1];
    const cityFromPath = getCityBySlug(segment);
    if (cityFromPath) {
      localStorage.setItem(STORAGE_KEY, cityFromPath.slug);
      return;
    }

    // Определяем город по IP через бесплатный API (без ключа)
    fetch('https://ipapi.co/json/')
      .then((r) => r.json())
      .then((data: { city?: string }) => {
        if (!data.city) return;
        const city = detectCityByName(data.city);
        if (city && city.slug !== 'sankt-peterburg') {
          setDetectedCity(city);
          setVisible(true);
        }
      })
      .catch(() => {/* fail silently */});
  }, [pathname]);

  if (!visible || !detectedCity) return null;

  const handleConfirm = () => {
    localStorage.setItem(STORAGE_KEY, detectedCity.slug);
    setVisible(false);
    router.push(`/${detectedCity.slug}/`);
  };

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, 'sankt-peterburg');
    setVisible(false);
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-sm">
      <div className="bg-[#1a1a1a] text-white rounded-2xl shadow-2xl px-5 py-4 flex flex-col gap-3">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-[#CC0000] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
          </svg>
          <p className="text-sm leading-snug">
            Ваш город — <span className="font-bold">{detectedCity.name}</span>?
            <span className="block text-gray-400 text-xs mt-0.5">Покажем цены и доставку для вашего региона</span>
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 bg-[#CC0000] hover:bg-[#aa0000] text-white text-sm font-semibold py-2 rounded-lg transition-colors"
          >
            Да, верно
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            className="flex-1 bg-white/10 hover:bg-white/20 text-white text-sm py-2 rounded-lg transition-colors"
          >
            Выбрать другой
          </button>
        </div>
      </div>
    </div>
  );
}
