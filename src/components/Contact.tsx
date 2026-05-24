'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useForm, ValidationError } from '@formspree/react';
import { Loader2 } from 'lucide-react';

export default function Contact() {
  const t = useTranslations('contact');
  const [state, handleSubmit] = useForm('xqejzbkj');

  return (
    <section id="contact" className="py-20 px-4 md:px-8 lg:px-12 bg-card-secondary">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-mono tracking-widest text-accent text-center mb-4">LET'S TALK</p>
          <h2 className="font-display text-4xl md:text-5xl mb-4 text-center">
            {t('headline')}
          </h2>
          <p className="text-text-muted text-center mb-12">
            {t('subline')}
          </p>

          {state.succeeded ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <p className="font-display text-2xl text-accent">
                ✓ Message sent! Mo will get back to you within 24 hours.
              </p>
            </motion.div>
          ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-text-muted mb-2">{t('name')}</label>
                <input
                  type="text"
                  name="name"
                  className="w-full p-3 bg-card border border-border focus:border-accent outline-none transition-colors"
                  required
                />
                <ValidationError field="name" errors={state.errors} />
              </div>
              <div>
                <label className="block text-sm text-text-muted mb-2">{t('email')}</label>
                <input
                  type="email"
                  name="email"
                  className="w-full p-3 bg-card border border-border focus:border-accent outline-none transition-colors"
                  required
                />
                <ValidationError field="email" errors={state.errors} />
              </div>
            </div>

            <div>
              <label className="block text-sm text-text-muted mb-2">{t('company')}</label>
              <input
                type="text"
                name="company"
                className="w-full p-3 bg-card border border-border focus:border-accent outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-text-muted mb-2">{t('message')}</label>
              <textarea
                name="message"
                rows={5}
                className="w-full p-3 bg-card border border-border focus:border-accent outline-none transition-colors"
                required
              />
              <ValidationError field="message" errors={state.errors} />
            </div>

            {state.errors && !state.succeeded && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm text-center"
              >
                Something went wrong. Try WhatsApp instead.
              </motion.p>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                type="submit"
                disabled={state.submitting}
                className="px-8 py-3 bg-accent text-black hover:bg-opacity-90 transition-colors disabled:opacity-50 flex items-center gap-2 justify-center"
              >
                {state.submitting ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                ) : (
                  t('send')
                )}
              </button>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '79002023946'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 border border-accent text-accent hover:bg-accent hover:text-black transition-colors text-center"
              >
                {t('whatsapp')}
              </a>
            </div>
          </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}