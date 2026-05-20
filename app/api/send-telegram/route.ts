import { NextResponse } from 'next/server';

const CHAT_ID = '-1003494508645';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name = '—',
      phone = '—',
      city = '—',
      page = '—',
      product = '—',
      quantity = '—',
      delivery = '—',
      comment = '—',
      type = 'Заявка',
    } = body;

    const now = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });

    const text = [
      `📥 ${type}`,
      '',
      `👤 Имя: ${name}`,
      `📞 Телефон: ${phone}`,
      '',
      `🌍 Город: ${city}`,
      `🔗 Страница: ${page}`,
      '',
      `📦 Запрос: ${product}`,
      `📊 Количество: ${quantity}`,
      `🚚 Доставка: ${delivery}`,
      '',
      `💬 Комментарий: ${comment}`,
      '',
      `⏰ ${now}`,
    ].join('\n');

    const token = process.env.TELEGRAM_TOKEN;
    if (!token || token === 'your_bot_token_here') {
      console.warn('TELEGRAM_TOKEN not configured');
      return NextResponse.json({ success: true, warning: 'token_not_set' });
    }

    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text }),
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      console.error('Telegram API error:', errText);
      return NextResponse.json({ success: false, error: 'telegram_error' }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('send-telegram error:', error);
    return NextResponse.json({ success: false, error: 'server_error' }, { status: 500 });
  }
}
