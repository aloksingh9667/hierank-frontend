'use client';
import { useState } from 'react';
import clsx from 'clsx';

/** tabs: [{ id, label, content: ReactNode }] */
export default function Tabs({ tabs = [], label = 'Tabs' }) {
  const [active, setActive] = useState(tabs[0]?.id);
  const current = tabs.find((t) => t.id === active) || tabs[0];
  if (!tabs.length) return null;
  return (
    <div>
      <div role="tablist" aria-label={label} className="flex flex-wrap gap-2 border-b border-line">
        {tabs.map((t) => (
          <button key={t.id} role="tab" id={`tab-${t.id}`} aria-selected={t.id === current.id} aria-controls={`panel-${t.id}`} onClick={() => setActive(t.id)}
            className={clsx('-mb-px border-b-2 px-4 py-3 text-sm font-semibold transition', t.id === current.id ? 'border-gold text-navy' : 'border-transparent text-muted hover:text-navy')}>
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`panel-${current.id}`} aria-labelledby={`tab-${current.id}`} className="pt-8">{current.content}</div>
    </div>
  );
}
