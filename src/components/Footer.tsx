'use client';

import { Linkedin, Github, MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '201064375882';
const LINKEDIN = 'https://www.linkedin.com/in/mohammed-maher-0074b4412/';
const GITHUB = 'https://github.com/momaher2004544-prog';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="px-5 md:px-10 lg:px-14 py-8 border-t" style={{ borderColor: 'var(--rule)' }}>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mono-label">
        <p>{t('rights')}</p>
        <p className="hidden md:block">{t('setIn')} — {t('built')}</p>
        <div className="flex items-center gap-5">
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="hover:text-[color:var(--accent)] transition-colors" aria-label="LinkedIn">
            <Linkedin className="w-4 h-4" />
          </a>
          <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="hover:text-[color:var(--accent)] transition-colors" aria-label="GitHub">
            <Github className="w-4 h-4" />
          </a>
          <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="hover:text-[color:var(--accent)] transition-colors" aria-label="WhatsApp">
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
