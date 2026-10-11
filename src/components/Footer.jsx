import { profile } from '../data/site.js';
import { ArrowUp } from './Icons.jsx';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span>
          © {new Date().getFullYear()} {profile.name} ({profile.nickname})
        </span>
        <span>Designed &amp; built in {profile.location.split(',')[0]}</span>
        <a className="footer__top" href="#top">
          <span>Back to top</span>
          <ArrowUp size={14} />
        </a>
      </div>
    </footer>
  );
}
