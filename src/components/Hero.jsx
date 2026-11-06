import { contact, glance, profile, settings } from '../data/site.js';
import { ArrowRight, ArrowUpRight, Cap, Pin } from './Icons.jsx';
import { ResumeLink } from './ResumeLink.jsx';
import { Headline } from './Reveal.jsx';
import { Sculpture } from './Sculpture.jsx';

export function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__grid" aria-hidden="true" />

      <div className="container hero__inner">
        <div className="hero__copy">
          {settings.showStatus && (
            <p className="status hero-in" style={{ '--n': 0 }}>
              <span className="status__dot" aria-hidden="true" />
              {profile.status}
            </p>
          )}

          <div className="hero__id hero-in" style={{ '--n': 1 }}>
            {profile.photo && (
              <img className="hero__avatar" src={profile.photo} alt="" width="52" height="52" />
            )}
            <div>
              <p className="hero__name">
                {profile.name} <span className="hero__nick">“{profile.nickname}”</span>
              </p>
              <p className="hero__role">{profile.role}</p>
            </div>
          </div>

          <Headline as="h1" parts={profile.heroTitle} className="hero__title" />

          <p className="hero__intro hero-in" style={{ '--n': 6 }}>
            {profile.intro}
          </p>

          <div className="hero__actions hero-in" style={{ '--n': 7 }}>
            <a className="btn btn--primary" href="#work" data-magnetic>
              <span>Explore My Work</span>
              <ArrowRight />
            </a>
            <a className="btn btn--ghost" href="#contact" data-magnetic>
              <span>Let's Connect</span>
              <ArrowUpRight size={15} />
            </a>
            <ResumeLink className="text-link" />
          </div>

          <p className="hero__meta hero-in" style={{ '--n': 8 }}>
            <span>
              <Pin size={15} /> {profile.location}
            </span>
            <span>
              <Cap size={15} /> Khon Kaen University · University of the People
            </span>
          </p>
        </div>

        <div className="hero__visual hero-in hero-in--scale" style={{ '--n': 2 }}>
          <Sculpture />
        </div>
      </div>

      <div className="glance hero-in" style={{ '--n': 9 }}>
        <dl className="container glance__inner" aria-label="At a glance">
          {glance.map((item) => (
            <div className="glance__item" key={item.label}>
              <dt className="glance__label">{item.label}</dt>
              <dd className="glance__value">{item.value}</dd>
            </div>
          ))}
          <div className="glance__item">
            <dt className="glance__label">Find me</dt>
            <dd className="glance__value">
              {contact.github && (
                <a href={contact.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              )}
              {' · '}
              {contact.linkedin && (
                <a href={contact.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              )}
              {' · '}
              <a href={`mailto:${contact.email}`}>Email</a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
