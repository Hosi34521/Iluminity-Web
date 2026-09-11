(() => {
  const br = document.documentElement.lang === 'pt-BR';
  const params = new URLSearchParams(location.search);
  const form = document.getElementById('lead-form');
  const status = document.getElementById('lead-status');
  const submit = document.getElementById('lead-submit');
  const service = document.getElementById('service');
  const budget = document.getElementById('estimatedValue');
  // Preserve offer values even when they aren't one of the general package options.
  function selectValue(select, value) {
    if (!value) return;
    if (![...select.options].some(o => o.value === value)) select.add(new Option(value,value));
    select.value = value;
  }
  const selectedService = (params.get('service') || '').slice(0,160);
  const selectedBudget = (params.get('budget') || '').slice(0,160);
  selectValue(service,selectedService); selectValue(budget,selectedBudget);
  const industry = window.getIndustry?.(params.get('industry'));
  const rawModel = Number(params.get('model'));
  const model = industry && params.has('model') && Number.isInteger(rawModel) && rawModel >= 0 && rawModel < 3 ? industry.models[rawModel] : '';
  const summary = document.getElementById('selection-summary');
  const selected = [selectedService,selectedBudget,industry?.name,model].filter(Boolean);
  summary.textContent = selected.length ? selected.join(' · ') : (br ? 'Ainda sem uma direção? Conte o problema que quer resolver.' : 'No design selected? Tell us the problem you want to solve.');
  document.getElementById('industry').value = [industry?.name,model].filter(Boolean).join(' — ');
  const emailLink = document.getElementById('direct-email');
  const emailUrl = () => {
    const text = [br ? 'Olá Iluminity,' : 'Hello Iluminity,','',...selected, '',br ? 'Gostaria de conversar sobre meu projeto.' : 'I would like to discuss my project.'].join('\n');
    return 'mailto:iluminity.studio@gmail.com?subject='+encodeURIComponent(br?'Projeto Iluminity — Brasil':'Iluminity project inquiry')+'&body='+encodeURIComponent(text);
  };
  emailLink.href=emailUrl();
  const message = (text, kind) => { status.textContent=text;status.className='lead-status '+kind; };
  form.addEventListener('submit', async event => {
    event.preventDefault(); if (!form.reportValidity()) return;
    submit.disabled=true;submit.textContent=br?'Enviando…':'Sending…';
    const data=Object.fromEntries(new FormData(form)); data.language=br?'pt-BR':'en';data.pageUrl=location.href;
    const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),15000);
    try {
      const response=await fetch('/api/lead',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(data),signal:controller.signal});
      const result=await response.json();
      if(!response.ok || result.ok!==true) throw new Error('unconfirmed');
      message(br?'Recebemos seu pedido. O próximo passo será uma resposta por e-mail.':'Your request was received. We will reply by email with the next step.','success');
      form.reset();selectValue(service,selectedService);selectValue(budget,selectedBudget);
      document.getElementById('industry').value=[industry?.name,model].filter(Boolean).join(' — ');
    } catch {
      message(br?'Não foi possível confirmar o envio. Seus dados continuam no formulário. Você também pode usar o e-mail abaixo.':'We could not confirm delivery. Your details are still in the form. You can also use the email link below.','error');
    } finally {clearTimeout(timeout);submit.disabled=false;submit.textContent=br?'Solicitar proposta →':'Request a proposal →';}
  });
})();
