import { getNews, getProgrammes } from '@/lib/api';

export default async function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const [programmes, news] = await Promise.all([getProgrammes(), getNews(undefined, 100)]);
  const staticPaths = ['', '/about', '/programmes', '/admissions', '/placements', '/faculty', '/campus-life', '/news', '/contact'];
  return [
    ...staticPaths.map((p) => ({ url: `${base}${p}`, changeFrequency: 'weekly', priority: p === '' ? 1 : 0.7 })),
    ...programmes.map((p) => ({ url: `${base}/programmes/${p.slug}`, changeFrequency: 'monthly', priority: 0.8 })),
    ...news.map((n) => ({ url: `${base}/news/${n.slug}`, lastModified: n.updatedAt, priority: 0.5 })),
  ];
}
