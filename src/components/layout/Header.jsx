'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ChevronDown, Menu, X, GraduationCap, BadgeCheck, Building2, Home, User, Headset } from 'lucide-react';
import clsx from 'clsx';

const NAV = [
  { href: '/about', label: 'About Us' },
  { href: '/programmes', label: 'Academics & Programs', menu: true },
  { href: '/admissions', label: 'Admissions' },
  { href: '/campus-life', label: 'Campus Life' },
  { href: '/placements', label: 'Placements' },
  { href: '/faculty', label: 'Research & Faculty', xl: true },
  { href: '/contact', label: 'Contact' },
];

const BOTTOM_NAV = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/programmes', label: 'Programs', icon: GraduationCap },
  { href: '/admissions', label: 'Admissions', icon: BadgeCheck },
  { href: '/campus-life', label: 'Campus', icon: Building2 },
  { href: '/contact', label: 'Contact', icon: Headset },
];

export default function Header({ programmes = [], links = {}, notice, phone = '+91-9650848777' }) {
  const pathname = usePathname();
  // Menu state carries the path it was opened on, so navigating to a new route
  // closes the menu without a setState-in-effect render cascade.
  const [menu, setMenu] = useState({ open: false, programmesOpen: false, path: pathname });
  const open = menu.open && menu.path === pathname;
  const programmesOpen = menu.programmesOpen && menu.path === pathname;
  const toggleOpen = () => setMenu((m) => ({ open: !(m.open && m.path === pathname), programmesOpen: false, path: pathname }));
  const toggleProgrammes = () => setMenu((m) => ({ open: m.open && m.path === pathname, programmesOpen: !(m.programmesOpen && m.path === pathname), path: pathname }));

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const active = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));
  const noticeText = notice?.text || 'Admissions Open for 2026–27 · MBA, MCA, BBA & BCA | Apply before the next round';
  const noticeHref = notice?.link || '/admissions';

  return (
    <>
      <header className="fixed top-0 z-50 w-full shadow-header">
        {/* Top utility strip — mobile */}
        <div className="flex items-center justify-between bg-primary-container px-5 py-1 text-tertiary-fixed md:hidden">
          <div className="flex items-center gap-space-xs">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-tertiary-fixed" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Admissions Open 2026–27</span>
          </div>
          <Link href={noticeHref} className="text-[11px] underline underline-offset-2 hover:text-white">Deadline approaching</Link>
        </div>

        {/* Top utility strip — desktop */}
        <div className="hidden bg-primary-container px-5 py-1 text-[11px] text-on-primary md:block lg:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-3">
              <span className="shrink-0 rounded bg-tertiary-fixed px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-on-tertiary-fixed">Admissions Open</span>
              <Link href={noticeHref} className="truncate font-medium text-surface-variant hover:text-tertiary-fixed">{noticeText}</Link>
            </div>
            <div className="flex shrink-0 items-center gap-6 font-medium text-surface-variant">
              <Link href="/contact#tour" className="transition-colors hover:text-tertiary-fixed">Campus Tour Booking</Link>
              <span className="opacity-40">|</span>
              <a href={links.moodle || '#'} className="transition-colors hover:text-tertiary-fixed">Student Portal</a>
              <span className="opacity-40">|</span>
              <Link href="/news" className="transition-colors hover:text-tertiary-fixed">News &amp; Notices</Link>
              <span className="opacity-40">|</span>
              <Link href="/contact" className="transition-colors hover:text-tertiary-fixed">Contact</Link>
            </div>
          </div>
        </div>

        {/* Main bar */}
        <div className="bg-surface/95 px-4 backdrop-blur-xl lg:px-8">
          <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-4">
            {/* Mobile: logo + actions + menu */}
            <div className="flex w-full items-center justify-between gap-3 lg:hidden">
              <div className="shrink-0"><Brand compact /></div>
              <div className="flex shrink-0 items-center gap-2">
                <Link href="/admissions#apply" className="flex h-10 shrink-0 items-center rounded-full bg-primary-container px-3.5 text-[12px] font-bold text-tertiary-fixed shadow-sm transition-transform active:scale-95">
                  Apply
                </Link>
                <Link href="/admin" aria-label="Admin portal" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary">
                  <User className="h-4 w-4" />
                </Link>
                <button
                  type="button"
                  aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
                  aria-expanded={open}
                  onClick={toggleOpen}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-primary-container transition-colors hover:bg-surface-container active:bg-surface-container-high"
                >
                  {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>

            {/* Desktop: logo */}
            <div className="hidden shrink-0 lg:block"><Brand /></div>

            {/* Desktop nav */}
            <nav className="hidden shrink-0 items-center gap-2 whitespace-nowrap lg:flex xl:gap-3.5" aria-label="Primary">
              {NAV.map((item) => (
                <div key={item.href} className={clsx('relative', item.xl && 'hidden xl:block')}>
                  {item.menu ? (
                    <button
                      type="button"
                      onClick={toggleProgrammes}
                      className={clsx(
                        'flex items-center gap-1 py-1.5 text-[12.5px] font-medium transition-colors',
                        active(item.href) ? 'font-bold text-secondary' : 'text-on-surface-variant hover:text-on-surface',
                      )}
                    >
                      {item.label}<ChevronDown className="h-3.5 w-3.5" />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={clsx(
                        'py-1.5 text-[12.5px] font-medium transition-colors',
                        active(item.href) ? 'font-bold text-secondary' : 'text-on-surface-variant hover:text-on-surface',
                      )}
                    >
                      {item.label}
                    </Link>
                  )}
                  {item.menu && programmesOpen && (
                    <div className="absolute left-0 top-full z-50 mt-2 w-72 rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-2 shadow-modal">
                      {programmes.length ? programmes.map((p) => (
                        <Link key={p.slug} href={`/programmes/${p.slug}`} className="block rounded-lg px-3 py-2 text-body-sm text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface">
                          <span className="font-semibold text-primary-container">{p.code}</span> — {p.name}
                        </Link>
                      )) : <Link href="/programmes" className="block rounded-lg px-3 py-2 text-body-sm">All programmes</Link>}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right actions */}
            <div className="hidden shrink-0 items-center gap-2 lg:flex">
              <Link href="/admissions#apply" className="whitespace-nowrap rounded-lg bg-primary-container px-3.5 py-1.5 text-[12px] font-bold text-on-primary shadow-sm ring-1 ring-tertiary-fixed-dim/30 transition-all hover:bg-secondary">
                Apply Now
              </Link>
              <Link href="/admin" aria-label="Admin portal" className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-on-primary">
                <User className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 overflow-y-auto bg-surface pt-[105px] md:pt-[116px] lg:hidden">
          <nav className="flex flex-col px-5 py-4" aria-label="Mobile">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href}
                className={clsx('border-b border-outline-variant/30 py-4 text-title-editorial', active(item.href) ? 'font-bold text-secondary' : 'text-on-surface-variant')}>
                {item.label}
              </Link>
            ))}
            <Link href="/admissions#apply" className="btn-primary mt-6">Apply Now</Link>
            <a href={`tel:${(phone || '').replace(/[^\d+]/g, '')}`} className="mt-4 text-center text-body-sm text-on-surface-variant">{phone}</a>
          </nav>
        </div>
      )}

      {/* Mobile bottom navigation */}
      <nav className="fixed bottom-0 z-50 w-full bg-surface-container-lowest/90 pb-safe shadow-[0_-2px_12px_rgba(0,0,0,0.05)] backdrop-blur-xl md:hidden" aria-label="Quick links">
        <div className="flex h-20 items-center justify-around px-2">
          {BOTTOM_NAV.map((item) => {
            const isActive = active(item.href);
            return (
              <Link key={item.href} href={item.href}
                className={clsx('flex min-h-[44px] min-w-[56px] flex-col items-center justify-center gap-1 transition-colors', isActive ? 'font-semibold text-primary-container' : 'text-on-surface-variant hover:text-on-surface')}>
                <item.icon className="h-[22px] w-[22px] shrink-0" strokeWidth={isActive ? 2.25 : 1.9} />
                <span className="text-caption leading-tight">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

function Brand({ compact = false }) {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-2">
      <span className={clsx('flex items-center justify-center rounded-md bg-primary-container text-tertiary-fixed shadow-sm', compact ? 'h-7 w-7' : 'h-8 w-8')}>
        <span className={clsx('font-serif font-semibold leading-none', compact ? 'text-base' : 'text-lg')}>H</span>
      </span>
      <span className="flex flex-col whitespace-nowrap">
        <span className={clsx('font-serif font-bold leading-none tracking-tight text-primary-container', compact ? 'text-sm' : 'text-base')}>HIERANK</span>
        <span className={clsx('uppercase tracking-[0.14em] text-secondary', compact ? 'mt-0.5 text-[8px]' : 'mt-0.5 text-[9px] font-bold')}>Business School</span>
      </span>
    </Link>
  );
}
