'use client';

import { useEffect, useState } from 'react';
import { sendLead } from '@/lib/sendLead';

export default function FloatingPopup() {
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [messenger, setMessenger] = useState<'whatsapp' | 'telegram' | 'max'>('whatsapp');

  useEffect(() => {
    if (sessionStorage.getItem('kp-popup-closed')) return;
    const timer = setTimeout(() => setVisible(true), 12000);
    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    setVisible(false);
    sessionStorage.setItem('kp-popup-closed', '1');
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[320px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
      <div className="bg-[#CC0000] px-5 py-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-white font-bold text-base leading-snug">Получите коммерческое предложение</p>
          <p className="text-red-100 text-xs mt-1">Ответим в&nbsp;течение рабочего дня</p>
        </div>
        <button type="button" onClick={close} className="text-white/70 hover:text-white transition-colors flex-shrink-0 mt-0.5" aria-label="Закрыть">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <div className="px-5 py-4">
        {submitted ? (
          <div className="text-center py-3">
            <div className="text-2xl mb-2">&#10003;</div>
            <p className="text-sm font-bold text-[#1a1a1a] mb-1">Заявка принята!</p>
            <p className="text-xs text-gray-500">Свяжемся с&nbsp;вами в&nbsp;ближайшее время</p>
          </div>
        ) : (
          <form
            className="flex flex-col gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              const f = e.target as HTMLFormElement;
              sendLead({
                name: (f.elements.namedItem('popup-name') as HTMLInputElement)?.value ?? '',
                phone: (f.elements.namedItem('popup-phone') as HTMLInputElement)?.value ?? '',
                type: 'Всплывающая форма КП',
                comment: `Способ связи: ${messenger}`,
              });
              setSubmitted(true);
              setTimeout(close, 3000);
            }}
          >
            <input type="text" name="popup-name" placeholder="Ваше имя" required className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#CC0000]" />
            <input type="tel" name="popup-phone" placeholder="+7 (___) ___-__-__" required className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#CC0000]" />
            <div>
              <p className="text-xs text-gray-400 mb-1.5">Способ связи</p>
              <div className="flex gap-1.5">
                {([
                  { id: 'whatsapp' as const, label: 'WhatsApp', color: 'bg-[#25D366]' },
                  { id: 'telegram' as const, label: 'Telegram', color: 'bg-[#229ED9]' },
                  { id: 'max' as const, label: 'Max', color: 'bg-[#1f2937]' },
                ]).map((m) => (
                  <button key={m.id} type="button" onClick={() => setMessenger(m.id)}
                    className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${messenger === m.id ? `${m.color} text-white shadow-sm` : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                  >{m.label}</button>
                ))}
              </div>
            </div>
            <button type="submit" className="bg-[#CC0000] hover:bg-[#aa0000] text-white font-bold py-2.5 rounded-xl text-sm transition-colors">
              Получить КП
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
