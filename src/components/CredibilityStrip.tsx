'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function CredibilityStrip() {
  const t = useTranslations('credibility');

  const locations = [
    { label: 'Cairo', flag: '🇪🇬' },
    { label: 'Remote — Middle East', flag: '🌍' },
    { label: 'Remote — Europe', flag: '🇪🇺' },
    { label: 'Remote — Global', flag: '🌐' }
  ];

  return (
    <section className="py-12 px-4 md:px-8 lg:px-12 bg-gray-950">
      <div className="max-w-6xl mx-auto text-center">
        <div className="w-full h-px bg-white/10 mb-12" />
        <motion.p
          className="text-sm text-gray-400 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('title')}
        </motion.p>

        <div className="flex flex-wrap justify-center gap-4">
          {locations.map((location, index) => (
            <motion.div
              key={location.label}
              className="px-4 py-2 bg-gray-900 border border-gray-800 text-sm"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <span className="mr-2">{location.flag}</span>
              <span className="text-gray-300">{location.label}</span>
            </motion.div>
          ))}
        </div>
        <div className="w-full h-px bg-white/10 mt-12" />
      </div>
    </section>
  );
}