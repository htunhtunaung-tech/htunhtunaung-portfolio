// Updates the Chai-Yo Para card: role line, and adds three accessibility screens
// (light, dark, high contrast) to its gallery. Then deletes itself.
// Run once from the portfolio folder:  node update-chaiyo-a11y.mjs
import fs from 'node:fs';

const file = 'src/data/site.js';
let src = fs.readFileSync(file, 'utf8');
const at = src.search(/id:\s*['"]chai-yo-para['"]/);

if (at === -1) {
  console.log('Chai-Yo Para not found in site.js, nothing changed.');
} else if (src.includes('projects/chaiyo-contrast.jpg')) {
  console.log('Accessibility screens already added, nothing changed.');
} else {
  const start = src.lastIndexOf('{', at);
  let depth = 0, end = -1, quote = null;
  for (let i = start; i < src.length; i++) {
    const c = src[i];
    if (quote) { if (c === '\\') i++; else if (c === quote) quote = null; continue; }
    if (c === "'" || c === '"' || c === '`') quote = c;
    else if (c === '{') depth++;
    else if (c === '}' && --depth === 0) { end = i + 1; break; }
  }
  let entry = src.slice(start, end);

  const newRole = "role: 'Frontend Developer & UX/UI design',";
  const roleRe = /role: '[^']*',/;
  if (!roleRe.test(entry)) {
    console.log('Could not find the role line, nothing changed.');
    process.exit(0);
  }
  entry = entry.replace(roleRe, newRole);

  const extra = [
    "      { src: 'projects/chaiyo-light.jpg', alt: 'Chai-Yo Para medal table in light mode' },",
    "      { src: 'projects/chaiyo-dark.jpg', alt: 'Chai-Yo Para medal table in dark mode' },",
    "      { src: 'projects/chaiyo-contrast.jpg', alt: 'Chai-Yo Para medal table in high-contrast mode' },",
  ].join('\n');
  entry = entry.replace(/(screens: \[\n[\s\S]*?)(\n    \],)/, (m, a, b) => a + '\n' + extra + b);

  entry = entry.replace(
    /screensNote: '[^']*',/,
    "screensNote: 'Screens from the project. The live pages run on sample data, and the names and results in them are not real. The last three show the accessibility display options: light, dark and high contrast.',"
  );

  src = src.slice(0, start) + entry + src.slice(end);
  fs.writeFileSync(file, src);
  console.log('Role updated and accessibility screens added.');
}

fs.rmSync(new URL(import.meta.url));
