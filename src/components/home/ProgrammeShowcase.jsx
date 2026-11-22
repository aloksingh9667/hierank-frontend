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
      <div role="tablist" aria-label="Programme level" className="flex flex-wrap items-center gap-x-8 gap-y-2 border-b border-outline-variant/50">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={clsx(
              '-mb-px border-b-2 pb-3 text-label-prominent transition-colors',
              tab === t.id
                ? 'border-secondary font-bold text-primary-container'
                : 'border-transparent text-on-surface-variant hover:text-primary-container',
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((p) => <ProgrammeCard key={p.slug} p={p} />)}
      </div>
    </div>
  );
}
