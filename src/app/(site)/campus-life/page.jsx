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
      <PageHero eyebrow="Campus Life & Student Experience" title="Learning Beyond the Classroom" crumbs={[{ label: 'Campus Life' }]}>
        A 2-acre Wi-Fi campus beside Sector-63 Metro Station, with clubs, cultural events, sports and industrial tours.
      </PageHero>

      {gallery.length > 0 && (
        <section className="section bg-surface-bright">
          <div className="container-page">
            <SectionHeading eyebrow="Campus Gallery" title="Life at Hierank" />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((g) => (
                <figure key={g._id} className="overflow-hidden rounded-2xl border border-outline-variant/40 bg-surface-container-lowest shadow-sm transition-all hover:shadow-lg">
                  <div className="h-60"><Media src={g.image} alt={g.title} label={g.title} /></div>
                  <figcaption className="p-5">
                    <p className="font-serif text-title-editorial font-semibold text-primary-container">{g.title}</p>
                    {g.description && <p className="mt-1 text-body-sm text-on-surface-variant">{g.description}</p>}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {clubs.length > 0 && (
        <section className="section bg-surface-container-low">
          <div className="container-page">
            <SectionHeading eyebrow="Student Clubs & Societies" title="Where Leadership Is Practised" />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {clubs.map((c) => {
                const Icon = getIcon(c.icon);
                return (
                  <div key={c._id} className="card card-hover">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container-lowest text-on-tertiary-container"><Icon className="h-6 w-6" /></span>
                    <h3 className="mt-4 font-serif text-title-editorial font-semibold text-primary-container">{c.title}</h3>
                    <p className="mt-2 text-body-sm leading-6 text-on-surface-variant">{c.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {facilities.length > 0 && (
        <section className="section bg-surface-bright">
          <div className="container-page">
            <SectionHeading eyebrow="Facilities & Infrastructure" title="Everything You Need to Learn and Grow" />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {facilities.map((f) => {
                const Icon = getIcon(f.icon);
                return (
                  <div key={f._id} className="rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-6 text-center shadow-sm transition-all hover:shadow-lg">
                    <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container-low text-on-tertiary-container"><Icon className="h-6 w-6" /></span>
                    <h3 className="mt-4 font-serif text-title-editorial font-semibold text-primary-container">{f.title}</h3>
                    <p className="mt-1 text-caption leading-5 text-on-surface-variant">{f.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="section bg-primary-container">
        <div className="container-page text-center">
          <h2 className="h-md !text-on-primary">See it for yourself</h2>
          <p className="mx-auto mt-3 max-w-xl text-body-md text-surface-variant">Book a guided campus tour and meet our faculty and students.</p>
          <Link href="/contact#tour" className="btn-gold mt-8">Book a Campus Tour</Link>
        </div>
      </section>
    </>
  );
}
