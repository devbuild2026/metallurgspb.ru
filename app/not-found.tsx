import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Страница не найдена — Металлург',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24 text-center">
      <div className="text-8xl font-black text-[#CC0000] mb-4">404</div>
      <h1 className="text-3xl font-black text-[#1a1a1a] mb-3">Страница не найдена</h1>
      <p className="text-gray-500 mb-8">Запрашиваемая страница не существует или была перемещена</p>
      <Link href="/" className="inline-block bg-[#CC0000] hover:bg-[#aa0000] text-white font-bold px-8 py-4 rounded-xl transition-colors">
        На главную
      </Link>
    </div>
  );
}
