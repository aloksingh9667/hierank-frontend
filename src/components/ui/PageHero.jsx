import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import clsx from 'clsx';

export default function PageHero({ eyebrow, title, children, crumbs = [], actions, dark = false }) {
  return (
    <section className={clsx('relative w-full overflow-hidden', dark ? 'bg-primary-container text-on-primary' : 'bg-surface-container-low')}>
      {/* Decorative tonal wash, matching the Stitch hero backgrounds */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: dark
            ? 'radial-gradient(60% 80% at 85% 10%, rgba(197,164,109,0.16) 0%, transparent 60%)'
            : 'radial-gradient(55% 70% at 90% 0%, rgba(197,164,109,0.16) 0%, transparent 62%), radial-gradient(40% 60% at 0% 100%, rgba(56,95,149,0.08) 0%, transparent 60%)',
        }}
      />
      <div className="container-page relative py-12 md:py-16 lg:py-20">
        <nav aria-label="Breadcrumb" className={clsx('mb-6 flex flex-wrap items-center gap-2 text-label-prestige-eyebrow uppercase tracking-widest', dark ? 'text-surface-variant' : 'text-outline')}>
          <Link href="/" className={clsx('transition-colors', dark ? 'hover:text-tertiary-fixed-dim' : 'hover:text-secondary')}>Home</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-2">
              <ChevronRight className="h-3 w-3 opacity-60" />
              {c.href
                ? <Link href={c.href} className={clsx('transition-colors', dark ? 'hover:text-tertiary-fixed-dim' : 'hover:text-secondary')}>{c.label}</Link>
                : <span className={dark ? 'text-on-primary' : 'text-on-surface-variant'}>{c.label}</span>}
            </span>
          ))}
        </nav>
        {eyebrow && (
          <p className={clsx('mb-3 flex items-center gap-2 text-label-prestige-eyebrow uppercase tracking-widest', dark ? 'text-tertiary-fixed-dim' : 'text-secondary')}>
            <span className={clsx('h-[2px] w-8', dark ? 'bg-tertiary-fixed-dim' : 'bg-secondary')} />
            {eyebrow}
          </p>
        )}
        <h1 className={clsx('h-display max-w-4xl text-balance', dark && '!text-on-primary')}>{title}</h1>
        {children && <p className={clsx('mt-5 max-w-2xl text-body-md md:text-body-lg', dark ? 'text-surface-variant' : 'text-on-surface-variant')}>{children}</p>}
        {actions && <div className="mt-8 flex flex-wrap gap-4">{actions}</div>}
      </div>
    </section>
  );
}
