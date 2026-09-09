const iconRoot = window.lucide;
if (iconRoot) iconRoot.createIcons();

const themeToggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'dark') document.body.classList.add('dark');

function updateThemeIcon() {
  const icon = themeToggle?.querySelector('svg');
  if (!icon) return;
  icon.setAttribute('data-lucide', document.body.classList.contains('dark') ? 'moon' : 'sun');
  iconRoot?.createIcons();
}

themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('portfolio-theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  updateThemeIcon();
});

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.desktop-nav');
menuToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('mobile-open');
  menuToggle.classList.toggle('open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.innerHTML = `<i data-lucide="${isOpen ? 'x' : 'menu'}"></i>`;
  iconRoot?.createIcons();
});
nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('mobile-open');
  menuToggle?.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const projectFilter = document.querySelector('#project-filter');
projectFilter?.addEventListener('change', (event) => {
  const selected = event.target.value;
  document.querySelectorAll('.project-card').forEach((card) => {
    const matches = selected === 'all' || card.dataset.category === selected;
    card.style.display = matches ? '' : 'none';
  });
});

const contactForm = document.querySelector('#contact-form');
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const status = contactForm.querySelector('.form-status');
  status.textContent = 'Thanks, your message is ready to send. I will be in touch soon.';
  contactForm.reset();
});
