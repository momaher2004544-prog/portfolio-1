'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

const TOTAL_PAGES = 220;

export default function RunningHead() {
  const t = useTranslations('runningHead');
  const [page, setPage] = useState(8);

  useEffect(() => {
    const update = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const progress = h > 0 ? Math.max(0, Math.min(1, window.scrollY / h)) : 0;
      setPage(8 + Math.floor(progress * (TOTAL_PAGES - 8)));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <header className="running-head" aria-hidden="true">
      <span>{t('name')}</span>
      <span className="hidden sm:block">{t('edition')}</span>
      <span>
        {t('page')} <span>{String(page).padStart(3, '0')}</span>
      </span>
    </header>
  );
}
