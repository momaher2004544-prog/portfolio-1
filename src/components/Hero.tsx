'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Send } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Hero() {
  const t = useTranslations('hero');
  const name = t('name');
  const tagline = t('tagline');
  const taglineAr = t('taglineAr');

  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi 👋 I'm Mo's AI assistant. Ask me anything about his services, experience, or how to work with him." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            ...messages,
            userMessage
          ]
        })
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I hit an error. Please try again or use the contact form.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="work" className="min-h-screen flex items-center px-4 md:px-8 lg:px-12 py-24 pt-32">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
        {/* LEFT COLUMN */}
        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-7xl xl:text-8xl mb-6 leading-tight">
            {name.split('').map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.1, delay: index * 0.04 }}
              >
                {letter}
              </motion.span>
            ))}
          </h1>

          <motion.div
            className="space-y-3 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <h2 className="text-base sm:text-lg md:text-xl font-mono accent-text">{tagline}</h2>
            <h2 className="text-sm sm:text-base md:text-lg font-mono text-gray-400">{taglineAr}</h2>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <button className="px-6 py-3 border border-accent text-accent hover:bg-accent hover:text-black transition-colors text-sm font-mono">
              {t('viewWork')}
            </button>
            <button className="px-6 py-3 bg-accent text-black hover:bg-opacity-90 transition-colors text-sm font-mono">
              {t('contactMe')}
            </button>
          </motion.div>

          <motion.p
            className="text-xs sm:text-sm text-gray-500 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.5 }}
          >
            {t('workedWith')}
          </motion.p>
        </motion.div>

        {/* RIGHT COLUMN — embedded chat */}
        <motion.div
          className="lg:col-span-2 w-full"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div
            style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '20px' }}
            className="bg-[#0E0E0D] flex flex-col h-[420px]"
          >
            {/* Header */}
            <div className="flex items-center gap-2 pb-3 border-b border-white/10 mb-3">
              <span className="w-2 h-2 bg-green-500 rounded-full inline-block" />
              <span className="text-xs font-mono text-accent tracking-wider">MO'S ASSISTANT</span>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-accent/20 text-foreground ml-6'
                      : 'bg-white/5 text-gray-200 mr-6'
                  }`}
                >
                  {msg.content}
                </div>
              ))}
              {isLoading && (
                <div className="bg-white/5 text-gray-200 p-3 rounded-xl text-sm mr-6">
                  Thinking...
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="flex gap-2 pt-3 border-t border-white/10 mt-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask me anything..."
                className="flex-1 bg-transparent border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-foreground outline-none focus:border-accent transition-colors placeholder:text-gray-600"
              />
              <button
                onClick={sendMessage}
                className="bg-accent text-black p-3 rounded-xl hover:bg-opacity-90 transition-colors flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}