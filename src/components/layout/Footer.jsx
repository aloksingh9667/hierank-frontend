import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { telHref } from '@/lib/format';
import NewsletterForm from './NewsletterForm';

export default function Footer({ programmes = [], contact = {}, links = {} }) {
  const social = contact.social || {};
  const emails = contact.emails || ['info@hierank.org'];

  return (
    <footer className="w-full bg-primary-container px-5 pb-24 pt-16 text-surface-container-high md:pb-16 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 pb-12 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-tertiary-fixed">
                <span className="font-serif text-xl font-semibold leading-none">H</span>
              </span>
              <span className="flex flex-col">
                <span className="font-serif text-title-editorial font-bold leading-none tracking-tight text-on-primary">HIERANK</span>
                <span className="mt-1 text-[10px] font-bold uppercase tracking-widest text-tertiary-fixed-dim">Business School</span>
              </span>
            </Link>
            <p className="max-w-sm text-body-sm text-surface-container-highest">
              An AICTE-approved integrated campus in Noida offering MBA, MCA, BBA and BCA programmes under the ABR Education Foundation — shaping managers and technologists for the NCR corporate ecosystem.
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="badge-dark">AICTE Approved</span>
              <span className="badge-dark">AKTU Affiliated</span>
              <span className="badge-dark">CCS University</span>
            </div>
            <div className="mt-2 flex items-start gap-2 text-body-sm text-surface-variant">
              <MapPin className="mt-0.5 h-[18px] w-[18px] shrink-0 text-tertiary-fixed-dim" />
              <span>{contact.address || 'A-42, Institutional Area, Sector 62, Noida, Uttar Pradesh 201307'}</span>
            </div>
            <div className="flex items-start gap-2 text-body-sm text-surface-variant">
              <Phone className="mt-0.5 h-[18px] w-[18px] shrink-0 text-tertiary-fixed-dim" />
              <a href={telHref(contact.helpline || '+91-9650848777')} className="transition-colors hover:text-on-primary">{contact.helpline || '+91-9650848777'}</a>
            </div>
            <div className="flex items-start gap-2 text-body-sm text-surface-variant">
              <Mail className="mt-0.5 h-[18px] w-[18px] shrink-0 text-tertiary-fixed-dim" />
              <span>{emails.map((e, i) => (<span key={e}>{i > 0 && ' · '}<a href={`mailto:${e}`} className="transition-colors hover:text-on-primary">{e}</a></span>))}</span>
            </div>
          </div>

          <FooterCol title="Programmes">
            {programmes.length
              ? programmes.map((p) => <FLink key={p.slug} href={`/programmes/${p.slug}`}>{p.code} — {p.name}</FLink>)
              : <FLink href="/programmes">All programmes</FLink>}
          </FooterCol>

          <FooterCol title="Explore">
            <FLink href="/about">About HBS</FLink>
            <FLink href="/faculty">Faculty Directory</FLink>
            <FLink href="/campus-life">Campus Life</FLink>
            <FLink href="/news">News &amp; Events</FLink>
            <FLink href="/contact">Contact</FLink>
          </FooterCol>

          <FooterCol title="Admissions">
            <FLink href="/admissions">Admission Process</FLink>
            <FLink href="/admissions#apply">Apply Online</FLink>
            <FLink href="/placements">Placements</FLink>
            {links.payFee && <a href={links.payFee} target="_blank" rel="noreferrer" className="text-body-sm text-surface-variant transition-colors hover:text-on-primary">Pay Fee Online</a>}
            {links.eBrochure && <a href={links.eBrochure} target="_blank" rel="noreferrer" className="text-body-sm text-surface-variant transition-colors hover:text-on-primary">e-Brochure</a>}
          </FooterCol>

          {/* Newsletter */}
          <div className="flex flex-col gap-4">
            <span className="text-label-prestige-eyebrow uppercase tracking-wider text-tertiary-fixed">Prospective Scholars</span>
            <p className="text-caption text-surface-variant">Receive official announcements, symposium invites and executive roundtables.</p>
            <NewsletterForm />
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-2 text-surface-variant">
              {Object.entries(social).map(([name, url]) => (
                <a key={name} href={url} target="_blank" rel="noreferrer" aria-label={name} className="text-caption capitalize transition-colors hover:text-tertiary-fixed-dim">{name}</a>
              ))}
              {!Object.keys(social).length && (
                <a href={`mailto:${emails[0]}`} aria-label="Email" className="transition-colors hover:text-tertiary-fixed-dim"><Mail className="h-5 w-5" /></a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-surface-container/10 pt-8 text-caption text-surface-container-highest md:flex-row">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/contact" className="transition-colors hover:text-on-primary">Privacy Policy</Link>
            <Link href="/about" className="transition-colors hover:text-on-primary">Mandatory Disclosures</Link>
            <Link href="/contact" className="transition-colors hover:text-on-primary">Grievance Cell</Link>
          </div>
          <span>© {new Date().getFullYear()} Hierank Business School, Noida. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-label-prestige-eyebrow uppercase tracking-wider text-tertiary-fixed">{title}</span>
      <div className="flex flex-col gap-2.5">{children}</div>
    </div>
  );
}
function FLink({ href, children }) {
  return <Link href={href} className="text-body-sm text-surface-variant transition-colors hover:text-on-primary">{children}</Link>;
}
