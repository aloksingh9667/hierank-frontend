import { CheckCircle2 } from 'lucide-react';

export default function CheckList({ items = [], icon: Icon = CheckCircle2 }) {
  return (
    <ul className="space-y-3">
      {items.map((t) => (
        <li key={t} className="flex gap-3 text-body-sm text-on-surface-variant"><Icon className="mt-0.5 h-5 w-5 shrink-0 text-on-tertiary-container" />{t}</li>
      ))}
    </ul>
  );
}
