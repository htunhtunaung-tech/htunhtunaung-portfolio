import { useEffect, useRef, useState } from 'react';
import { approach } from '../data/site.js';
import { useReducedMotion } from '../hooks/useReducedMotion.js';
import { Headline, SectionLabel } from './Reveal.jsx';

export function Approach() {
  const listRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();

  // The five steps fill in one after another as you scroll through them.
  useEffect(() => {
    if (reduced) {
      setProgress(1);
      return undefined;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = listRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.88;
      const distance = vh * 0.45 + rect.height * 0.6;
      const next = Math.max(0, Math.min(1, (start - rect.top) / distance));
      setProgress((prev) => (Math.abs(prev - next) > 0.004 ? next : prev));
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
  }, [reduced]);

  const count = approach.length;

  return (
    <section id="approach" className="section">
      <div className="container">
        <SectionLabel number="05">Approach</SectionLabel>
        <Headline
          parts={[{ text: 'How I Think, Build, and' }, { text: 'Solve Problems.', accent: true }]}
          className="section-title section-title--narrow"
        />

        <ol className="steps" ref={listRef}>
          {approach.map((step, i) => {
            const fill = Math.max(0, Math.min(1, progress * count - i));
            return (
              <li key={step} className={`step ${fill > 0.15 ? 'is-active' : ''}`}>
                <span className="step__bar" aria-hidden="true">
                  <span style={{ transform: `scaleX(${fill})` }} />
                </span>
                <span className="step__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="step__text">{step}</span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
