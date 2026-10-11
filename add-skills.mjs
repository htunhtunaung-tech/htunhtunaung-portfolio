// One-time helper: adds React, C++ and Figma to the skills list in
// src/data/site.js without touching anything else in that file.
// Run it once from the portfolio folder:   node add-skills.mjs
// It removes itself when it has finished.
import fs from 'node:fs';

const file = 'src/data/site.js';
// [skill to add, existing skill it should come after]
const additions = [
  ['React', 'JavaScript'],
  ['C++', 'Java'],
  ['Figma', 'UI/UX design'],
];

let source = fs.readFileSync(file, 'utf8');
const start = source.indexOf('export const skills');
const end = source.indexOf('];', start);
if (start === -1 || end === -1) {
  console.log('Could not find the skills list in ' + file + '. Nothing was changed.');
  process.exit(1);
}

let block = source.slice(start, end);
for (const [skill, after] of additions) {
  if (block.includes(`'${skill}'`)) {
    console.log(`- ${skill}: already in the list`);
  } else if (block.includes(`'${after}'`)) {
    block = block.replace(`'${after}'`, `'${after}', '${skill}'`);
    console.log(`+ ${skill}: added after ${after}`);
  } else {
    console.log(`! ${skill}: could not find '${after}' to put it after. Add '${skill}' by hand in ${file}.`);
  }
}

fs.writeFileSync(file, source.slice(0, start) + block + source.slice(end));
fs.rmSync(new URL(import.meta.url));
console.log('Done. Skills list updated.');
