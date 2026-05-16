'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Target, Building2, ShoppingCart, Search, Code, MessageSquare } from 'lucide-react';

const iconMap: Record<string, JSX.Element> = {
  metaAds: <Target className="w-6 h-6" />,
  googleAdsB2B: <Building2 className="w-6 h-6" />,
  shopifyManagement: <ShoppingCart className="w-6 h-6" />,
  seo: <Search className="w-6 h-6" />,
  websiteDevelopment: <Code className="w-6 h-6" />,
  codeConsulting: <MessageSquare className="w-6 h-6" />
};

export default function Services() {
  const t = useTranslations('services');
  const services = [
    {
      key: 'metaAds',
      icon: iconMap.metaAds
    },
    {
      key: 'googleAdsB2B',
      icon: iconMap.googleAdsB2B
    },
    {
      key: 'shopifyManagement',
      icon: iconMap.shopifyManagement
    },
    {
      key: 'seo',
      icon: iconMap.seo
    },
    {
      key: 'websiteDevelopment',
      icon: iconMap.websiteDevelopment
    },
    {
      key: 'codeConsulting',
      icon: iconMap.codeConsulting
    }
  ];

  return (
    <section id="services" className="py-20 px-4 md:px-8 lg:px-12 bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-mono tracking-widest text-accent mb-4">WHAT I DO</p>
          <h2 className="font-display text-4xl md:text-5xl mb-4">Services</h2>
          <p className="text-gray-400">Performance marketing solutions for real results</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.key}
              className="group bg-gray-900 p-8 border border-gray-800 transition-all duration-300 hover:border-accent hover:shadow-[0_0_20px_rgba(186,117,23,0.15)]"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              whileHover={{ y: -4 }}
            >
              <div className="mb-4 accent-text transition-transform duration-300 group-hover:rotate-[10deg]">{service.icon}</div>
              <h3 className="font-display text-xl mb-2">{t(`${service.key}.title`)}</h3>
              <h4 className="text-sm text-gray-400 mb-4">{t(`${service.key}.titleAr`)}</h4>
              <p className="text-sm text-gray-300">{t(`${service.key}.description`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}