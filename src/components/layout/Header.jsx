'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ChevronDown, Menu, Phone, X } from 'lucide-react';
import clsx from 'clsx';

const NAV = [
  { href: '/about', label: 'About' },
  { href: '/programmes', label: 'Programmes', menu: true },
  { href: '/admissions', label: 'Admissions' },
  { href: '/placements', label: 'Placements' },
  { href: '/faculty', label: 'Faculty' },
  { href: '/campus-life', label: 'Campus Life' },
  { href: '/news', label: 'News' },
  { href: '/contact', label: 'Contact' },
];

export default function Header({ programmes = [], links = {}, notice, phone = '+91-9650848777' }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const active = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50">
      {notice?.text && (
        <div className="bg-navy text-center text-xs text-white/90">
          <Link href={notice.link || '/admissions'} className="block px-4 py-2 hover:text-gold">
            <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-gold align-middle" />
            {notice.text}
          </Link>
        </div>
      )}

      <div className="hidden border-b border-navy/10 bg-tint lg:block">
        <div className="container-page flex h-9 items-center justify-end gap-6 text-xs font-medium text-navy/80">
          {links.payFee && <a href={links.payFee} target="_blank" rel="noreferrer" className="hover:text-royal">Pay Fee Online</a>}
          {links.moodle && <a href={links.moodle} target="_blank" rel="noreferrer" className="hover:text-royal">Moodle</a>}
          <Link href="/news?category=notice" className="hover:text-royal">Notices</Link>
          {links.eBrochure && <a href={links.eBrochure} target="_blank" rel="noreferrer" className="hover:text-royal">e-Brochure</a>}
          <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="flex items-center gap-1.5 font-semibold text-navy"><Phone className="h-3.5 w-3.5" />{phone}</a>
        </div>
      </div>

      <div className={clsx('border-b bg-canvas/95 backdrop-blur transition-shadow', scrolled ? 'border-navy/10 shadow-card' : 'border-transparent')}>
        <div className="container-page flex h-[72px] items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3" aria-label="Hierank Business School – Home">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy font-serif text-lg font-semibold text-gold">H</span>
            <span className="leading-tight">
              <span className="block font-serif text-lg font-semibold text-navy">Hierank</span>
              <span className="block text-[10px] font-bold uppercase tracking-eyebrow text-gold-dark">Business School · Noida</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary">
            {NAV.map((item) =>
              item.menu ? (
                <div key={item.href} className="group relative">
                  <Link href={item.href} className={clsx('flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold', active(item.href) ? 'text-royal' : 'text-ink hover:text-royal')}>
                    {item.label}<ChevronDown className="h-3.5 w-3.5" />
                  </Link>
                  {programmes.length > 0 && (
                    <div className="invisible absolute left-0 top-full w-72 translate-y-1 rounded-card border-t-2 border-gold bg-white p-2 opacity-0 shadow-modal transition-all group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      {programmes.map((p) => (
                        <Link key={p.slug} href={`/programmes/${p.slug}`} className="block rounded-lg px-4 py-3 hover:bg-tint">
                          <span className="block text-sm font-semibold text-navy">{p.code} <span className="font-normal text-muted">· {p.duration}</span></span>
                          <span className="block text-xs text-muted">{p.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={item.href} href={item.href} className={clsx('rounded-lg px-3 py-2 text-sm font-semibold', active(item.href) ? 'text-royal' : 'text-ink hover:text-royal')}>
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/admissions#apply" className="btn-primary hidden !px-5 !py-2.5 sm:inline-flex">Apply Now</Link>
            <button type="button" onClick={() => setOpen(true)} className="rounded-lg p-2 text-navy xl:hidden" aria-label="Open menu" aria-expanded={open}>
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={clsx('fixed inset-0 z-[60] xl:hidden', open ? 'visible' : 'invisible')} aria-hidden={!open}>
        <div className={clsx('absolute inset-0 bg-navy/50 transition-opacity', open ? 'opacity-100' : 'opacity-0')} onClick={() => setOpen(false)} />
        <aside className={clsx('absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col border-t-2 border-gold bg-white p-6 shadow-modal transition-transform duration-300', open ? 'translate-x-0' : 'translate-x-full')}>
          <div className="flex items-center justify-between">
            <span className="font-serif text-lg font-semibold text-navy">Menu</span>
            <button type="button" onClick={() => setOpen(false)} className="rounded-lg p-2" aria-label="Close menu"><X className="h-6 w-6" /></button>
          </div>
          <nav className="mt-6 flex-1 space-y-1 overflow-y-auto" aria-label="Mobile">
            <Link href="/" className="block rounded-lg px-3 py-3 font-semibold text-ink hover:bg-tint">Home</Link>
            {NAV.map((item) => (
              <div key={item.href}>
                <Link href={item.href} className={clsx('block rounded-lg px-3 py-3 font-semibold hover:bg-tint', active(item.href) ? 'text-royal' : 'text-ink')}>{item.label}</Link>
                {item.menu && programmes.map((p) => (
                  <Link key={p.slug} href={`/programmes/${p.slug}`} className="ml-4 block rounded-lg px-3 py-2 text-sm text-muted hover:bg-tint">{p.code} — {p.name}</Link>
                ))}
              </div>
            ))}
          </nav>
          <Link href="/admissions#apply" className="btn-primary mt-4 w-full">Apply Now</Link>
          <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="mt-3 flex items-center justify-center gap-2 text-sm font-semibold text-navy"><Phone className="h-4 w-4" />{phone}</a>
        </aside>
      </div>
    </header>
  );
}
