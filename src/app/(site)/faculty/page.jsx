import { getFaculty } from '@/lib/api';
import PageHero from '@/components/ui/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import Media from '@/components/ui/Media';
import EmptyState from '@/components/ui/EmptyState';

export const metadata = { title: 'Faculty', description: 'Meet the leadership and faculty of Hierank Business School, Noida.' };

function Person({ f }) {
  return (
    <article className="card card-hover">
      <div className="mb-4 h-52 overflow-hidden rounded-xl"><Media src={f.photo} alt={f.name} /></div>
      <h3 className="font-serif text-title-editorial font-semibold text-primary-container">{f.name}</h3>
      <p className="text-body-sm font-semibold text-on-tertiary-container">{f.designation}</p>
      {f.qualification && <p className="mt-2 text-caption leading-5 text-on-surface-variant">{f.qualification}</p>}
    </article>
  );
}

export default async function FacultyPage() {
  const faculty = await getFaculty();
  const leaders = faculty.filter((f) => f.isLeadership);
  const others = faculty.filter((f) => !f.isLeadership);
  return (
    <>
      <PageHero eyebrow="Faculty Members" title="Educators with Industry Depth" crumbs={[{ label: 'Faculty' }]}>
        Academicians and practitioners from IITs, IIMs and the corporate world mentor every HBS cohort.
      </PageHero>
      <section className="section bg-surface-bright">
        <div className="container-page space-y-16">
          {!faculty.length && <EmptyState title="Faculty list unavailable" />}
          {leaders.length > 0 && (
            <div>
              <SectionHeading eyebrow="Leadership" title="Academic Leadership" />
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{leaders.map((f) => <Person key={f._id} f={f} />)}</div>
            </div>
          )}
          {others.length > 0 && (
            <div>
              <SectionHeading eyebrow="Faculty" title="Teaching Faculty" />
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{others.map((f) => <Person key={f._id} f={f} />)}</div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
