import { useState } from 'react';
import { contact, projects, settings } from '../data/site.js';
import { ArrowRight, ArrowUpRight } from './Icons.jsx';
import { ProjectCover } from './ProjectCovers.jsx';
import { Headline, Reveal, SectionLabel } from './Reveal.jsx';

const LINK_LABELS = { github: 'GitHub', live: 'Live demo', site: 'Website', figma: 'Figma design' };

// Which filter tabs each project belongs to
const GROUPS = {
  nexus: ['web'],
  carego: ['web', 'ux'],
  interntrack: ['web', 'ux'],
  'asean-digital-divide': ['data'],
  'chai-yo-para': ['web', 'ux'],
  clickjoy: ['ux', 'other'],
  'techtrek-edu': ['other'],
};
const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Web & full-stack' },
  { id: 'ux', label: 'UX/UI' },
  { id: 'data', label: 'Data' },
  { id: 'other', label: 'Interactive & community' },
];
const MAX_TAGS = 4;

function ProjectCard({ project, number, onOpen, delay, compact = false }) {
  // Light that follows the pointer across the card.
  const onPointerMove = (event) => {
    if (event.pointerType === 'touch') return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`);
    // -1 … 1 across the card, used to drift the screenshot a little (parallax).
    event.currentTarget.style.setProperty('--px', ((event.clientX - rect.left) / rect.width - 0.5) * 2);
    event.currentTarget.style.setProperty('--py', ((event.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  const links = Object.entries(project.links || {}).filter(([, url]) => url);
  const badgeClass = project.placeholder || project.badge === 'Concept' ? 'badge badge--dashed' : 'badge badge--accent';

  return (
    <Reveal
      as="article"
      className={`project ${compact ? 'project--compact' : 'project--featured'}`}
      delay={delay}
      onPointerMove={onPointerMove}
    >
      <div className="project__cover">
        <ProjectCover project={project} />
      </div>
      <div className="project__body">
        <div className="project__meta">
          <span className="mono-label">
            {number} / {project.category}
          </span>
          {project.badge && <span className={badgeClass}>{project.badge}</span>}
        </div>
        <h3 className="project__title">{project.title}</h3>
        <p className="project__summary">{project.summary}</p>

        {compact && project.role && (
          <p className="project__role">
            <span>Role</span> {project.role}
          </p>
        )}
        {compact && project.outcome && (
          <p className="project__role project__role--result">
            <span>Result</span> {project.outcome}
          </p>
        )}

        {!compact && (project.role || project.outcome) && (
          <dl className="project__facts">
            {project.role && (
              <div>
                <dt>My role</dt>
                <dd>{project.role}</dd>
              </div>
            )}
            {project.outcome && (
              <div>
                <dt>Outcome</dt>
                <dd>{project.outcome}</dd>
              </div>
            )}
          </dl>
        )}

        {project.tech?.length > 0 && (
          <ul className="tags" aria-label="Technologies and focus">
            {(compact ? project.tech.slice(0, MAX_TAGS) : project.tech).map((item) => (
              <li key={item}>{item}</li>
            ))}
            {compact && project.tech.length > MAX_TAGS && (
              <li className="tags__more">+{project.tech.length - MAX_TAGS}</li>
            )}
          </ul>
        )}

        {(project.details || links.length > 0) && (
          <div className="project__links">
            {project.details && (
              <button type="button" className="link-btn" onClick={() => onOpen(project)}>
                <span>View details</span>
                <ArrowRight size={15} />
              </button>
            )}
            {links.map(([key, url]) => (
              <a key={key} className="link-btn link-btn--quiet" href={url} target="_blank" rel="noreferrer">
                <span>{LINK_LABELS[key] || key}</span>
                <ArrowUpRight size={14} />
              </a>
            ))}
          </div>
        )}
      </div>
    </Reveal>
  );
}

export function Work({ onOpen }) {
  const [filter, setFilter] = useState('all');
  const visible = projects.filter((project) => !(settings.hidePlaceholderProjects && project.placeholder));
  const numberOf = (project) => String(visible.indexOf(project) + 1).padStart(2, '0');
  const inFilter = (project) => filter === 'all' || (GROUPS[project.id] || ['other']).includes(filter);
  const countFor = (id) =>
    id === 'all' ? visible.length : visible.filter((p) => (GROUPS[p.id] || ['other']).includes(id)).length;

  const shown = visible.filter(inFilter);
  const [spotlight, ...rest] = shown;

  return (
    <section id="work" className="section section--alt">
      <div className="container">
        <SectionLabel number="01">Selected work</SectionLabel>
        <div className="section-head">
          <Headline parts={[{ text: 'Selected' }, { text: 'work', accent: true }]} className="section-title" />
          <Reveal as="p" className="section-head__note" delay={150}>
            Software, data and digital media. Each project states the problem, my role, and what is actually built.
          </Reveal>
        </div>

        <div className="work-filters" role="group" aria-label="Filter projects">
          {FILTERS.filter((f) => countFor(f.id) > 0).map((f) => (
            <button
              key={f.id}
              type="button"
              className={`work-filter ${filter === f.id ? 'is-active' : ''}`}
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
              <span className="work-filter__count">{countFor(f.id)}</span>
            </button>
          ))}
        </div>

        <div className="projects" key={filter}>
          {spotlight && (
            <ProjectCard project={spotlight} number={numberOf(spotlight)} onOpen={onOpen} delay={0} />
          )}
          {rest.length > 0 && (
            <div className="projects__grid projects__grid--compact">
              {rest.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  number={numberOf(project)}
                  onOpen={onOpen}
                  delay={(i % 2) * 120}
                  compact
                />
              ))}
            </div>
          )}
        </div>

        {contact.github && (
          <Reveal as="p" className="work-profile" delay={100}>
            <a className="link-btn link-btn--quiet" href={contact.github} target="_blank" rel="noreferrer">
              <span>See all my code on GitHub</span>
              <ArrowUpRight size={14} />
            </a>
          </Reveal>
        )}
      </div>
    </section>
  );
}
