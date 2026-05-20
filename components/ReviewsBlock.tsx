interface Review {
  id: number;
  name: string;
  role: string;
  text: string;
  date: string;
}

interface Props {
  reviews: Review[];
}

export default function ReviewsBlock({ reviews }: Props) {
  const aggregateSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Металлург',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      bestRating: '5',
      ratingCount: String(reviews.length),
      reviewCount: String(reviews.length),
    },
    review: reviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.name },
      datePublished: r.date,
      reviewBody: r.text,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
      },
    })),
  };

  return (
    <section className="py-12 sm:py-20 lg:py-24 bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateSchema) }} />
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-[#1a1a1a]">Отзывы клиентов</h2>
          <p className="text-gray-500 mt-1">Что говорят наши покупатели</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r) => (
            <article key={r.id} className="bg-[#f9f9f9] border border-gray-100 rounded-2xl p-6 flex flex-col gap-3">
              <div className="flex items-center gap-1 text-[#CC0000]" aria-label="Оценка: 5 из 5">
                {[1,2,3,4,5].map((s) => (
                  <svg key={s} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-gray-700 leading-relaxed flex-1">&laquo;{r.text}&raquo;</p>
              <div>
                <p className="font-semibold text-[#1a1a1a] text-sm">{r.name}</p>
                <p className="text-xs text-gray-400">{r.role} &middot; {r.date}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
