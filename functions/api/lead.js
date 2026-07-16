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
    input = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid JSON body." }, 400);
  }

  if (clean(input.website, 200)) return json({ ok: true });

  const name = clean(input.name, 120);
  const email = clean(input.email, 180);
  const service = clean(input.service, 160);

  if (!name || !email || !service) {
    return json({ ok: false, error: "Name, email and service are required." }, 400);
  }

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
    priority: clean(input.priority, 40) || "Media",
    status: "Nuevo",
    estimatedValue: clean(input.estimatedValue, 40),
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
    });

    const text = await upstream.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { ok: upstream.ok, raw: text.slice(0, 300) };
    }

    if (!upstream.ok || data.ok === false) {
      return json({ ok: false, error: data.error || "The CRM rejected the lead." }, 502);
    }

    return json({ ok: true, leadId: data.leadId || null });
  } catch (error) {
    return json({
      ok: false,
      error: error instanceof Error ? error.message : "CRM connection failed.",
    }, 502);
  }
}
