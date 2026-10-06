'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import Reveal from './Reveal';

function CountUp({ end }: { end: number }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !done) setDone(true);
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [done]);

  useEffect(() => {
    if (!done) return;
    let start = 0;
    const step = end / (1600 / 16);
    const id = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(id);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(id);
  }, [done, end]);

  return <span ref={ref}>{count}</span>;
}

export default function Stats() {
  const t = useTranslations('stats');

  let items: { value: string; prefix?: string; count: number; label: string }[] = [];
  try {
    items = t.raw('items') as typeof items;
  } catch {
    items = [];
  }

  return (
    <section id="figures" className="px-5 md:px-10 lg:px-14 py-16 md:py-24">
      <Reveal className="flex items-baseline justify-between gap-4 pb-4 border-b" style={{ borderColor: 'var(--rule)' }}>
        <span className="mono-label">{t('eyebrow')}</span>
        <span className="mono-label">MMXXVI</span>
      </Reveal>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {items.map((item, i) => (
          <Reveal
            key={item.label}
            delay={i * 70}
            className="py-8 md:py-10 pe-6 border-b md:border-b-0 md:border-e last:border-e-0"
            style={{ borderColor: 'var(--rule)' }}
          >
            <div className="display text-[clamp(2.2rem,5vw,3.6rem)] leading-none text-[color:var(--accent)]">
              {item.prefix ? (
                <span className="text-[0.45em] align-top me-1">{item.prefix}</span>
              ) : null}
              {item.count > 0 ? <CountUp end={item.count} /> : item.value}
            </div>
            <div className="mono-label mt-3 leading-relaxed">{item.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
