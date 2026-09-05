(() => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('#bhoc-nav');
  if (!toggle || !nav) return;

  const close = () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('is-open', !open);
  });

  nav.addEventListener('click', event => {
    if (event.target.closest('a')) close();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) close();
  });
})();
