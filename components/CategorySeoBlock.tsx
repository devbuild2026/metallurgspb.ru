import { categorySeo } from '@/data/categorySeo';

interface Props {
  groupSlug: string;
  cityIn?: string;
  cityBy?: string;
}

export default function CategorySeoBlock({ groupSlug, cityIn, cityBy }: Props) {
  const seo = categorySeo[groupSlug];
  if (!seo) return null;

  const localize = (text: string) => {
    if (!cityIn) return text;
    let result = text;
    // Длинные паттерны первыми (более специфичные)
    result = result.replace(/в\u00a0?Санкт-Петербурге и Ленинградской области/g, `${cityIn} и\u00a0Ленинградской области`);
    result = result.replace(/в Санкт-Петербурге и Ленинградской области/g, `${cityIn} и\u00a0Ленинградской области`);
    result = result.replace(/в\u00a0?Санкт-Петербурге и ЛО/g, `${cityIn} и\u00a0ЛО`);
    result = result.replace(/в Санкт-Петербурге и ЛО/g, `${cityIn} и\u00a0ЛО`);
    if (cityBy) {
      result = result.replace(/по\u00a0?Санкт-Петербургу и ЛО/g, `${cityBy} и\u00a0по\u00a0Ленинградской области`);
      result = result.replace(/по Санкт-Петербургу и ЛО/g, `${cityBy} и\u00a0по\u00a0Ленинградской области`);
      result = result.replace(/по\u00a0?Санкт-Петербургу/g, cityBy);
      result = result.replace(/по Санкт-Петербургу/g, cityBy);
    }
    result = result.replace(/в\u00a0?Санкт-Петербурге/g, cityIn);
    result = result.replace(/в Санкт-Петербурге/g, cityIn);
    result = result.replace(/на складе в\u00a0?СПб/g, 'на\u00a0складе в\u00a0Санкт-Петербурге');
    result = result.replace(/на складе в СПб/g, 'на\u00a0складе в\u00a0Санкт-Петербурге');
    return result;
  };

  return (
    <section className="mt-10 border-t border-gray-100 pt-10">
      <div className="prose prose-sm max-w-none text-gray-600">
        <p className="text-base leading-relaxed mb-6">{localize(seo.text)}</p>

        {seo.sections.map((sec) => (
          <div key={sec.heading} className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-black text-[#1a1a1a] mb-3">{localize(sec.heading)}</h2>
            {sec.body.split('\n\n').map((para, i) => (
              <p key={i} className="text-sm leading-relaxed text-gray-600 mb-3 whitespace-pre-line">{localize(para)}</p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
