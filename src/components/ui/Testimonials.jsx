import { Quote } from 'lucide-react';

export default function Testimonials({ items = [] }) {
  if (!items.length) return null;
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.slice(0, 3).map((t) => (
        <figure key={t._id || t.name} className="flex h-full flex-col rounded-xl border border-outline-variant/40 bg-surface-container-lowest p-5 shadow-sm transition-all duration-300 hover:shadow-md">
          <Quote className="h-6 w-6 text-tertiary-fixed-dim" />
          <blockquote className="mt-3 flex-1 font-serif text-[15px] leading-6 text-primary-container">“{t.quote}”</blockquote>
          <figcaption className="mt-4 border-t border-outline-variant/40 pt-3">
            <p className="text-[13px] font-bold text-primary-container">{t.name}</p>
            <p className="mt-0.5 text-caption text-on-surface-variant">{[t.role, t.batch].filter(Boolean).join(' · ')}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
