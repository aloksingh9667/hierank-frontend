import { CheckCircle2 } from 'lucide-react';

export default function CheckList({ items = [], icon: Icon = CheckCircle2 }) {
  return (
    <ul className="space-y-3">
      {items.map((t) => (
        <li key={t} className="flex gap-3 text-[15px] leading-6 text-ink/85"><Icon className="mt-0.5 h-5 w-5 shrink-0 text-gold-dark" />{t}</li>
      ))}
    </ul>
  );
}
