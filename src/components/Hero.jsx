import { useRef } from 'react';
import { profile, settings } from '../data/site.js';
import { ArrowRight, ArrowUpRight } from './Icons.jsx';
import { OrbitVisual } from './OrbitVisual.jsx';
import { ResumeLink } from './ResumeLink.jsx';
import { Headline } from './Reveal.jsx';

export function Hero() {
  const ref = useRef(null);

  // Soft light that follows the pointer across the hero.
  const onPointerMove = (event) => {
    const el = ref.current;
    if (!el || event.pointerType === 'touch') return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    el.style.setProperty('--my', `${event.clientY - rect.top}px`);
  };

  return (
    <section id="top" className="hero" ref={ref} onPointerMove={onPointerMove}>
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__spot" aria-hidden="true" />

      <div className="container hero__inner">
        <div className="hero__copy">
          {settings.showStatus && (
            <p className="status hero-in" style={{ '--n': 0 }}>
              <span className="status__dot" aria-hidden="true" />
              {profile.status}
            </p>
          )}

          <div className="hero__id hero-in" style={{ '--n': 1 }}>
            {profile.photo && (
              <img className="hero__avatar" src={profile.photo} alt={`Portrait of ${profile.name}`} width="48" height="48" />
            )}
            <div>
              <p className="hero__name">{profile.name}</p>
              <p className="hero__role">
                “{profile.nickname}” · {profile.role}
              </p>
            </div>
          </div>

          <Headline as="h1" parts={profile.heroTitle} className="hero__title" />

          <p className="hero__intro hero-in" style={{ '--n': 6 }}>
            {profile.intro}
          </p>

          <div className="hero__actions hero-in" style={{ '--n': 7 }}>
            <a className="btn btn--primary" href="#work">
              <span>Explore My Work</span>
              <ArrowRight />
            </a>
            <ResumeLink className="btn btn--ghost" />
            <a className="text-link" href="#contact">
              <span>Let's Connect</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        <div className="hero__visual hero-in hero-in--scale" style={{ '--n': 3 }}>
          <OrbitVisual />
        </div>
      </div>

      <div className="hero__strip hero-in" style={{ '--n': 9 }}>
        <div className="container hero__strip-inner">
          <p>
            Based in <strong>{profile.location}</strong>
          </p>
          <p>
            Studying <strong>{profile.studying}</strong>
          </p>
          <a className="scroll-cue" href="#about">
            <span>Scroll</span>
            <span className="scroll-cue__line" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
