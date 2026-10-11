// One-time helper: fills in LinkedIn and GitHub and adds the social-media
// settings to the contact section of src/data/site.js. Nothing else is touched.
// Run it once from the portfolio folder:   node add-socials.mjs
// It removes itself when it has finished.
import fs from 'node:fs';

const file = 'src/data/site.js';
const LINKEDIN = 'https://www.linkedin.com/in/htun-htun-aung-a282a8346';
const GITHUB = 'https://github.com/htunhtunaung-tech';

let source = fs.readFileSync(file, 'utf8');
const start = source.indexOf('export const contact');
const end = source.indexOf('};', start);
if (start === -1 || end === -1) {
  console.log('Could not find the contact section in ' + file + '. Nothing was changed.');
  process.exit(1);
}

let block = source.slice(start, end);
const setLine = (key, value) => {
  const line = new RegExp(`^(\\s*)${key}:.*$`, 'm');
  if (!line.test(block)) return false;
  block = block.replace(line, `$1${key}: '${value}',`);
  return true;
};

console.log(setLine('linkedin', LINKEDIN) ? '+ LinkedIn link set' : '! Could not find the linkedin line');
console.log(setLine('github', GITHUB) ? '+ GitHub link set' : '! Could not find the github line');

if (/^\s*facebook:/m.test(block)) {
  console.log('- Social media settings: already there');
} else {
  const extra = [
    '  // Social media: paste the full link between quotes. null = hidden.',
    "  facebook: null, // e.g. 'https://www.facebook.com/your.name'",
    "  instagram: null, // e.g. 'https://www.instagram.com/your.handle'",
    "  line: null, // e.g. 'https://line.me/ti/p/~your-line-id'",
    "  whatsapp: null, // e.g. 'https://wa.me/66612345678' (country code + number, no + or spaces)",
  ].join('\n');
  block = block.replace(/^(\s*github:.*)$/m, `$1\n${extra}`);
  console.log('+ Social media settings added (Facebook, Instagram, LINE, WhatsApp)');
}

fs.writeFileSync(file, source.slice(0, start) + block + source.slice(end));
fs.rmSync(new URL(import.meta.url));
console.log('Done. Now open src/data/site.js and paste your social links.');
