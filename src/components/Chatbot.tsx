'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Zap, Clock, DollarSign } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SYSTEM_PROMPT = `You are Mo's assistant. You talk like a confident, straight-talking salesperson — not a chatbot. You're here to help the visitor understand what Mo can do for their business and push them toward taking action.

WHO IS MO
Mohamed Maher. Cairo-based. Digital marketer, e-commerce operator, frontend developer. He's not just a freelancer — he runs Roqqei, a real Egyptian fashion brand he built and scaled himself.

ROQQEI NUMBERS (his proof):
- ج.م.1M+ revenue generated
- 4.2x ROAS on Meta Ads
- CPA as low as ج.م.42 per purchase
- Conversion rate: 0.49% → 1%+
- 814 orders processed

WHAT MO DOES:
- Meta Ads (e-commerce + lead gen)
- Google Ads for B2B
- Shopify store setup & optimization
- SEO
- Website development (React / Next.js)
- Code consulting for founders

TONE RULES — this is critical:
- Sound like a sharp, friendly salesperson. Confident. Direct.
- Short. Max 2-3 sentences per reply unless they ask for detail.
- Ask questions to understand their business. Then connect it to what Mo does.
- No bullet lists unless they ask. No markdown formatting. Just talk.
- Never say "Certainly!", "Great question!", "Of course!" — ever.
- No corporate speak. No fluff.
- If they write Arabic, reply in Arabic. Same energy.

SALES RULES:
- First priority: understand what problem they have. Ask one question.
- After 2-3 messages, push them to act: "Best move is to reach out directly — contact form or WhatsApp, Mo will get back to you fast."
- Never quote prices. Never make promises about timelines.
- If you don't know something, redirect: "Easiest way to find out is to ask Mo directly."

NEVER:
- Use bullet points in casual replies
- Sound like a robot or a generic AI
- Say more than needed
- Use asterisks or bold or any markdown formatting in replies`;

const quickActions = [
  { label: 'Services', icon: Zap, prompt: 'What services does Mo offer?' },
  { label: 'Rates', icon: DollarSign, prompt: 'What are Mo\'s rates?' },
  { label: 'Case Study', icon: Clock, prompt: 'Tell me about Roqqei case study' },
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hey — I'm Mo's assistant. Tell me what your business needs and I'll tell you if Mo's the right person for it." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMessage: Message = { role: 'user', content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsTyping(true);

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
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I hit an error. Please try again or use the contact form.' }]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        className="fixed bottom-6 right-6 w-14 h-14 bg-accent text-black rounded-full flex items-center justify-center shadow-lg z-50 overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-4 md:right-6 w-[calc(100vw-2rem)] md:w-96 bg-card border border-border rounded-2xl shadow-2xl z-50 overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {/* Header */}
            <div className="p-4 border-b border-border bg-gradient-to-r from-accent/10 to-transparent">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-lg">🤖</span>
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
                </div>
                <div>
                  <h3 className="font-display text-lg">Mo's Assistant</h3>
                  <p className="text-xs text-text-muted flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Online
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-72 md:h-80 overflow-y-auto p-4 space-y-4 scrollbar-thin">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-accent text-black rounded-br-md'
                        : 'bg-background border border-border text-foreground/90 rounded-bl-md'
                    }`}
                  >
                    {msg.content.split('\n').map((line, i) => (
                      <p key={i} className={i > 0 ? 'mt-2' : ''}>{line}</p>
                    ))}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-background border border-border p-3 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Quick actions */}
              {messages.length === 1 && !isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-2 mt-4"
                >
                  {quickActions.map((action) => (
                    <button
                      key={action.label}
                      onClick={() => sendMessage(action.prompt)}
                      className="flex items-center gap-2 px-3 py-2 text-xs bg-background border border-border rounded-full hover:border-accent hover:text-accent transition-colors"
                    >
                      <action.icon className="w-3 h-3" />
                      {action.label}
                    </button>
                  ))}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border bg-card">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground outline-none focus:border-accent transition-colors placeholder:text-text-dim"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isLoading}
                  className="bg-accent text-black p-2.5 rounded-xl hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
              <p className="text-[10px] text-text-dim text-center mt-2">Powered by AI • Mo's Portfolio</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}