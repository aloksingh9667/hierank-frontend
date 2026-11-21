import Link from 'next/link';
import { formatDate } from '@/lib/format';
import Media from './Media';

export default function NewsCard({ item }) {
  return (
    <Link href={`/news/${item.slug}`} className="card card-hover group flex h-full flex-col !p-0 overflow-hidden">
      <div className="h-44"><Media src={item.coverImage} alt={item.title} /></div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-3 text-xs">
          <span className="chip capitalize">{item.category}</span>
          <time className="text-muted" dateTime={item.publishedAt}>{formatDate(item.publishedAt)}</time>
        </div>
        <h3 className="font-serif text-lg font-semibold leading-snug text-navy group-hover:text-royal">{item.title}</h3>
        {item.summary && <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">{item.summary}</p>}
      </div>
    </Link>
  );
}
