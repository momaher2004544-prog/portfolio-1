'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const sections = [
  { id: 'work', label: 'Work' },
  { id: 'services', label: 'Services' },
  { id: 'case-study', label: 'Case Study' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const offsets = sections.map(s => {
        const el = document.getElementById(s.id);
        return { id: s.id, top: el?.getBoundingClientRect().top ?? Infinity };
      });
      const current = offsets.find(o => o.top > 0 && o.top < 300);
      if (current) setActive(current.id);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 lg:px-12 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(14,14,13,0.8)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-display text-xl text-accent tracking-wide"
          >
            MM
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`text-xs font-mono tracking-wider uppercase transition-colors ${
                  active === s.id ? 'text-accent' : 'text-gray-400 hover:text-foreground'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Mobile slide-in menu */}
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
              className="w-64 bg-[#0E0E0D] border-l border-white/10 p-8 flex flex-col gap-6"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <div className="flex justify-end">
                <button onClick={() => setMenuOpen(false)}>
                  <X className="w-5 h-5 text-foreground" />
                </button>
              </div>
              {sections.map(s => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`text-sm font-mono tracking-wider uppercase text-left ${
                    active === s.id ? 'text-accent' : 'text-gray-400'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}