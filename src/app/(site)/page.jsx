import Link from 'next/link';
import {
  ArrowRight, BadgeCheck, Building2, Download, Handshake, Landmark, MapPin,
  ShieldCheck, TrainFront, Users, Briefcase, BookOpen, Star,
} from 'lucide-react';
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

const PILLARS = [
  { icon: Users, title: '1-on-1 Executive Mentorship', text: 'Every admitted candidate is paired with an industry director who guides career pathing, corporate readiness and executive presence.' },
  { icon: BookOpen, title: 'Contemporary Living Syllabus', text: 'Audited biannually by an Academic Advisory Council to integrate real-world shifts — GenAI for marketing, analytics and circular economics.' },
  { icon: Building2, title: 'Analytics & FinTech Sandbox', text: 'Enterprise simulation terminals, computing laboratories and market-simulation environments for hands-on analytical execution.' },
  { icon: Handshake, title: 'Holistic Executive Finishing', text: 'Mandatory modules in boardroom negotiation, keynote rhetoric, corporate protocol and conversational foreign-language electives.' },
];

const STEPS = [
  { title: 'Submit application dossier', text: 'Complete the digital enrolment profile with graduation transcripts and national test scores.' },
  { title: 'Shortlisting & score evaluation', text: 'Valid scores accepted across CAT, MAT, CMAT, XAT and university entrance metrics.' },
  { title: 'Written ability & faculty interview', text: 'A structured case dialogue with senior professors to evaluate reasoning competencies.' },
  { title: 'Merit offer & matriculation', text: 'Final selection letter issued along with corporate scholarship allocations where applicable.' },
];

export default async function HomePage() {
  const [programmes, stats, recruiters, testimonials, news, campus, settings] = await Promise.all([
    getProgrammes(), getPlacementStats(), getRecruiters(), getTestimonials(), getNews(undefined, 3), getCampus('gallery'), getSettings(),
  ]);
  const years = yearsSince(settings.institute?.established);
  const codes = programmes.map((p) => p.code);
  const heroImage = campus[0]?.image;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-surface pb-8 pt-4 lg:pb-12 lg:pt-6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: 'radial-gradient(45% 55% at 92% 0%, rgba(197,164,109,0.14) 0%, transparent 60%)' }}
        />
        <div className="container-page relative grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-container-low px-3 py-1">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-tertiary-fixed-dim" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-secondary">Admissions Cohort 2026–27</span>
              </span>
              <span className="rounded-full border border-outline-variant/50 px-3 py-1 text-[11px] font-medium text-on-surface-variant">
                Round 2 deadline approaching
              </span>
            </div>
            <h1 className="h-display text-balance">
              Cultivating Visionary <em className="font-medium not-italic text-secondary">Business Leaders</em> for a Borderless Economy.
            </h1>
            <p className="lead mt-3 max-w-2xl">
              Rooted in academic rigour and real-world executive velocity, Hierank Business School delivers transformative
              postgraduate education — bridging empirical industry practice with international managerial leadership.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/programmes" className="btn-primary">Explore Academic Programmes <ArrowRight className="h-4 w-4" /></Link>
              <a href={settings.links?.eBrochure || '#'} target="_blank" rel="noreferrer" className="btn-secondary">
                <Download className="h-4 w-4" /> Download Prospectus
              </a>
            </div>
            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-body-sm text-on-surface-variant">
              <li className="flex items-center gap-1.5"><BadgeCheck className="h-4 w-4 text-on-tertiary-container" />AICTE Recognized</li>
              <li className="flex items-center gap-1.5"><Landmark className="h-4 w-4 text-on-tertiary-container" />UGC &amp; University Affiliated</li>
              <li className="flex items-center gap-1.5"><TrainFront className="h-4 w-4 text-on-tertiary-container" />Beside Sector-63 Metro</li>
            </ul>
          </div>
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-xl shadow-modal">
              <div className="h-[280px] md:h-[350px]">
                <Media src={heroImage} alt="Hierank Business School campus" />
              </div>
              <div className="absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-lg bg-surface-container-lowest/95 p-3 shadow-card backdrop-blur">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-container text-tertiary-fixed">
                  <Star className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-body-sm font-bold text-primary-container">Top-Tier Business Leadership Academy</p>
                  <p className="mt-0.5 text-caption text-on-surface-variant">Ranked among NCR&apos;s premier postgraduate management institutions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section className="bg-primary-container py-6 md:py-8 text-on-primary" aria-label="Institute highlights">
        <div className="container-page grid grid-cols-2 gap-6 lg:grid-cols-4">
          <Metric dark value={`${years}+`} label="Years of academic distinction" caption={`Established ${settings.institute?.established || 2006}, pioneering rigorous corporate curriculum models in NCR.`} />
          <Metric dark value="100%" label="Placement assistance" caption="Continuous corporate interface with paid internships and pre-placement pathways." />
          <Metric dark value={stats?.hiringPartners ? `${stats.hiringPartners}+` : '250+'} label="Corporate recruiters" caption="From Fortune 500 multinationals to high-growth tech ventures and consultancies." />
          <Metric dark value={stats?.studentsPlaced ? `${stats.studentsPlaced}+` : '5,000+'} label="Global alumni" caption="Represented across leadership and executive suites in over 24 countries." />
        </div>
      </section>

      {/* ABOUT */}
      <section className="section bg-surface-bright">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading eyebrow="Foundational Purpose" title="Shaping the Architects of Modern Commerce">
              At Hierank Business School, business education transcends conventional lecturing. Situated in the institutional
              epicentre of Noida&apos;s Knowledge Park, our pedagogy integrates case methodologies with experiential live corporate labs.
            </SectionHeading>
            <p className="mt-5 text-body-md leading-7 text-on-surface-variant">
              We prepare postgraduate scholars to synthesise complex financial environments, lead digital transformations, and
              exercise decisive ethical governance in high-stakes global markets. Run under the ABR Education Foundation — a
              non-profit body formed by academicians and industrialists — HBS sits inside the National Capital Region, close to
              the corporate and IT hubs of Noida and Gurgaon.
            </p>
            <Link href="/about" className="link-arrow mt-6">Discover our story <ArrowRight className="h-4 w-4" /></Link>
            <div className="mt-10 grid grid-cols-2 gap-6">
              <div className="border-t-2 border-tertiary-fixed-dim pt-4">
                <p className="font-serif text-headline-md text-primary-container">1:12</p>
                <p className="mt-1 text-body-sm text-on-surface-variant">Faculty to scholar mentorship ratio</p>
              </div>
              <div className="border-t-2 border-tertiary-fixed-dim pt-4">
                <p className="font-serif text-headline-md text-primary-container">40%</p>
                <p className="mt-1 text-body-sm text-on-surface-variant">Visiting senior industry C-suite practitioners</p>
              </div>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-6">
            {[
              { icon: BookOpen, t: 'Empirical Case-Study Pedagogy', d: 'Scholars dissect over 120+ peer-reviewed business cases spanning global supply disruptions, corporate M&A strategies and algorithmic product positioning.' },
              { icon: Briefcase, t: 'Global Executive Leadership Forum', d: 'Weekly closed-door masterclasses and executive fireside dialogues with managing directors, chief risk officers and high-impact founders.' },
              { icon: ShieldCheck, t: 'Hierank Venture Incubation Wing', d: 'A dedicated venture seed studio connecting student founders with angel networks, legal counsel and go-to-market acceleration mentors.' },
              { icon: MapPin, t: 'Prime NCR Location', d: 'A two-acre Wi-Fi campus in Sector 62, Noida — beside Sector-63 Metro Station and minutes from the NCR corporate corridor.' },
            ].map((f) => (
              <div key={f.t} className="card card-hover">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container-low text-on-tertiary-container">
                  <f.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-serif text-title-editorial font-semibold text-primary-container">{f.t}</h3>
                <p className="mt-2 text-body-sm leading-6 text-on-surface-variant">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMMES */}
      <section className="section bg-surface-container-low">
        <div className="container-page">
          <SectionHeading eyebrow="Academic Excellence" title="Distinguished Management Programmes">
            University-affiliated curricula, industry-audited modules and immersive corporate exposure across every programme.
          </SectionHeading>
          <div className="mt-10">
            {programmes.length ? <ProgrammeShowcase programmes={programmes} /> : <EmptyState title="Programmes are loading">Start the API server to see live programme data.</EmptyState>}
          </div>
        </div>
      </section>

      {/* ADVANTAGE */}
      <section className="section bg-surface-bright">
        <div className="container-page">
          <SectionHeading eyebrow="Institutional Edge" title="The Hierank Advantage: Built for Modern Velocity" align="center" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((a, i) => (
              <div key={a.title} className="relative rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-7 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">
                <span className="absolute right-6 top-6 text-label-prestige-eyebrow uppercase tracking-wider text-outline">Pillar {String(i + 1).padStart(2, '0')}</span>
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container-low text-on-tertiary-container">
                  <a.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-serif text-title-editorial font-semibold text-primary-container">{a.title}</h3>
                <p className="mt-2 text-body-sm leading-6 text-on-surface-variant">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAMPUS */}
      {campus.length > 0 && (
        <section className="section bg-surface-container-lowest">
          <div className="container-page">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading eyebrow="Campus Ecosystem" title="Spaces Conceived for Intellectual Exchange">
                Surrounded by green lawns and world-class institutional infrastructure in NCR&apos;s prime education hub.
              </SectionHeading>
              <Link href="/campus-life" className="link-arrow">Explore campus life <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2">
              {campus.slice(0, 5).map((c, i) => (
                <div key={c._id} className={`overflow-hidden rounded-lg ${i === 0 ? 'col-span-2 row-span-2 h-48 md:h-[280px]' : 'h-24 md:h-[135px]'}`}>
                  <Media src={c.image} alt={c.title} label={c.title} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PLACEMENTS */}
      <section className="section bg-surface-container-low">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Career Trajectory" title="Corporate Resource Centre & Placement Outcomes">
              Our dedicated Corporate Resource Centre orchestrates round-the-year industry engagements, summer internships,
              mock panel assessments with hiring heads and campus drives.
            </SectionHeading>
            <div className="mt-8 grid grid-cols-2 gap-6">
              <Metric value={stats ? `₹${stats.averagePackageLPA} LPA` : '₹5 LPA'} label="Average package" />
              <Metric value={stats ? `₹${stats.highestPackageLPA} LPA` : '₹18 LPA'} label="Highest package" />
            </div>
            <Link href="/placements" className="link-arrow mt-8">View placement report <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-7 shadow-sm">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-outline-variant/40 pb-5">
              <div>
                <p className="text-label-prestige-eyebrow uppercase tracking-wider text-on-surface-variant">Average CTC surge</p>
                <p className="mt-1 font-serif text-headline-lg text-primary-container">+28%</p>
              </div>
              <p className="max-w-[16rem] text-caption text-on-surface-variant">Year-over-year compensation increment for recent cohorts</p>
            </div>
            <h3 className="mt-5 font-serif text-title-editorial font-semibold text-primary-container">
              Dominant recruitment sectors {stats?.academicYear && <span className="text-body-sm font-normal text-on-surface-variant">({stats.academicYear})</span>}
            </h3>
            <div className="mt-4">
              {stats?.sectorMix?.length ? <SectorBar data={stats.sectorMix} /> : <p className="text-body-sm text-on-surface-variant">Sector data will appear here.</p>}
            </div>
          </div>
        </div>
        {recruiters.length > 0 && (
          <div className="container-page mt-12">
            <p className="eyebrow mb-4">Prominent recruiters</p>
            <RecruiterWall recruiters={recruiters.slice(0, 12)} />
          </div>
        )}
      </section>

      {/* TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="section bg-surface">
          <div className="container-page">
            <SectionHeading eyebrow="Alumni Impact" title="Voices from the Global Corporate Frontlines" align="center">
              Hierank graduates are driving sustainable change, navigating corporate transformation and scaling enterprises across continents.
            </SectionHeading>
            <div className="mt-12"><Testimonials items={testimonials} /></div>
          </div>
        </section>
      )}

      {/* NEWS */}
      {news.length > 0 && (
        <section className="section bg-surface-container-lowest">
          <div className="container-page">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading eyebrow="Latest" title="News &amp; Events" />
              <Link href="/news" className="link-arrow">All news <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">{news.map((n) => <NewsCard key={n._id} item={n} />)}</div>
          </div>
        </section>
      )}

      {/* ADMISSIONS CTA */}
      <section className="section bg-surface-bright" id="enquire">
        <div className="container-page grid items-start gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Enrolment Process" title="Begin Your Leadership Journey">
              Admissions into Hierank cohorts follow a holistic evaluation philosophy assessing scholastic background, critical
              thinking capacity, leadership attitude and communication agility.
            </SectionHeading>
            <ol className="mt-8 space-y-6">
              {STEPS.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-tertiary-fixed-dim bg-surface-container-lowest font-serif text-body-sm font-semibold text-primary-container">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="text-label-prominent font-bold text-primary-container">{s.title}</p>
                    <p className="mt-1 text-body-sm text-on-surface-variant">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-8 rounded-xl border border-outline-variant/40 bg-surface-container-lowest p-5">
              <p className="text-label-prominent font-bold text-primary-container">Admissions Advisory Office</p>
              <p className="mt-1 text-body-sm text-on-surface-variant">Need personalised guidance on specialisation eligibility or scholarship criteria?</p>
              <p className="mt-3 text-body-sm text-on-surface-variant">
                Direct hotline: <a href={`tel:${(settings.contact?.helpline || '+91-9650848777').replace(/[^\d+]/g, '')}`} className="font-semibold text-secondary">{settings.contact?.helpline || '+91-9650848777'}</a>
              </p>
            </div>
          </div>
          <div>
            <div className="mb-5">
              <h3 className="font-serif text-headline-sm text-primary-container">Candidate Admission Dossier</h3>
              <p className="mt-2 text-body-sm text-on-surface-variant">Register for prospective evaluation, campus tours and receive the official prospectus.</p>
            </div>
            <EnquiryForm source="home" programmes={codes.length ? codes : undefined} idPrefix="home" submitLabel="Submit Admission Dossier & Download Brochure" />
          </div>
        </div>
      </section>
    </>
  );
}
