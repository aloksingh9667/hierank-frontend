import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Clock, Download, GraduationCap, Landmark, Users, ListChecks, FileText } from 'lucide-react';
import { getPlacementStats, getProgramme, getProgrammes } from '@/lib/api';
import { formatINR, telHref } from '@/lib/format';
import { getIcon } from '@/lib/icons';
import PageHero from '@/components/ui/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import CheckList from '@/components/ui/CheckList';
import Tabs from '@/components/ui/Tabs';
import EnquiryForm from '@/components/forms/EnquiryForm';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = await getProgramme(slug);
  return p ? { title: `${p.code} — ${p.name}`, description: p.tagline } : { title: 'Programme' };
}

export default async function ProgrammeDetail({ params }) {
  const { slug } = await params;
  const [p, stats, all] = await Promise.all([getProgramme(slug), getPlacementStats(), getProgrammes()]);
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
        <div><h3 className="font-serif text-headline-sm text-primary-container">{s.name}</h3><p className="mt-3 text-body-md leading-7 text-on-surface-variant">{s.description}</p></div>
        {s.courses?.length > 0 && (
          <ul className="divide-y divide-outline-variant/40 overflow-hidden rounded-2xl border border-outline-variant/40 bg-surface-container-lowest shadow-sm">
            {s.courses.map((c) => (
              <li key={c.title} className="flex items-center gap-4 px-5 py-3.5">
                <span className="min-w-[72px] text-label-prestige-eyebrow uppercase tracking-wider text-on-tertiary-container">{c.code || 'Course'}</span>
                <span className="text-body-sm text-on-surface">{c.title}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    ),
  }));

  return (
    <>
      <PageHero
        eyebrow={`${p.level === 'PG' ? 'Postgraduate' : 'Undergraduate'} Programme${p.admissionsOpen ? ' · Admissions Open 2026' : ''}`}
        title={`${p.name} (${p.code})`}
        crumbs={[{ label: 'Programmes', href: '/programmes' }, { label: p.code }]}
        actions={
          <>
            <Link href={`/admissions?programme=${p.slug}#apply`} className="btn-gold">Apply Now <ArrowRight className="h-4 w-4" /></Link>
            {p.brochureUrl && <a href={p.brochureUrl} target="_blank" rel="noreferrer" className="btn-outline"><Download className="h-4 w-4" />Download Brochure</a>}
          </>
        }
      >
        {p.tagline}
      </PageHero>

      <section className="-mt-8 pb-4">
        <div className="container-page">
          <dl className="grid gap-4 rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-6 shadow-modal sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label} className="flex gap-3">
                <f.icon className="mt-1 h-5 w-5 shrink-0 text-on-tertiary-container" />
                <div>
                  <dt className="text-label-prestige-eyebrow uppercase tracking-wider text-on-surface-variant">{f.label}</dt>
                  <dd className="mt-1 text-body-sm font-semibold text-primary-container">{f.value}</dd>
                  {f.sub && <dd className="text-caption text-on-surface-variant">{f.sub}</dd>}
                </div>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section bg-surface-bright">
        <div className="container-page">
          <SectionHeading eyebrow="01 / Academic Philosophy" title="Programme Overview & Learning Outcomes">{p.overview}</SectionHeading>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(p.outcomes || []).map((o) => {
              const Icon = getIcon(o.icon);
              return (
                <div key={o.title} className="card card-hover">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container-low text-on-tertiary-container"><Icon className="h-6 w-6" /></span>
                  <h3 className="mt-4 font-serif text-title-editorial font-semibold text-primary-container">{o.title}</h3>
                  <p className="mt-2 text-body-sm leading-6 text-on-surface-variant">{o.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {(specTabs.length > 0 || p.progression?.length > 0) && (
        <section className="section bg-surface-container-low">
          <div className="container-page">
            <SectionHeading eyebrow="02 / Academic Architecture" title="Curriculum & Specialisations" />
            {specTabs.length > 0 && <div className="mt-10"><Tabs tabs={specTabs} label="Specialisations" /></div>}
            {p.progression?.length > 0 && (
              <ol className="mt-12 grid gap-6 md:grid-cols-3">
                {p.progression.map((s, i) => (
                  <li key={s.title} className="card relative">
                    <span className="font-serif text-4xl text-tertiary-fixed-dim">0{i + 1}</span>
                    <h3 className="mt-2 font-serif text-title-editorial font-semibold text-primary-container">{s.title}</h3>
                    <p className="mt-2 text-body-sm leading-6 text-on-surface-variant">{s.description}</p>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </section>
      )}

      <section className="section bg-surface-bright">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div className="card"><h3 className="mb-5 flex items-center gap-2 font-serif text-headline-sm text-primary-container"><ListChecks className="h-5 w-5 text-on-tertiary-container" />Eligibility</h3><CheckList items={p.eligibility} /></div>
          <div className="card"><h3 className="mb-5 flex items-center gap-2 font-serif text-headline-sm text-primary-container"><FileText className="h-5 w-5 text-on-tertiary-container" />Required documents</h3><CheckList items={p.requiredDocuments} /></div>
        </div>
      </section>

      <section className="section bg-surface-container-low">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="03 / Financial Investment" title="Fee Structure & Scholarships" />
            <table className="mt-8 w-full text-body-sm">
              <tbody className="divide-y divide-outline-variant/40">
                {(p.fees?.items || []).map((f) => (
                  <tr key={f.label}>
                    <td className="py-4 pr-4"><p className="text-label-prominent font-semibold text-primary-container">{f.label}</p>{f.note && <p className="text-caption text-on-surface-variant">{f.note}</p>}</td>
                    <td className="py-4 text-right font-serif text-title-editorial text-primary-container">{formatINR(f.amount) || <span className="font-sans text-body-sm text-on-surface-variant">Contact admissions</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-caption text-on-surface-variant">Fees are confirmed by the admissions office at the time of counselling.</p>
          </div>
          <div className="space-y-4">
            <p className="eyebrow">Scholarships</p>
            {(p.fees?.scholarships || []).map((s) => (
              <div key={s.title} className="rounded-xl border border-tertiary-fixed-dim/50 bg-surface-container-lowest p-5">
                <p className="font-serif text-title-editorial font-semibold text-primary-container">{s.title}</p>
                <p className="mt-1 text-body-sm text-on-surface-variant">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {stats && (
        <section className="section bg-surface-bright">
          <div className="container-page">
            <div className="grid gap-6 rounded-2xl bg-primary-container p-8 text-on-primary md:grid-cols-4 md:p-12">
              <div className="md:col-span-1">
                <p className="text-label-prestige-eyebrow uppercase tracking-wider text-tertiary-fixed">Career outcomes</p>
                <h3 className="mt-2 font-serif text-headline-sm text-on-primary">Placements {stats.academicYear}</h3>
              </div>
              {[[`₹${stats.highestPackageLPA} LPA`, 'Highest package'], [`₹${stats.averagePackageLPA} LPA`, 'Average package'], [`${stats.hiringPartners}+`, 'Hiring partners']].map(([v, l]) => (
                <div key={l}>
                  <p className="font-serif text-headline-md text-on-primary">{v}</p>
                  <p className="mt-1 text-body-sm text-surface-variant">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section bg-surface-container-low">
        <div className="container-page grid items-start gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Apply" title={`Begin Your ${p.code} Application`}>Send a quick enquiry, or apply online right away.</SectionHeading>
            <div className="mt-6 flex flex-wrap gap-4"><Link href={`/admissions?programme=${p.slug}#apply`} className="btn-primary">Apply Online</Link></div>
            {p.admissionPhones?.length > 0 && (
              <p className="mt-6 text-body-sm text-on-surface-variant">
                Admissions desk: {p.admissionPhones.map((ph, i) => (
                  <span key={ph}>{i > 0 && ' · '}<a href={telHref(ph)} className="font-semibold text-secondary hover:text-primary-container">{ph}</a></span>
                ))}
              </p>
            )}
          </div>
          <EnquiryForm source="programme" defaultProgramme={p.code} programmes={all.map((x) => x.code)} idPrefix="prog" />
        </div>
      </section>
    </>
  );
}
