import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import FloatingCTA from '@/components/FloatingCTA';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'MFour Solar — Clean Energy Solutions in the Philippines',
    template: '%s | MFour Solar',
  },
  description:
    'MFour Solar delivers premium solar panel installation, maintenance, and consultation services across the Philippines. Cut your electricity bills by up to 80%.',
  keywords: [
    'solar panels Philippines',
    'solar installation',
    'renewable energy',
    'solar energy',
    'MFour Solar',
    'solar power system',
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'en_PH',
    siteName: 'MFour Solar',
    title: 'MFour Solar — Clean Energy Solutions in the Philippines',
    description:
      'Premium solar panel installation and maintenance services across the Philippines.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${plusJakarta.variable} font-sans`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}
