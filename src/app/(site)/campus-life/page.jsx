import Link from 'next/link';
import { getCampus } from '@/lib/api';
import { getIcon } from '@/lib/icons';
import PageHero from '@/components/ui/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import Media from '@/components/ui/Media';

export const metadata = { title: 'Campus Life', description: 'Campus gallery, student clubs and facilities at Hierank Business School, Noida.' };

export default async function CampusLifePage() {
  const items = await getCampus();
  const by = (t) => items.filter((i) => i.type === t);
  const gallery = by('gallery'), clubs = by('club'), facilities = by('facility');
  return (
    <>
      <PageHero eyebrow="Campus Life & Student Experience" title="Learning Beyond the Classroom" crumbs={[{ label: 'Campus Life' }]}>A 2-acre Wi-Fi campus beside Sector-63 Metro Station, with clubs, cultural events, sports and industrial tours.</PageHero>

      {gallery.length > 0 && (
        <section className="section"><div className="container-page"><SectionHeading eyebrow="Campus Gallery" title="Life at Hierank" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{gallery.map((g) => <figure key={g._id} className="overflow-hidden rounded-card border border-navy/10 bg-white"><div className="h-60"><Media src={g.image} alt={g.title} label={g.title} /></div><figcaption className="p-5"><p className="font-serif text-lg font-semibold text-navy">{g.title}</p>{g.description && <p className="mt-1 text-sm text-muted">{g.description}</p>}</figcaption></figure>)}</div>
        </div></section>
      )}

      {clubs.length > 0 && (
        <section className="section bg-tint"><div className="container-page"><SectionHeading eyebrow="Student Clubs & Societies" title="Where Leadership Is Practised" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{clubs.map((c) => { const Icon = getIcon(c.icon); return <div key={c._id} className="card card-hover"><Icon className="h-7 w-7 text-gold-dark" /><h3 className="h-sm mt-4">{c.title}</h3><p className="mt-2 text-sm leading-6 text-muted">{c.description}</p></div>; })}</div>
        </div></section>
      )}

      {facilities.length > 0 && (
        <section className="section"><div className="container-page"><SectionHeading eyebrow="Facilities & Infrastructure" title="Everything You Need to Learn and Grow" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">{facilities.map((f) => { const Icon = getIcon(f.icon); return <div key={f._id} className="rounded-card border border-navy/10 bg-white p-6 text-center"><span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gold-soft text-gold-dark"><Icon className="h-6 w-6" /></span><h3 className="mt-4 font-serif text-base font-semibold text-navy">{f.title}</h3><p className="mt-1 text-xs leading-5 text-muted">{f.description}</p></div>; })}</div>
        </div></section>
      )}

      <section className="section bg-navy"><div className="container-page text-center"><h2 className="h-md !text-white">See it for yourself</h2><p className="mx-auto mt-3 max-w-xl text-white/70">Book a guided campus tour and meet our faculty and students.</p><Link href="/contact#tour" className="btn-gold mt-8">Book a Campus Tour</Link></div></section>
    </>
  );
}
