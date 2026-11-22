import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { formatDate } from '@/lib/format';
import Media from './Media';

export default function NewsCard({ item }) {
  return (
    <Link
      href={`/news/${item.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-outline-variant/40 bg-surface-container-lowest shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="h-32 overflow-hidden"><Media src={item.coverImage} alt={item.title} /></div>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex flex-wrap items-center gap-2 text-caption">
          <span className="chip capitalize">{item.category}</span>
          <time className="text-on-surface-variant" dateTime={item.publishedAt}>{formatDate(item.publishedAt)}</time>
        </div>
        <h3 className="font-serif text-title-editorial font-semibold leading-snug text-primary-container transition-colors group-hover:text-secondary">
          {item.title}
        </h3>
        {item.summary && <p className="mt-2 line-clamp-2 flex-1 text-body-sm leading-5 text-on-surface-variant">{item.summary}</p>}
        <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-secondary">
          Read story <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}
