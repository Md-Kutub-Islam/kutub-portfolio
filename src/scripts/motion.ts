/* ============================================================================
   Centralized motion controller.
   - Runs on `astro:page-load` (fires on first load AND after each View Transition)
   - Fully idempotent: every init tears down the previous run's listeners
   - Respects prefers-reduced-motion and pointer capability throughout
   ========================================================================== */

type Cleanup = () => void;
let cleanups: Cleanup[] = [];

const root = document.documentElement;
const prefersReduced = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = () =>
  window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/** addEventListener that auto-registers its own teardown. */
function on<K extends keyof DocumentEventMap>(
  target: EventTarget,
  type: K | string,
  handler: EventListenerOrEventListenerObject,
  opts?: AddEventListenerOptions
) {
  target.addEventListener(type, handler, opts);
  cleanups.push(() => target.removeEventListener(type, handler, opts));
}

/* --- Scroll / viewport reveals ------------------------------------------- */
function initReveals() {
  const els = document.querySelectorAll<HTMLElement>('[data-reveal], [data-line]');
  if (!('IntersectionObserver' in window) || prefersReduced()) {
    els.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
  );
  els.forEach((el) => io.observe(el));
  cleanups.push(() => io.disconnect());
}

/* --- Scroll progress bar + nav scrolled state ---------------------------- */
function initProgress() {
  const bar = document.querySelector<HTMLElement>('.scroll-progress');
  let ticking = false;
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    if (bar) bar.style.setProperty('--progress', p.toFixed(4));
    root.classList.toggle('scrolled', window.scrollY > 8);
    ticking = false;
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };
  on(window, 'scroll', onScroll, { passive: true });
  on(window, 'resize', onScroll, { passive: true });
  update();
}

/* --- Custom cursor -------------------------------------------------------- */
function initCursor() {
  if (!finePointer() || prefersReduced()) return;
  const cursor = document.querySelector<HTMLElement>('.cursor');
  const label = document.querySelector<HTMLElement>('.cursor__label');
  if (!cursor) return;

  root.classList.add('has-cursor');
  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let rx = x;
  let ry = y;
  let raf = 0;
  let running = true;

  const move = (e: MouseEvent) => {
    x = e.clientX;
    y = e.clientY;
    cursor.style.setProperty('--x', `${x}px`);
    cursor.style.setProperty('--y', `${y}px`);
  };
  const loop = () => {
    rx += (x - rx) * 0.2;
    ry += (y - ry) * 0.2;
    cursor.style.setProperty('--rx', `${rx.toFixed(2)}px`);
    cursor.style.setProperty('--ry', `${ry.toFixed(2)}px`);
    if (running) raf = requestAnimationFrame(loop);
  };

  const sel = 'a, button, [role="button"], input, textarea, select, [data-cursor]';
  const over = (e: Event) => {
    const el = (e.target as Element)?.closest?.(sel);
    if (!el) return;
    if (el.getAttribute('data-cursor') === 'view') {
      root.classList.add('cursor-view');
      root.classList.remove('cursor-hover');
      if (label) label.textContent = el.getAttribute('data-cursor-label') || 'View project';
    } else {
      root.classList.add('cursor-hover');
    }
  };
  const out = (e: Event) => {
    const el = (e.target as Element)?.closest?.(sel);
    if (!el) return;
    root.classList.remove('cursor-hover', 'cursor-view');
  };

  on(window, 'mousemove', move as EventListener, { passive: true });
  on(document, 'mouseover', over);
  on(document, 'mouseout', out);
  raf = requestAnimationFrame(loop);

  cleanups.push(() => {
    running = false;
    cancelAnimationFrame(raf);
    root.classList.remove('has-cursor', 'cursor-hover', 'cursor-view');
  });
}

/* --- Magnetic buttons ----------------------------------------------------- */
function initMagnetic() {
  if (!finePointer() || prefersReduced()) return;
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const inner = el.querySelector<HTMLElement>('[data-magnetic-inner]');
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const mx = e.clientX - (r.left + r.width / 2);
      const my = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${(mx * 0.22).toFixed(2)}px, ${(my * 0.3).toFixed(2)}px)`;
      if (inner) inner.style.transform = `translate(${(mx * 0.12).toFixed(2)}px, ${(my * 0.16).toFixed(2)}px)`;
    };
    const leave = () => {
      el.style.transform = '';
      if (inner) inner.style.transform = '';
    };
    on(el, 'mousemove', move as EventListener);
    on(el, 'mouseleave', leave);
  });
}

/* --- Mobile navigation overlay ------------------------------------------- */
function initMenu() {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');
  if (!toggle || !menu) return;

  const burgerLabel = toggle.querySelector('.nav__burger-label');
  const logo = document.querySelector<HTMLElement>('.nav__logo');
  let lastFocus: HTMLElement | null = null;
  const isOpen = () => menu.classList.contains('is-open');

  const focusables = () =>
    Array.from(
      menu.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
    ).filter((el) => el.offsetParent !== null);

  const open = () => {
    lastFocus = document.activeElement as HTMLElement;
    menu.classList.add('is-open');
    root.classList.add('menu-open');
    document.body.classList.add('no-scroll');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close menu');
    if (burgerLabel) burgerLabel.textContent = 'Close';
    menu.setAttribute('aria-hidden', 'false');
    focusables()[0]?.focus();
  };
  const close = () => {
    menu.classList.remove('is-open');
    root.classList.remove('menu-open');
    document.body.classList.remove('no-scroll');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    if (burgerLabel) burgerLabel.textContent = 'Menu';
    menu.setAttribute('aria-hidden', 'true');
    (lastFocus || toggle).focus();
  };

  on(toggle, 'click', () => (isOpen() ? close() : open()));
  // The logo stays visible above the overlay; tapping it (→ #top) should close too.
  if (logo) on(logo, 'click', () => isOpen() && close());
  menu.querySelectorAll('a').forEach((a) => on(a, 'click', close));
  on(document, 'keydown', ((e: KeyboardEvent) => {
    if (!isOpen()) return;
    if (e.key === 'Escape') close();
    if (e.key === 'Tab') {
      const f = focusables();
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }) as EventListener);

  cleanups.push(() => {
    root.classList.remove('menu-open');
    document.body.classList.remove('no-scroll');
  });
}

/* --- Scrollspy: active nav link ------------------------------------------ */
function initScrollSpy() {
  const links = Array.from(
    document.querySelectorAll<HTMLAnchorElement>('[data-navlink]')
  );
  if (!links.length || !('IntersectionObserver' in window)) return;
  const map = new Map<string, HTMLAnchorElement[]>();
  links.forEach((l) => {
    const id = l.getAttribute('href')?.replace('#', '') ?? '';
    if (!map.has(id)) map.set(id, []);
    map.get(id)!.push(l);
  });
  const sections = Array.from(map.keys())
    .map((id) => document.getElementById(id))
    .filter((s): s is HTMLElement => !!s);

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((l) => l.removeAttribute('data-active'));
          map.get(entry.target.id)?.forEach((l) => l.setAttribute('data-active', ''));
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );
  sections.forEach((s) => io.observe(s));
  cleanups.push(() => io.disconnect());
}

/* --- Process stages: active highlight ------------------------------------ */
function initProcess() {
  const stages = Array.from(document.querySelectorAll<HTMLElement>('[data-stage]'));
  const stack = document.querySelector<HTMLElement>('[data-process]');
  if (!stages.length || !stack || !('IntersectionObserver' in window)) return;

  const setActive = (idx: number) => {
    stack.setAttribute('data-active', String(idx));
    stages.forEach((s, i) => s.toggleAttribute('data-current', i === idx));
  };
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = Number((entry.target as HTMLElement).dataset.stage);
          setActive(idx);
        }
      });
    },
    { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
  );
  stages.forEach((s) => io.observe(s));
  setActive(0);
  cleanups.push(() => io.disconnect());
}

/* --- Expand / collapse (experience "show more") -------------------------- */
function initExpanders() {
  document.querySelectorAll<HTMLButtonElement>('[data-expand]').forEach((btn) => {
    const target = document.getElementById(btn.getAttribute('aria-controls') || '');
    if (!target) return;
    const toggle = () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      target.toggleAttribute('data-open', !expanded);
      const labelEl = btn.querySelector('[data-expand-label]');
      if (labelEl) labelEl.textContent = expanded ? btn.dataset.expand || 'Show more' : 'Show less';
    };
    on(btn, 'click', toggle);
  });
}

/* --- Hero photo parallax -------------------------------------------------- */
function initHeroParallax() {
  const photo = document.querySelector<HTMLElement>('[data-hero-parallax]');
  if (!photo || prefersReduced() || !finePointer()) return;

  let ticking = false;
  const update = () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight * 1.2) {
      const py = scrollY * 0.08;
      photo.style.setProperty('--hero-scroll-y', `${py.toFixed(2)}px`);
    }
    ticking = false;
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };
  on(window, 'scroll', onScroll, { passive: true });
  update();
}

/* --- Init / re-init ------------------------------------------------------- */
function init() {
  cleanups.forEach((fn) => fn());
  cleanups = [];
  initReveals();
  initProgress();
  initCursor();
  initMagnetic();
  initMenu();
  initScrollSpy();
  initProcess();
  initExpanders();
  initHeroParallax();
}

// Mark the session as "entered" so the loader only plays once per session.
// Also add the class immediately so the persisted <html> element carries it
// across View Transition swaps (prevents the loader replaying on navigation).
function markEntered() {
  root.classList.add('entered');
  try {
    sessionStorage.setItem('kip-entered', '1');
  } catch {
    /* ignore */
  }
}
if (document.readyState === 'complete') markEntered();
else window.addEventListener('load', markEntered, { once: true });

document.addEventListener('astro:page-load', init);
// Tear down before the DOM is swapped on navigation.
document.addEventListener('astro:before-swap', () => {
  cleanups.forEach((fn) => fn());
  cleanups = [];
});
