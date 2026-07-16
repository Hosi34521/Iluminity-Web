(function () {
  const base = document.body.dataset.base || "";
  const catalog = window.ILUMINITY_CATALOG || [];
  const SALES_EMAIL = "iluminity.studio@gmail.com";
  const INSTAGRAM_URL = "https://www.instagram.com/iluminity.studio/";

  document.head.insertAdjacentHTML("beforeend", `<link rel="icon" href="${base}favicon.svg" type="image/svg+xml"><link rel="manifest" href="${base}site.webmanifest">`);

  const arrow = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const searchIcon = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.7"/><path d="m16 16 4 4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>';

  function shell() {
    const header = document.querySelector("[data-header]");
    const drawer = document.querySelector("[data-drawer]");
    const footer = document.querySelector("[data-footer]");

    if (header) {
      header.innerHTML = `
        <header class="site-header">
          <nav class="nav" aria-label="Main navigation">
            <a class="brand gradient-text" href="${base}index.html">iluminity</a>
            <div class="nav-center">
              <a class="nav-link" href="${base}servicios.html">Services</a>
              <a class="nav-link" href="${base}portafolio.html">Web demos</a>
              <button class="nav-link" data-open-drawer style="border:0;background:none;cursor:pointer">Industries ↓</button>
              <a class="nav-link" href="${base}pricing.html">Pricing</a>
            </div>
            <div class="nav-actions">
              <button class="icon-button" data-open-drawer aria-label="Open website catalog">${searchIcon}</button>
              <a class="btn btn-primary btn-sm" href="${base}contacto.html">Start a project ${arrow}</a>
            </div>
          </nav>
        </header>`;
    }

    if (drawer) {
      drawer.innerHTML = `
        <div class="drawer-backdrop" data-close-drawer></div>
        <aside class="drawer" aria-label="Website catalog by industry" aria-hidden="true">
          <div class="drawer-top">
            <div><span class="eyebrow">Explore</span><h2 class="drawer-title">Websites by industry</h2></div>
            <button class="icon-button" data-close-drawer aria-label="Close website catalog">✕</button>
          </div>
          <div class="search-wrap">${searchIcon}<input class="industry-search" type="search" placeholder="Search: restaurant, dentist, lawyer..." aria-label="Search industries"></div>
          <div class="drawer-meta"><span>English + Español + Português</span><span data-result-count>${catalog.length} industries</span></div>
          <div class="industry-list" data-industry-list></div>
          <div class="empty-search" data-empty-search>No matching industry.<br>Try another keyword.</div>
        </aside>`;
      renderIndustryList(catalog);
    }

    if (footer) {
      footer.innerHTML = `
        <footer><div class="container footer-inner">
          <span>© ${new Date().getFullYear()} Iluminity. Independent web design studio.</span>
          <div class="footer-links"><a href="${base}servicios.html">Services</a><a href="${base}portafolio.html">Demos</a><a href="${base}pricing.html">Pricing</a><a href="${INSTAGRAM_URL}" target="_blank" rel="noopener">Instagram</a><a href="${base}terms.html">Terms</a></div>
        </div></footer>`;
    }
  }

  function normalize(value) {
    return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function renderIndustryList(items) {
    const list = document.querySelector("[data-industry-list]");
    if (!list) return;
    list.innerHTML = items.map((item) => {
      const isAvailable = item.available !== false;
      const tag = isAvailable ? '<span class="availability-tag live">3 live demos</span>' : '<span class="availability-tag">Coming soon</span>';
      const content = `
        <img class="industry-thumb" src="${item.image}" alt="${item.name} website concept" loading="lazy">
        <div><h4>${item.name} <span style="color:var(--muted);font-family:Inter;font-weight:300">/ ${item.es} / ${item.pt || item.es}</span></h4><p>${item.description}</p>${tag}</div>
        <span class="industry-arrow">${isAvailable ? "↗" : "·"}</span>`;
      return isAvailable
        ? `<a class="industry-item" href="${base}${item.slug}/">${content}</a>`
        : `<div class="industry-item is-upcoming" aria-label="${item.name}, coming soon">${content}</div>`;
    }).join("");

    const count = document.querySelector("[data-result-count]");
    const empty = document.querySelector("[data-empty-search]");
    if (count) count.textContent = `${items.length} ${items.length === 1 ? "industry" : "industries"}`;
    if (empty) empty.style.display = items.length ? "none" : "block";
  }

  function bindDrawer() {
    const drawer = document.querySelector(".drawer");
    const input = document.querySelector(".industry-search");
    const open = () => {
      document.body.classList.add("menu-open");
      drawer?.setAttribute("aria-hidden", "false");
      setTimeout(() => input?.focus(), 250);
    };
    const close = () => {
      document.body.classList.remove("menu-open");
      drawer?.setAttribute("aria-hidden", "true");
    };

    document.querySelectorAll("[data-open-drawer]").forEach((button) => button.addEventListener("click", open));
    document.querySelectorAll("[data-close-drawer]").forEach((button) => button.addEventListener("click", close));
    document.addEventListener("keydown", (event) => { if (event.key === "Escape") close(); });

    input?.addEventListener("input", () => {
      const term = normalize(input.value.trim());
      const filtered = catalog.filter((item) => normalize([item.name, item.es, item.pt || "", item.slug, ...item.aliases].join(" ")).includes(term));
      renderIndustryList(filtered);
    });
  }

  function ambient() {
    document.body.insertAdjacentHTML("afterbegin", `
      <div class="progress" aria-hidden="true"></div><div class="orb one"></div><div class="orb two"></div>
      <svg class="grain" aria-hidden="true"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency=".86" numOctaves="4" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="100%" height="100%" filter="url(#noise)"/></svg>`);

    const progress = document.querySelector(".progress");
    const update = () => {
      const length = document.documentElement.scrollHeight - innerHeight;
      progress.style.width = `${length > 0 ? scrollY / length * 100 : 0}%`;
    };
    addEventListener("scroll", update, { passive: true });
    addEventListener("pointermove", (event) => {
      document.documentElement.style.setProperty("--cx", `${event.clientX}px`);
      document.documentElement.style.setProperty("--cy", `${event.clientY}px`);
    }, { passive: true });
    update();
  }

  function reveals() {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    }), { threshold: .1 });
    document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
  }

  shell();
  ambient();
  bindDrawer();
  reveals();

  window.Iluminity = {
    emailUrl(industry, model) {
      const subject = `Website inquiry — ${industry || "Custom project"}${model ? ` / ${model}` : ""}`;
      const body = [
        "Hello Iluminity,",
        "",
        `I'm interested in the ${industry || "custom website"}${model ? ` — ${model}` : ""} design.`,
        "",
        "My business name:",
        "City / State:",
        "Main services:",
        "Preferred launch date:",
        "",
        "Please send me the next steps and a project estimate.",
        "",
        "Thank you."
      ].join("\n");
      return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(SALES_EMAIL)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    },
    salesEmail: SALES_EMAIL,
    instagram: INSTAGRAM_URL
  };
})();