import { Quote } from 'lucide-react';

export default function Testimonials({ items = [] }) {
  if (!items.length) return null;
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.slice(0, 3).map((t) => (
        <figure key={t._id || t.name} className="card flex h-full flex-col">
          <Quote className="h-8 w-8 text-gold" />
          <blockquote className="mt-4 flex-1 font-serif text-lg italic leading-8 text-navy">“{t.quote}”</blockquote>
          <figcaption className="mt-6 border-t border-line pt-4">
            <p className="font-semibold text-navy">{t.name}</p>
            <p className="text-sm text-muted">{[t.role, t.batch].filter(Boolean).join(' · ')}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
