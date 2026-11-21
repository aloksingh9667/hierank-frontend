'use client';
import { useState } from 'react';
import clsx from 'clsx';
import ProgrammeCard from '@/components/ui/ProgrammeCard';

const TABS = [{ id: 'all', label: 'All Programmes' }, { id: 'PG', label: 'Postgraduate' }, { id: 'UG', label: 'Undergraduate' }];

export default function ProgrammeShowcase({ programmes = [] }) {
  const [tab, setTab] = useState('all');
  const list = tab === 'all' ? programmes : programmes.filter((p) => p.level === tab);
  return (
    <div>
      <div role="tablist" aria-label="Programme level" className="inline-flex rounded-full bg-tint p-1">
        {TABS.map((t) => (
          <button key={t.id} role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)}
            className={clsx('rounded-full px-5 py-2 text-sm font-semibold transition', tab === t.id ? 'bg-navy text-white shadow' : 'text-navy hover:text-royal')}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {list.map((p) => <ProgrammeCard key={p.slug} p={p} />)}
      </div>
    </div>
  );
}
