import { Phone } from 'lucide-react';
import { telHref } from '@/lib/format';

export default function ContactDesks({ desks = [] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {desks.map((d) => (
        <div key={d.name} className="rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-5 shadow-sm">
          <p className="font-serif text-title-editorial font-semibold text-primary-container">{d.name}</p>
          <div className="mt-2 space-y-1">
            {d.phones.map((p) => <a key={p} href={telHref(p)} className="flex items-center gap-2 text-body-sm text-on-surface-variant transition-colors hover:text-secondary"><Phone className="h-3.5 w-3.5 text-on-tertiary-container" />{p}</a>)}
          </div>
        </div>
      ))}
    </div>
  );
}
