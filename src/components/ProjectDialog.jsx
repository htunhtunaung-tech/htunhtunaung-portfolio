import { useEffect, useRef } from 'react';
import { useOverlay } from '../hooks/useOverlay.js';
import { ArrowUpRight, Close } from './Icons.jsx';

const LINK_LABELS = { github: 'GitHub', live: 'Live demo', site: 'Website', figma: 'Figma design' };

function Block({ title, children, index }) {
  return (
    <section className="sheet__block" style={{ '--i': index }}>
      <h3 className="mono-label">{title}</h3>
      {children}
    </section>
  );
}

/** Slide-in panel with the full story of one project. */
export function ProjectDialog({ project, onClose }) {
  const panelRef = useRef(null);
  // Keep the last project on screen while the panel slides away.
  const lastProject = useRef(project);
  if (project) lastProject.current = project;
  const open = Boolean(project);

  useEffect(() => {
    if (project && panelRef.current) panelRef.current.scrollTop = 0;
  }, [project]);

  useOverlay(panelRef, open, onClose);

  const p = lastProject.current;
  const d = p?.details || {};
  const links = Object.entries(p?.links || {}).filter(([, url]) => url);
  let block = 0;

  return (
    <div className={`sheet ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <div className="sheet__backdrop" onClick={onClose} />
      <aside
        className="sheet__panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheet-title"
      >
        {p && (
          <>
            <div className="sheet__top">
              <span className="mono-label">{p.category}</span>
              <button type="button" className="icon-btn" onClick={onClose} aria-label="Close project details">
                <Close size={18} strokeWidth={1.8} />
              </button>
            </div>

            <h2 id="sheet-title" className="sheet__title">
              {p.title}
            </h2>
            <p className="sheet__summary">{p.summary}</p>

            <dl className="sheet__meta">
              {p.role && (
                <div>
                  <dt>Role</dt>
                  <dd>{p.role}</dd>
                </div>
              )}
              {p.badge && p.badge !== p.role && (
                <div>
                  <dt>Type</dt>
                  <dd>{p.badge}</dd>
                </div>
              )}
              {p.outcome && (
                <div>
                  <dt>Outcome</dt>
                  <dd>{p.outcome}</dd>
                </div>
              )}
            </dl>

            {d.problem && (
              <Block title={d.problemTitle || 'The problem'} index={block++}>
                <p className="sheet__lead">{d.problem}</p>
              </Block>
            )}

            {d.contributions?.length > 0 && (
              <Block title="My contribution" index={block++}>
                <ul className="sheet__list">
                  {d.contributions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Block>
            )}

            {(d.built?.length > 0 || d.planned?.length > 0) && (
              <Block title="Built vs. planned" index={block++}>
                <div className="sheet__split">
                  {d.built?.length > 0 && (
                    <div>
                      <span className="badge badge--accent">Built</span>
                      <ul className="sheet__list">
                        {d.built.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {d.planned?.length > 0 && (
                    <div>
                      <span className="badge badge--dashed">Planned</span>
                      <ul className="sheet__list">
                        {d.planned.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Block>
            )}

            {d.sections?.map((section) => (
              <Block title={section.title} index={block++} key={section.title}>
                <ul className="sheet__list">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Block>
            ))}

            {d.challenges?.length > 0 && (
              <Block title="Challenges" index={block++}>
                {d.challenges.map((item) => (
                  <div className="sheet__challenge" key={item.challenge}>
                    <p>{item.challenge}</p>
                    <p>{item.approach}</p>
                  </div>
                ))}
              </Block>
            )}

            {d.outcomes?.length > 0 && (
              <Block title="Outcomes" index={block++}>
                <ul className="sheet__list">
                  {d.outcomes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Block>
            )}

            {p.screens?.length > 0 && (
              <Block title="Screens" index={block++}>
                <div className="sheet__screens">
                  {p.screens.map((screen) => (
                    <a key={screen.src} className="sheet__screen" href={screen.src} target="_blank" rel="noreferrer">
                      <img src={screen.src} alt={screen.alt} loading="lazy" />
                    </a>
                  ))}
                </div>
                {p.screensNote && <p className="sheet__note">{p.screensNote}</p>}
              </Block>
            )}

            {p.tech?.length > 0 && (
              <Block title="Technologies and focus" index={block++}>
                <ul className="tags">
                  {p.tech.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Block>
            )}

            {links.length > 0 && (
              <div className="sheet__links">
                {links.map(([key, url]) => (
                  <a key={key} className="btn btn--ghost btn--small" href={url} target="_blank" rel="noreferrer">
                    <span>{LINK_LABELS[key] || key}</span>
                    <ArrowUpRight size={14} />
                  </a>
                ))}
              </div>
            )}
          </>
        )}
      </aside>
    </div>
  );
}
