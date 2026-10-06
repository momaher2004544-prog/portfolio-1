'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const MOTIONS = [
  { y: -120, opacity: 0, rotate: -8, x: 0, scale: 1 },
  { y: 120, opacity: 0, rotate: 6, x: 0, scale: 1 },
  { y: 0, opacity: 0, rotate: -4, x: -100, scale: 1 },
  { y: 0, opacity: 0, rotate: 5, x: 100, scale: 1 },
  { y: 0, opacity: 0, rotate: 180, x: 0, scale: 0 },
  { y: -80, opacity: 0, rotate: 12, x: 0, scale: 1 },
];

const REST = { y: 0, opacity: 1, rotate: 0, x: 0, scale: 1 };

function KineticLine({ text, seed, className }: { text: string; seed: number; className?: string }) {
  return (
    <span className={className}>
      {text.split('').map((letter, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={MOTIONS[(i + seed) % MOTIONS.length]}
          animate={REST}
          transition={{
            duration: 1.4,
            delay: 0.3 + (i + seed) * 0.07,
            ease: [0.19, 1, 0.22, 1],
          }}
        >
          {letter === ' ' ? ' ' : letter}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-between px-6 md:px-10 pt-24 pb-8 z-[3]">
      {/* meta top */}
      <motion.div
        className="flex justify-between items-center mono-label"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1, delay: 1.8 }}
      >
        <span>{t('vol')}</span>
        <span className="hidden md:block">{t('edition')}</span>
        <span style={{ color: 'var(--gold)', opacity: 1 }}>{t('years')}</span>
      </motion.div>

      {/* name treatment */}
      <div className="flex-1 flex flex-col justify-center items-center py-16 text-center">
        <h1 className="display uppercase leading-[0.85] tracking-[-0.04em] text-[clamp(3.5rem,15vw,15rem)] font-bold perspective-[800px]">
          <span className="block text-[color:var(--ivory)]">
            <KineticLine text={t('line1')} seed={0} />
          </span>
          <span
            className="block italic font-medium"
            style={{ color: 'var(--gold)' }}
          >
            <KineticLine text={t('line2')} seed={4} />
          </span>
        </h1>

        <motion.div
          className="mt-10 flex items-center justify-center gap-6 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block w-12 h-px" style={{ background: 'var(--gold)' }} />
          <span
            className="text-[12px] font-medium uppercase"
            style={{ letterSpacing: '0.3em', color: 'rgba(20,19,14,0.7)' }}
          >
            {t('byline')}
          </span>
          <span className="inline-block w-12 h-px" style={{ background: 'var(--gold)' }} />
        </motion.div>

        <motion.p
          className="mt-8 max-w-2xl text-[15px] leading-relaxed px-2"
          style={{ color: 'rgba(20,19,14,0.65)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.7 }}
        >
          {t('tagline')}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap gap-4 justify-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
            className="mono-label px-7 py-3 border transition-colors hover:bg-[color:var(--gold)] hover:text-[color:var(--jungle-deep)]"
            style={{ borderColor: 'var(--gold)', color: 'var(--gold)', opacity: 1, pointerEvents: 'auto' }}
          >
            {t('viewWork')}
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="mono-label px-7 py-3 transition-colors hover:opacity-90"
            style={{ background: 'var(--gold)', color: 'var(--jungle-deep)', opacity: 1, pointerEvents: 'auto' }}
          >
            {t('contactMe')}
          </button>
        </motion.div>
      </div>

      {/* meta bottom */}
      <motion.div
        className="flex justify-between items-center mono-label"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1, delay: 1.9 }}
      >
        <span className="hidden md:block">{t('isbn')}</span>
        <button
          className="scroll-cue"
          style={{ color: 'var(--gold)', animation: 'nudge 2.4s cubic-bezier(.22,1,.36,1) infinite' }}
          onClick={() => document.getElementById('preface')?.scrollIntoView({ behavior: 'smooth' })}
        >
          {t('begin')}
        </button>
        <span className="hidden md:block">{t('setIn')}</span>
      </motion.div>
    </section>
  );
}
