import { NextResponse } from 'next/server';

const SYSTEM_INSTRUCTION = "You are Mo's Assistant on Mohamed Maher's portfolio website.\nMo is a Cairo-based digital marketing specialist and frontend developer. He offers: Meta Ads, Google Ads for B2B, Shopify Management, SEO, Website Development, and Code Consulting.\n\nHis main proof of work is Roqqei — an Egyptian women's fashion brand with ج.م.1M+ revenue, 4.2x ROAS, ج.م.42 CPA on Meta Ads, and conversion rate improved from 0.49% to 1%+.\n\nHe works with clients in Egypt, Middle East, Europe and globally.\nRates depend on project scope — always direct to contact form or WhatsApp for pricing.\n\nTone: friendly, confident, short answers first.\nSwitch to Arabic if visitor writes in Arabic.\nNever quote prices. Never say I don't know without redirecting.\nAfter 2-3 exchanges with interested visitor, push them to contact Mo via the form or WhatsApp.";

export async function POST(request: Request) {
  const { messages } = await request.json();

  const chatMessages = messages.filter((m: any) => m.role !== 'system');

  try {
    const body: any = {
      contents: chatMessages.map((msg: any) => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      })),
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048
      }
    };

    if (SYSTEM_INSTRUCTION) {
      body.systemInstruction = {
        parts: [{ text: SYSTEM_INSTRUCTION }]
      };
    }

    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': process.env.GEMINI_API_KEY || ''
        },
        body: JSON.stringify(body)
      }
    );

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text || 'I apologize, I could not process your request.';

    return NextResponse.json({ content });
  } catch (error) {
    return NextResponse.json({ content: 'Sorry, I encountered an error. Please try again or use the contact form.' }, { status: 500 });
  }
}