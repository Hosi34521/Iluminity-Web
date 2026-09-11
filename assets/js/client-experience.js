(() => {
  const br = location.pathname.startsWith('/br/') || new URLSearchParams(location.search).get('region') === 'br';
  const region = br ? '?region=br' : '';
  const root = br ? '/br/' : '/';
  const nav = document.querySelector('.nav');
  // Shared demo collections keep their original English content. The buying path retains the selected market.
  document.querySelectorAll('a[href]').forEach(a => {
    const url = new URL(a.getAttribute('href'), location.href);
    if (url.origin !== location.origin) return;
    if (br && url.pathname === '/roofing/') { a.href = '/br/roofing/' + url.hash; return; }
    if (br && url.pathname === '/index.html' && !a.closest('.nav-actions')) a.href = '/br/';
    if (br && (/\/(roofing|dental|hvac|realtor|law|restaurant|medspa|electrician|plumber|landscaping)\/$/.test(url.pathname) || /\/(preview|portafolio)(\.html)?$/.test(url.pathname))) {
      url.searchParams.set('region', 'br'); a.href = url.pathname + url.search + url.hash;
    }
  });
  if (br && document.querySelector('[data-full-catalog]')) {
    document.documentElement.lang = 'pt-BR';
    document.title = 'Demonstrações de sites — Iluminity Brasil';
    const hero = document.querySelector('.page-hero');
    hero.querySelector('.eyebrow').textContent = 'Biblioteca de demonstrações';
    hero.querySelector('h1').innerHTML = 'Compare estilos. Encontre uma <span class="gradient-text">direção.</span>';
    hero.querySelector('p').textContent = 'Dez segmentos, com três conceitos interativos em cada coleção. As demos estão em inglês e usam conteúdo de exemplo. O projeto final será adaptado ao seu negócio e ao idioma acordado.';
    hero.querySelector('.btn-primary').textContent = 'Explorar demos de telhados';
    hero.querySelector('[data-open-drawer]').textContent = 'Buscar todos os segmentos';
    document.querySelectorAll('.tile-status').forEach(el => el.textContent = 'Disponível · 3 demos');
  }
  if (br && document.querySelector('[data-industry-hero]')) {
    document.documentElement.lang = 'pt-BR';
    const hero = document.querySelector('[data-industry-hero]');
    hero.querySelector('h1').innerHTML = 'Três estilos para apresentar <span class="gradient-text">seu negócio.</span>';
    hero.querySelector('p').textContent = 'Compare os conceitos abaixo. As demos estão em inglês, com conteúdo de exemplo; o site contratado será adaptado à sua marca, serviços e idioma.';
    hero.querySelector('.industry-meta').innerHTML = '<span class="pill">3 demos interativas</span><span class="pill">Conteúdo de exemplo</span><span class="pill">Personalização por projeto</span>';
    const crumbs = hero.querySelectorAll('.breadcrumbs a');
    crumbs[0].textContent = 'Início'; crumbs[1].textContent = 'Segmentos';
    document.querySelector('.section-head').innerHTML = '<span class="eyebrow">Escolha uma direção</span><h2>Explore antes de <span class="gradient-text">decidir.</span></h2><p>Abra uma demo e alterne entre as visualizações de computador, tablet e celular.</p>';
    const descriptions = ['Uma página focada em apresentar a oferta e facilitar pedidos de orçamento.', 'Uma apresentação editorial com mais espaço para imagens e conteúdo da marca.', 'Uma estrutura modular para organizar serviços, informações e formas de contato.'];
    const labels = ['Página de apresentação', 'Experiência editorial', 'Site de serviços'];
    document.querySelectorAll('.template-info').forEach((card, i) => {
      card.querySelector('p').textContent = descriptions[i];
      card.querySelector('.template-tag').textContent = labels[i];
      card.querySelector('.btn-primary').textContent = 'Abrir demonstração →';
    });
  }
  if (nav) {
    const switcher = nav.querySelector('.region-switch');
    if (switcher) switcher.innerHTML = br ? '<a class="nav-link" href="/">US</a><span class="nav-link" aria-current="page">BR</span>' : '<span class="nav-link" aria-current="page">US</span><a class="nav-link" href="/br/">BR</a>';
    if (switcher && document.body.dataset.commercial === 'roofing') {
      switcher.innerHTML = br ? '<a class="nav-link" href="/roofing/">US</a><span class="nav-link" aria-current="page">BR</span>' : '<span class="nav-link" aria-current="page">US</span><a class="nav-link" href="/br/roofing/">BR</a>';
    }
    const center = nav.querySelector('.nav-center');
    center.innerHTML = br
      ? '<a class="nav-link" href="/br/servicos.html">Soluções</a><a class="nav-link" href="/portafolio.html?region=br">Demos</a><a class="nav-link" href="/br/servicos.html#processo">Como funciona</a><a class="nav-link" href="/br/pricing.html">Preços</a>'
      : '<a class="nav-link" href="/servicios.html">Solutions</a><a class="nav-link" href="/portafolio.html">Demos</a><a class="nav-link" href="/servicios.html#process">How we work</a><a class="nav-link" href="/pricing.html">Pricing</a>';
    const brand = nav.querySelector('.brand'); if (brand) brand.href = root;
    const primary = nav.querySelector('.nav-actions .btn-primary');
    if (primary) { primary.href = br ? '/br/contato.html' : '/contacto.html'; primary.textContent = br ? 'Vamos falar do seu projeto →' : 'Discuss your project →'; }
    const search = nav.querySelector('.nav-actions [data-open-drawer]'); if (search) search.remove();
    const button = document.createElement('button');
    button.className = 'mobile-menu-toggle'; button.type = 'button'; button.textContent = 'Menu';
    button.setAttribute('aria-expanded', 'false'); button.setAttribute('aria-controls', 'client-navigation');
    center.id = 'client-navigation'; nav.querySelector('.nav-actions').append(button);
    const close = () => { nav.classList.remove('navigation-open'); button.setAttribute('aria-expanded','false'); };
    button.addEventListener('click', () => { const open = button.getAttribute('aria-expanded') !== 'true'; nav.classList.toggle('navigation-open', open); button.setAttribute('aria-expanded', String(open)); });
    center.addEventListener('click', close);
    document.addEventListener('keydown', e => { if(e.key === 'Escape' && nav.classList.contains('navigation-open')) { close(); button.focus(); } });
  }
  const footer = document.querySelector('.footer-links');
  if (footer) {
    const description = footer.parentElement.querySelector('span');
    if (description) description.textContent = `© ${new Date().getFullYear()} Iluminity. ${br ? 'Sites, sistemas e automações para negócios.' : 'Websites, systems and automations for businesses.'}`;
    footer.innerHTML = br
      ? '<a href="/br/servicos.html">Soluções e processo</a><a href="/portafolio.html?region=br">Demos</a><a href="/br/pricing.html">Preços</a><a href="/br/contato.html">Contato</a><a href="/br/privacidade.html">Privacidade</a><a href="/terms.html">Termos (inglês)</a><a href="https://www.instagram.com/iluminity.studio/" target="_blank" rel="noopener">Instagram</a>'
      : '<a href="/servicios.html">Solutions & process</a><a href="/portafolio.html">Demos</a><a href="/pricing.html">Pricing</a><a href="/contacto.html">Contact</a><a href="/privacy.html">Privacy</a><a href="/terms.html">Terms</a><a href="https://www.instagram.com/iluminity.studio/" target="_blank" rel="noopener">Instagram</a>';
  }
  const flow = document.querySelector('[data-client-flow]');
  if (flow) {
    const steps = [...flow.querySelectorAll('[data-flow-step]')];
    const demoButton = flow.querySelector('button'); const status = flow.querySelector('[role="status"]');
    let timers = [];
    demoButton.addEventListener('click', () => {
      timers.forEach(clearTimeout); steps.forEach(s => s.classList.remove('is-complete')); demoButton.disabled = true;
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      steps.forEach((s,i) => timers.push(setTimeout(() => {
        s.classList.add('is-complete');
        if(i === steps.length - 1) { status.textContent = br ? 'Simulação concluída. Nenhuma mensagem foi enviada.' : 'Simulation complete. No messages were sent.'; demoButton.disabled = false; demoButton.textContent = br ? 'Repetir demonstração' : 'Replay demonstration'; }
      },reduced ? 0 : i * 650)));
    });
  }
})();
