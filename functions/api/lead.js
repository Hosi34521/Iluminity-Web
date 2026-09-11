const JSON_HEADERS = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
};

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), { status, headers: JSON_HEADERS });
}

function clean(value, max = 500) {
  if (value === undefined || value === null) return "";
  return String(value).trim().slice(0, max);
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "access-control-allow-origin": "https://iluminitystudio.pages.dev",
      "access-control-allow-methods": "POST, OPTIONS",
      "access-control-allow-headers": "content-type",
      "access-control-max-age": "86400",
    },
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.LEAD_APPS_SCRIPT_URL || !env.LEAD_FORM_TOKEN) {
    return json({ ok: false, error: "Lead service is not configured." }, 503);
  }

  const origin = request.headers.get("origin") || "";
  const allowedOrigins = new Set([
    "https://iluminitystudio.pages.dev",
    "https://www.iluminitystudio.pages.dev",
  ]);

  if (origin && !allowedOrigins.has(origin)) {
    return json({ ok: false, error: "Origin not allowed." }, 403);
  }

  let input;
  try {
    if (!request.headers.get('content-type')?.includes('application/json')) return json({ok:false,error:'Invalid content type.'},415);
    const reader = request.body?.getReader();
    if (!reader) return json({ok:false,error:'Missing body.'},400);
    const chunks=[]; let size=0;
    while(true) { const {done,value}=await reader.read(); if(done) break; size+=value.byteLength; if(size>16384) { await reader.cancel(); return json({ok:false,error:'Request too large.'},413); } chunks.push(value); }
    const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}
    input = JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    return json({ ok: false, error: "Invalid JSON body." }, 400);
  }

  if (!input || typeof input !== 'object' || Array.isArray(input)) return json({ok:false,error:'Invalid request.'},400);

  if (clean(input.website, 200)) return json({ ok: true });

  const name = clean(input.name, 120);
  const email = clean(input.email, 180);
  const service = clean(input.service, 160);

  if (!name || !email || !service) {
    return json({ ok: false, error: "Name, email and service are required." }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ok:false,error:'Invalid email.'},400);

  const payload = {
    token: env.LEAD_FORM_TOKEN,
    company: clean(input.company, 180) || "Lead desde la web",
    name,
    email,
    phone: clean(input.phone, 80),
    location: clean(input.location, 180),
    industry: clean(input.industry, 160),
    source: "Web",
    service,
    priority: "Media",
    status: "Nuevo",
    estimatedValue: clean(input.estimatedValue, 160),
    message: clean(input.message, 5000),
    pageUrl: clean(input.pageUrl, 1000),
    language: clean(input.language, 10) || "en",
  };

  try {
    const upstream = await fetch(env.LEAD_APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "follow",
      signal: AbortSignal.timeout(10000),
    });

    const text = await upstream.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return json({ok:false,error:'Unable to confirm delivery.'},502);
    }

    if (!upstream.ok || data?.ok !== true) {
      return json({ ok: false, error: "Unable to confirm delivery." }, 502);
    }

    return json({ ok: true, leadId: data.leadId || null });
  } catch (error) {
    return json({
      ok: false,
      error: "Unable to confirm delivery.",
    }, 502);
  }
}
