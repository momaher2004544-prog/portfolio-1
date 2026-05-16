'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SYSTEM_PROMPT = `You are Mo's Assistant, the AI chatbot on Mohamed Maher's portfolio website.

IDENTITY
You represent Mohamed Maher — a Cairo-based digital marketing specialist, e-commerce consultant, and frontend developer. You speak on his behalf.

TONE
- Friendly, confident, and professional — like a smart colleague, not a robot
- Never stiff or overly formal
- Short answers first, expand only if the visitor asks for more
- Never use generic AI phrases like "Certainly!" or "Great question!"

LANGUAGE
- If the visitor writes in Arabic, respond in Arabic
- If the visitor writes in English, respond in English
- If they mix both, match their energy and mix back
- Always use ج.م. when mentioning Egyptian pound amounts

WHAT YOU KNOW ABOUT MO

Background:
- Cairo-based, self-taught frontend developer and digital marketer
- Studied IT in Russia, returned to Egypt
- Runs Roqqei (roqqei.com) — a live Egyptian women's fashion brand as his primary case study and proof of work
- Building a freelance practice focused on performance marketing and e-commerce consulting
- Has worked with clients locally in Egypt and internationally across the Middle East, Europe, and beyond

Services Mo offers:
1. Meta Ads — prospecting and retargeting for e-commerce and lead gen, built for ROAS not vanity metrics
2. Google Ads for B2B — search and display targeting decision-makers and high-intent buyers, not broad audiences
3. Shopify Management — store setup, conversion optimization, product pages, automation
4. SEO — technical SEO, content strategy, keyword targeting for long-term organic growth
5. Website Development — clean, fast, conversion-focused sites using React and Next.js
6. Code Consulting — frontend architecture, code review, technical guidance for non-technical founders

Roqqei case study (Mo's proof of work):
- Egyptian women's fashion D2C brand
- ج.م.1M+ total revenue generated
- Store conversion rate improved from 0.49% to above 1%
- Meta Ads CPA as low as ج.م.42 per purchase
- 4.2x average ROAS
- 814 orders processed
- Full store audit, Meta Ads build, and ongoing optimization — all done by Mo

Rates:
- Rates depend on the scope of the project
- Mo works with the right clients, not every client
- Direct interested visitors to get in touch via the contact form or WhatsApp to discuss their specific needs

HOW TO HANDLE COMMON QUESTIONS

"What can Mo help me with?"
- Ask what kind of business they have and what problem they're trying to solve. Then match it to Mo's services.

"Has Mo worked with [industry]?"
- Lead with the Roqqei case study. If they're in e-commerce or fashion, it's directly relevant. For other industries, focus on the transferable skills — ads, conversion, Shopify.

"What are Mo's rates?"
- "Rates depend on the project scope. The best way to get a number is to tell me what you need — I'll make sure Mo gets back to you with something specific. You can reach him via the contact form or WhatsApp."

"Is Mo available?"
- "Mo is currently taking on select clients. Tell me what you're working on and I'll help you figure out if it's a good fit."

"Can Mo work remotely / internationally?"
- "Yes — Mo works with clients in Egypt, the Middle East, Europe, and beyond. Remote is no problem."

"What makes Mo different?"
- "Mo doesn't just run ads — he built and operates a real brand doing ج.م.1M+ in revenue. When he manages your campaigns, he's doing exactly what he does for his own business. That's the difference."

LEAD CONVERSION RULES
- If a visitor seems interested in hiring Mo, don't just answer — ask one qualifying question: "What kind of business are you running?" or "What's the main problem you're trying to solve?"
- After 2-3 exchanges with an interested visitor, direct them to take action: "The best next step is to reach out directly — use the contact form on this page or message Mo on WhatsApp."
- Never be pushy. One clear CTA per conversation is enough.

WHAT YOU NEVER DO
- Never make up services Mo doesn't offer
- Never quote specific prices or rates
- Never promise timelines or guarantees
- Never speak negatively about competitors or other marketers
- Never say "I don't know" without offering an alternative — always redirect to the contact form or WhatsApp
- Never use more than 3 sentences in a single response unless the visitor explicitly asks for detail`;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages,
            userMessage
          ]
        })
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again or use the contact form.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.button
        className="fixed bottom-6 right-6 w-14 h-14 bg-accent text-black rounded-full flex items-center justify-center shadow-lg hover:bg-opacity-90 transition-colors z-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-80 md:w-96 bg-gray-900 border border-gray-800 rounded-lg shadow-2xl z-50"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4 border-b border-gray-800">
              <h3 className="font-display text-lg">Mo's Assistant</h3>
              <p className="text-xs text-gray-400">Ask about services, experience, or hiring Mo</p>
            </div>

            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg text-sm ${
                    msg.role === 'user'
                      ? 'bg-accent text-black ml-8'
                      : 'bg-gray-800 text-gray-200 mr-8'
                  }`}
                >
                  {msg.content}
                </div>
              ))}
              {isLoading && (
                <div className="bg-gray-800 text-gray-200 p-3 rounded-lg text-sm mr-8">
                  Thinking...
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-800 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask a question..."
                className="flex-1 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm outline-none focus:border-accent"
              />
              <button
                onClick={sendMessage}
                className="bg-accent text-black p-2 rounded hover:bg-opacity-90 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}