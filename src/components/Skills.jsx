import { projects, skills } from '../data/site.js';
import { ArrowUpRight } from './Icons.jsx';
import { Headline, Reveal, SectionLabel } from './Reveal.jsx';
import { SkillIcon } from './SkillIcons.jsx';

const norm = (text) => String(text).trim().toLowerCase();

/**
 * The projects that use a skill group, worked out from each project's own
 * `tech` list, so a new project shows up here on its own. A project counts
 * when one of its technologies is in the group's `items` (or `alsoMatch`).
 * UI/UX also counts projects with a Figma link, and `usedIn` can add any
 * project by hand. Listed in the same order as the Work section.
 */
function projectsFor(group) {
  const words = new Set([...(group.items || []), ...(group.alsoMatch || [])].map(norm));
  const manual = new Set(group.usedIn || []);
  return projects.filter((project) => {
    if (project.placeholder) return false;
    if (manual.has(project.id)) return true;
    if (group.matchFigma && project.links?.figma) return true;
    return (project.tech || []).some((item) => words.has(norm(item)));
  });
}

export function Skills({ onOpen }) {
  return (
    <section id="skills" className="section section--alt">
      <div className="container">
        <SectionLabel number="03">Technical expertise</SectionLabel>
        <div className="section-head">
          <Headline parts={[{ text: 'What I' }, { text: 'work with', accent: true }]} className="section-title" />
          <Reveal as="p" className="section-head__note" delay={150}>
            Only tools I have used in my own projects and coursework. Each group links to the projects that show it — no
            percentage bars.
          </Reveal>
        </div>

        <div className="skillset">
          {skills.map((group, g) => {
            const evidence = projectsFor(group);
            return (
              <Reveal as="article" className="skillcard" key={group.group} delay={(g % 3) * 100}>
                <header className="skillcard__head">
                  <span className="skillcard__num">{String(g + 1).padStart(2, '0')}</span>
                  <h3 className="skillcard__title">{group.group}</h3>
                </header>
                <ul className="skillcard__items">
                  {group.items.map((item) => (
                    <li key={item}>
                      <SkillIcon name={item} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {group.note && <p className="skillcard__note">{group.note}</p>}
                {evidence.length > 0 && (
                  <p className="skillcard__proof">
                    <span className="skillcard__proof-label">Used in</span>
                    {evidence.map((project) => (
                      <button
                        key={project.id}
                        type="button"
                        className="proof-link"
                        onClick={() => onOpen?.(project)}
                      >
                        {project.title.split(':')[0]}
                        <ArrowUpRight size={12} />
                      </button>
                    ))}
                  </p>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
