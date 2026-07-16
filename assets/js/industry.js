(function () {
  document.documentElement.lang = "en";
  const slug = document.body.dataset.industry;
  const item = window.getIndustry?.(slug);
  if (!item) return;

  document.title = `${item.name} Website Templates — Iluminity`;
  document.documentElement.style.setProperty("--demo-accent", item.accent);
  const isAvailable = item.available !== false;

  if (!isAvailable) {
    const hero = document.querySelector("[data-industry-hero]");
    if (hero) hero.innerHTML = `
      <img class="industry-hero-bg" src="${item.image}" alt="">
      <div class="container">
        <div class="breadcrumbs"><a href="../index.html">Home</a><span>/</span><a href="../portafolio.html">Industries</a><span>/</span><span>${item.name}</span></div>
        <span class="eyebrow">${item.name} · ${item.es} · ${item.pt || item.es}</span>
        <h1>This collection is <span class="gradient-text">coming soon.</span></h1>
        <p>We are currently focused on building exceptional roofing websites. ${item.name} concepts are on our roadmap, and you can ask to be notified when they launch.</p>
        <div class="hero-actions" style="justify-content:flex-start;margin-top:28px">
          <a class="btn btn-primary" href="../roofing/">Explore live roofing demos</a>
          <a class="btn" target="_blank" rel="noopener" href="${window.Iluminity.emailUrl(item.name, "Early access request")}">Request early access</a>
        </div>
      </div>`;
    const heading = document.querySelector(".section-head");
    if (heading) heading.innerHTML = `<span class="eyebrow">In production</span><h2>One focused specialty <span class="gradient-text">at a time.</span></h2><p>We publish a category only when its demos are complete and ready to explore.</p>`;
    const grid = document.querySelector("[data-template-grid]");
    if (grid) grid.innerHTML = `<article class="glass-card guarantee-card reveal visible"><div><span class="eyebrow">Available now</span><h2>Start with roofing.</h2><p>Compare three genuinely different, interactive directions created for the US roofing market.</p></div><a class="btn btn-primary" href="../roofing/">Open roofing collection →</a></article>`;
    return;
  }
  const selectionHeading = document.querySelector(".section-head");
  if (selectionHeading) selectionHeading.innerHTML = `<span class="eyebrow">Choose a direction</span><h2>Complete demos, ready to <span class="gradient-text">customize.</span></h2><p>Open any concept and interact with the full website in desktop, tablet or mobile view.</p>`;

  const hero = document.querySelector("[data-industry-hero]");
  if (hero) hero.innerHTML = `
    <img class="industry-hero-bg" src="${item.image}" alt="">
    <div class="container">
      <div class="breadcrumbs"><a href="../index.html">Home</a><span>/</span><a href="../portafolio.html">Industries</a><span>/</span><span>${item.name}</span></div>
      <span class="eyebrow">${item.name} · ${item.es} · ${item.pt || item.es}</span>
      <h1>Three premium ways to <span class="gradient-text">own your market.</span></h1>
      <p>Explore three complete, interactive website directions created for ${item.name.toLowerCase()} businesses. Every concept can be customized around your brand, services and location.</p>
      <div class="industry-meta"><span class="pill">3 complete demos</span><span class="pill">Responsive</span><span class="pill">Local SEO ready</span><span class="pill">US market focused</span></div>
    </div>`;

  const descriptions = [
    "A direct, polished landing page built to turn local traffic into qualified inquiries.",
    "An editorial, high-end experience for businesses that want to lead their category.",
    "A modular conversion website built around services, trust signals and decisive calls to action."
  ];
  const styles = ["style-minimal", "style-bold", "style-modern"];
  const labels = ["Premium landing", "Editorial experience", "Conversion website"];
  const grid = document.querySelector("[data-template-grid]");
  if (grid) grid.innerHTML = item.models.map((model, index) => `
    <article class="glass-card template-card reveal">
      <div class="template-preview ${styles[index]}">
        <div class="browser-bar"><i></i><i></i><i></i></div>
        <div class="mock-site" style="background-image:url('${item.image}')">
          <div class="mock-content">
            <div class="mock-nav"><span>${model}</span><span>Get a quote</span></div>
            <span class="mock-label">${item.es}</span>
            <h3 class="mock-title">${index === 0 ? "Built around trust." : index === 1 ? "Own your category." : "Results, by design."}</h3>
            <span class="mock-button" style="--demo-accent:${item.accent}">Explore services →</span>
          </div>
        </div>
      </div>
      <div class="template-info">
        <div class="template-topline"><h3>${model}</h3><span class="template-tag">${labels[index]}</span></div>
        <p>${descriptions[index]}</p>
        <div class="template-actions">
          <a class="btn btn-primary" href="../preview.html?industry=${item.slug}&model=${index}">Open live demo ${'<svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.7"/></svg>'}</a>
          <a class="btn" target="_blank" rel="noopener" href="${window.Iluminity.emailUrl(item.name, model)}">Email us</a>
        </div>
      </div>
    </article>`).join("");

  requestAnimationFrame(() => document.querySelectorAll(".template-card").forEach((card, index) => {
    card.style.transitionDelay = `${index * 90}ms`;
    new IntersectionObserver(([entry], observer) => {
      if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.disconnect(); }
    }, { threshold: .08 }).observe(card);
  }));
})();
