import { projects, skills } from '../data/site.js';
import { ArrowUpRight } from './Icons.jsx';
import { Headline, Reveal, SectionLabel } from './Reveal.jsx';
import { SkillIcon } from './SkillIcons.jsx';

const titleOf = (id) => projects.find((p) => p.id === id);

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
            const evidence = (group.usedIn || []).map(titleOf).filter(Boolean);
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
