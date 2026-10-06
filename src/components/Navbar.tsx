'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

const sectionIds = ['work', 'chapters', 'about', 'contact'] as const;

export default function Navbar() {
  const t = useTranslations('nav');
  const params = useParams<{ locale: string }>();
  const locale = params?.locale ?? 'en';
  const otherLocale = locale === 'ar' ? 'en' : 'ar';
  const otherLabel = locale === 'ar' ? 'EN' : 'ع';

  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const current = sectionIds.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const top = el.getBoundingClientRect().top;
        return top > 0 && top < 300;
      });
      setActive(current ?? '');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const label = (id: string) => {
    switch (id) {
      case 'work':
        return t('work');
      case 'chapters':
        return t('chapters');
      case 'about':
        return t('about');
      default:
        return t('contact');
    }
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 px-5 md:px-10 lg:px-14 transition-all duration-300"
        style={{
          background: scrolled ? 'var(--navbar-bg)' : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(10px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border-light)' : '1px solid transparent',
        }}
      >
        <div className="flex items-center justify-between h-14">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mono-label hover:text-[color:var(--accent)] transition-colors"
            aria-label="Home"
          >
            MM — Monograph
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {sectionIds.map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`mono-label transition-colors ${
                  active === id ? 'text-[color:var(--accent)]' : 'hover:text-[color:var(--text)]'
                }`}
              >
                {label(id)}
              </button>
            ))}

            <a
              href={`/${otherLocale}`}
              className="mono-label px-2 py-1 border transition-colors hover:text-[color:var(--accent)]"
              style={{ borderColor: 'var(--border)' }}
              aria-label="Switch language"
            >
              {otherLabel}
            </a>

            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="mono-label hover:text-[color:var(--accent)] transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-3">
            <a
              href={`/${otherLocale}`}
              className="mono-label px-2 py-1 border"
              style={{ borderColor: 'var(--border)' }}
              aria-label="Switch language"
            >
              {otherLabel}
            </a>
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="mono-label"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}
            <button className="text-[color:var(--text)]" onClick={() => setMenuOpen(true)} aria-label="Open menu">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex-1 bg-black/50" onClick={() => setMenuOpen(false)} />
            <motion.div
              className="w-64 p-8 flex flex-col gap-6 border-s"
              style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <div className="flex justify-end">
                <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
                  <X className="w-5 h-5" />
                </button>
              </div>
              {sectionIds.map((id) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`mono-label text-start ${
                    active === id ? 'text-[color:var(--accent)]' : ''
                  }`}
                >
                  {label(id)}
                </button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
