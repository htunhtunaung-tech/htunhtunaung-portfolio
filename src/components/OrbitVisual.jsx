import { useEffect, useRef } from 'react';
import { profile } from '../data/site.js';
import { useReducedMotion } from '../hooks/useReducedMotion.js';

const NODES = ['Software', 'Data', 'Media'];
const RING_TILT = (-16 * Math.PI) / 180; // matches the CSS rotation of the ring
const ORBIT_SECONDS = 26;

/**
 * The hero object: a lit sphere with three labels travelling around it on a
 * tilted orbit. Labels pass in front of and behind the sphere, and the whole
 * object leans slightly toward the pointer. Pure CSS + a small animation loop —
 * no 3D library.
 */
export function OrbitVisual() {
  const rootRef = useRef(null);
  const tiltRef = useRef(null);
  const nodeRefs = useRef([]);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    let size = root.offsetWidth;
    let angle = 0.9;
    let frame = 0;
    let last = 0;
    let visible = true;
    const tilt = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const place = () => {
      const rx = size * 0.5;
      const ry = size * 0.15;
      nodeRefs.current.forEach((el, i) => {
        if (!el) return;
        const a = angle + (i * 2 * Math.PI) / NODES.length;
        const x0 = rx * Math.cos(a);
        const y0 = ry * Math.sin(a);
        const x = x0 * Math.cos(RING_TILT) - y0 * Math.sin(RING_TILT);
        const y = x0 * Math.sin(RING_TILT) + y0 * Math.cos(RING_TILT);
        const depth = (Math.sin(a) + 1) / 2; // 1 = nearest the viewer
        el.style.transform = `translate(-50%, -50%) translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) scale(${(0.82 + 0.18 * depth).toFixed(3)})`;
        el.style.opacity = (0.5 + 0.5 * depth).toFixed(2);
        el.style.zIndex = Math.sin(a) >= 0 ? '4' : '1';
      });
    };

    const resize = new ResizeObserver(() => {
      size = root.offsetWidth;
      place();
    });
    resize.observe(root);
    place();

    if (reduced) {
      return () => resize.disconnect();
    }

    const tick = (now) => {
      frame = requestAnimationFrame(tick);
      const dt = last ? Math.min(64, now - last) : 16;
      last = now;
      angle += (dt / 1000) * ((2 * Math.PI) / ORBIT_SECONDS);
      tilt.x += (tilt.targetX - tilt.x) * 0.06;
      tilt.y += (tilt.targetY - tilt.y) * 0.06;
      if (tiltRef.current) {
        tiltRef.current.style.transform = `rotateX(${tilt.y.toFixed(2)}deg) rotateY(${tilt.x.toFixed(2)}deg)`;
      }
      place();
    };
    const start = () => {
      if (!frame && visible && !document.hidden) {
        last = 0;
        frame = requestAnimationFrame(tick);
      }
    };
    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    // Only animate while the object is actually on screen.
    const watcher = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    watcher.observe(root);

    const onVisibility = () => (document.hidden ? stop() : start());
    const onPointerMove = (event) => {
      if (event.pointerType === 'touch') return;
      const rect = root.getBoundingClientRect();
      const dx = (event.clientX - (rect.left + rect.width / 2)) / window.innerWidth;
      const dy = (event.clientY - (rect.top + rect.height / 2)) / window.innerHeight;
      tilt.targetX = Math.max(-1, Math.min(1, dx)) * 14;
      tilt.targetY = Math.max(-1, Math.min(1, dy)) * -10;
    };
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    start();

    return () => {
      stop();
      resize.disconnect();
      watcher.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, [reduced]);

  return (
    <div
      className="orbit"
      ref={rootRef}
      role="img"
      aria-label="A sphere with three labels orbiting it: software, data and media"
    >
      <span className="orbit__glow" />
      <span className="orbit__corner orbit__corner--tl" />
      <span className="orbit__corner orbit__corner--tr" />
      <span className="orbit__corner orbit__corner--bl" />
      <span className="orbit__corner orbit__corner--br" />
      <span className="orbit__coord orbit__coord--tl">{profile.coordinates}</span>
      <span className="orbit__coord orbit__coord--br">
        {profile.location.split(',')[0]} · {profile.timezone}
      </span>

      <div className="orbit__tilt" ref={tiltRef}>
        <span className="orbit__ring orbit__ring--dashed" />
        <span className="orbit__ring orbit__ring--back" />
        <div className="orbit__sphere">
          <span className="orbit__ball" />
          <span className="orbit__lat" />
          <span className="orbit__meridian" />
          <span className="orbit__meridian" />
          <span className="orbit__meridian" />
        </div>
        <span className="orbit__ring orbit__ring--front" />
        {NODES.map((label, i) => (
          <span
            key={label}
            className="orbit__node"
            ref={(el) => {
              nodeRefs.current[i] = el;
            }}
          >
            <span className="orbit__dot" />
            {String(i + 1).padStart(2, '0')} {label}
          </span>
        ))}
      </div>
    </div>
  );
}
