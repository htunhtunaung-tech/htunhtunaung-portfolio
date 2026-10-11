import { profile } from '../data/site.js';
import { ArrowRight, Download } from './Icons.jsx';

/**
 * Resume button. Downloads the file once `profile.resume` is set in
 * src/data/site.js; until then it honestly says "Request Resume" and leads
 * to the contact form instead of a dead link.
 */
export function ResumeLink({ className = '', short = false, onClick }) {
  if (profile.resume) {
    return (
      <a className={className} href={profile.resume} download onClick={onClick}>
          <span>{short ? 'CV' : 'Download CV'}</span>
        <Download />
      </a>
    );
  }
  return (
    <a className={className} href="#contact" onClick={onClick}>
      <span>{short ? 'Resume' : 'Request Resume'}</span>
      <ArrowRight />
    </a>
  );
}
