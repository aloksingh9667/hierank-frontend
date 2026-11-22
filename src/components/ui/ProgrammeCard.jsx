import Link from 'next/link';
import { ArrowRight, Clock, GraduationCap } from 'lucide-react';
import clsx from 'clsx';

export default function ProgrammeCard({ p }) {
  const modules = (p.specialisations || []).map((s) => s.name).filter(Boolean).slice(0, 3);
  const eligibility = (p.eligibility || [])[0];

  return (
    <article
      className={clsx(
        'group relative flex h-full flex-col overflow-hidden rounded-xl border bg-surface-container-lowest p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md md:p-5',
        p.isFlagship ? 'border-tertiary-fixed-dim/70' : 'border-outline-variant/40 hover:border-tertiary-fixed-dim/50',
      )}
    >
      {p.isFlagship && <div className="absolute inset-x-0 top-0 h-[2px] bg-tertiary-fixed-dim" />}

      <div className="mb-3 flex flex-wrap items-center gap-1.5">
        <span className="chip">{p.level === 'PG' ? 'Postgraduate' : 'Undergraduate'}</span>
        {p.isFlagship && (
          <span className="inline-flex h-6 items-center rounded-full bg-primary-container px-2.5 text-[11px] font-semibold text-tertiary-fixed">
            Flagship Offering
          </span>
        )}
        {p.admissionsOpen && (
          <span className="inline-flex h-6 items-center rounded-full bg-[#e7f4ea] px-2.5 text-[11px] font-semibold text-[#1f6b3a]">
            Admissions open
          </span>
        )}
      </div>

      <h3 className="font-serif text-headline-sm text-primary-container">{p.name}</h3>
      <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-body-sm text-on-surface-variant">
        <span className="inline-flex items-center gap-1.5"><Clock className="h-3 w-3 text-on-tertiary-container" />{p.duration}</span>
        {p.affiliation?.university && (
          <span className="inline-flex items-start gap-1">
            <GraduationCap className="mt-0.5 h-3 w-3 shrink-0 text-on-tertiary-container" />
            {p.affiliation.university}
          </span>
        )}
      </p>

      {p.tagline && <p className="mt-2.5 flex-1 text-body-sm leading-5 text-on-surface-variant">{p.tagline}</p>}

      {modules.length > 0 && (
        <div className="mt-3">
          <p className="text-label-prestige-eyebrow uppercase tracking-wider text-on-surface-variant">Key modules</p>
          <ul className="mt-1.5 flex flex-wrap gap-1.5">
            {modules.map((m) => (
              <li key={m} className="rounded-full bg-surface-container-low px-2 py-0.5 text-caption font-medium text-primary-container">{m}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-3 border-t border-outline-variant/40 pt-3">
        {eligibility && <p className="text-caption text-on-surface-variant">{eligibility}</p>}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <Link href="/admissions#apply" className="btn-primary !px-3 !py-1.5 text-caption">
            Apply for {p.code}
          </Link>
          <Link href={`/programmes/${p.slug}`} className="link-arrow text-caption">
            Programme details <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
