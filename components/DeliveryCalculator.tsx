'use client';

import { useState, useMemo } from 'react';

const truckTypes = [
  { id: 'small', label: 'Малотоннажная (до 3 т)', base: 4000, perKm: 35, perKmFar: 50 },
  { id: 'medium', label: 'Средняя (до 10 т)', base: 7000, perKm: 50, perKmFar: 70 },
  { id: 'heavy', label: 'Фура (до 20 т)', base: 12000, perKm: 65, perKmFar: 90 },
];

export default function DeliveryCalculator() {
  const [distance, setDistance] = useState('');
  const [truck, setTruck] = useState(truckTypes[0].id);

  const result = useMemo(() => {
    const km = parseFloat(distance);
    if (!km || km <= 0) return null;
    const t = truckTypes.find((t) => t.id === truck)!;
    const roundTrip = km * 2;
    let cost = t.base;
    if (roundTrip <= 100) {
      cost += roundTrip * t.perKm;
    } else {
      cost += 100 * t.perKm + (roundTrip - 100) * t.perKmFar;
    }
    return Math.round(cost / 100) * 100;
  }, [distance, truck]);

  return (
    <section className="bg-white rounded-2xl p-6 sm:p-8 mb-8 shadow-sm border border-gray-100">
      <h2 className="text-2xl sm:text-3xl font-black text-[#1a1a1a] mb-1">Калькулятор доставки</h2>
      <p className="text-sm text-gray-500 mb-6">Примерный расчёт стоимости. Точная цена согласуется с&nbsp;менеджером.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
            Расстояние от склада (км)
          </label>
          <input
            type="number"
            min="1"
            max="2000"
            placeholder="Например: 50"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#CC0000]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
            Тип транспорта
          </label>
          <select
            value={truck}
            onChange={(e) => setTruck(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#CC0000] bg-white"
          >
            {truckTypes.map((t) => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>
        </div>
      </div>

      {result !== null ? (
        <div className="bg-[#f5f5f5] rounded-xl px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Ориентировочная стоимость</p>
            <p className="text-3xl font-black text-[#1a1a1a] mt-0.5">
              {result.toLocaleString('ru-RU')} <span className="text-xl font-semibold">₽</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">Расчёт в оба конца · без НДС</p>
          </div>
          <a
            href="tel:+78121234567"
            className="bg-[#CC0000] hover:bg-[#aa0000] text-white font-semibold text-sm px-5 py-3 rounded-xl transition-colors whitespace-nowrap"
          >
            Уточнить цену
          </a>
        </div>
      ) : (
        <div className="bg-[#f5f5f5] rounded-xl px-6 py-4 text-sm text-gray-400">
          Введите расстояние, чтобы рассчитать стоимость доставки.
        </div>
      )}
    </section>
  );
}
