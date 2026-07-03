import type { Env } from './types';

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  const url = new URL(request.url);

  // API routes are handled by functions/api/[[route]].ts
  if (url.pathname.startsWith('/api/')) {
    return new Response('Not Found', { status: 404 });
  }

  // First, try to serve the requested path as a static asset.
  // For '/', this will return index.html.
  // For '/booking', this will return 404, so we fall back to index.html.
  const assetResponse = await env.ASSETS.fetch(request);
  if (assetResponse.status === 404) {
    const indexRequest = new Request(`${url.origin}/index.html`);
    return env.ASSETS.fetch(indexRequest);
  }
  return assetResponse;
};
