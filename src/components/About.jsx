import { about, profile } from '../data/site.js';
import { Headline, Reveal, SectionLabel } from './Reveal.jsx';

export function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionLabel number="01">About</SectionLabel>
        <Headline parts={about.statement} className="about__statement" />

        <div className={`about__body ${profile.photo ? 'has-photo' : ''}`}>
          {profile.photo && (
            <Reveal as="figure" variant="scale" className="about__photo">
              <img src={profile.photo} alt={`Portrait of ${profile.name}`} loading="lazy" />
            </Reveal>
          )}

          <div className="about__text">
            {about.paragraphs.map((paragraph, i) => (
              <Reveal as="p" key={i} delay={i * 120}>
                {paragraph}
              </Reveal>
            ))}
          </div>

          <dl className="facts">
            {about.facts.map((fact, i) => (
              <Reveal className="facts__row" key={fact.label} delay={i * 90}>
                <dt>{fact.label}</dt>
                <dd>
                  {fact.value}
                  {fact.detail && <span>{fact.detail}</span>}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
