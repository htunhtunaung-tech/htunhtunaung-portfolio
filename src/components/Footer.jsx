import { contact, profile } from '../data/site.js';
import { ArrowUp, ArrowUpRight } from './Icons.jsx';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__cta">
          <p className="footer__line">
            Let's build something <em>meaningful</em> together.
          </p>
          <a className="btn btn--primary" href={`mailto:${contact.email}`} data-magnetic>
            <span>{contact.email}</span>
            <ArrowUpRight size={15} />
          </a>
        </div>

        <div className="footer__inner">
          <span>
            © {new Date().getFullYear()} {profile.name} ({profile.nickname})
          </span>
          <nav className="footer__links" aria-label="Elsewhere">
            {contact.github && (
              <a href={contact.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            )}
            {contact.linkedin && (
              <a href={contact.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            )}
            <a href={`mailto:${contact.email}`}>Email</a>
          </nav>
          <a className="footer__top" href="#top">
            <span>Back to top</span>
            <ArrowUp size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
