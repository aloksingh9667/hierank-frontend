import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Calendar, Clock, Download, GraduationCap, Landmark, Users, ListChecks, FileText } from 'lucide-react';
import { getPlacementStats, getProgramme, getProgrammes } from '@/lib/api';
import { formatINR, telHref } from '@/lib/format';
import { getIcon } from '@/lib/icons';
import PageHero from '@/components/ui/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import CheckList from '@/components/ui/CheckList';
import Tabs from '@/components/ui/Tabs';
import EnquiryForm from '@/components/forms/EnquiryForm';

export async function generateMetadata({ params }) {
  const p = await getProgramme(params.slug);
  return p ? { title: `${p.code} — ${p.name}`, description: p.tagline } : { title: 'Programme' };
}

export default async function ProgrammeDetail({ params }) {
  const [p, stats, all] = await Promise.all([getProgramme(params.slug), getPlacementStats(), getProgrammes()]);
  if (!p) notFound();

  const facts = [
    { icon: Clock, label: 'Duration', value: p.duration, sub: p.semesters ? `${p.semesters} semesters` : null },
    { icon: GraduationCap, label: 'Level', value: p.level === 'PG' ? 'Postgraduate' : 'Undergraduate', sub: p.code },
    { icon: Landmark, label: 'Affiliation', value: p.affiliation?.university?.split('(')[0]?.trim(), sub: p.affiliation?.collegeCode ? `College code ${p.affiliation.collegeCode}` : null },
    { icon: Users, label: 'Approval', value: p.affiliation?.approvedBy, sub: null },
  ];

  const specTabs = (p.specialisations || []).map((s, i) => ({
    id: `s${i}`, label: s.name,
    content: (
      <div className="grid gap-8 md:grid-cols-2">
        <div><h3 className="h-sm">{s.name}</h3><p className="mt-3 leading-7 text-ink/80">{s.description}</p></div>
        {s.courses?.length > 0 && (
          <ul className="divide-y divide-line rounded-card border border-navy/10 bg-white">
            {s.courses.map((c) => <li key={c.title} className="flex items-center gap-4 px-5 py-3.5"><span className="min-w-[72px] text-xs font-bold uppercase tracking-eyebrow text-gold-dark">{c.code || 'Course'}</span><span className="text-[15px]">{c.title}</span></li>)}
          </ul>
        )}
      </div>
    ),
  }));

  return (
    <>
      <PageHero eyebrow={`${p.level === 'PG' ? 'Postgraduate' : 'Undergraduate'} Programme${p.admissionsOpen ? ' · Admissions Open 2026' : ''}`} title={`${p.name} (${p.code})`} crumbs={[{ label: 'Programmes', href: '/programmes' }, { label: p.code }]}
        actions={<><Link href={`/admissions?programme=${p.slug}#apply`} className="btn-gold">Apply Now <ArrowRight className="h-4 w-4" /></Link>{p.brochureUrl && <a href={p.brochureUrl} target="_blank" rel="noreferrer" className="btn border-[1.5px] border-white/40 text-white hover:bg-white/10"><Download className="h-4 w-4" />Download Brochure</a>}</>}>
        {p.tagline}
      </PageHero>

      <section className="-mt-8 pb-4">
        <div className="container-page">
          <dl className="grid gap-4 rounded-card bg-white p-6 shadow-modal sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label} className="flex gap-3"><f.icon className="mt-1 h-5 w-5 shrink-0 text-gold-dark" /><div><dt className="text-xs uppercase tracking-eyebrow text-muted">{f.label}</dt><dd className="mt-1 text-sm font-semibold text-navy">{f.value}</dd>{f.sub && <dd className="text-xs text-muted">{f.sub}</dd>}</div></div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <SectionHeading eyebrow="01 / Academic Philosophy" title="Programme Overview & Learning Outcomes">{p.overview}</SectionHeading>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(p.outcomes || []).map((o) => {
              const Icon = getIcon(o.icon);
              return <div key={o.title} className="card card-hover"><Icon className="h-7 w-7 text-gold-dark" /><h3 className="h-sm mt-4">{o.title}</h3><p className="mt-2 text-sm leading-6 text-muted">{o.description}</p></div>;
            })}
          </div>
        </div>
      </section>

      {(specTabs.length > 0 || p.progression?.length > 0) && (
        <section className="section bg-tint">
          <div className="container-page">
            <SectionHeading eyebrow="02 / Academic Architecture" title="Curriculum & Specialisations" />
            {specTabs.length > 0 && <div className="mt-10"><Tabs tabs={specTabs} label="Specialisations" /></div>}
            {p.progression?.length > 0 && (
              <ol className="mt-12 grid gap-6 md:grid-cols-3">
                {p.progression.map((s, i) => (
                  <li key={s.title} className="card relative"><span className="font-serif text-4xl text-gold/70">0{i + 1}</span><h3 className="h-sm mt-2">{s.title}</h3><p className="mt-2 text-sm leading-6 text-muted">{s.description}</p></li>
                ))}
              </ol>
            )}
          </div>
        </section>
      )}

      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div className="card"><h3 className="h-sm mb-5 flex items-center gap-2"><ListChecks className="h-5 w-5 text-gold-dark" />Eligibility</h3><CheckList items={p.eligibility} /></div>
          <div className="card"><h3 className="h-sm mb-5 flex items-center gap-2"><FileText className="h-5 w-5 text-gold-dark" />Required documents</h3><CheckList items={p.requiredDocuments} /></div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="03 / Financial Investment" title="Fee Structure & Scholarships" />
            <table className="mt-8 w-full text-sm">
              <tbody className="divide-y divide-line">
                {(p.fees?.items || []).map((f) => (
                  <tr key={f.label}><td className="py-4 pr-4"><p className="font-semibold text-navy">{f.label}</p>{f.note && <p className="text-xs text-muted">{f.note}</p>}</td><td className="py-4 text-right font-serif text-base text-navy">{formatINR(f.amount) || <span className="text-sm font-sans text-muted">Contact admissions</span>}</td></tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-xs text-muted">Fees are confirmed by the admissions office at the time of counselling.</p>
          </div>
          <div className="space-y-4">
            <p className="eyebrow">Scholarships</p>
            {(p.fees?.scholarships || []).map((s) => <div key={s.title} className="rounded-card border border-gold/30 bg-gold-soft p-5"><p className="font-serif text-lg font-semibold text-navy">{s.title}</p><p className="mt-1 text-sm text-ink/80">{s.description}</p></div>)}
          </div>
        </div>
      </section>

      {stats && (
        <section className="section">
          <div className="container-page"><div className="grid gap-6 rounded-card bg-navy p-8 text-white md:grid-cols-4 md:p-12">
            <div className="md:col-span-1"><p className="eyebrow !text-gold">Career outcomes</p><h3 className="h-md mt-2 !text-white">Placements {stats.academicYear}</h3></div>
            {[[`₹${stats.highestPackageLPA} LPA`, 'Highest package'], [`₹${stats.averagePackageLPA} LPA`, 'Average package'], [`${stats.hiringPartners}+`, 'Hiring partners']].map(([v, l]) => <div key={l}><p className="font-serif text-4xl text-white">{v}</p><p className="mt-1 text-sm text-white/65">{l}</p></div>)}
          </div></div>
        </section>
      )}

      <section className="section bg-tint">
        <div className="container-page grid items-start gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Apply" title={`Begin Your ${p.code} Application`}>Send a quick enquiry, or apply online right away.</SectionHeading>
            <div className="mt-6 flex flex-wrap gap-4"><Link href={`/admissions?programme=${p.slug}#apply`} className="btn-primary">Apply Online</Link></div>
            {p.admissionPhones?.length > 0 && <p className="mt-6 text-sm text-muted">Admissions desk: {p.admissionPhones.map((ph, i) => <span key={ph}>{i > 0 && ' · '}<a href={telHref(ph)} className="font-semibold text-navy hover:text-royal">{ph}</a></span>)}</p>}
          </div>
          <EnquiryForm source="programme" defaultProgramme={p.code} programmes={all.map((x) => x.code)} idPrefix="prog" />
        </div>
      </section>
    </>
  );
}
