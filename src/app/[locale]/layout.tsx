import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import Navbar from '@/components/Navbar';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import RisoCursor from '@/components/RisoCursor';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Work from '@/components/Work';
import Chapters from '@/components/Chapters';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const locales = ['en', 'ar'];

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export async function generateMetadata({params: {locale}}: {params: {locale: string}}) {
  const base = 'https://mo-1-chi.vercel.app';
  return {
    alternates: {
      canonical: `${base}/${locale}`,
      languages: {
        'x-default': `${base}/en`,
        en: `${base}/en`,
        ar: `${base}/ar`,
      },
    },
  };
}

export default async function LocaleLayout({
  params: {locale},
}: {
  params: {locale: string};
}) {
  setRequestLocale(locale);
  if (!locales.includes(locale as any)) notFound();

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div
        lang={locale}
        dir={locale === 'ar' ? 'rtl' : 'ltr'}
        className="min-h-screen"
      >
        <ScrollProgressBar />
        <Navbar />
        <main id="main-content">
          <Hero />
          <Stats />
          <Work />
          <Chapters />
          <About />
          <Contact />
        </main>
        <Footer />
        <RisoCursor />
      </div>
    </NextIntlClientProvider>
  );
}
