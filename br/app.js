(function () {
  const base = "../";
  const instagram = "https://www.instagram.com/iluminity.studio/";
  const header = document.querySelector("[data-header]");
  const footer = document.querySelector("[data-footer]");

  document.head.insertAdjacentHTML("beforeend", `<link rel="icon" href="${base}favicon.svg" type="image/svg+xml">`);

  if (header) header.innerHTML = `
    <header class="site-header"><nav class="nav" aria-label="Navegação principal">
      <a class="brand gradient-text" href="index.html">iluminity</a>
      <div class="nav-center">
        <a class="nav-link" href="index.html">Início</a>
        <a class="nav-link" href="pricing.html">Preços</a>
        <a class="nav-link" href="contato.html">Contato</a>
      </div>
      <div class="nav-actions">
        <a class="nav-link" href="../index.html" aria-label="Versão dos Estados Unidos">US</a>
        <span class="nav-link" aria-current="page">BR</span>
        <a class="btn btn-primary btn-sm" href="contato.html">Pedir proposta →</a>
      </div>
    </nav></header>`;

  if (footer) footer.innerHTML = `
    <footer><div class="container footer-inner">
      <span>© ${new Date().getFullYear()} Iluminity Studio. Sites para negócios locais.</span>
      <div class="footer-links"><a href="index.html">Início</a><a href="pricing.html">Preços</a><a href="contato.html">Contato</a><a href="${instagram}" target="_blank" rel="noopener">Instagram</a><a href="../terms.html">Termos</a></div>
    </div></footer>`;

  document.body.insertAdjacentHTML("afterbegin", `<div class="progress" aria-hidden="true"></div><div class="orb one"></div><div class="orb two"></div>`);
  const progress = document.querySelector(".progress");
  const update = () => {
    const length = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.width = `${length > 0 ? scrollY / length * 100 : 0}%`;
  };
  addEventListener("scroll", update, { passive: true });
  update();

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
    }), { threshold: .1 });
    document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
  } else {
    document.querySelectorAll(".reveal").forEach((node) => node.classList.add("visible"));
  }
})();