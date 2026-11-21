import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function PageHero({ eyebrow, title, children, crumbs = [], actions }) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: 'repeating-linear-gradient(135deg, #C5A46D 0, #C5A46D 1px, transparent 1px, transparent 22px)' }}
      />
      <div className="container-page relative py-14 md:py-20">
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-white/60">
          <Link href="/" className="hover:text-gold">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-1.5">
              <ChevronRight className="h-3 w-3" />
              {c.href ? <Link href={c.href} className="hover:text-gold">{c.label}</Link> : <span className="text-white/90">{c.label}</span>}
            </span>
          ))}
        </nav>
        {eyebrow && <p className="eyebrow mb-3 !text-gold">{eyebrow}</p>}
        <h1 className="h-display max-w-4xl !text-white">{title}</h1>
        {children && <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 md:text-lg md:leading-8">{children}</p>}
        {actions && <div className="mt-8 flex flex-wrap gap-4">{actions}</div>}
      </div>
    </section>
  );
}
