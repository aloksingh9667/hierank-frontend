import Link from 'next/link';
import { ArrowRight, BadgeCheck, Building2, Download, Handshake, Landmark, MapPin, ShieldCheck, TrainFront, Users, Briefcase, BookOpen } from 'lucide-react';
import { getCampus, getNews, getPlacementStats, getProgrammes, getRecruiters, getSettings, getTestimonials } from '@/lib/api';
import { yearsSince } from '@/lib/format';
import Media from '@/components/ui/Media';
import Metric from '@/components/ui/Metric';
import SectionHeading from '@/components/ui/SectionHeading';
import ProgrammeShowcase from '@/components/home/ProgrammeShowcase';
import SectorBar from '@/components/ui/SectorBar';
import RecruiterWall from '@/components/ui/RecruiterWall';
import Testimonials from '@/components/ui/Testimonials';
import NewsCard from '@/components/ui/NewsCard';
import EnquiryForm from '@/components/forms/EnquiryForm';
import EmptyState from '@/components/ui/EmptyState';

export const metadata = { title: { absolute: 'Hierank Business School, Noida — MBA, MCA, BBA, BCA | Admissions Open 2026' } };

const ADVANTAGES = [
  { icon: MapPin, title: 'Prime NCR location', text: 'A 2-acre Wi-Fi campus in Sector 62, Noida’s institutional hub, beside Sector-63 Metro Station.' },
  { icon: Briefcase, title: 'Industry-integrated learning', text: 'Industry visits, guest lectures, live projects and internships woven into every course.' },
  { icon: Handshake, title: 'Dedicated placement cell', text: 'Year-round training, mock interviews and recruitment drives with leading corporates.' },
  { icon: Users, title: 'Distinguished faculty', text: 'Learn from academicians with IIM, IIT and corporate leadership backgrounds.' },
];

const STEPS = ['Online application', 'Aptitude / academic evaluation', 'Personal interview & GD', 'Letter of acceptance & enrolment'];

export default async function HomePage() {
  const [programmes, stats, recruiters, testimonials, news, campus, settings] = await Promise.all([
    getProgrammes(), getPlacementStats(), getRecruiters(), getTestimonials(), getNews(undefined, 3), getCampus('gallery'), getSettings(),
  ]);
  const years = yearsSince(settings.institute?.established);
  const codes = programmes.map((p) => p.code);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-canvas pb-16 pt-10 md:pb-24 md:pt-16">
        <div className="container-page grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="mb-8 inline-flex items-center gap-2.5 rounded-full bg-tint px-4 py-1.5">
              <span className="h-2 w-2 animate-pulse rounded-full bg-gold" />
              <span className="text-[12px] font-bold uppercase tracking-eyebrow text-royal">Admissions Open 2026</span>
              <span className="hidden text-xs text-muted sm:inline">MBA · MCA · BBA · BCA</span>
            </div>
            <h1 className="h-display text-balance">
              Cultivating Visionary <em className="font-medium text-royal">Business Leaders</em> for a Borderless Economy.
            </h1>
            <p className="lead mt-6 max-w-2xl">
              Rooted in academic rigour and corporate exposure, Hierank Business School in Noida has shaped managers and technologists since {settings.institute?.established || 2006} — with industry-led learning and a placement cell that works all year.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/programmes" className="btn-primary">Explore Programmes <ArrowRight className="h-4 w-4" /></Link>
              <a href={settings.links?.eBrochure || '#'} target="_blank" rel="noreferrer" className="btn-secondary"><Download className="h-4 w-4" /> Download e-Brochure</a>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-ink/80">
              <li className="flex items-center gap-2"><BadgeCheck className="h-5 w-5 text-gold" />AICTE approved</li>
              <li className="flex items-center gap-2"><Landmark className="h-5 w-5 text-gold" />UGC & university affiliated</li>
              <li className="flex items-center gap-2"><TrainFront className="h-5 w-5 text-gold" />Next to Sector-63 Metro</li>
            </ul>
          </div>
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-[20px] shadow-modal">
              <div className="h-[420px] md:h-[500px]"><Media label="Learning that leads to leadership" alt="Hierank Business School campus" /></div>
              <div className="absolute inset-x-5 bottom-5 flex items-center gap-4 rounded-card bg-white/95 p-4 shadow-card backdrop-blur">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy text-gold"><ShieldCheck className="h-5 w-5" /></span>
                <div>
                  <p className="text-sm font-bold text-navy">Super 60 Batch</p>
                  <p className="text-xs text-muted">A focused corporate-readiness batch for Fortune 500 opportunities.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section className="bg-navy py-14" aria-label="Institute highlights">
        <div className="container-page grid grid-cols-2 gap-8 lg:grid-cols-4">
          <Metric dark value={`${years}+`} label="Years of academic distinction" />
          <Metric dark value={stats?.studentsPlaced ? `${stats.studentsPlaced}+` : '500+'} label="Students placed" />
          <Metric dark value={stats?.hiringPartners ? `${stats.hiringPartners}+` : '108+'} label="Hiring partners" />
          <Metric dark value={stats?.highestPackageLPA ? `₹${stats.highestPackageLPA} LPA` : '₹18 LPA'} label="Highest package" />
        </div>
      </section>

      {/* ABOUT */}
      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading eyebrow="Institutional Overview" title="Shaping the Architects of Modern Commerce">
              Hierank Business School is an integrated campus approved by AICTE, with MBA and MCA affiliated to Dr. A.P.J. Abdul Kalam Technical University and BBA and BCA affiliated to CCS University, Meerut.
            </SectionHeading>
            <p className="mt-5 text-ink/80 leading-7">
              Run under the ABR Education Foundation — a non-profit body formed by academicians and industrialists — HBS sits inside the National Capital Region, close to the corporate and IT hubs of Noida and Gurgaon.
            </p>
            <Link href="/about" className="link-arrow mt-6">Discover our story <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-6">
            {[
              { icon: BookOpen, t: 'Future-ready professionals', d: 'Industry visits, guest lectures and live projects prepare students for real-world challenges.' },
              { icon: Building2, t: 'Holistic development', d: 'Clubs, cultural activities and sports build leadership beyond the classroom.' },
            ].map((f) => (
              <div key={f.t} className="card card-hover">
                <f.icon className="h-7 w-7 text-gold-dark" />
                <h3 className="h-sm mt-4">{f.t}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMMES */}
      <section className="section bg-white">
        <div className="container-page">
          <SectionHeading eyebrow="Academic Excellence" title="Distinguished Management & Computing Programmes" />
          <div className="mt-10">
            {programmes.length ? <ProgrammeShowcase programmes={programmes} /> : <EmptyState title="Programmes are loading">Start the API server to see live programme data.</EmptyState>}
          </div>
        </div>
      </section>

      {/* ADVANTAGE */}
      <section className="section">
        <div className="container-page">
          <SectionHeading eyebrow="The Hierank Advantage" title="Built for Modern Velocity" align="center" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ADVANTAGES.map((a) => (
              <div key={a.title} className="card card-hover">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-soft text-gold-dark"><a.icon className="h-6 w-6" /></span>
                <h3 className="h-sm mt-5">{a.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAMPUS */}
      {campus.length > 0 && (
        <section className="section bg-tint">
          <div className="container-page">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading eyebrow="Campus Life" title="Spaces Conceived for Intellectual Exchange" />
              <Link href="/campus-life" className="link-arrow">Explore campus life <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:grid-rows-2">
              {campus.slice(0, 5).map((c, i) => (
                <div key={c._id} className={`overflow-hidden rounded-card ${i === 0 ? 'col-span-2 row-span-2 h-72 md:h-[420px]' : 'h-36 md:h-[202px]'}`}>
                  <Media src={c.image} alt={c.title} label={c.title} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PLACEMENTS */}
      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Career Outcomes" title="Corporate Resource Centre & Placement Outcomes">
              Integrated internships, live projects and regular industry interaction connect classroom learning to career outcomes.
            </SectionHeading>
            <div className="mt-8 grid grid-cols-2 gap-6">
              <Metric value={stats ? `₹${stats.averagePackageLPA} LPA` : '₹5 LPA'} label="Average package" />
              <Metric value={stats ? `₹${stats.highestPackageLPA} LPA` : '₹18 LPA'} label="Highest package" />
            </div>
            <Link href="/placements" className="link-arrow mt-8">View placement report <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="card">
            <h3 className="h-sm mb-5">Recruitment sector mix {stats?.academicYear && <span className="text-sm font-normal text-muted">({stats.academicYear})</span>}</h3>
            {stats?.sectorMix?.length ? <SectorBar data={stats.sectorMix} /> : <p className="text-sm text-muted">Sector data will appear here.</p>}
          </div>
        </div>
        {recruiters.length > 0 && <div className="container-page mt-12"><p className="eyebrow mb-4">Prominent recruiters</p><RecruiterWall recruiters={recruiters.slice(0, 12)} /></div>}
      </section>

      {/* TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="section bg-white">
          <div className="container-page">
            <SectionHeading eyebrow="Voices" title="Voices from the Corporate Frontlines" align="center" />
            <div className="mt-12"><Testimonials items={testimonials} /></div>
          </div>
        </section>
      )}

      {/* NEWS */}
      {news.length > 0 && (
        <section className="section">
          <div className="container-page">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading eyebrow="Latest" title="News & Events" />
              <Link href="/news" className="link-arrow">All news <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">{news.map((n) => <NewsCard key={n._id} item={n} />)}</div>
          </div>
        </section>
      )}

      {/* ADMISSIONS CTA */}
      <section className="bg-navy py-16 md:py-24" id="enquire">
        <div className="container-page grid items-start gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading light eyebrow="Admissions 2026" title="Begin Your Leadership Journey">
              Share your details and our admissions council will guide you through programmes, eligibility and scholarships.
            </SectionHeading>
            <ol className="mt-8 space-y-4">
              {STEPS.map((s, i) => (
                <li key={s} className="flex items-center gap-4 text-white/90">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold font-serif text-gold">{i + 1}</span>{s}
                </li>
              ))}
            </ol>
          </div>
          <EnquiryForm source="home" dark programmes={codes.length ? codes : undefined} idPrefix="home" />
        </div>
      </section>
    </>
  );
}
