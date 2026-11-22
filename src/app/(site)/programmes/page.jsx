import Link from 'next/link';
import { ArrowRight, Cloud, Lightbulb, Users, Briefcase } from 'lucide-react';
import { getProgrammes } from '@/lib/api';
import PageHero from '@/components/ui/PageHero';
import ProgrammeCard from '@/components/ui/ProgrammeCard';
import SectionHeading from '@/components/ui/SectionHeading';
import EmptyState from '@/components/ui/EmptyState';

export const metadata = { title: 'Programmes', description: 'Explore MBA, MCA, BBA and BCA programmes at Hierank Business School, Noida.' };

const METHOD = [
  { icon: Briefcase, t: 'Case-method learning', d: 'Discussion-led classrooms built around real business cases.' },
  { icon: Users, t: 'Corporate mentorship', d: 'Industry professionals guide projects, labs and career planning.' },
  { icon: Cloud, t: 'Analytics & computing labs', d: 'Hands-on labs for analytics, programming and cloud tools.' },
  { icon: Lightbulb, t: 'Live projects', d: 'Internships and live assignments with partner organisations.' },
];

export default async function ProgrammesPage() {
  const programmes = await getProgrammes();
  const pg = programmes.filter((p) => p.level === 'PG');
  const ug = programmes.filter((p) => p.level === 'UG');
  return (
    <>
      <PageHero eyebrow="Academic Programmes" title="Programmes Designed for Careers That Lead" crumbs={[{ label: 'Programmes' }]}>
        Four industry-aligned programmes across management and computer applications — affiliated to AKTU and CCS University and approved by AICTE / UGC.
      </PageHero>
      <section className="section bg-surface-bright">
        <div className="container-page space-y-14">
          {!programmes.length && <EmptyState title="Programmes unavailable">Please make sure the API server is running.</EmptyState>}
          {pg.length > 0 && (
            <div>
              <p className="eyebrow mb-5">Postgraduate · 2 years</p>
              <div className="grid gap-6 md:grid-cols-2">{pg.map((p) => <ProgrammeCard key={p.slug} p={p} />)}</div>
            </div>
          )}
          {ug.length > 0 && (
            <div>
              <p className="eyebrow mb-5">Undergraduate · 3 years</p>
              <div className="grid gap-6 md:grid-cols-2">{ug.map((p) => <ProgrammeCard key={p.slug} p={p} />)}</div>
            </div>
          )}
        </div>
      </section>
      <section className="section bg-surface-container-low">
        <div className="container-page">
          <SectionHeading eyebrow="Learning Methodology" title="Built for Real-World Impact" align="center" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {METHOD.map((m) => (
              <div key={m.t} className="card card-hover">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container-lowest text-on-tertiary-container"><m.icon className="h-6 w-6" /></span>
                <h3 className="mt-4 font-serif text-title-editorial font-semibold text-primary-container">{m.t}</h3>
                <p className="mt-2 text-body-sm leading-6 text-on-surface-variant">{m.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section bg-surface">
        <div className="container-page text-center">
          <h2 className="h-md">Unsure which programme fits your career path?</h2>
          <p className="lead mx-auto mt-3 max-w-xl">Speak to our admissions council for personalised guidance.</p>
          <Link href="/contact" className="btn-primary mt-8">Talk to Admissions <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </>
  );
}
