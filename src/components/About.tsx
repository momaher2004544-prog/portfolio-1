'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function About() {
  const t = useTranslations('about');

  return (
    <section id="about" className="py-20 px-4 md:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-mono tracking-widest text-accent text-center mb-4">WHO I AM</p>
          <h2 className="font-display text-4xl md:text-5xl mb-12 text-center">About</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="text-sm text-gray-300 leading-relaxed">
              <p className="mb-4">
                {t('en')}
              </p>
            </div>

            <div className="text-sm text-gray-300 leading-relaxed" dir="rtl">
              <p className="mb-4">
                {t('ar')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}