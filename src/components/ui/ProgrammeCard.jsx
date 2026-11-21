import Link from 'next/link';
import { ArrowRight, Clock, GraduationCap } from 'lucide-react';

export default function ProgrammeCard({ p }) {
  return (
    <article className={`card card-hover relative flex h-full flex-col overflow-hidden ${p.isFlagship ? 'pt-9 md:pt-11' : ''}`}>
      {p.isFlagship && <div className="absolute inset-x-0 top-0 h-[3px] bg-gold" />}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="chip">{p.level === 'PG' ? 'Postgraduate' : 'Undergraduate'}</span>
        {p.isFlagship && <span className="chip !bg-navy !text-gold">Flagship</span>}
        {p.admissionsOpen && <span className="chip !bg-green-50 !text-green-800">Admissions open</span>}
      </div>
      <h3 className="h-sm">{p.name}</h3>
      <p className="mt-1 font-serif text-sm italic text-muted">{p.code}</p>
      <p className="mt-4 flex-1 text-sm leading-6 text-ink/80">{p.tagline}</p>
      <dl className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
        <div className="flex items-center gap-2 text-muted"><Clock className="h-4 w-4 text-gold-dark" />{p.duration}</div>
        <div className="flex items-start gap-2 text-muted"><GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /><span>{p.affiliation?.university}</span></div>
      </dl>
      <Link href={`/programmes/${p.slug}`} className="link-arrow mt-5">Explore {p.code}<ArrowRight className="h-4 w-4" /></Link>
    </article>
  );
}
