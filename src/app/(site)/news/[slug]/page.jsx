import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar } from 'lucide-react';
import { getNewsItem } from '@/lib/api';
import { formatDate } from '@/lib/format';
import PageHero from '@/components/ui/PageHero';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const n = await getNewsItem(slug);
  return n ? { title: n.title, description: n.summary } : { title: 'News' };
}

export default async function NewsDetail({ params }) {
  const { slug } = await params;
  const n = await getNewsItem(slug);
  if (!n) notFound();
  return (
    <>
      <PageHero eyebrow={n.category} title={n.title} crumbs={[{ label: 'News', href: '/news' }, { label: 'Article' }]} />
      <article className="section bg-surface-bright">
        <div className="container-page max-w-3xl">
          <p className="mb-8 flex items-center gap-2 text-body-sm text-on-surface-variant">
            <Calendar className="h-4 w-4 text-on-tertiary-container" />
            Published {formatDate(n.publishedAt)}{n.eventDate && ` · Event date: ${formatDate(n.eventDate)}`}
          </p>
          {n.coverImage && <img src={n.coverImage} alt={n.title} className="mb-8 w-full rounded-2xl shadow-sm" />}
          <div className="space-y-5 text-body-lg leading-8 text-on-surface-variant">
            {(n.content || n.summary || '').split(/\n{2,}/).map((para, i) => <p key={i}>{para}</p>)}
          </div>
          <Link href="/news" className="link-arrow mt-10"><ArrowLeft className="h-4 w-4" />Back to all news</Link>
        </div>
      </article>
    </>
  );
}
