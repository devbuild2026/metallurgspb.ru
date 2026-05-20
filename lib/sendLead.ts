export interface LeadData {
  name: string;
  phone: string;
  city?: string;
  page?: string;
  product?: string;
  quantity?: string;
  delivery?: string;
  comment?: string;
  type?: string;
}

export async function sendLead(data: LeadData): Promise<boolean> {
  try {
    const payload: LeadData = {
      ...data,
      page: data.page ?? (typeof window !== 'undefined' ? window.location.pathname : '—'),
    };

    const res = await fetch('/api/send-telegram', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    return res.ok;
  } catch {
    console.error('sendLead failed');
    return false;
  }
}
