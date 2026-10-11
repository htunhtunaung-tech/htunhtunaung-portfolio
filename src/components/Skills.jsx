import { skills } from '../data/site.js';
import { Headline, Reveal, SectionLabel } from './Reveal.jsx';

export function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionLabel number="03">Technical skills</SectionLabel>
        <div className="section-head">
          <Headline parts={[{ text: 'What I' }, { text: 'work with', accent: true }]} className="section-title" />
          <Reveal as="p" className="section-head__note" delay={150}>
            Only tools I have used in real coursework and projects. No percentages — ask me about any of them.
          </Reveal>
        </div>

        <div className="skills">
          {skills.map((group, g) => (
            <Reveal className="skills__group" key={group.group} delay={g * 110}>
              <h3 className="skills__title">{group.group}</h3>
              <ul>
                {group.items.map((item, i) => (
                  <li key={item} style={{ '--i': i }}>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
