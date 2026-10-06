'use client';

import { useTranslations } from 'next-intl';
import Reveal from './Reveal';

interface Chapter {
  no: string;
  title: string;
  body: string;
  tags: string;
  status?: string;
}

export default function Chapters() {
  const t = useTranslations('chapters');

  let items: Chapter[] = [];
  try {
    items = t.raw('items') as Chapter[];
  } catch {
    items = [];
  }

  return (
    <section id="chapters" className="px-5 md:px-10 lg:px-14 py-16 md:py-24" style={{ background: 'var(--bg-alt)' }}>
      <Reveal className="flex items-baseline justify-between gap-4 pb-4 border-b" style={{ borderColor: 'var(--rule)' }}>
        <span className="mono-label">{t('eyebrow')}</span>
        <span className="mono-label hidden sm:block">{t('intro')}</span>
      </Reveal>

      <Reveal variant="fade-up" className="mt-10 md:mt-16 mb-12 md:mb-20">
        <h2 className="display uppercase text-[clamp(3rem,10vw,8rem)] leading-[0.86] tracking-[-0.02em]">
          {t('title')}
        </h2>
      </Reveal>

      <div className="border-t" style={{ borderColor: 'var(--rule)' }}>
        {items.map((c, i) => (
          <Reveal
            key={c.no}
            delay={i * 80}
            className="group border-b py-8 md:py-12 transition-colors"
            style={{ borderColor: 'var(--rule)' }}
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
              <div className="md:col-span-2">
                <span className="mono-label text-[color:var(--accent)]">{c.no} /</span>
              </div>

              <div className="md:col-span-4">
                <h3 className="display text-2xl md:text-4xl leading-tight transition-colors group-hover:text-[color:var(--accent)]">
                  {c.title}
                </h3>
                {c.status && (
                  <span
                    className="mono-label inline-block mt-3 px-2 py-1 border"
                    style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
                  >
                    {c.status}
                  </span>
                )}
              </div>

              <div className="md:col-span-6">
                <p className="text-[15px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {c.body}
                </p>
                <p className="mono-label mt-4">{c.tags}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
