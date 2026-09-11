import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sunya Visibility — Autonomous Website Agency for Kathmandu Valley',
  description: 'AI-driven local business website creation and lead generation for restaurants, spas, clinics, and stores across Kathmandu, Lalitpur, and Bhaktapur.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-slate-950 text-slate-100">
        {children}
      </body>
    </html>
  );
}
