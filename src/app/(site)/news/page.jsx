import Link from 'next/link';
import clsx from 'clsx';
import { getNews } from '@/lib/api';
import PageHero from '@/components/ui/PageHero';
import NewsCard from '@/components/ui/NewsCard';
import EmptyState from '@/components/ui/EmptyState';

export const metadata = { title: 'News & Events', description: 'Latest news, events, workshops and notices from Hierank Business School.' };
const CATS = [['', 'All'], ['news', 'News'], ['event', 'Events'], ['workshop', 'Workshops'], ['placement', 'Placements'], ['notice', 'Notices']];

export default async function NewsPage({ searchParams }) {
  const category = searchParams?.category || '';
  const items = await getNews(category, 30);
  return (
    <>
      <PageHero eyebrow="News & Events" title="What’s Happening at HBS" crumbs={[{ label: 'News' }]}>Recruitment drives, competitions, workshops and campus celebrations.</PageHero>
      <section className="section">
        <div className="container-page">
          <div className="mb-10 flex flex-wrap gap-2">
            {CATS.map(([v, l]) => <Link key={l} href={v ? `/news?category=${v}` : '/news'} className={clsx('rounded-full px-4 py-2 text-sm font-semibold transition', category === v ? 'bg-navy text-white' : 'bg-tint text-navy hover:bg-tint-2')}>{l}</Link>)}
          </div>
          {items.length ? <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{items.map((n) => <NewsCard key={n._id} item={n} />)}</div> : <EmptyState title="No posts yet">Check back soon for updates.</EmptyState>}
        </div>
      </section>
    </>
  );
}
