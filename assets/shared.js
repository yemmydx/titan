/* 3DHOPE — shared interactions */
(function(){
  const html = document.documentElement;

  /* ---------- Language ---------- */
  function setLang(l){
    html.lang = l;
    html.dir = l === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-lang-btn]').forEach(b => b.classList.toggle('active', b.dataset.langBtn === l));
    try{ localStorage.setItem('3dhope-lang', l); }catch(e){}
  }
  document.querySelectorAll('[data-lang-btn]').forEach(b => b.addEventListener('click', () => setLang(b.dataset.langBtn)));
  try{
    const saved = localStorage.getItem('3dhope-lang');
    if(saved) setLang(saved);
  }catch(e){}

  /* ---------- Menu overlay ---------- */
  const overlay = document.querySelector('.menu-overlay');
  const openBtns = document.querySelectorAll('[data-open-menu]');
  const closeBtns = document.querySelectorAll('[data-close-menu]');
  openBtns.forEach(b => b.addEventListener('click', () => overlay && overlay.classList.add('open')));
  closeBtns.forEach(b => b.addEventListener('click', () => overlay && overlay.classList.remove('open')));
  document.addEventListener('keydown', e => { if(e.key==='Escape' && overlay) overlay.classList.remove('open'); });

  /* ---------- Reveal ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold:0.15, rootMargin:'0px 0px -60px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* ---------- Smooth anchor ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      if(!id) return;
      const t = document.getElementById(id);
      if(t){ e.preventDefault(); window.scrollTo({ top:t.offsetTop - 40, behavior:'smooth' }); }
    });
  });

  /* ---------- Page-specific hooks via data attr ---------- */
  window.__3dhope = { setLang };
})();
