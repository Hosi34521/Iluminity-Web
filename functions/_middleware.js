// Internal working files must not be served by the public Pages site.
export async function onRequest(context) {
  let path;
  try { path = decodeURIComponent(new URL(context.request.url).pathname).toLowerCase(); }
  catch { return new Response('Bad request', {status:400}); }
  const blocked = /(?:^|\/)(?:admin(?:\.html)?|google-apps-script\.gs|iluminity-cloudflare-upload\.zip)$/.test(path)
    || path === '/assets/js/admin.js'
    || /\.(?:md|gs|zip)$/.test(path)
    || /(?:^|\/)\.(?:git|env)(?:\/|$|\.)/.test(path);
  if (blocked) return new Response('Not found', {status:404,headers:{'cache-control':'no-store'}});
  const response = await context.next();
  const secured = new Response(response.body,response);
  secured.headers.set('X-Content-Type-Options','nosniff');
  secured.headers.set('Referrer-Policy','strict-origin-when-cross-origin');
  secured.headers.set('Permissions-Policy','camera=(), microphone=(), geolocation=()');
  return secured;
}
