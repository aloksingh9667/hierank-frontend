import { Phone } from 'lucide-react';
import { telHref } from '@/lib/format';

export default function ContactDesks({ desks = [] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {desks.map((d) => (
        <div key={d.name} className="rounded-card border border-navy/10 bg-white p-5">
          <p className="font-serif text-base font-semibold text-navy">{d.name}</p>
          <div className="mt-2 space-y-1">
            {d.phones.map((p) => <a key={p} href={telHref(p)} className="flex items-center gap-2 text-sm text-muted hover:text-royal"><Phone className="h-3.5 w-3.5 text-gold-dark" />{p}</a>)}
          </div>
        </div>
      ))}
    </div>
  );
}
