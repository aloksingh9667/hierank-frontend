import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const serif = Playfair_Display({ subsets: ['latin'], variable: '--font-serif', display: 'swap' });
const sans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Hierank Business School, Noida — MBA, MCA, BBA, BCA', template: '%s | Hierank Business School' },
  description:
    'AICTE-approved Hierank Business School in Sector 62, Noida offers MBA, MCA, BBA and BCA programmes with strong placements. Admissions open 2026.',
  openGraph: { type: 'website', siteName: 'Hierank Business School', locale: 'en_IN' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
