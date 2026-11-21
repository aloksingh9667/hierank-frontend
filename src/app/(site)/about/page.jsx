import Link from 'next/link';
import { Award, Landmark, Scale, Globe, ShieldCheck, Lightbulb, BookOpen, ArrowRight } from 'lucide-react';
import { getFaculty, getSettings } from '@/lib/api';
import { yearsSince } from '@/lib/format';
import PageHero from '@/components/ui/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import Metric from '@/components/ui/Metric';
import Media from '@/components/ui/Media';

export const metadata = { title: 'About Us', description: 'About Hierank Business School, Noida — established 2006 by Prof. Rajesh Sahay under the ABR Education Foundation.' };

const ACCREDITATIONS = [
  { icon: Award, t: 'AICTE Approved', d: 'Approved by the All India Council for Technical Education, Ministry of Education, Govt. of India.' },
  { icon: Landmark, t: 'Dr. A.P.J. Abdul Kalam Technical University', d: 'MBA and MCA programmes affiliated to AKTU, Lucknow (College Code 733).' },
  { icon: Scale, t: 'CCS University, Meerut', d: 'BBA and BCA programmes affiliated to CCSU, Meerut (College Code 879) and approved under UGC.' },
];
const PILLARS = [
  { icon: BookOpen, t: 'Scholarly Rigour', d: 'Case-based, discussion-led learning grounded in strong fundamentals.' },
  { icon: ShieldCheck, t: 'Ethical Leadership', d: 'Accountability and integrity as the base of every career.' },
  { icon: Globe, t: 'Global Outlook', d: 'Exposure to industry practice across the NCR and beyond.' },
  { icon: Lightbulb, t: 'Applied Innovation', d: 'Live projects, internships and competitions that put ideas to work.' },
];

export default async function AboutPage() {
  const [faculty, settings] = await Promise.all([getFaculty(), getSettings()]);
  const leaders = faculty.filter((f) => f.isLeadership);
  const inst = settings.institute || {};
  return (
    <>
      <PageHero eyebrow="About Hierank Business School" title="A Legacy of Academic Distinction" crumbs={[{ label: 'About' }]}>
        Established in {inst.established || 2006}, HBS is an integrated campus in Noida preparing managers and technologists for the NCR’s corporate ecosystem.
      </PageHero>

      <section className="section">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Our Story" title="Shaping Management and Technology Talent" />
            <div className="mt-6 space-y-4 leading-7 text-ink/80">
              <p>Hierank Business School was founded in {inst.established || 2006} by Prof. Rajesh Sahay, formerly Director at Amity University. All undergraduate and postgraduate programmes run under the umbrella of the ABR Education Foundation, a non-profit body formed by leading academicians and industrialists.</p>
              <p>Located in the Institutional Area of Sector 62, Noida — adjoining South Delhi and about 40 km from Gurgaon — the campus offers ample scope for industry–academia partnership and placement opportunities.</p>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-6">
              <Metric value={`${yearsSince(inst.established)}+`} label="Years of legacy" />
              <Metric value={`${inst.campusAcres || 2}-acre`} label="Wi-Fi campus" />
              <Metric value="4" label="Programmes" />
            </div>
          </div>
          <div className="h-[380px] overflow-hidden rounded-[20px] shadow-modal"><Media label="Sector 62, Noida" alt="HBS campus" /></div>
        </div>
      </section>

      <section className="section bg-tint">
        <div className="container-page">
          <SectionHeading eyebrow="Accreditations & Affiliations" title="Recognised and Affiliated" align="center" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {ACCREDITATIONS.map((a) => <div key={a.t} className="card"><a.icon className="h-8 w-8 text-gold-dark" /><h3 className="h-sm mt-4">{a.t}</h3><p className="mt-2 text-sm leading-6 text-muted">{a.d}</p></div>)}
          </div>
        </div>
      </section>

      {leaders.length > 0 && (
        <section className="section">
          <div className="container-page">
            <div className="flex flex-wrap items-end justify-between gap-4"><SectionHeading eyebrow="Leadership" title="Academic Leadership" /><Link href="/faculty" className="link-arrow">Meet all faculty <ArrowRight className="h-4 w-4" /></Link></div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {leaders.map((l) => (
                <div key={l._id} className="card card-hover">
                  <div className="mb-4 h-48 overflow-hidden rounded-xl"><Media src={l.photo} alt={l.name} /></div>
                  <h3 className="font-serif text-lg font-semibold text-navy">{l.name}</h3><p className="text-sm font-semibold text-gold-dark">{l.designation}</p>
                  {l.qualification && <p className="mt-2 text-xs leading-5 text-muted">{l.qualification}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section bg-navy">
        <div className="container-page">
          <SectionHeading light eyebrow="Our Values" title="Four Pillars of Hierank Education" align="center" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p) => <div key={p.t} className="rounded-card border border-white/10 bg-white/5 p-7"><p.icon className="h-8 w-8 text-gold" /><h3 className="mt-4 font-serif text-xl text-white">{p.t}</h3><p className="mt-2 text-sm leading-6 text-white/70">{p.d}</p></div>)}
          </div>
        </div>
      </section>

      <section className="section"><div className="container-page text-center"><h2 className="h-md">Experience Hierank in person</h2><p className="lead mx-auto mt-3 max-w-xl">Walk the campus, meet faculty and see our classrooms and labs.</p><Link href="/contact#tour" className="btn-primary mt-8">Book a Campus Tour</Link></div></section>
    </>
  );
}
