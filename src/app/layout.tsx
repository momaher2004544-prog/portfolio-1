import type { Metadata } from 'next';
import { Cormorant_Garamond, Amiri, Inter, JetBrains_Mono, Noto_Sans_Arabic } from 'next/font/google';
import Providers from '@/components/Providers';
import './globals.css';

const cormorant = Cormorant_Garamond({
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
});

const amiri = Amiri({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['arabic', 'latin'],
  variable: '--font-amiri',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const dmMono = JetBrains_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-noto-ar',
  display: 'swap',
});

const title = 'Mohamed Maher — Front-end & Shopify Architect';
const description =
  'Editorial portfolio of Mohamed Maher. Shopify and Liquid engineering, performance marketing, and React front-end work for brands across Egypt, the Gulf, and Europe.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    siteName: 'Mohamed Maher',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    languages: {
      en: '/en',
      ar: '/ar',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${amiri.variable} ${inter.variable} ${dmMono.variable} ${notoArabic.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
