import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { telHref } from '@/lib/format';

export default function Footer({ programmes = [], contact = {}, links = {} }) {
  const social = contact.social || {};
  const emails = contact.emails || ['info@hierank.org'];
  return (
    <footer className="bg-navy text-white/75">
      <div className="h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent" />
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 font-serif text-lg font-semibold text-gold">H</span>
            <div className="leading-tight">
              <p className="font-serif text-lg font-semibold text-white">Hierank Business School</p>
              <p className="text-[10px] font-bold uppercase tracking-eyebrow text-gold">Noida · Est. 2006</p>
            </div>
          </div>
          <p className="mt-5 text-sm leading-6">AICTE-approved integrated campus offering MBA, MCA, BBA and BCA programmes under the ABR Education Foundation.</p>
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" /><span>{contact.address || 'A-42, Institutional Area, Sector 62, Noida, Uttar Pradesh 201307'}</span></li>
            <li className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" /><a href={telHref(contact.helpline || '+91-9650848777')} className="hover:text-gold">{contact.helpline || '+91-9650848777'}</a></li>
            <li className="flex gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" /><span>{emails.map((e, i) => (<span key={e}>{i > 0 && ' · '}<a href={`mailto:${e}`} className="hover:text-gold">{e}</a></span>))}</span></li>
          </ul>
        </div>

        <FooterCol title="Programmes">
          {programmes.length ? programmes.map((p) => <FLink key={p.slug} href={`/programmes/${p.slug}`}>{p.code} — {p.name}</FLink>) : <FLink href="/programmes">All programmes</FLink>}
        </FooterCol>
        <FooterCol title="Explore">
          <FLink href="/about">About HBS</FLink><FLink href="/faculty">Faculty</FLink><FLink href="/campus-life">Campus Life</FLink>
          <FLink href="/news">News & Events</FLink><FLink href="/contact">Contact</FLink>
        </FooterCol>
        <FooterCol title="Admissions">
          <FLink href="/admissions">Admission Process</FLink><FLink href="/admissions#apply">Apply Online</FLink><FLink href="/placements">Placements</FLink>
          {links.payFee && <a href={links.payFee} target="_blank" rel="noreferrer" className="block py-1 text-sm hover:text-gold">Pay Fee Online</a>}
          {links.eBrochure && <a href={links.eBrochure} target="_blank" rel="noreferrer" className="block py-1 text-sm hover:text-gold">e-Brochure</a>}
        </FooterCol>

        <div className="lg:col-span-2">
          <h3 className="eyebrow mb-4 !font-sans !text-gold">Follow</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(social).map(([name, url]) => (
              <a key={name} href={url} target="_blank" rel="noreferrer" className="rounded-full border border-white/20 px-3 py-1 text-xs capitalize hover:border-gold hover:text-gold">{name}</a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Hierank Business School, Noida. All rights reserved.</p>
          <p>MBA/MCA affiliated to AKTU, Lucknow (Code 733) · BBA/BCA affiliated to CCS University, Meerut (Code 879)</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }) {
  return (
    <div className="lg:col-span-2">
      <h3 className="eyebrow mb-4 !font-sans !text-gold">{title}</h3>
      <div>{children}</div>
    </div>
  );
}
function FLink({ href, children }) {
  return <Link href={href} className="block py-1 text-sm hover:text-gold">{children}</Link>;
}
