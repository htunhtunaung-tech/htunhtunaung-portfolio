import { Fragment } from 'react';
import { useInView } from '../hooks/useInView.js';

/**
 * Fades and lifts its content into place the first time it scrolls into view.
 * variant: 'up' (default) | 'fade' | 'scale' | 'left'
 * delay:   milliseconds, for staggering neighbours.
 */
export function Reveal({ as: Tag = 'div', variant = 'up', delay = 0, className = '', style, children, ...rest }) {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={`reveal reveal--${variant} ${inView ? 'is-visible' : ''} ${className}`}
      style={{ '--d': `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * A heading whose words rise into place one after another.
 * parts: [{ text, accent?, newline? }] — accent parts use the italic serif;
 * `newline: true` starts that part on its own line.
 */
export function Headline({ as: Tag = 'h2', parts, className = '' }) {
  const [ref, inView] = useInView({ threshold: 0.2 });
  const label = parts.map((part) => part.text).join(' ');
  let index = 0;

  return (
    <Tag ref={ref} className={`headline ${inView ? 'is-visible' : ''} ${className}`} aria-label={label}>
      {parts.map((part, partIndex) =>
        part.text.split(' ').map((word, wordIndex) => {
          const i = index++;
          return (
            <Fragment key={`${partIndex}-${wordIndex}`}>
              {part.newline && wordIndex === 0 && <br />}
              <span className={`headline__word ${part.accent ? 'headline__word--accent' : ''}`} aria-hidden="true">
                <span style={{ '--i': i }}>{word}</span>
              </span>{' '}
            </Fragment>
          );
        })
      )}
    </Tag>
  );
}

/** The small numbered label that opens every section. */
export function SectionLabel({ number, children }) {
  return (
    <Reveal className="section-label" variant="left">
      <span className="section-label__num">{number}</span>
      <span>{children}</span>
      <span className="section-label__rule" aria-hidden="true" />
    </Reveal>
  );
}
