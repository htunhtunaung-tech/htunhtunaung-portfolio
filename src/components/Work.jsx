import { contact, projects, settings } from '../data/site.js';
import { ArrowRight, ArrowUpRight } from './Icons.jsx';
import { ProjectCover } from './ProjectCovers.jsx';
import { Headline, Reveal, SectionLabel } from './Reveal.jsx';

const LINK_LABELS = { github: 'GitHub', live: 'Live demo', site: 'Website', figma: 'Figma design' };

function ProjectCard({ project, number, onOpen, delay }) {
  // Light that follows the pointer across the card.
  const onPointerMove = (event) => {
    if (event.pointerType === 'touch') return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`);
  };

  const links = Object.entries(project.links || {}).filter(([, url]) => url);
  const badgeClass = project.placeholder || project.badge === 'Concept' ? 'badge badge--dashed' : 'badge badge--accent';

  return (
    <Reveal
      as="article"
      className={`project ${project.featured ? 'project--featured' : ''}`}
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

        {(project.role || project.outcome) && (
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
            {project.tech.map((item) => (
              <li key={item}>{item}</li>
            ))}
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
  const visible = projects.filter((project) => !(settings.hidePlaceholderProjects && project.placeholder));
  const featured = visible.filter((project) => project.featured);
  const rest = visible.filter((project) => !project.featured);
  const numberOf = (project) => String(visible.indexOf(project) + 1).padStart(2, '0');

  return (
    <section id="work" className="section section--alt">
      <div className="container">
        <SectionLabel number="02">Selected work</SectionLabel>
        <div className="section-head">
          <Headline parts={[{ text: 'Selected' }, { text: 'work', accent: true }]} className="section-title" />
          <Reveal as="p" className="section-head__note" delay={150}>
            Software, data and digital media. Each project states the problem, my role, and what is actually built.
          </Reveal>
        </div>

        <div className="projects">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} number={numberOf(project)} onOpen={onOpen} delay={0} />
          ))}
          <div className="projects__grid">
            {rest.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                number={numberOf(project)}
                onOpen={onOpen}
                delay={(i % 2) * 120}
              />
            ))}
          </div>
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
