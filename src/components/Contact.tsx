'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function Contact() {
  const t = useTranslations('contact');
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Replace YOUR_FORMSPREE_ID with actual Formspree ID
    const response = await fetch(`https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formState)
    });

    if (response.ok) {
      alert('Message sent!');
      setFormState({ name: '', email: '', company: '', message: '' });
    }
  };

  return (
    <section id="contact" className="py-20 px-4 md:px-8 lg:px-12 bg-gray-950">
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
          <p className="text-gray-400 text-center mb-12">
            {t('subline')}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">{t('name')}</label>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full p-3 bg-gray-900 border border-gray-800 focus:border-accent outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">{t('email')}</label>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full p-3 bg-gray-900 border border-gray-800 focus:border-accent outline-none transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">{t('company')}</label>
              <input
                type="text"
                value={formState.company}
                onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                className="w-full p-3 bg-gray-900 border border-gray-800 focus:border-accent outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">{t('message')}</label>
              <textarea
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                rows={5}
                className="w-full p-3 bg-gray-900 border border-gray-800 focus:border-accent outline-none transition-colors"
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                type="submit"
                className="px-8 py-3 bg-accent text-black hover:bg-opacity-90 transition-colors"
              >
                {t('send')}
              </button>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || 'YOUR_WHATSAPP_NUMBER'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 border border-accent text-accent hover:bg-accent hover:text-black transition-colors text-center"
              >
                {t('whatsapp')}
              </a>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}