import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion.js';

// Each ring: its tilt in the sculpture and its band width (in % of the ring size).
const RINGS = [
  { rx: 76, ry: 0, rz: 0, size: 100, band: 12 },
  { rx: 76, ry: 60, rz: 0, size: 88, band: 10 },
  { rx: 76, ry: 120, rz: 0, size: 76, band: 9 },
  { rx: 14, ry: 0, rz: 58, size: 60, band: 8 },
];

const DOTS = Array.from({ length: 30 * 12 }, (_, i) => ({ x: (i % 30) * 14 + 7, y: Math.floor(i / 30) * 14 + 7 }));

/**
 * The hero object: an original sculpture of metallic rings that turns slowly
 * and leans toward the pointer. Pure CSS 3D and one small animation loop —
 * no 3D library, so it costs almost nothing to load.
 */
export function Sculpture() {
  const rootRef = useRef(null);
  const tiltRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return undefined;
    let frame = 0;
    let visible = true;
    const tilt = { x: 0, y: 0, tx: 0, ty: 0 };

    const tick = () => {
      frame = 0;
      tilt.x += (tilt.tx - tilt.x) * 0.07;
      tilt.y += (tilt.ty - tilt.y) * 0.07;
      if (tiltRef.current) {
        tiltRef.current.style.transform = `rotateX(${tilt.y.toFixed(2)}deg) rotateY(${tilt.x.toFixed(2)}deg)`;
      }
      if (Math.abs(tilt.tx - tilt.x) > 0.02 || Math.abs(tilt.ty - tilt.y) > 0.02) frame = requestAnimationFrame(tick);
    };
    const onMove = (event) => {
      if (event.pointerType === 'touch' || !visible) return;
      const nx = event.clientX / window.innerWidth - 0.5;
      const ny = event.clientY / window.innerHeight - 0.5;
      tilt.tx = nx * 16;
      tilt.ty = -ny * 12;
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      root.classList.toggle('is-paused', !visible);
    });
    io.observe(root);
    // Gentle scroll parallax: the sculpture drifts up a little slower than the page.
    let scrollFrame = 0;
    const onScroll = () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        const y = Math.min(window.scrollY, 900);
        root.style.transform = `translate3d(0, ${(y * 0.12).toFixed(1)}px, 0)`;
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return (
    <div className="sculpture" ref={rootRef} aria-hidden="true">
      <div className="sculpture__glow" />
      <svg className="sculpture__field" viewBox="0 0 420 168" preserveAspectRatio="xMidYMid slice">
        {DOTS.map((d) => (
          <circle key={`${d.x}-${d.y}`} cx={d.x} cy={d.y} r={1.1} />
        ))}
      </svg>
      <div className="sculpture__stage">
        <div className="sculpture__tilt" ref={tiltRef}>
          <div className="sculpture__spin">
            {RINGS.map((r, i) => (
              <span
                key={i}
                className="sculpture__ring"
                style={{
                  '--size': `${r.size}%`,
                  '--band': `${r.band}%`,
                  transform: `rotateZ(${r.rz}deg) rotateY(${r.ry}deg) rotateX(${r.rx}deg)`,
                  '--i': i,
                }}
              />
            ))}
            <span className="sculpture__core" />
          </div>
        </div>
      </div>
      <p className="sculpture__caption">
        <span>Software</span>
        <span>Data</span>
        <span>Media</span>
      </p>
    </div>
  );
}
