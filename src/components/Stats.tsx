'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

function CountUp({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) setHasAnimated(true);
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
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [end, hasAnimated]);

  return <span ref={ref}>{Math.floor(count)}{suffix}</span>;
}

export default function Stats() {
  const stats = [
    { value: 'ج.م.1M+', label: 'Revenue Driven', countUp: false },
    { value: '814', label: 'Orders Generated', countUp: true, num: 814 },
    { value: '4.2x', label: 'Average ROAS', countUp: false },
    { value: '1', label: 'Live Brand Operated', countUp: true, num: 1 },
    { value: '3', label: 'Clients Across 3 Continents', countUp: true, num: 3 },
  ];

  return (
    <section className="py-20 px-4 md:px-8 lg:px-12 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="font-display text-3xl md:text-4xl mb-2 accent-text">
                {stat.countUp ? (
                  <CountUp end={stat.num!} />
                ) : (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                  >
                    {stat.value}
                  </motion.span>
                )}
              </div>
              <div className="text-sm text-text-muted">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}