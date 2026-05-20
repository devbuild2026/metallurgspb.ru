'use client';

import { useRef, useState } from 'react';
import { sendLead } from '@/lib/sendLead';

export default function CallbackForm() {
  const [submitted, setSubmitted] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendLead({
      name: nameRef.current?.value ?? '',
      phone: phoneRef.current?.value ?? '',
      type: 'Запрос КП',
    });
    setSubmitted(true);
  };

  return (
    <section id="callback" className="bg-[#CC0000] py-12 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 sm:gap-10">
          <div className="flex-1">
            <h2 className="text-xl sm:text-3xl font-black text-white mb-2 sm:mb-3 text-balance">
              Получите коммерческое предложение
            </h2>
            <p className="text-red-100 text-sm sm:text-lg leading-relaxed">
              Оставьте заявку&nbsp;&mdash; перезвоним в&nbsp;течение 15&nbsp;минут и&nbsp;рассчитаем стоимость под&nbsp;ваш проект
            </p>
          </div>
          <div className="flex-1">
            {submitted ? (
              <div className="bg-white/10 rounded-2xl p-8 text-white text-center">
                <div className="text-4xl mb-3">&#10003;</div>
                <div className="text-xl font-bold mb-1">Заявка принята!</div>
                <div className="text-red-100">Перезвоним вам в&nbsp;ближайшее время</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input ref={nameRef} type="text" placeholder="Ваше имя" required className="rounded-xl px-4 py-3 sm:py-3.5 text-sm text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-white/50" />
                <input ref={phoneRef} type="tel" placeholder="+7 (___) ___-__-__" required className="rounded-xl px-4 py-3 sm:py-3.5 text-sm text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-white/50" />
                <button type="submit" className="bg-[#1a1a1a] hover:bg-black text-white font-bold px-6 py-3.5 rounded-xl transition-colors w-full text-sm sm:text-base">
                  Получить предложение
                </button>
                <p className="text-red-100 text-xs text-center">Свяжемся в&nbsp;течение 15&nbsp;минут</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
