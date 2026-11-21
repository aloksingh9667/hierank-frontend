import { FileText, ClipboardCheck, MessageSquare, Award, Calendar } from 'lucide-react';
import { getProgrammes, getSettings } from '@/lib/api';
import { formatDate } from '@/lib/format';
import PageHero from '@/components/ui/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import Tabs from '@/components/ui/Tabs';
import CheckList from '@/components/ui/CheckList';
import ContactDesks from '@/components/ui/ContactDesks';
import ApplicationForm from '@/components/forms/ApplicationForm';

export const metadata = { title: 'Admissions 2026', description: 'Admission process, eligibility and online application for MBA, MCA, BBA and BCA at Hierank Business School, Noida.' };

const STEPS = [
  { icon: FileText, t: 'Online Application', d: 'Complete the candidate profile with academic details and your statement of purpose.' },
  { icon: ClipboardCheck, t: 'Aptitude / Academic Evaluation', d: 'Shortlisted applicants are evaluated on aptitude, reasoning and academic record (CAT / MAT / CMAT / XAT / CUET where applicable).' },
  { icon: MessageSquare, t: 'Personal Interview & GD', d: 'A conversation with faculty and mentors on communication, judgement and career goals.' },
  { icon: Award, t: 'Letter of Acceptance & Enrolment', d: 'Selected candidates receive an offer; confirm your seat with fee payment and document verification.' },
];

export default async function AdmissionsPage({ searchParams }) {
  const [programmes, settings] = await Promise.all([getProgrammes(), getSettings()]);
  const dates = settings.importantDates || [];
  const preselect = programmes.find((p) => p.slug === searchParams?.programme)?.slug || '';

  const tabs = programmes.map((p) => ({
    id: p.slug, label: p.code,
    content: (
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="card"><p className="eyebrow mb-1">{p.level === 'PG' ? 'Postgraduate' : 'Undergraduate'} · {p.duration}</p><h3 className="h-sm mb-5">{p.code} eligibility</h3><CheckList items={p.eligibility} /></div>
        <div className="card"><h3 className="h-sm mb-5">Required documents ({p.code})</h3><CheckList items={p.requiredDocuments} /></div>
      </div>
    ),
  }));

  return (
    <>
      <PageHero eyebrow="Admissions · Cohort 2026" title="Admissions & Enrolment" crumbs={[{ label: 'Admissions' }]}
        actions={<><a href="#apply" className="btn-gold">Begin Application</a><a href="#eligibility" className="btn border-[1.5px] border-white/40 text-white hover:bg-white/10">View Eligibility</a></>}>
        A transparent, merit-driven process designed to identify candidates who will thrive at Hierank — across MBA, MCA, BBA and BCA.
      </PageHero>

      <section className="section">
        <div className="container-page">
          <SectionHeading eyebrow="Selection Journey" title="4-Step Admission Process" />
          <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.t} className="card card-hover relative">
                <span className="absolute right-6 top-4 font-serif text-5xl text-gold/30">0{i + 1}</span>
                <s.icon className="h-8 w-8 text-gold-dark" /><h3 className="h-sm mt-5">{s.t}</h3><p className="mt-2 text-sm leading-6 text-muted">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section bg-tint" id="eligibility">
        <div className="container-page"><SectionHeading eyebrow="Academic Standards" title="Eligibility Criteria & Required Documents" /><div className="mt-10"><Tabs tabs={tabs} label="Programme eligibility" /></div></div>
      </section>

      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Academic Calendar" title="Important Dates" />
            {dates.length ? (
              <ul className="mt-8 divide-y divide-line rounded-card border border-navy/10 bg-white">
                {dates.map((d) => <li key={d.label} className="flex items-center gap-4 p-5"><Calendar className="h-5 w-5 text-gold-dark" /><div className="flex-1"><p className="font-semibold text-navy">{d.label}</p>{d.note && <p className="text-xs text-muted">{d.note}</p>}</div><span className="text-sm font-semibold">{formatDate(d.date)}</span></li>)}
              </ul>
            ) : <p className="mt-8 rounded-card border border-dashed border-navy/20 bg-white p-6 text-sm text-muted">Admission cycle dates are announced by the admissions desk. Contact us for the latest schedule and scholarship deadlines.</p>}
          </div>
          <div>
            <SectionHeading eyebrow="Talk to Us" title="Admissions Desks" />
            <div className="mt-8"><ContactDesks desks={settings.contact?.desks || []} /></div>
          </div>
        </div>
      </section>

      <section className="section bg-white" id="apply">
        <div className="container-page max-w-4xl">
          <SectionHeading eyebrow="Candidate Application" title="Apply Online — Cohort 2026" align="center">Takes about five minutes. You will receive an application number on submission.</SectionHeading>
          <div className="mt-10"><ApplicationForm programmes={programmes} defaultProgramme={preselect} /></div>
        </div>
      </section>
    </>
  );
}
