import { Briefcase, ClipboardList, Handshake, Mic } from 'lucide-react';
import { getPlacementStats, getRecruiters, getSettings, getTestimonials } from '@/lib/api';
import { telHref } from '@/lib/format';
import PageHero from '@/components/ui/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import Metric from '@/components/ui/Metric';
import SectorBar from '@/components/ui/SectorBar';
import RecruiterWall from '@/components/ui/RecruiterWall';
import Testimonials from '@/components/ui/Testimonials';
import EnquiryForm from '@/components/forms/EnquiryForm';

export const metadata = { title: 'Placements & Career Centre', description: 'Placement statistics, recruiters and career support at Hierank Business School, Noida.' };

const SUPPORT = [
  { icon: Briefcase, t: 'Summer internships', d: 'Industry-specific internships integrated into every course.' },
  { icon: ClipboardList, t: 'Live industry projects', d: 'Projects with partner organisations to bridge theory and practice.' },
  { icon: Mic, t: 'Mock interviews & labs', d: 'GD / PI practice, aptitude bootcamps and resume workshops.' },
  { icon: Handshake, t: 'Corporate mentorship', d: 'Regular industry interactions, guest lectures and visits.' },
];

export default async function PlacementsPage() {
  const [stats, recruiters, testimonials, settings] = await Promise.all([getPlacementStats(), getRecruiters(), getTestimonials(), getSettings()]);
  const cell = (settings.contact?.desks || []).find((d) => /placement/i.test(d.name));
  return (
    <>
      <PageHero eyebrow="Placements & Career Resource Centre" title="Careers That Begin on Campus" crumbs={[{ label: 'Placements' }]}>
        A dedicated placement department prepares students for the professional world through internships, projects and recruitment drives.
      </PageHero>

      <section className="section bg-surface-bright">
        <div className="container-page">
          <SectionHeading eyebrow={`Placement Statistics${stats?.academicYear ? ` · ${stats.academicYear}` : ''}`} title="Outcomes at a Glance" />
          <div className="mt-10 grid grid-cols-2 gap-8 lg:grid-cols-4">
            <Metric value={stats ? `₹${stats.highestPackageLPA} LPA` : '₹18 LPA'} label="Highest package" />
            <Metric value={stats ? `₹${stats.averagePackageLPA} LPA` : '₹5 LPA'} label="Average package" />
            <Metric value={stats ? `${stats.studentsPlaced}+` : '500+'} label="Students placed" />
            <Metric value={stats ? `${stats.hiringPartners}+` : '108+'} label="Hiring partners" />
          </div>
          {stats?.minimumPackageLPA && <p className="mt-6 text-body-sm text-on-surface-variant">Average packages range from ₹{stats.minimumPackageLPA} LPA to ₹{stats.averagePackageLPA} LPA across programmes. Figures as published by the institute.</p>}
        </div>
      </section>

      <section className="section bg-surface-container-low">
        <div className="container-page">
          <SectionHeading eyebrow="Placement Support" title="Career Architecture" align="center" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SUPPORT.map((s) => (
              <div key={s.t} className="card card-hover">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container-lowest text-on-tertiary-container"><s.icon className="h-6 w-6" /></span>
                <h3 className="mt-4 font-serif text-title-editorial font-semibold text-primary-container">{s.t}</h3>
                <p className="mt-2 text-body-sm leading-6 text-on-surface-variant">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-surface-bright">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div><SectionHeading eyebrow="Industry Intake" title="Sector Breakdown" /><div className="mt-8">{stats?.sectorMix?.length ? <SectorBar data={stats.sectorMix} /> : <p className="text-body-sm text-on-surface-variant">Sector data coming soon.</p>}</div></div>
          <div><SectionHeading eyebrow="Our Recruiters" title="Where Our Graduates Work" /><div className="mt-8"><RecruiterWall recruiters={recruiters} /></div></div>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="section bg-surface">
          <div className="container-page">
            <SectionHeading eyebrow="Voices" title="Where Our Graduates Lead" align="center" />
            <div className="mt-12"><Testimonials items={testimonials} /></div>
          </div>
        </section>
      )}

      <section className="section bg-primary-container" id="recruit">
        <div className="container-page grid items-start gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading light eyebrow="For Corporate Partners" title="Initiate a Recruitment Partnership">
              Hire job-ready management and IT graduates. Reach the placement cell directly or send us an enquiry.
            </SectionHeading>
            {cell && (
              <div className="mt-6 space-y-1 text-body-sm text-surface-variant">
                {cell.phones.map((p) => <a key={p} href={telHref(p)} className="block transition-colors hover:text-tertiary-fixed">{p}</a>)}
                {settings.contact?.emails?.[1] && <a href={`mailto:${settings.contact.emails[1]}`} className="block transition-colors hover:text-tertiary-fixed">{settings.contact.emails[1]}</a>}
              </div>
            )}
          </div>
          <EnquiryForm source="placements" dark idPrefix="plc" submitLabel="Send Partnership Enquiry" />
        </div>
      </section>
    </>
  );
}
