
const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);


(function typing(){
  const roles = [ "ORCLE APEX."];
  let i = 0, j = 0, forward = true;
  const el = document.getElementById('typing');
  const speed = 90;
  const delay = 1400;

  if (!el) return;
  function step(){
    if(forward){
      if(j < roles[i].length){
        el.textContent = roles[i].slice(0, ++j);
        setTimeout(step, speed);
      } else {
        forward = false;
        setTimeout(step, delay);
      }
    } else {
      if(j > 0){
        el.textContent = roles[i].slice(0, --j);
        setTimeout(step, speed/2);
      } else {
        forward = true;
        i = (i + 1) % roles.length;
        setTimeout(step, 300);
      }
    }
  }
  step();
})();

document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if(!a) return;
  const id = a.getAttribute('href');
  if(id === '#') return;
  const target = document.querySelector(id);
  if(target){
    e.preventDefault();
    target.scrollIntoView({behavior: 'smooth', block: 'start'});
    // update active in side nav
    if(a.classList.contains('nav-link')){
      $$('.side-nav .nav-link').forEach(n => n.classList.remove('active'));
      a.classList.add('active');
    }
  }
});


const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
},{root: null, threshold: 0.12});

document.addEventListener('DOMContentLoaded', () => {
  $$('.reveal').forEach(el => revealObserver.observe(el));

  const y = new Date().getFullYear();
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = y;
});


const menuBtn = $('#menu-btn');
if(menuBtn){
  menuBtn.addEventListener('click', () => {
    const sidebar = document.querySelector('.sidebar');
    if(!sidebar) return;
    sidebar.style.display = (sidebar.style.display === 'block') ? 'none' : 'block';
    setTimeout(()=> window.scrollTo({top:0, behavior:'smooth'}), 100);
  });
}

const themeToggle = $('#theme-toggle');
const root = document.documentElement;
const lightClass = 'light';

function setTheme(light){
  if(light){
    root.classList.add(lightClass);
    document.body.style.color = '#0b1220';
    if(themeToggle) themeToggle.textContent = '☀️';
  } else {
    root.classList.remove(lightClass);
    document.body.style.color = '';
    if(themeToggle) themeToggle.textContent = '🌙';
  }
  localStorage.setItem('pref-theme-light', light ? '1' : '0');
}

if(themeToggle){
  const saved = localStorage.getItem('pref-theme-light');
  setTheme(saved === '1');
  themeToggle.addEventListener('click', ()=> {
    const isLight = root.classList.contains(lightClass);
    setTheme(!isLight);
  });
}

const contactForm = document.getElementById('contact-form');
if(contactForm){
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button');
    btn.textContent = 'Sending...';
    setTimeout(()=> {
      btn.textContent = 'Send Message';
      alert('Thanks! Message simulated (no backend). Replace with your API or email integration.');
      contactForm.reset();
    }, 900);
  });
}