'use client';

import { useTranslations } from 'next-intl';
import Reveal from './Reveal';

export default function Manifesto() {
  const t = useTranslations('manifesto');

  let paras: string[] = [];
  try {
    paras = t.raw('paras') as string[];
  } catch {
    paras = [];
  }

  return (
    <section id="preface" className="px-6 md:px-10 max-w-4xl mx-auto py-16 md:py-24 relative z-[3]">
      <Reveal className="text-center mb-14">
        <span className="eyebrow block mb-6">{t('eyebrow')}</span>
        <h2 className="display italic font-normal text-[clamp(2.2rem,5.5vw,4.2rem)] leading-[1.05]">
          {t('title')} <em style={{ color: 'var(--gold)', fontStyle: 'normal' }}>{t('titleEm')}</em>
        </h2>
      </Reveal>

      <Reveal delay={120} className="text-[clamp(1.05rem,1.5vw,1.3rem)] leading-[1.65] text-justify hyphens-auto">
        {paras.map((p, i) => (
          <p
            key={i}
            className="mb-6 font-[family-name:var(--font-display)]"
            style={{ color: 'rgba(20,19,14,0.9)' }}
          >
            {i === 0 ? (
              <>
                <span
                  className="float-left font-bold pe-3 pt-1"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '5.5em',
                    lineHeight: 0.82,
                    color: 'var(--gold)',
                    paddingTop: '0.05em',
                    paddingInlineEnd: '0.12em',
                  }}
                >
                  {p.charAt(0)}
                </span>
                {p.slice(1)}
              </>
            ) : (
              p
            )}
          </p>
        ))}
      </Reveal>

      <Reveal delay={200} className="mt-14 text-end font-[family-name:var(--font-display)] italic" style={{ color: 'var(--gold)', fontSize: '1.3rem', lineHeight: 1.4 }}>
        <span
          className="inline-block h-px w-12 me-4 align-middle"
          style={{ background: 'var(--gold)', opacity: 0.5 }}
        />
        {t('sig')}
        <span className="block mono-label mt-2 opacity-60">{t('sigLine')}</span>
      </Reveal>
    </section>
  );
}
