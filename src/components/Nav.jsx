import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { contact, navLinks, profile } from '../data/site.js';
import { useActiveSection } from '../hooks/useActiveSection.js';
import { useOverlay } from '../hooks/useOverlay.js';
import { Close, Moon, Sun } from './Icons.jsx';
import { ResumeLink } from './ResumeLink.jsx';

export function Nav({ theme, onToggleTheme }) {
  const ids = useMemo(() => navLinks.map((link) => link.id), []);
  const active = useActiveSection(ids);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef(null);
  const linksRef = useRef(null);
  const indicatorRef = useRef(null);
  const menuRef = useRef(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  useOverlay(menuRef, menuOpen, closeMenu);

  // Reading-progress bar along the top edge.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
      setScrolled(window.scrollY > 8);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Underline that slides to the section currently on screen.
  useEffect(() => {
    const wrap = linksRef.current;
    const indicator = indicatorRef.current;
    if (!wrap || !indicator) return undefined;
    const move = () => {
      const link = active && wrap.querySelector(`[data-id="${active}"]`);
      if (link) {
        indicator.style.opacity = '1';
        indicator.style.width = `${link.offsetWidth}px`;
        indicator.style.transform = `translateX(${link.offsetLeft}px)`;
      } else {
        indicator.style.opacity = '0';
      }
    };
    move();
    window.addEventListener('resize', move);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(move).catch(() => {});
    return () => window.removeEventListener('resize', move);
  }, [active]);

  // If the window grows past the mobile breakpoint, close the mobile menu.
  useEffect(() => {
    const media = window.matchMedia('(min-width: 861px)');
    const onChange = () => media.matches && setMenuOpen(false);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const themeLabel = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <>
      <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
        <span className="nav__progress" ref={progressRef} aria-hidden="true" />
        <nav className="container nav__inner" aria-label="Primary">
          <a className="logo" href="#top">
            {profile.logo}
            <span className="logo__cursor" aria-hidden="true">_</span>
          </a>

          <div className="nav__links" ref={linksRef}>
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                data-id={link.id}
                className={`nav__link ${active === link.id ? 'is-active' : ''}`}
                aria-current={active === link.id ? 'true' : undefined}
              >
                {link.label}
              </a>
            ))}
            <span className="nav__indicator" ref={indicatorRef} aria-hidden="true" />
          </div>

          <div className="nav__actions">
            <button type="button" className="icon-btn theme-toggle" onClick={onToggleTheme} aria-label={themeLabel}>
              <span className="theme-toggle__icon" key={theme}>
                {theme === 'dark' ? <Sun size={18} strokeWidth={1.8} /> : <Moon size={18} strokeWidth={1.8} />}
              </span>
            </button>
            <ResumeLink className="btn btn--ghost btn--small nav__resume" short />
            <button
              type="button"
              className={`icon-btn nav__burger ${menuOpen ? 'is-open' : ''}`}
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span className="nav__burger-lines" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={`menu ${menuOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!menuOpen}
      >
        <div className="menu__bar">
          <a className="logo" href="#top" onClick={closeMenu}>
            {profile.logo}
            <span className="logo__cursor" aria-hidden="true">_</span>
          </a>
          <button type="button" className="icon-btn" onClick={closeMenu} aria-label="Close menu">
            <Close size={18} strokeWidth={1.8} />
          </button>
        </div>
        <nav className="menu__links" aria-label="Sections">
          {navLinks.map((link, index) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`menu__link ${active === link.id ? 'is-active' : ''}`}
              style={{ '--i': index }}
              onClick={closeMenu}
            >
              <span className="menu__num">{String(index + 1).padStart(2, '0')}</span>
              <span className="menu__label">{link.label}</span>
              {active === link.id && <span className="menu__here">You are here</span>}
            </a>
          ))}
        </nav>
        <div className="menu__foot">
          <div className="menu__foot-row">
            <ResumeLink className="btn btn--primary menu__resume" onClick={closeMenu} />
            <button type="button" className="icon-btn icon-btn--large" onClick={onToggleTheme} aria-label={themeLabel}>
              {theme === 'dark' ? <Sun size={18} strokeWidth={1.8} /> : <Moon size={18} strokeWidth={1.8} />}
            </button>
          </div>
          <a className="menu__email" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
        </div>
      </div>
    </>
  );
}
