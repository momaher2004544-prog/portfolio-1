import type { Metadata } from 'next';
import {DM_Serif_Display, DM_Mono} from 'next/font/google';
import './globals.css';

const dmSerifDisplay = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
});

const dmMono = DM_Mono({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Mohamed Maher — Performance Marketing & E-commerce',
  description: 'Cairo-based digital marketer and frontend developer. Meta Ads, Google Ads, Shopify, SEO, and web development for brands that want real results.',
  openGraph: {
    title: 'Mohamed Maher — Performance Marketing & E-commerce',
    description: 'Cairo-based digital marketer and frontend developer. Meta Ads, Google Ads, Shopify, SEO, and web development for brands that want real results.',
    url: 'https://mohamedmaher.com',
    siteName: 'Mohamed Maher',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    languages: {
      'en': '/en',
      'ar': '/ar',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${dmSerifDisplay.variable} ${dmMono.variable}`}>
      <body className="font-mono">{children}</body>
    </html>
  );
}