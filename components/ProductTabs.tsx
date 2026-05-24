'use client';

import { useState } from 'react';
import type { Spec } from '@/lib/specifications';

interface Props {
  productName: string;
  cityIn?: string;
  specs?: Spec[];
}

const TABS = ['Описание', 'Характеристики', 'Применение', 'Сертификаты'] as const;
type Tab = (typeof TABS)[number];

function getDescription(name: string, cityIn?: string): string {
  const loc = cityIn ?? 'в Санкт-Петербурге';
  return `${name} — качественный металлопрокат, производимый в соответствии с требованиями ГОСТ. Изделие изготовлено из стали с высокими прочностными характеристиками. Продукция проходит входной и выходной контроль качества. Поставляется ${loc} со склада в Санкт-Петербурге с возможностью оперативной доставки.`;
}

function getApplications(name: string): string[] {
  const lower = name.toLowerCase();
  if (lower.includes('арматур')) {
    return [
      'Армирование монолитных железобетонных конструкций',
      'Фундаменты, плиты перекрытий и ростверки',
      'Строительство жилых и промышленных объектов',
      'Дорожное и мостовое строительство',
      'Изготовление сварных каркасов и сеток',
    ];
  }
  if (lower.includes('труб')) {
    return [
      'Системы водоснабжения и отопления',
      'Строительство металлоконструкций и каркасов',
      'Промышленные трубопроводы',
      'Ограждения, заборы и навесы',
      'Изготовление мебели и торгового оборудования',
    ];
  }
  if (lower.includes('лист') || lower.includes('профнастил')) {
    return [
      'Кровля и облицовка зданий',
      'Ограждения и заборы промышленных территорий',
      'Изготовление металлических ёмкостей и резервуаров',
      'Производство строительных металлоконструкций',
      'Отделка фасадов и внутренних помещений',
    ];
  }
  return [
    'Промышленное и гражданское строительство',
    'Производство металлоконструкций',
    'Машиностроение и металлообработка',
    'Изготовление ограждений и несущих элементов',
    'Ремонтные и монтажные работы',
  ];
}

export default function ProductTabs({ productName, cityIn, specs = [] }: Props) {
  const [active, setActive] = useState<Tab>('Описание');

  const description = getDescription(productName, cityIn);
  const applications = getApplications(productName);
  const hasSpecs = specs.length > 0;
  const tabs = hasSpecs ? TABS : TABS.filter((t) => t !== 'Характеристики');

  // Контент панели скрывается классом `hidden`, а не размонтируется,
  // поэтому весь текст (вкл. характеристики) присутствует в SSR-HTML → виден Google.
  const panelClass = (tab: Tab) => (active === tab ? 'block' : 'hidden');
  const tabId = (tab: Tab) => `ptab-${TABS.indexOf(tab)}`;
  const panelId = (tab: Tab) => `ppanel-${TABS.indexOf(tab)}`;

  // Клавиатурная навигация по вкладкам (стрелки / Home / End) — WAI-ARIA tabs.
  const onKeyDown = (e: React.KeyboardEvent, idx: number) => {
    let n = idx;
    if (e.key === 'ArrowRight') n = (idx + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') n = (idx - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') n = 0;
    else if (e.key === 'End') n = tabs.length - 1;
    else return;
    e.preventDefault();
    setActive(tabs[n]);
    document.getElementById(tabId(tabs[n]))?.focus();
  };

  return (
    <div>
      {/* Tab headers */}
      <div role="tablist" aria-label="Информация о товаре" className="flex border-b border-gray-200 mb-6 overflow-x-auto">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            type="button"
            role="tab"
            id={tabId(tab)}
            aria-selected={active === tab}
            aria-controls={panelId(tab)}
            tabIndex={active === tab ? 0 : -1}
            onClick={() => setActive(tab)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`px-6 py-3 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 -mb-px ${
              active === tab
                ? 'border-[#CC0000] text-[#CC0000]'
                : 'border-transparent text-gray-500 hover:text-[#1a1a1a]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content — все панели в DOM (SSR-visible), переключение через hidden */}
      <div role="tabpanel" id={panelId('Описание')} aria-labelledby={tabId('Описание')} tabIndex={0} className={panelClass('Описание')}>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>

      {hasSpecs && (
        <div role="tabpanel" id={panelId('Характеристики')} aria-labelledby={tabId('Характеристики')} tabIndex={0} className={panelClass('Характеристики')}>
          <dl className="divide-y divide-gray-100">
            {specs.map((s) => (
              <div key={s.label} className="flex items-baseline justify-between gap-4 py-3">
                <dt className="text-sm text-gray-500 leading-relaxed flex-shrink-0">{s.label}</dt>
                <dd className="text-sm font-semibold text-[#1a1a1a] leading-relaxed text-right [overflow-wrap:anywhere]">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      <div role="tabpanel" id={panelId('Применение')} aria-labelledby={tabId('Применение')} tabIndex={0} className={panelClass('Применение')}>
        <ul className="space-y-2">
          {applications.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-600">
              <span className="mt-1.5 w-2 h-2 rounded-full bg-[#CC0000] flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div role="tabpanel" id={panelId('Сертификаты')} aria-labelledby={tabId('Сертификаты')} tabIndex={0} className={panelClass('Сертификаты')}>
        <div className="flex items-start gap-4 text-gray-600">
          <svg className="w-8 h-8 text-[#CC0000] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <div>
            <p className="font-semibold text-[#1a1a1a] mb-1">Товар сертифицирован.</p>
            <p>Вся продукция соответствует ГОСТ. Сертификаты качества предоставляются по запросу вместе с товаром. При необходимости менеджер вышлет копии документов на электронную почту.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
