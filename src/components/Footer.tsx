'use client';

import { Linkedin, Github, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-6 px-4 md:px-8 lg:px-12 border-t border-light">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-text-dim font-mono">
        <p>© 2026 Mohamed Maher</p>
        <p>Built with Next.js & AI</p>
        <div className="flex items-center gap-4">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
            <Linkedin className="w-4 h-4" />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
            <Github className="w-4 h-4" />
          </a>
          <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '79002023946'}`} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}