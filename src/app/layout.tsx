import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sunya Visibility — Bespoke Digital Presences for Kathmandu Valley',
  description:
    'Editorial web craftsmanship for exceptional dining and neighborhood establishments across Kathmandu, Lalitpur, and Bhaktapur.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${sans.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#0C0A09] font-sans text-[#F7F4EE] antialiased selection:bg-[#C5A059] selection:text-black">
        {children}
      </body>
    </html>
  );
}
