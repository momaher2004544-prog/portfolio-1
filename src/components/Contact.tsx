'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useForm, ValidationError } from '@formspree/react';
import { Loader2 } from 'lucide-react';
import Reveal from './Reveal';

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '201064375882';
const LINKEDIN = 'https://www.linkedin.com/in/mohammed-maher-0074b4412/';

export default function Contact() {
  const t = useTranslations('contact');
  const [state, handleSubmit] = useForm('xqejzbkj');

  return (
    <section
      id="contact"
      className="px-5 md:px-10 lg:px-14 py-16 md:py-24"
      style={{ background: 'var(--bg-alt)' }}
    >
      <Reveal className="flex items-baseline justify-between gap-4 pb-4 border-b" style={{ borderColor: 'var(--rule)' }}>
        <span className="mono-label">{t('eyebrow')}</span>
        <span className="mono-label hidden sm:block">Colophon</span>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 pt-10 md:pt-16">
        {/* Left — direct lines, like a book colophon */}
        <Reveal variant="spread" className="lg:col-span-5">
          <h2 className="display text-[clamp(2.2rem,5.5vw,4rem)] leading-[0.95] mb-6">
            {t('headline')}
          </h2>
          <p className="text-[15px] leading-relaxed mb-10" style={{ color: 'var(--text-muted)' }}>
            {t('subline')}
          </p>

          <div className="border-t" style={{ borderColor: 'var(--rule)' }}>
            <a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-baseline justify-between gap-6 py-4 border-b group transition-colors"
              style={{ borderColor: 'var(--rule)' }}
            >
              <span className="mono-label">{t('whatsapp_label')}</span>
              <span className="text-sm font-[family-name:var(--font-mono)] group-hover:text-[color:var(--accent)] transition-colors" dir="ltr">
                +20 10 6437 5882
              </span>
            </a>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-baseline justify-between gap-6 py-4 border-b group transition-colors"
              style={{ borderColor: 'var(--rule)' }}
            >
              <span className="mono-label">LinkedIn</span>
              <span className="text-sm font-[family-name:var(--font-mono)] group-hover:text-[color:var(--accent)] transition-colors" dir="ltr">
                /in/mohammed-maher-0074b4412
              </span>
            </a>
            <div
              className="flex items-baseline justify-between gap-6 py-4 border-b"
              style={{ borderColor: 'var(--rule)' }}
            >
              <span className="mono-label">{t('location_label')}</span>
              <span className="text-sm text-end leading-snug">{t('location')}</span>
            </div>
          </div>
        </Reveal>

        {/* Right — form */}
        <Reveal variant="spread" delay={100} className="lg:col-span-7">
          {state.succeeded ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border p-10 text-center"
              style={{ borderColor: 'var(--border)' }}
            >
              <p className="display italic text-2xl text-[color:var(--accent)]">{t('sent')}</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="contact-name" className="mono-label block mb-2">
                    {t('name')}
                  </label>
                  <input id="contact-name" type="text" name="name" className="field" required />
                  <ValidationError field="name" errors={state.errors} />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mono-label block mb-2">
                    {t('email')}
                  </label>
                  <input id="contact-email" type="email" name="email" className="field" required />
                  <ValidationError field="email" errors={state.errors} />
                </div>
              </div>

              <div>
                <label htmlFor="contact-company" className="mono-label block mb-2">
                  {t('company')}
                </label>
                <input id="contact-company" type="text" name="company" className="field" />
              </div>

              <div>
                <label htmlFor="contact-message" className="mono-label block mb-2">
                  {t('message')}
                </label>
                <textarea id="contact-message" name="message" rows={5} className="field resize-none" required />
                <ValidationError field="message" errors={state.errors} />
              </div>

              {state.errors && !state.succeeded && (
                <p className="text-sm text-center" style={{ color: '#C2410C' }}>
                  {t('error')}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="mono-label px-8 py-4 text-black transition-opacity hover:opacity-90 disabled:opacity-50 flex items-center gap-2 justify-center"
                  style={{ background: 'var(--accent)' }}
                >
                  {state.submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> {t('send')}
                    </>
                  ) : (
                    t('send')
                  )}
                </button>
                <a
                  href={`https://wa.me/${WHATSAPP}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono-label px-8 py-4 border text-center transition-colors hover:bg-[color:var(--accent)] hover:text-black"
                  style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
                >
                  {t('whatsapp')}
                </a>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
