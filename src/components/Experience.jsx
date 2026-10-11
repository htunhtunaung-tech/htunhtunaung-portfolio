import { education, experience, recognition } from '../data/site.js';
import { ArrowUpRight } from './Icons.jsx';
import { Headline, Reveal, SectionLabel } from './Reveal.jsx';

export function Experience() {
  return (
    <section id="experience" className="section section--alt">
      <div className="container">
        <SectionLabel number="04">Experience, leadership &amp; education</SectionLabel>
        <Headline
          parts={[{ text: 'Learning, teaching,' }, { text: 'leading', accent: true }]}
          className="section-title"
        />

        <div className="exp">
          <div className="exp__col">
            <Reveal as="h3" className="exp__heading">
              Education
            </Reveal>
            {education.map((item, i) => (
              <Reveal className="edu-card" key={item.title} delay={i * 110}>
                <span className="mono-label">{item.period}</span>
                <span className="edu-card__title">{item.title}</span>
                <span className="edu-card__place">{item.place}</span>
                {item.note && <span className="edu-card__note">{item.note}</span>}
              </Reveal>
            ))}

            {recognition.length > 0 && (
              <>
                <Reveal as="h3" className="exp__heading exp__heading--spaced">
                  Hackathons &amp; recognition
                </Reveal>
                {recognition.map((item, i) => (
                  <Reveal className="edu-card" key={item.title} delay={i * 110}>
                    {item.year && <span className="mono-label">{item.year}</span>}
                    <span className="edu-card__title">{item.title}</span>
                    {item.detail && <span className="edu-card__place">{item.detail}</span>}
                    {item.link && (
                      <a className="link-btn link-btn--quiet" href={item.link} target="_blank" rel="noreferrer">
                        <span>View</span>
                        <ArrowUpRight size={14} />
                      </a>
                    )}
                  </Reveal>
                ))}
              </>
            )}
          </div>

          <div className="exp__col exp__col--wide">
            <Reveal as="h3" className="exp__heading exp__heading--rule">
              Leadership, teaching &amp; volunteering
            </Reveal>
            <ol className="timeline">
              {experience.map((item, i) => (
                <Reveal as="li" className="timeline__row" key={`${item.title}-${item.period}`} delay={i * 70}>
                  <span className="timeline__period">{item.period}</span>
                  <span className="timeline__main">
                    <span className="timeline__title">{item.title}</span>
                    <span className="timeline__place">{item.place}</span>
                  </span>
                  <span className={`badge ${item.type === 'Leadership' ? 'badge--accent' : ''}`}>{item.type}</span>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
