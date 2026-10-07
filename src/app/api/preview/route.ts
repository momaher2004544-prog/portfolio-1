const ALLOWED_HOSTS = new Set([
  'parischic.ae',
  'www.parischic.ae',
  '07arad-ex.myshopify.com',
  'roqqei.com',
  'www.roqqei.com',
  'burgerbit.vercel.app',
  'gtvegypt.vercel.app',
]);

export async function GET(request: Request) {
  const raw = new URL(request.url).searchParams.get('u');
  if (!raw) return new Response('Missing u', { status: 400 });

  let target: URL;
  try {
    target = new URL(raw);
  } catch {
    return new Response('Invalid url', { status: 400 });
  }

  if (
    (target.protocol !== 'https:' && target.protocol !== 'http:') ||
    !ALLOWED_HOSTS.has(target.hostname)
  ) {
    return new Response('Not allowed', { status: 403 });
  }

  try {
    const upstream = await fetch(target, {
      redirect: 'follow',
      cache: 'no-store',
      signal: AbortSignal.timeout(15000),
      headers: {
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'accept-language': 'en-US,en;q=0.9,ar;q=0.8',
      },
    });

    const contentType = upstream.headers.get('content-type') ?? '';
    if (!upstream.ok || !contentType.includes('text/html')) {
      return new Response('Upstream unavailable', { status: 502 });
    }

    const finalUrl = upstream.url || target.href;
    const baseTag = `<base href="${finalUrl}">`;
    let html = await upstream.text();

    if (/<head[^>]*>/i.test(html)) {
      html = html.replace(/<head([^>]*)>/i, (match) => match + baseTag);
    } else {
      html = baseTag + html;
    }

    return new Response(html, {
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'public, s-maxage=120, stale-while-revalidate=600',
      },
    });
  } catch {
    return new Response('Upstream unavailable', { status: 502 });
  }
}
