// One-time helper: adds the CareGo project to the top of the projects list in
// src/data/site.js. Nothing else in the file is touched.
// Run it once from the portfolio folder:   node add-carego.mjs
// It removes itself when it has finished.
import fs from 'node:fs';

const file = 'src/data/site.js';
let source = fs.readFileSync(file, 'utf8');

if (source.includes("id: 'carego'")) {
  console.log('- CareGo is already in the projects list. Nothing was changed.');
} else {
  const marker = 'export const projects = [';
  const at = source.indexOf(marker);
  if (at === -1) {
    console.log('Could not find the projects list in ' + file + '. Nothing was changed.');
    process.exit(1);
  }
  const entry = `
  {
    id: 'carego',
    category: 'Health · Business · Tech',
    badge: 'Pitch prototype',
    title: 'CareGo',
    summary:
      'A healthcare companion service for Khon Kaen: busy families book a trained, verified university student to take an elderly parent to hospital, then follow the visit live.',
    cover: 'browser',
    image: 'projects/carego-cover.jpg',
    featured: true,
    // TODO: check this matches what you did (for example, if you also pitched it or led the team).
    role: 'Named the product and built the web prototype',
    // TODO: add a result if there was one, e.g. 'Finalist, [competition name] 2026'.
    outcome: null,
    tech: ['HTML', 'CSS', 'JavaScript', 'localStorage', 'English · Thai · Chinese'],
    links: { github: 'https://github.com/Htunhtunaung23/CareGo_55555', live: null },
    screens: [
      { src: 'projects/carego-cover.jpg', alt: 'CareGo landing page: Your elderly parent’s visit, handled with care' },
      { src: 'projects/carego-booking.jpg', alt: 'CareGo booking form with visit details and price summary' },
      { src: 'projects/carego-tracking.jpg', alt: 'CareGo live tracking map from home to Srinagarind Hospital' },
      { src: 'projects/carego-admin.jpg', alt: 'CareGo admin overview with booking and revenue figures' },
    ],
    screensNote: 'Screens from the working prototype. Names, ratings and figures in it are sample data.',
    details: {
      problem:
        "Adult children often can't take leave from work when an elderly parent needs a hospital visit. CareGo sends a trained, verified university student to go with them, and keeps the family updated in real time.",
      built: [
        'Landing page with visit packages, add-ons and monthly plans',
        'Helper search with filters for language, specialty and availability',
        'Booking flow: parent details, hospital and department, add-ons, live price total',
        'Live tracking demo: route map, ETA countdown, progress steps and an updates feed',
        'Separate dashboards for families, helpers and admins',
        'Email sign-in with a one-time code (demo)',
        'The whole interface in English, Thai and Chinese',
        'Bookings, users and reviews saved in the browser',
      ],
      sections: [
        {
          title: 'Business model',
          items: [
            'Three visit packages of 4, 6 or 8 hours, from ฿1,190 to ฿1,990',
            'About two-thirds of each package goes to the student helper',
            'Add-ons: transport, wheelchair support, multi-department navigation, medicine pickup',
            'Monthly Silver and Gold plans for regular visits such as dialysis',
            'Helpers are CPR-certified students from health faculties, verified before they join',
          ],
        },
      ],
      contributions: [],
      challenges: [],
      outcomes: [],
    },
  },`;
  source = source.slice(0, at + marker.length) + entry + source.slice(at + marker.length);
  fs.writeFileSync(file, source);
  console.log('+ CareGo added as the first project');
}

fs.rmSync(new URL(import.meta.url));
console.log('Done.');
