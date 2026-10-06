'use client';

import { useTranslations } from 'next-intl';
import Reveal from './Reveal';

interface Project {
  index: string;
  title: string;
  subtitle: string;
  category: string;
  region: string;
  stack: string;
  year: string;
  note: string;
  details: string[];
}

export default function Work() {
  const t = useTranslations('work');

  let projects: Project[] = [];
  try {
    projects = t.raw('projects') as Project[];
  } catch {
    projects = [];
  }

  return (
    <section id="work" className="px-5 md:px-10 lg:px-14 py-16 md:py-24">
      <Reveal className="flex items-baseline justify-between gap-4 pb-4 border-b" style={{ borderColor: 'var(--rule)' }}>
        <span className="mono-label">{t('eyebrow')}</span>
        <span className="mono-label hidden sm:block">{t('intro')}</span>
      </Reveal>

      <div className="pt-10 md:pt-16">
        <Reveal variant="fade-up" className="mb-14 md:mb-24">
          <h2 className="display uppercase text-[clamp(3rem,10vw,8rem)] leading-[0.86] tracking-[-0.02em]">
            {t('title')}
          </h2>
        </Reveal>

        {projects.map((p, i) => (
          <Reveal
            key={p.title}
            variant="spread"
            delay={60}
            className="mb-16 md:mb-28 last:mb-0"
          >
            <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* LEFT — narrative + metadata */}
              <div className="lg:col-span-7">
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="mono-label text-[color:var(--accent)]">{p.index}</span>
                  <div className="rule flex-1" />
                </div>

                <h3 className="display text-[clamp(2rem,5vw,3.6rem)] leading-[0.95] mb-2">
                  {p.title}
                </h3>
                <p className="display italic text-lg md:text-2xl mb-8" style={{ color: 'var(--text-muted)' }}>
                  {p.subtitle}
                </p>

                <dl className="grid grid-cols-2 sm:grid-cols-4 gap-y-5 gap-x-4 mb-8 pb-8 border-b" style={{ borderColor: 'var(--rule)' }}>
                  <div>
                    <dt className="mono-label mb-1">{t('labels.category')}</dt>
                    <dd className="text-sm leading-snug">{p.category}</dd>
                  </div>
                  <div>
                    <dt className="mono-label mb-1">{t('labels.region')}</dt>
                    <dd className="text-sm leading-snug">{p.region}</dd>
                  </div>
                  <div>
                    <dt className="mono-label mb-1">{t('labels.year')}</dt>
                    <dd className="text-sm leading-snug">{p.year}</dd>
                  </div>
                  <div>
                    <dt className="mono-label mb-1">{t('labels.stack')}</dt>
                    <dd className="text-sm leading-snug font-[family-name:var(--font-mono)] text-[13px]">
                      {p.stack}
                    </dd>
                  </div>
                </dl>

                <p className="mono-label mb-3">{t('labels.note')}</p>
                <p className="text-[15px] md:text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {p.note}
                </p>
              </div>

              {/* RIGHT — specimen panel (typographic proof) */}
              <div className="lg:col-span-5">
                <div
                  className="border p-6 md:p-8 h-full flex flex-col"
                  style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
                >
                  <div className="flex items-baseline justify-between mb-6 pb-4 border-b" style={{ borderColor: 'var(--rule)' }}>
                    <span className="mono-label">{p.index} / {p.title}</span>
                    <span className="mono-label">{p.year}</span>
                  </div>

                  <p className="mono-label mb-4">{t('labels.detail')}</p>
                  <ul className="space-y-3 flex-1">
                    {p.details.map((d, di) => (
                      <li key={di} className="flex gap-3 text-[13.5px] leading-relaxed">
                        <span className="mono-label shrink-0 pt-[3px] text-[color:var(--accent)]">
                          {String(di + 1).padStart(2, '0')}
                        </span>
                        <span style={{ color: 'var(--text-muted)' }}>{d}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 pt-4 border-t mono-label" style={{ borderColor: 'var(--rule)' }}>
                    {p.region} — {p.stack}
                  </div>
                </div>
              </div>
            </article>

            {i < projects.length - 1 && (
              <div className="rule mt-16 md:mt-24" />
            )}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
