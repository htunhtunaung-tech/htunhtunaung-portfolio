import { useEffect } from 'react';

/**
 * Buttons marked with `data-magnetic` lean slightly toward the pointer and
 * settle back when it leaves. Desktop pointers only; skipped for reduced motion.
 */
export function useMagnetic() {
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!fine.matches || reduced.matches) return undefined;

    const STRENGTH = 0.28;
    let active = null;
    let frame = 0;
    let target = { x: 0, y: 0 };

    const apply = () => {
      frame = 0;
      if (active) active.style.transform = `translate(${target.x.toFixed(1)}px, ${target.y.toFixed(1)}px)`;
    };
    const onMove = (event) => {
      const el = event.target.closest?.('[data-magnetic]');
      if (el !== active) {
        if (active) active.style.transform = '';
        active = el;
      }
      if (!active) return;
      const rect = active.getBoundingClientRect();
      target = {
        x: (event.clientX - (rect.left + rect.width / 2)) * STRENGTH,
        y: (event.clientY - (rect.top + rect.height / 2)) * STRENGTH,
      };
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = (event) => {
      const el = event.target.closest?.('[data-magnetic]');
      if (el && !el.contains(event.relatedTarget)) {
        el.style.transform = '';
        if (el === active) active = null;
      }
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerout', onLeave, { passive: true });
    return () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerout', onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
}
