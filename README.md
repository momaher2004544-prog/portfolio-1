# Mohamed Maher Portfolio

Personal portfolio website for Mohamed Maher, a Cairo-based digital marketer and e-commerce specialist.

## Tech Stack

- Next.js 14 (App Router)
- Tailwind CSS
- Framer Motion
- next-intl (English/Arabic with RTL support)
- Gemini 2.5 Flash API (Chatbot)
- Formspree (Contact form)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy `.env.local.example` to `.env.local` and fill in your API keys:
   ```bash
   cp .env.local.example .env.local
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Deployment

Deploy to Vercel:

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard:
   - `GEMINI_API_KEY`
   - `NEXT_PUBLIC_FORMSPREE_ID`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`
4. Deploy

## Sections

1. **Hero** - Animated name typing, bilingual taglines, CTA buttons
2. **Stats** - 5 stat cards with CountUp animations
3. **Services** - 6 service cards with staggered animations
4. **Case Study** - Roqqei (رُقيّ) full-width case study with timeline
5. **Credibility Strip** - Location badges with fade-in
6. **About** - Bilingual paragraphs (EN/AR)
7. **Contact** - Formspree form + WhatsApp button
8. **Chatbot** - Floating chat with Gemini 2.5 Flash

## Design

- Background: #0E0E0D
- Text: #F5F2EC
- Accent: #BA7517 (gold)
- Fonts: DM Serif Display (headings), DM Mono (labels/stats)
- No gradients, no stock photos
- Clean, editorial, minimal