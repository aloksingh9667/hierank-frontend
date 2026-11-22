import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getProgrammes, getSettings } from '@/lib/api';

export default async function SiteLayout({ children }) {
  const [programmes, settings] = await Promise.all([getProgrammes(), getSettings()]);
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2">Skip to content</a>
      <Header programmes={programmes} links={settings.links} notice={settings.notice} phone={settings.contact?.helpline} />
      {/* Offset the fixed header (utility strip + compact bar) and the mobile bottom navigation */}
      <main id="main" className="pb-16 pt-[76px] md:pb-0 md:pt-[84px]">{children}</main>
      <Footer programmes={programmes} contact={settings.contact} links={settings.links} />
    </>
  );
}
