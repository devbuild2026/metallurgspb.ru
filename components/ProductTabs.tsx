'use client';

import { useState } from 'react';

interface Props {
  productName: string;
  cityIn?: string;
}

const TABS = ['Описание', 'Применение', 'Сертификаты'] as const;
type Tab = (typeof TABS)[number];

function getDescription(name: string, cityIn?: string): string {
  const loc = cityIn ?? 'в\u00a0Санкт-Петербурге';
  return `${name}\u00a0— качественный металлопрокат, производимый в\u00a0соответствии с\u00a0требованиями ГОСТ. Изделие изготовлено из\u00a0стали с\u00a0высокими прочностными характеристиками. Продукция проходит входной и\u00a0выходной контроль качества. Поставляется ${loc} со\u00a0склада в\u00a0Санкт-Петербурге с\u00a0возможностью оперативной доставки.`;
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

export default function ProductTabs({ productName, cityIn }: Props) {
  const [active, setActive] = useState<Tab>('Описание');

  const description = getDescription(productName, cityIn);
  const applications = getApplications(productName);

  return (
    <div>
      {/* Tab headers */}
      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
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

      {/* Tab content */}
      {active === 'Описание' && (
        <p className="text-gray-600 leading-relaxed">{description}</p>
      )}

      {active === 'Применение' && (
        <ul className="space-y-2">
          {applications.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-600">
              <span className="mt-1.5 w-2 h-2 rounded-full bg-[#CC0000] flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      )}

      {active === 'Сертификаты' && (
        <div className="flex items-start gap-4 text-gray-600">
          <svg className="w-8 h-8 text-[#CC0000] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <div>
            <p className="font-semibold text-[#1a1a1a] mb-1">Товар сертифицирован.</p>
            <p>Вся продукция соответствует ГОСТ. Сертификаты качества предоставляются по запросу вместе с товаром. При необходимости менеджер вышлет копии документов на электронную почту.</p>
          </div>
        </div>
      )}
    </div>
  );
}
