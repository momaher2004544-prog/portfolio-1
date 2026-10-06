'use client';

import { useTranslations } from 'next-intl';
import Reveal from './Reveal';

interface MetaRow {
  k: string;
  v: string;
}

export default function About() {
  const t = useTranslations('about');

  let meta: MetaRow[] = [];
  try {
    meta = t.raw('meta') as MetaRow[];
  } catch {
    meta = [];
  }

  return (
    <section id="about" className="px-5 md:px-10 lg:px-14 py-16 md:py-24">
      <Reveal className="flex items-baseline justify-between gap-4 pb-4 border-b" style={{ borderColor: 'var(--rule)' }}>
        <span className="mono-label">{t('eyebrow')}</span>
        <span className="mono-label hidden sm:block">Colophon</span>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 pt-10 md:pt-16">
        <Reveal variant="spread" className="lg:col-span-7">
          <h2 className="display uppercase text-[clamp(3rem,10vw,7rem)] leading-[0.86] tracking-[-0.02em] mb-8">
            {t('title')}
          </h2>
          <p className="display italic text-xl md:text-3xl leading-snug" style={{ color: 'var(--text)' }}>
            {t('bio')}
          </p>
        </Reveal>

        <Reveal variant="spread" delay={120} className="lg:col-span-5">
          <dl className="border-t" style={{ borderColor: 'var(--rule)' }}>
            {meta.map((row) => (
              <div
                key={row.k}
                className="flex items-baseline justify-between gap-6 py-4 border-b"
                style={{ borderColor: 'var(--rule)' }}
              >
                <dt className="mono-label shrink-0">{row.k}</dt>
                <dd className="text-sm text-end leading-snug">{row.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
