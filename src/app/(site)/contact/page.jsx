import { Mail, MapPin, Phone, TrainFront } from 'lucide-react';
import { getProgrammes, getSettings } from '@/lib/api';
import { telHref } from '@/lib/format';
import PageHero from '@/components/ui/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import ContactDesks from '@/components/ui/ContactDesks';
import EnquiryForm from '@/components/forms/EnquiryForm';
import TourForm from '@/components/forms/TourForm';

export const metadata = { title: 'Contact & Campus Visits', description: 'Contact Hierank Business School, Sector 62 Noida — admissions desks, address, directions and campus tours.' };

export default async function ContactPage() {
  const [settings, programmes] = await Promise.all([getSettings(), getProgrammes()]);
  const c = settings.contact || {};
  const codes = programmes.map((p) => p.code);
  const mapQuery = encodeURIComponent('Hierank Business School, A-42 Institutional Area, Sector 62, Noida');
  return (
    <>
      <PageHero eyebrow="Contact Us & Campus Visits" title="We’d Love to Hear from You" crumbs={[{ label: 'Contact' }]}>Reach our admissions council, placement cell or book a visit to the campus.</PageHero>

      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-5">
            <SectionHeading eyebrow="Campus" title="Hierank Business School" />
            <ul className="space-y-4 text-[15px]">
              <li className="flex gap-3"><MapPin className="mt-1 h-5 w-5 shrink-0 text-gold-dark" /><span>{c.address}</span></li>
              <li className="flex gap-3"><Phone className="mt-1 h-5 w-5 shrink-0 text-gold-dark" /><span><a href={telHref(c.helpline || '')} className="hover:text-royal">{c.helpline}</a>{c.whatsapp && <> · WhatsApp {c.whatsapp}</>}</span></li>
              <li className="flex gap-3"><Mail className="mt-1 h-5 w-5 shrink-0 text-gold-dark" /><span>{(c.emails || []).map((e, i) => <span key={e}>{i > 0 && ' · '}<a href={`mailto:${e}`} className="hover:text-royal">{e}</a></span>)}</span></li>
              <li className="flex gap-3"><TrainFront className="mt-1 h-5 w-5 shrink-0 text-gold-dark" /><span>Near Sector-63 Metro Station (Noida Electronic City line, Blue Line).</span></li>
            </ul>
            <ContactDesks desks={c.desks || []} />
            <a href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`} target="_blank" rel="noreferrer" className="btn-secondary"><MapPin className="h-4 w-4" />Open in Google Maps</a>
          </div>
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="Write to our admissions council" title="Send an Enquiry" />
            <div className="mt-8"><EnquiryForm source="contact" programmes={codes.length ? codes : undefined} idPrefix="contact" /></div>
          </div>
        </div>
      </section>

      <section className="section bg-tint" id="tour">
        <div className="container-page grid items-start gap-12 lg:grid-cols-2">
          <SectionHeading eyebrow="Directions & Campus Tour" title="Book a Campus Tour">Walk through smart classrooms, the library and labs, and meet our admissions team. Tours run on weekdays by appointment.</SectionHeading>
          <TourForm programmes={codes.length ? codes : undefined} />
        </div>
      </section>
    </>
  );
}
