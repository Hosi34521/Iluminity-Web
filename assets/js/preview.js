(function () {
  const params = new URLSearchParams(location.search);
  const item = window.getIndustry?.(params.get("industry")) || window.ILUMINITY_CATALOG[0];
  const modelIndex = Math.min(2, Math.max(0, Number(params.get("model") || 0)));
  const model = item.models[modelIndex];
  const email = "iluminity.inc@gmail.com";

  const industryCopy = {
    roofing: { service: "Roof Replacement", service2: "Storm Damage", proof: "Licensed & insured", metric: "Workmanship protection", heroes: ["Roof problems.<br>Clear answers.<br><em>Right when it matters.</em>", "Roofing, resolved with <em>care.</em>", "Local roofers.<br><em>Real protection.</em>"] },
    dental: { service: "General Dentistry", service2: "Cosmetic Care", proof: "Patient-first care", metric: "Same-week appointments", heroes: ["Comfortable care.<br>Confident smiles.<br><em>All in one place.</em>", "Modern dentistry, designed around <em>you.</em>", "Your local dental team.<br><em>Gentle by design.</em>"] },
    hvac: { service: "AC Repair", service2: "Heating Systems", proof: "Responsive local service", metric: "Upfront pricing", heroes: ["Comfort restored.<br>Answers upfront.<br><em>Help when it matters.</em>", "Indoor comfort, engineered with <em>care.</em>", "Local HVAC experts.<br><em>Ready for every season.</em>"] },
    realtor: { service: "Buy a Home", service2: "Sell with Confidence", proof: "Local market guidance", metric: "Buyer and seller support", heroes: ["Move with clarity.<br>Negotiate with confidence.<br><em>Feel at home.</em>", "Real estate guidance for a move that matters <em>more.</em>", "Local market knowledge.<br><em>Personal representation.</em>"] },
    law: { service: "Legal Counsel", service2: "Case Evaluation", proof: "Confidential guidance", metric: "Confidential case review", heroes: ["Clear counsel.<br>Focused strategy.<br><em>Your next step.</em>", "Measured legal guidance when the outcome <em>matters.</em>", "Local counsel.<br><em>Serious representation.</em>"] },
    restaurant: { service: "Seasonal Menu", service2: "Private Dining", proof: "Locally sourced", metric: "Open Tuesday–Sunday", heroes: ["Seasonal cooking.<br>Warm hospitality.<br><em>A table worth sharing.</em>", "Dining, considered down to the last <em>detail.</em>", "Your neighborhood table.<br><em>Made memorable.</em>"] },
    medspa: { service: "Skin Treatments", service2: "Body Aesthetics", proof: "Clinician-led care", metric: "Complimentary consultation", heroes: ["Subtle results.<br>Clinical care.<br><em>Confidence restored.</em>", "Aesthetic medicine with a lighter <em>touch.</em>", "Expert care.<br><em>Naturally you.</em>"] },
    electrician: { service: "Electrical Repair", service2: "Panel Upgrades", proof: "Licensed technicians", metric: "Same-day availability", heroes: ["Safe power.<br>Clear answers.<br><em>Work done right.</em>", "Electrical work executed with <em>precision.</em>", "Local electricians.<br><em>Ready when you need us.</em>"] },
    plumber: { service: "Emergency Plumbing", service2: "Drain & Sewer", proof: "Upfront estimates", metric: "Available 24/7", heroes: ["Stop the leak.<br>Protect the home.<br><em>Get clear answers.</em>", "Plumbing expertise with a more considered <em>approach.</em>", "Local plumbers.<br><em>Real solutions, fast.</em>"] },
    landscaping: { service: "Landscape Design", service2: "Outdoor Living", proof: "Built for your climate", metric: "Design-to-install service", heroes: ["Better outdoor living.<br>Thoughtful planting.<br><em>Built to last.</em>", "Landscapes designed to feel <em>inevitable.</em>", "Local knowledge.<br><em>Beautiful outdoor spaces.</em>"] }
  };
  const copy = industryCopy[item.slug] || industryCopy.roofing;
  const industryCtas = {
    roofing: ["Get a free inspection", "Discuss your roof", "Request service"],
    dental: ["Book an appointment", "Request a consultation", "Book a visit"],
    hvac: ["Request HVAC service", "Plan a comfort consultation", "Request service"],
    realtor: ["Start your home search", "Begin a private conversation", "Talk to a local agent"],
    law: ["Request a case evaluation", "Begin a confidential conversation", "Contact the firm"],
    restaurant: ["Explore reservations", "Plan a private dining experience", "Reserve a table"],
    medspa: ["Book a consultation", "Plan a private consultation", "Request an appointment"],
    electrician: ["Request an electrical estimate", "Discuss your project", "Request service"],
    plumber: ["Request plumbing service", "Discuss your project", "Get help today"],
    landscaping: ["Request a design consultation", "Plan your outdoor space", "Request an estimate"]
  };
  const ctas = industryCtas[item.slug] || industryCtas.roofing;

  function composeUrl() {
    const subject = `Website inquiry — ${item.name} / ${model}`;
    const body = [
      "Hello Iluminity,",
      "",
      `I would like to discuss the ${model} website concept for my ${item.name.toLowerCase()} business.`,
      "",
      "Business name:",
      "City / State:",
      "Main services:",
      "Preferred launch date:",
      "",
      "Please send me the next steps and a project estimate.",
      "",
      "Thank you."
    ].join("\n");
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  const icons = {
    arrow: '<svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
    star: "★★★★★"
  };

  const commonSections = `
    <section class="live-proof" id="about">
      <div><strong>★</strong><span>sample review<br>presentation</span></div>
      <div><strong>Local</strong><span>market-focused<br>service structure</span></div>
      <div><strong>Clear</strong><span>estimates before<br>work begins</span></div>
    </section>
    <section class="live-services" id="services">
      <header><span>What we do</span><h2>Expert service.<br>Zero guesswork.</h2><p>Thoughtful solutions, responsive communication and a process designed around your peace of mind.</p></header>
      <div class="live-service-grid">
        <article><b>01</b><h3>${copy.service}</h3><p>Professional guidance and careful execution from the first conversation through completion.</p><a href="#contact">Learn more →</a></article>
        <article><b>02</b><h3>${copy.service2}</h3><p>A tailored approach for your needs, priorities and timeline—with no confusing surprises.</p><a href="#contact">Learn more →</a></article>
        <article><b>03</b><h3>Ongoing Support</h3><p>Reliable follow-through and a real person available when questions or new needs come up.</p><a href="#contact">Learn more →</a></article>
      </div>
    </section>
    <section class="live-story">
      <div class="live-story-image" style="background-image:url('${item.image}')"></div>
      <div><span>Why clients choose us</span><h2>Local expertise. Lasting confidence.</h2><p>We believe great service starts with listening. Every recommendation is grounded in your goals, explained clearly and delivered with care.</p><ul><li>✓ ${copy.proof}</li><li>✓ ${copy.metric}</li><li>✓ Clear, responsive communication</li></ul><a class="live-button" href="#contact">Meet the team ${icons.arrow}</a></div>
    </section>
    <section class="live-testimonial" id="reviews"><span>${icons.star}</span><blockquote>“Professional, responsive and genuinely easy to work with. The entire experience felt clear from day one.”</blockquote><p>— Sample customer review for demonstration</p></section>
    <section class="live-faq" id="faq">
      <header><span>Common questions</span><h2>Before we get started.</h2></header>
      <div>
        <details><summary>How quickly can we get started?<i>+</i></summary><p>Most new consultations can be scheduled within a few business days. Exact availability depends on the service and season.</p></details>
        <details><summary>Do you provide an estimate first?<i>+</i></summary><p>Yes. We explain the recommended scope and pricing before any paid work begins.</p></details>
        <details><summary>Which areas do you serve?<i>+</i></summary><p>This demo section would be customized with the business's real cities, counties and service radius.</p></details>
      </div>
    </section>
    <section class="live-final" id="contact"><span>Let’s talk</span><h2>Ready for a better experience?</h2><p>Tell us what you need and we’ll help you understand the best next step.</p><button class="live-button" data-demo-action>${ctas[1]} ${icons.arrow}</button></section>
    <footer class="live-footer"><strong>${model}</strong><span>Services · About · Contact</span><small>Interactive concept by Iluminity</small></footer>`;

  const layouts = [
    `
      <div class="live-site live-site--conversion">
        <div class="live-announcement">${copy.proof} <span>•</span> ${copy.metric}</div>
        <nav class="live-nav"><strong>${model}</strong><div><a href="#services">Services</a><a href="#about">About</a><a href="#reviews">Reviews</a><a href="#faq">FAQ</a></div><button data-demo-action>${ctas[0]}</button></nav>
        <section class="live-hero live-hero--center" style="background-image:url('${item.image}')"><div><span>${item.name} specialists · Locally trusted</span><h1>${copy.heroes[0]}</h1><p>A dependable local team focused on doing the job right and making the process simple.</p><button class="live-button" data-demo-action>${ctas[0]} ${icons.arrow}</button></div></section>
        ${commonSections}
      </div>`,
    `
      <div class="live-site live-site--editorial">
        <nav class="live-nav"><strong>${model}</strong><div><a href="#services">Expertise</a><a href="#about">Our approach</a><a href="#reviews">Journal</a></div><button data-demo-action>${ctas[1]}</button></nav>
        <section class="live-editorial-hero"><div class="live-editorial-copy"><span>${item.name} · Refined service</span><h1>${copy.heroes[1]}</h1><p>Personal attention, practiced expertise and an experience shaped around what matters to you.</p><button class="live-button" data-demo-action>${ctas[1]} ${icons.arrow}</button></div><div class="live-editorial-image" style="background-image:url('${item.image}')"><b>01</b><span>${copy.proof}</span></div></section>
        <section class="live-marquee"><span>${copy.service}</span><i>✦</i><span>${copy.service2}</span><i>✦</i><span>Private consultation</span><i>✦</i></section>
        ${commonSections}
      </div>`,
    `
      <div class="live-site live-site--local">
        <div class="live-urgent">Need help today? <button data-demo-action>Request service →</button></div>
        <nav class="live-nav"><strong>${model}</strong><div><a href="#services">Services</a><a href="#about">Why us</a><a href="#reviews">Reviews</a><a href="#faq">FAQ</a></div><button data-demo-action>${ctas[2]}</button></nav>
        <section class="live-local-hero"><div><span>Serving our community with pride</span><h1>${copy.heroes[2]}</h1><p>${copy.metric}. Friendly professionals, straightforward recommendations and service that respects your time.</p><div><button class="live-button" data-demo-action>${ctas[2]} ${icons.arrow}</button><a href="#services">Explore services ↓</a></div></div><aside style="background-image:url('${item.image}')"><span>${icons.star}<br>Sample review presentation</span></aside></section>
        <section class="live-benefits"><span>✓ Fast response</span><span>✓ Clear pricing</span><span>✓ Trusted team</span><span>✓ Quality guaranteed</span></section>
        ${commonSections}
      </div>`
  ];

  const roofImages = {
    hero: "https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=1800&q=86",
    home: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=84",
    detail: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1600&q=84",
    exterior: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1600&q=84"
  };

  const roofingFaq = `
    <section class="live-faq roof-faq" id="faq">
      <header><span>Roofing questions</span><h2>Know what happens before work begins.</h2></header>
      <div>
        <details><summary>Do you offer free roof inspections?<i>+</i></summary><p>Yes. A specialist can inspect visible conditions, document concerns and explain recommended next steps before you approve any work.</p></details>
        <details><summary>Can you help with storm damage claims?<i>+</i></summary><p>We can document roof damage and provide a detailed scope. Coverage decisions remain entirely with your insurance carrier and policy.</p></details>
        <details><summary>How long does a roof replacement take?<i>+</i></summary><p>Many residential replacements are completed in one to three working days after materials and permits are ready. Weather and project complexity can change the schedule.</p></details>
        <details><summary>Which roofing materials do you install?<i>+</i></summary><p>Typical options include architectural shingles, standing-seam metal and selected low-slope systems. The final recommendation depends on the property and local climate.</p></details>
      </div>
    </section>`;

  const roofingFooter = `
    <section class="live-final" id="contact"><span>Protect what matters</span><h2>Get a clear answer about your roof.</h2><p>Tell us what you are seeing. A roofing specialist will help you understand the right next step.</p><button class="live-button" data-demo-action>Request a free roof assessment ${icons.arrow}</button></section>
    <footer class="live-footer"><strong>${model}</strong><span>Residential &middot; Storm damage &middot; Commercial</span><small>Interactive website concept by Iluminity</small></footer>`;

  const roofingLayouts = [
    `
      <div class="live-site live-site--conversion roof-site roof-site--apex">
        <div class="live-announcement">Emergency tarping available <span>&bull;</span> Licensed &amp; insured roofing professionals</div>
        <nav class="live-nav"><strong>Apex<span>Roof</span></strong><div><a href="#services">Roofing services</a><a href="#projects">Recent work</a><a href="#process">Our process</a><a href="#faq">FAQ</a></div><button data-demo-action>Free inspection</button></nav>
        <section class="roof-apex-hero" style="background-image:url('${roofImages.hero}')">
          <div class="roof-apex-copy"><span>Local roofing. Done right.</span><h1>Roof problems<br>don&rsquo;t <em>wait.</em></h1><p>Fast inspections, honest recommendations and durable roofing systems backed by clear workmanship protection.</p><div class="roof-hero-actions"><button class="live-button" data-demo-action>Schedule a free inspection ${icons.arrow}</button><a href="#projects">See completed roofs &darr;</a></div><div class="roof-mini-proof"><b>4.9/5</b><span>${icons.star}<br>Sample rating</span><b>24/7</b><span>Sample storm<br>response message</span></div></div>
          <aside class="roof-hero-panel"><small>Not sure what your roof needs?</small><h2>Start with a 60-second assessment.</h2><label>What are you noticing?<select data-roof-service><option>Active leak</option><option>Missing shingles</option><option>Storm or hail damage</option><option>Roof is 15+ years old</option><option>Planning a replacement</option></select></label><label>Property type<select data-roof-property><option>Single-family home</option><option>Townhome</option><option>Commercial property</option></select></label><button data-roof-estimate>Show my next step &rarr;</button><p data-roof-result>No obligation. This demo does not submit personal information.</p></aside>
        </section>
        <section class="live-benefits"><span>&check; Free visual inspection</span><span>&check; Photo documentation</span><span>&check; Upfront scope</span><span>&check; Clean jobsite promise</span></section>
        <section class="live-services" id="services"><header><span>Roofing services</span><h2>From first drip to final shingle.</h2><p>One accountable local team for urgent repairs, planned replacement and storm-related roofing needs.</p></header><div class="live-service-grid"><article><b>01</b><h3>Roof Repair</h3><p>Targeted repairs for leaks, flashing, pipe boots, vents and wind-damaged shingles.</p><a href="#contact">Request repair &rarr;</a></article><article><b>02</b><h3>Roof Replacement</h3><p>Complete tear-off and replacement with material options explained in plain language.</p><a href="#contact">Explore systems &rarr;</a></article><article><b>03</b><h3>Storm Damage</h3><p>Prompt inspection, temporary protection when available and detailed condition documentation.</p><a href="#contact">Schedule inspection &rarr;</a></article></div></section>
        <section class="roof-projects" id="projects"><header><span>Recent work</span><h2>Protection that improves the whole home.</h2></header><div class="roof-project-grid"><article style="background-image:url('${roofImages.home}')"><span>Architectural shingles</span><b>Full replacement</b></article><article style="background-image:url('${roofImages.exterior}')"><span>Storm recovery</span><b>Roof + exterior</b></article><article style="background-image:url('${roofImages.detail}')"><span>Preventive work</span><b>Leak repair</b></article></div></section>
        <section class="roof-process" id="process"><span>How it works</span><h2>A roof project without the runaround.</h2><div><article><b>01</b><h3>Inspect</h3><p>We document conditions and listen to what you have noticed.</p></article><article><b>02</b><h3>Explain</h3><p>You receive options, scope and pricing before making a decision.</p></article><article><b>03</b><h3>Protect</h3><p>Our crew completes the approved work and cleans the property.</p></article><article><b>04</b><h3>Confirm</h3><p>Final walkthrough, documentation and workmanship details.</p></article></div></section>
        <section class="live-testimonial"><span>${icons.star}</span><blockquote>&ldquo;They showed us exactly what was wrong, what could wait and what needed attention now.&rdquo;</blockquote><p>Sample homeowner review shown for website demonstration</p></section>
        ${roofingFaq}${roofingFooter}
      </div>`,
    `
      <div class="live-site live-site--editorial roof-site roof-site--summit">
        <nav class="live-nav"><strong>Summit <i>Shield</i></strong><div><a href="#craft">Our craft</a><a href="#systems">Roof systems</a><a href="#projects">Residences</a><a href="#faq">Questions</a></div><button data-demo-action>Private consultation</button></nav>
        <section class="roof-summit-hero"><div class="roof-summit-image" style="background-image:url('${roofImages.home}')"><span>Residence 024 &middot; Standing seam</span></div><div class="roof-summit-copy"><span>Residential roofing, thoughtfully resolved</span><h1>A better roof changes <em>everything.</em></h1><p>Material expertise, architectural sensitivity and a measured installation experience for distinctive homes.</p><button class="live-button" data-demo-action>Discuss your residence ${icons.arrow}</button><small>Serving select homeowners and design partners</small></div></section>
        <section class="live-marquee"><span>Architectural shingles</span><i>&#10022;</i><span>Standing-seam metal</span><i>&#10022;</i><span>Copper details</span><i>&#10022;</i><span>Low-slope systems</span></section>
        <section class="roof-philosophy" id="craft"><span>Our philosophy</span><div><h2>The roof should protect the architecture&mdash;and belong to it.</h2><p>We approach roofing as an exterior system, considering proportion, material, drainage, ventilation and the way every detail meets the home.</p></div><b>01 / 03</b></section>
        <section class="roof-materials" id="systems"><header><span>Material study</span><h2>Chosen for your home, climate and priorities.</h2></header><div><article><span>A</span><h3>Architectural shingle</h3><p>Dimensional character, proven performance and a considered palette for many architectural styles.</p></article><article><span>B</span><h3>Standing-seam metal</h3><p>Clean lines, long service life and strong weather performance for modern and traditional residences.</p></article><article><span>C</span><h3>Specialty details</h3><p>Copper, custom flashing and precise transitions that make the entire roof system feel intentional.</p></article></div></section>
        <section class="roof-editorial-project" id="projects"><div style="background-image:url('${roofImages.exterior}')"></div><article><span>Selected residence</span><h2>Quiet protection.<br>Precise execution.</h2><p>A complete exterior study balancing water management, ventilation and an understated roof profile.</p><dl><div><dt>System</dt><dd>Standing seam</dd></div><div><dt>Scope</dt><dd>Roof + flashing</dd></div><div><dt>Approach</dt><dd>Occupied residence</dd></div></dl><button class="live-button" data-demo-action>Plan a consultation ${icons.arrow}</button></article></section>
        <section class="live-testimonial"><span>Private client note</span><blockquote>&ldquo;Every decision was explained with care, and the finished roof feels like it was always part of the house.&rdquo;</blockquote><p>Sample review shown for design demonstration</p></section>
        ${roofingFaq}${roofingFooter}
      </div>`,
    `
      <div class="live-site live-site--local roof-site roof-site--northstar">
        <div class="live-urgent">Severe weather in your area? <button data-demo-action>Request a priority inspection &rarr;</button></div>
        <nav class="live-nav"><strong>Northstar <span>Exteriors</span></strong><div><a href="#services">Services</a><a href="#areas">Service areas</a><a href="#insurance">Insurance process</a><a href="#faq">FAQ</a></div><button data-demo-action>Get my estimate</button></nav>
        <section class="live-local-hero roof-local-hero"><div><span>Roofing built for every season</span><h1>Your home.<br>Our <em>responsibility.</em></h1><p>Roof repair, full replacement and storm restoration delivered by a local crew that communicates from inspection to cleanup.</p><div><button class="live-button" data-demo-action>Book a free inspection ${icons.arrow}</button><a href="#services">View all services &darr;</a></div></div><aside style="background-image:url('${roofImages.hero}')"><span>${icons.star}<br>4.9 average rating<br><small>Sample presentation</small></span></aside></section>
        <section class="live-benefits"><span>&check; Licensed &amp; insured</span><span>&check; Local project manager</span><span>&check; Financing options*</span><span>&check; Workmanship coverage</span></section>
        <section class="live-services" id="services"><header><span>Complete exterior care</span><h2>One team. Every critical surface.</h2><p>Built for homeowners who want one clear point of contact and workmanship that holds up through changing seasons.</p></header><div class="live-service-grid"><article><b>Roofing</b><h3>Repair &amp; Replacement</h3><p>Shingles, metal, flashing, ventilation and low-slope roofing systems.</p><a href="#contact">Roofing options &rarr;</a></article><article><b>Storm</b><h3>Damage Restoration</h3><p>Inspection, emergency protection, documentation and approved restoration work.</p><a href="#insurance">Our process &rarr;</a></article><article><b>Exterior</b><h3>Gutters &amp; Siding</h3><p>Coordinated exterior improvements that protect water flow and curb appeal.</p><a href="#contact">Exterior estimate &rarr;</a></article></div></section>
        <section class="roof-areas" id="areas"><div><span>Local by design</span><h2>Proudly serving homeowners across the metro.</h2><p>Replace these demonstration locations with the client&rsquo;s actual cities and counties for local-search relevance.</p><button class="live-button" data-demo-action>Check my address ${icons.arrow}</button></div><ul><li>North County</li><li>Westfield</li><li>Lake District</li><li>Oak Ridge</li><li>Riverside</li><li>Greater Metro</li></ul></section>
        <section class="roof-insurance" id="insurance"><header><span>After the storm</span><h2>Documentation without pressure.</h2><p>We help homeowners understand roof conditions and provide clear project documentation. Your insurance carrier makes all coverage decisions.</p></header><div><article><b>1</b><h3>Condition inspection</h3><p>Visible damage documented with photos and notes.</p></article><article><b>2</b><h3>Scope review</h3><p>Recommended work and materials explained before approval.</p></article><article><b>3</b><h3>Restoration</h3><p>Approved work scheduled with one accountable project manager.</p></article></div></section>
        <section class="live-testimonial"><span>${icons.star}</span><blockquote>&ldquo;Our project manager kept us updated, the crew protected the yard and the cleanup was excellent.&rdquo;</blockquote><p>Sample homeowner review shown for website demonstration</p></section>
        ${roofingFaq}${roofingFooter}
      </div>`
  ];

  document.title = `${model} — Interactive Website Demo`;
  document.documentElement.style.setProperty("--demo-accent", item.accent);
  document.querySelector("[data-demo-title]").innerHTML = `<small>${item.name} · Website ${modelIndex + 1}</small><strong>${model}</strong>`;
  document.querySelector("[data-back-link]").href = `${item.slug}/`;
  document.querySelector("[data-choose-link]").href = composeUrl();
  document.querySelector("[data-demo-site]").innerHTML = item.slug === "roofing" ? roofingLayouts[modelIndex] : layouts[modelIndex];

  const shell = document.querySelector(".demo-frame-shell");
  document.querySelectorAll(".device-button").forEach((button) => button.addEventListener("click", () => {
    document.querySelectorAll(".device-button").forEach((entry) => entry.classList.remove("active"));
    button.classList.add("active");
    shell.className = `demo-frame-shell ${button.dataset.device === "desktop" ? "" : button.dataset.device}`;
  }));

  document.addEventListener("click", (event) => {
    const estimator = event.target.closest("[data-roof-estimate]");
    if (estimator) {
      event.preventDefault();
      const service = document.querySelector("[data-roof-service]")?.value || "roof concern";
      const property = document.querySelector("[data-roof-property]")?.value || "property";
      const result = document.querySelector("[data-roof-result]");
      if (result) {
        result.innerHTML = `<strong>Recommended next step:</strong> Schedule a visual inspection for the ${property.toLowerCase()} so the ${service.toLowerCase()} can be documented before options are recommended.`;
        result.classList.add("active");
      }
      return;
    }
    const action = event.target.closest("[data-demo-action]");
    if (!action) return;
    event.preventDefault();
    const toast = document.querySelector(".demo-toast");
    toast.innerHTML = `<strong>Demo interaction</strong><span>On a finished client site, this opens their booking or quote form.</span><a href="${composeUrl()}" target="_blank" rel="noopener">I want this design →</a>`;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 6000);
  });
})();
