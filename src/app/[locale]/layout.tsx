import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import Navbar from '@/components/Navbar';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import CustomCursor from '@/components/CustomCursor';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Services from '@/components/Services';
import CaseStudy from '@/components/CaseStudy';
import CredibilityStrip from '@/components/CredibilityStrip';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';


const locales = ['en', 'ar'];

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export async function generateMetadata({params: {locale}}: {params: {locale: string}}) {
  return {
    alternates: {
      languages: {
        'en': '/en',
        'ar': '/ar',
      },
    },
  };
}

export default async function LocaleLayout({
  params: {locale}
}: {
  params: {locale: string};
}) {
  setRequestLocale(locale);
  if (!locales.includes(locale as any)) notFound();

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div className={`min-h-screen ${locale === 'ar' ? 'rtl' : ''}`}>
        <ScrollProgressBar />
        <Navbar />
        <main id="main-content">
          <Hero />
          <Stats />
          <Services />
          <CaseStudy />
          <CredibilityStrip />
          <About />
          <Contact />
        </main>
        <Footer />
        <CustomCursor />
      </div>
    </NextIntlClientProvider>
  );
}