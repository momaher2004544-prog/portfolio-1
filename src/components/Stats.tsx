'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';

function Counter({ end, suffix = '', prefix = '', decimals = 0 }: { end: number; suffix?: string; prefix?: string; decimals?: number }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;
    let start = 0;
    const increment = end / (2000 / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, hasAnimated]);

  return (
    <span ref={ref}>
      {prefix}{decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}{suffix}
    </span>
  );
}

export default function Stats() {
  const t = useTranslations('stats');
  const stats = [
    { key: 'revenue', end: 1, prefix: 'ج.م.', suffix: 'M+', decimals: 0 },
    { key: 'orders', end: 814, suffix: '', prefix: '', decimals: 0 },
    { key: 'roas', end: 4.2, suffix: 'x', prefix: '', decimals: 1 },
    { key: 'liveBrand', end: 1, suffix: '', prefix: '', decimals: 0 },
    { key: 'continents', end: 3, suffix: '', prefix: '', decimals: 0 }
  ];

  return (
    <section className="py-20 px-4 md:px-8 lg:px-12 bg-[#1A1A18]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.key}
              className="text-center p-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="font-display text-3xl md:text-4xl mb-2 accent-text">
                <Counter end={stat.end} prefix={stat.prefix} suffix={stat.suffix} decimals={stat.decimals} />
              </div>
              <div className="text-sm text-gray-400">{t(stat.key)}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}