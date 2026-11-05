import { useRef } from 'react';

// Glossy "liquid" lettering drawn with SVG filters only (no 3D library).
// The light follows the pointer, and the small drops float and merge.
export function LiquidName({ text = 'LOUIS' }) {
  const lightRef = useRef(null);
  const specRef = useRef(null);

  const onPointerMove = (event) => {
    if (event.pointerType === 'touch') return;
    const svg = event.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 640;
    const y = ((event.clientY - rect.top) / rect.height) * 420;
    lightRef.current?.setAttribute('x', x);
    lightRef.current?.setAttribute('y', y);
    specRef.current?.setAttribute('x', x);
    specRef.current?.setAttribute('y', y);
  };

  return (
    <svg
      className="liquid"
      viewBox="0 0 640 420"
      role="img"
      aria-label={text}
      onPointerMove={onPointerMove}
    >
      <defs>
        <filter id="liquid-gloss" x="-10%" y="-10%" width="120%" height="130%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.011" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="7" xChannelSelector="R" yChannelSelector="G" result="wobble" />
          <feGaussianBlur in="wobble" stdDeviation="5.5" result="blur" />
          <feColorMatrix in="blur" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 26 -11" result="goo" />
          <feGaussianBlur in="goo" stdDeviation="6" result="bump" />
          <feDiffuseLighting in="bump" surfaceScale="7" diffuseConstant="1.05" lightingColor="#eef1f8" result="diffuse">
            <fePointLight ref={lightRef} x="180" y="40" z="260" />
          </feDiffuseLighting>
          <feSpecularLighting in="bump" surfaceScale="7" specularConstant="1.3" specularExponent="34" lightingColor="#ffffff" result="spec">
            <fePointLight ref={specRef} x="180" y="40" z="260" />
          </feSpecularLighting>
          <feComposite in="diffuse" in2="goo" operator="in" result="body" />
          <feComposite in="spec" in2="goo" operator="in" result="shine" />
          <feComposite in="body" in2="shine" operator="arithmetic" k1="0" k2="1" k3="0.9" k4="0" result="lit" />
          <feDropShadow dx="0" dy="18" stdDeviation="16" floodColor="#5b8cff" floodOpacity="0.28" />
        </filter>
      </defs>

      <g filter="url(#liquid-gloss)" fill="#fff">
        <text
          x="320"
          y="250"
          textAnchor="middle"
          fontFamily="'Geist Variable', 'Geist', 'Helvetica Neue', Arial, sans-serif"
          fontWeight="900"
          fontSize="138"
          letterSpacing="16"
          stroke="#fff"
          strokeWidth="7"
          strokeLinejoin="round"
          paintOrder="stroke"
        >
          {text}
        </text>
        {/* drips */}
        <rect x="96" y="228" width="22" height="66" rx="11" />
        <rect x="300" y="236" width="20" height="96" rx="10" />
        <rect x="470" y="232" width="22" height="58" rx="11" />
        <circle cx="116" cy="318" r="14" />
        <circle cx="310" cy="350" r="12" />
        {/* floating drops */}
        <circle className="liquid__drop liquid__drop--a" cx="560" cy="96" r="26" />
        <circle className="liquid__drop liquid__drop--b" cx="86" cy="94" r="18" />
        <circle className="liquid__drop liquid__drop--c" cx="540" cy="350" r="34" />
        <circle className="liquid__drop liquid__drop--d" cx="420" cy="372" r="14" />
      </g>
    </svg>
  );
}
