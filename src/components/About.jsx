import { about, approach, profile } from '../data/site.js';
import { Headline, Reveal, SectionLabel } from './Reveal.jsx';

export function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionLabel number="02">About</SectionLabel>
        <Headline parts={about.statement} className="about__statement" />

        <div className={`about__body ${profile.photo ? 'has-photo' : ''}`}>
          {profile.photo && (
            <Reveal as="figure" variant="scale" className="about__photo">
              <img src={profile.photo} alt={`Portrait of ${profile.name}`} loading="lazy" width="480" height="600" />
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

        {about.pillars?.length > 0 && (
          <ul className="pillars">
            {about.pillars.map((pillar, i) => (
              <Reveal as="li" className="pillar" key={pillar.title} delay={i * 80}>
                <span className="pillar__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="pillar__title">{pillar.title}</span>
                <span className="pillar__text">{pillar.text}</span>
              </Reveal>
            ))}
          </ul>
        )}

        {approach?.length > 0 && (
          <div className="how">
            <Reveal as="h3" className="how__title">
              How I work
            </Reveal>
            <ol className="how__steps">
              {approach.map((step, i) => (
                <Reveal as="li" className="how__step" key={step} delay={i * 90}>
                  <span className="how__num">{String(i + 1).padStart(2, '0')}</span>
                  <span>{step}</span>
                </Reveal>
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
}
