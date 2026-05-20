'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { City } from '@/lib/cities';
import { sendLead } from '@/lib/sendLead';

const requisites = [
  ['Полное наименование', 'ООО «Металлург»'],
  ['ИНН', '7800000000'],
  ['КПП', '780001001'],
  ['ОГРН', '1027800000000'],
  ['Юридический адрес', 'г. Санкт-Петербург, ул. Складская, д. 10, лит. А'],
  ['Банк', 'ПАО Сбербанк'],
  ['Р/с', '40702810000000000000'],
  ['К/с', '30101810500000000653'],
  ['БИК', '044030653'],
];

interface Props {
  city: City;
  cityPrefix?: string;
}

export default function ContactsPageContent({ city, cityPrefix = '' }: Props) {
  const [contactSent, setContactSent] = useState(false);
  return (
    <div className="bg-[#f5f5f5] min-h-screen py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-6">
          <Link href={`${cityPrefix}/`} className="hover:text-[#CC0000] transition-colors">Главная</Link>
          <span className="mx-2">/</span>
          <span className="text-[#1a1a1a]">Контакты</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-black text-[#1a1a1a] mb-10">Контакты {city.in}</h1>

        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 flex flex-col gap-3 border border-gray-100">
            <div className="w-12 h-12 bg-[#CC0000]/10 text-[#CC0000] rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Телефон</div>
              <a href={`tel:${city.phone}`} className="text-xl font-bold text-[#1a1a1a] hover:text-[#CC0000] transition-colors">
                {city.phoneFormatted}
              </a>
              <div className="text-sm text-gray-500 mt-1">Пн–Пт: 9:00–18:00</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 flex flex-col gap-3 border border-gray-100">
            <div className="w-12 h-12 bg-[#CC0000]/10 text-[#CC0000] rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Email</div>
              <a href="mailto:info@metallurgspb.ru" className="text-xl font-bold text-[#1a1a1a] hover:text-[#CC0000] transition-colors">
                info@metallurgspb.ru
              </a>
              <div className="text-sm text-gray-500 mt-1">Ответ в течение часа</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 flex flex-col gap-3 border border-gray-100">
            <div className="w-12 h-12 bg-[#CC0000]/10 text-[#CC0000] rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Адрес склада</div>
              <div className="text-base font-bold text-[#1a1a1a] leading-snug">
                {city.address}
              </div>
              {city.metro && <div className="text-sm text-gray-500 mt-1">{city.metro}</div>}
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="bg-white rounded-2xl h-80 overflow-hidden mb-10 border border-gray-100">
          <iframe
            src={`https://yandex.ru/map-widget/v1/?text=${encodeURIComponent(city.address)}&z=15`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            title={`Карта — ${city.address}`}
          />
        </div>

        {/* Requisites */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 mb-8 border border-gray-100 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-black text-[#1a1a1a] mb-6">Реквизиты</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12">
            {requisites.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 py-3 border-b border-gray-100 text-sm">
                <span className="text-gray-400 flex-shrink-0">{label}</span>
                <span className="font-medium text-[#1a1a1a] text-right">{value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Contact form */}
        <section className="bg-[#CC0000] rounded-2xl p-6 sm:p-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-1">Свяжитесь с нами</h2>
            <p className="text-red-100 text-sm mb-6">Напишите нам — ответим в течение рабочего дня</p>
            {contactSent ? (
              <div className="text-center py-6">
                <div className="text-4xl mb-3">&#10003;</div>
                <div className="text-xl font-bold text-white mb-1">Сообщение отправлено!</div>
                <div className="text-red-100 text-sm">Свяжемся с&nbsp;вами в&nbsp;ближайшее время</div>
              </div>
            ) : (
              <form className="flex flex-col gap-4" onSubmit={(e) => {
                e.preventDefault();
                const f = e.target as HTMLFormElement;
                sendLead({
                  name: (f.elements.namedItem('ct-name') as HTMLInputElement)?.value ?? '',
                  phone: (f.elements.namedItem('ct-phone') as HTMLInputElement)?.value ?? '',
                  comment: (f.elements.namedItem('ct-msg') as HTMLTextAreaElement)?.value ?? '',
                  type: 'Форма на\u00a0странице контактов',
                });
                setContactSent(true);
              }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" name="ct-name" placeholder="Ваше имя" required className="bg-white/10 border border-white/20 text-white placeholder-red-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-white" />
                  <input type="tel" name="ct-phone" placeholder="+7 (___) ___-__-__" required className="bg-white/10 border border-white/20 text-white placeholder-red-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-white" />
                </div>
                <textarea name="ct-msg" rows={4} placeholder="Ваше сообщение..." className="bg-white/10 border border-white/20 text-white placeholder-red-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-white resize-none" />
                <button type="submit" className="bg-white hover:bg-gray-100 text-[#CC0000] font-bold py-4 rounded-xl transition-colors">
                  Отправить сообщение
                </button>
                <p className="text-red-100 text-xs text-center">Свяжемся с&nbsp;вами в&nbsp;течение 15&nbsp;минут</p>
              </form>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
