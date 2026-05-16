'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';

function AnimatedNumber({ value, suffix = '' }: { value: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  const num = parseInt(value.replace(/[^0-9.]/g, ''));
  const isDecimal = value.includes('.');

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
    const increment = num / (2000 / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= num) {
        setCount(num);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [num, hasAnimated]);

  const display = isDecimal ? count.toFixed(1) : Math.floor(count);

  return <span ref={ref}>{value.includes('ج.م.') ? 'ج.م.' : ''}{display}{suffix}{value.includes('+') ? '+' : ''}</span>;
}

export default function CaseStudy() {
  const t = useTranslations('caseStudy');
  const [activePhase, setActivePhase] = useState(0);

  const phases = [
    { key: 'storeAudit', label: t('storeAudit') },
    { key: 'metaLaunch', label: t('metaLaunch') },
    { key: 'scaling', label: t('scaling') }
  ];

  return (
    <section id="case-study" className="py-20 px-4 md:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-mono tracking-widest text-accent mb-4">PROOF OF WORK</p>
          <h2 className="font-display text-4xl md:text-5xl mb-2">{t('title')}</h2>
          <p className="text-gray-400 mb-12">{t('subtitle')}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-left">
            <div className="bg-gray-900 p-8 border border-gray-800">
              <h3 className="font-display text-xl mb-4 accent-text">{t('problem')}</h3>
              <p className="text-sm text-gray-300">
                Roqqei needed a complete digital marketing overhaul. The store had a 0.49% conversion rate, no structured ad campaigns, and was operating without clear targeting or optimization.
              </p>
            </div>

            <div className="bg-gray-900 p-8 border border-gray-800">
              <h3 className="font-display text-xl mb-4 accent-text">{t('whatIDid')}</h3>
              <p className="text-sm text-gray-300">
                Audited the entire store, rebuilt product pages, launched Meta Ads with prospecting and retargeting campaigns, optimized checkout flow, and implemented conversion tracking.
              </p>
            </div>

            <div className="bg-gray-900 p-8 border border-gray-800">
              <h3 className="font-display text-xl mb-4 accent-text">{t('results')}</h3>
              <ul className="text-sm text-gray-300 space-y-2">
                <li><AnimatedNumber value="ج.م.1M+" /> total revenue</li>
                <li>ج.م.<AnimatedNumber value="42" /> CPA on Meta Ads</li>
                <li><AnimatedNumber value="4.2" suffix="x" /> ROAS</li>
                <li>Conversion rate: 0.49% → <AnimatedNumber value="1" suffix="%" />+</li>
              </ul>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-display text-2xl mb-10">{t('timeline')}</h3>
            <div className="flex justify-center items-start gap-0">
              {phases.map((phase, index) => (
                <div key={phase.key} className="flex items-center">
                  <button
                    onClick={() => setActivePhase(index)}
                    className="flex flex-col items-center gap-2 px-6"
                  >
                    <span className={`font-mono text-sm ${
                      activePhase === index ? 'text-accent' : 'text-gray-500'
                    }`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className={`w-4 h-4 rounded-full border-2 transition-colors ${
                      activePhase === index
                        ? 'border-accent bg-accent'
                        : 'border-gray-600 bg-transparent'
                    }`} />
                    <span className={`font-mono text-sm whitespace-nowrap transition-colors ${
                      activePhase === index ? 'text-accent' : 'text-gray-400'
                    }`}>
                      {phase.label}
                    </span>
                  </button>
                  {index < phases.length - 1 && (
                    <div className="w-16 h-px bg-white/10 mt-9" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <p className="text-sm text-gray-500 italic">{t('note')}</p>
        </motion.div>
      </div>
    </section>
  );
}