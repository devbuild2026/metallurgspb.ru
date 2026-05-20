'use client';

import { useState } from 'react';

interface FaqItem {
  q: string;
  a: string;
}

interface Props {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <section className="py-12 sm:py-20 lg:py-24 bg-[#f5f5f5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#1a1a1a] mb-2">Частые вопросы</h2>
        <p className="text-gray-500 mb-6 sm:mb-8 text-sm">Ответы на&nbsp;популярные вопросы о&nbsp;доставке и&nbsp;ассортименте</p>
        <div className="flex flex-col gap-2">
          {items.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-semibold text-[#1a1a1a] text-sm leading-snug">{item.q}</span>
                  <svg
                    className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${isOpen ? 'max-h-96 pb-4' : 'max-h-0'}`}
                >
                  <p className="px-5 text-sm text-gray-600 leading-relaxed">{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
