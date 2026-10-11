/*
 * ONE FILE FOR ALL CONTENT
 * ------------------------
 * Everything the site says about you lives here. Edit this file to change
 * text, projects, skills, links and experience — no component needs touching.
 *
 * Rules the site follows:
 *  - A value of `null` (or an empty list) is simply not shown. No broken links.
 *  - A project with `placeholder: true` is shown with a visible "Placeholder"
 *    badge until you replace it — or hide them all with
 *    `settings.hidePlaceholderProjects`.
 */

export const settings = {
  // The small "open to opportunities" label in the hero.
  showStatus: true,
  // Show your phone number in the contact section.
  showPhone: true,
  // Set to true to publish with only your real projects.
  hidePlaceholderProjects: false,
  // Contact form endpoint. Comes from the VITE_FORM_ENDPOINT environment
  // variable (see README). Empty = the form opens the visitor's email app.
  formEndpoint: import.meta.env.VITE_FORM_ENDPOINT || '',
};

export const profile = {
  name: 'Htun Htun Aung',
  nickname: 'Louis',
  logo: 'HTUN.HTUN.AUNG',
  role: 'Full-Stack Developer & Software Engineer',
  status: 'Open to internships & software engineering opportunities',
  // Headline parts: `accent: true` renders in the italic serif accent.
  heroTitle: [
    { text: 'I Build Digital Experiences That Solve' },
    { text: 'Real Problems.', accent: true },
  ],
  intro:
    'Full-stack developer and software engineer with a growing interest in data analytics. I study Digital Media Engineering and Computer Science, and build web applications designed to be useful, reliable and easy to use.',
  location: 'Khon Kaen, Thailand',
  coordinates: '16.47° N · 102.82° E',
  timezone: 'UTC+07',
  studying: 'Digital Media Engineering + Computer Science',
  // Put a photo in /public (for example /public/me.jpg) and set 'me.jpg'.
  photo: 'me.png',
  // Put your CV in /public (for example /public/resume.pdf) and set 'resume.pdf'.
  // While this is null the resume buttons say "Request Resume" and lead to the contact form.
  resume: "Htun-Htun-Aung-CV.pdf",
};

export const about = {
  statement: [
    { text: 'I combine software engineering,' },
    { text: 'creative problem-solving', accent: true },
    { text: 'and digital media to build technology that solves real-world problems.' },
  ],
  paragraphs: [
    "I'm a technology enthusiast and aspiring software engineer passionate about building useful, thoughtful, and engaging digital experiences. Through my studies in Digital Media Engineering and Computer Science, I explore the intersection of software development, data, and creative technology.",
    "Beyond coding, I've been involved in STEM education and digital literacy initiatives, helping young people access technology and develop practical skills. My goal is to keep building meaningful products, grow as an engineer, and use technology to create opportunities for others.",
  ],
  facts: [
    { label: 'Studying', value: 'B.Eng Digital Media Engineering', detail: 'Khon Kaen University, Thailand' },
    { label: 'Also studying', value: 'B.Sc Computer Science', detail: 'University of the People, USA' },
    { label: 'Founded', value: 'TechTrek Edu', detail: 'Youth-led STEM and digital literacy initiative' },
    { label: 'Languages', value: 'Burmese (native) · English (C1) · Thai (basic)', detail: null },
  ],
};

/*
 * PROJECTS
 * cover:  'browser' | 'clickjoy' | 'chart' | 'gallery' | 'wordmark'
 *         (built-in animated covers) — or set `image` to a file in /public
 *         to show a real screenshot instead.
 * links:  null values are hidden.
 * details: shown in the "View details" panel. Empty parts are skipped.
 *          { problem, problemTitle?, contributions[], built[], planned[],
 *            challenges[{ challenge, approach }], outcomes[] }
 */
export const projects = [
  {
    id: 'interntrack',
    category: 'Full-Stack Web Application',
    badge: 'Team project',
    title: 'InternTrack',
    summary: 'A team-built web application that keeps internship applications tracked in one place.',
    cover: 'browser',
    image: null,
    featured: true,
    // TODO: replace with your specific contribution (the pages and features you built).
    role: 'Team member',
    outcome: null,
    tech: ['Python', 'Django', 'PostgreSQL', 'HTML', 'CSS'],
    links: { github: null, live: null },
    details: {
      // TODO: review this wording so it matches how your team describes the project.
      problem:
        'Applying for internships means keeping up with many applications at once. InternTrack gives each application one place to be recorded and followed.',
      contributions: [],
      challenges: [],
      outcomes: [],
    },
  },
  {
    id: 'clickjoy',
    category: 'Interactive Product Concept',
    badge: 'Concept',
    title: 'ClickJoy',
    summary: 'A playful, interactive app concept built around clicking mechanics, points, statistics and a reward system.',
    cover: 'clickjoy',
    image: null,
    role: 'Concept and design',
    outcome: null,
    tech: ['React', 'JavaScript', 'CSS'],
    links: { github: null, live: null },
    details: {
      problemTitle: 'The idea',
      problem:
        'ClickJoy is a concept for a playful app where every click earns points, statistics show your progress, and rewards unlock along the way.',
      built: ['The tap demo on this page: points, reward progress and rewards earned'],
      planned: ['Full clicking mechanics', 'Player statistics', 'Reward system'],
      contributions: [],
      challenges: [],
      outcomes: [],
    },
  },
  {
    id: 'data-project',
    placeholder: true,
    category: 'Data Analytics',
    badge: 'Placeholder',
    title: 'Data project title',
    summary:
      'Replace this entry with a real analysis: the question you asked, the dataset, how you cleaned and explored it, and what you found.',
    cover: 'chart',
    image: null,
    role: null,
    outcome: null,
    tech: ['SQL'],
    links: { github: null, live: null },
    details: null,
  },
  {
    id: '3d-media',
    placeholder: true,
    category: '3D Modeling & Digital Media',
    badge: 'Placeholder',
    title: '3D & motion studies',
    summary: 'Replace this entry with your strongest Blender models, animation experiments or digital artwork.',
    cover: 'gallery',
    image: null,
    // Optional: up to three images from /public, for example ['renders/robot.jpg'].
    gallery: [],
    role: null,
    outcome: null,
    tech: ['Blender', '3D modeling'],
    links: { github: null, live: null },
    details: null,
  },
  {
    id: 'techtrek-edu',
    category: 'Youth Initiative',
    badge: 'Founder',
    title: 'TechTrek Edu',
    summary: 'A youth-led initiative I founded to support STEM education and digital literacy for young people in Myanmar.',
    cover: 'wordmark',
    coverLine: 'STEM education · Digital literacy · Myanmar',
    image: null,
    role: 'Founder',
    // TODO: add a number you can substantiate, e.g. '120 learners across 14 sessions'.
    outcome: null,
    tech: ['STEM education', 'Digital literacy', 'Programming'],
    links: { site: null },
    details: {
      problem: 'Many young people in Myanmar have limited access to STEM learning and practical digital skills.',
      // TODO: add what you designed, taught and built.
      contributions: ['Founded the initiative and lead its direction.'],
      // TODO: [{ challenge: '…', approach: '…' }]
      challenges: [],
      outcomes: [],
    },
  },
];

// Only list tools you can talk about in an interview.
export const skills = [
  { group: 'Frontend', items: ['HTML', 'CSS', 'JavaScript', 'React'] },
  { group: 'Backend', items: ['Python', 'Java', 'C++', 'Django', 'PostgreSQL', 'APIs'] },
  { group: 'Data & Analytics', items: ['SQL', 'Data analysis', 'Data visualization'] },
  {
    group: 'Creative Technology',
    items: ['UI/UX design', 'Figma', 'Graphic design', 'Blender', '3D modeling', 'Digital media production'],
  },
];

export const education = [
  {
    period: '2nd year · Present',
    title: 'B.Eng, Digital Media Engineering',
    place: 'Khon Kaen University, Thailand',
    note: 'Full four-year scholarship',
  },
  {
    period: '2nd year · Present',
    title: 'B.Sc, Computer Science',
    place: 'University of the People, USA',
    note: 'Full four-year scholarship',
  },
];

// Verified hackathons, awards or selections: { title, detail, year, link }.
export const recognition = [];

// type: 'Leadership' | 'Teaching' | 'Volunteering' | 'Youth org' | 'Work'
export const experience = [
  {
    period: 'Present',
    title: 'Founder',
    place: 'TechTrek Edu — youth-led STEM and digital literacy initiative, Myanmar',
    type: 'Leadership',
  },
  { period: 'Oct 2025 — Present', title: 'Programming Instructor', place: 'Python, HTML and CSS', type: 'Teaching' },
  { period: 'Oct 2024 — Present', title: 'GED Instructor', place: 'All subjects', type: 'Teaching' },
  { period: 'Nov 2024 — Apr 2025', title: 'Graphic Designer', place: 'Glory Youth Organization', type: 'Youth org' },
  { period: 'Feb — May 2024', title: 'Content Writer', place: 'Little Lighthouse Youth Organization', type: 'Youth org' },
  {
    period: 'Jun 2022 — Feb 2023',
    title: 'Volunteer Computer Teacher',
    place: 'Wiratitawya SanThida Nunnery School, Thanlyin',
    type: 'Volunteering',
  },
  { period: 'Aug 2021 — Present', title: 'Freelance STEM Teacher', place: 'Independent', type: 'Teaching' },
];

export const approach = [
  'Understand the problem.',
  'Research and plan the solution.',
  'Design and develop.',
  'Test, refine, and improve.',
  'Learn from feedback and iterate.',
];

export const contact = {
  heading: [
    { text: 'Have an interesting problem to solve?' },
    { text: "Let's build something meaningful.", accent: true, newline: true },
  ],
  email: 'htunhtunaung.h@kkumail.com',
  phone: '+66 61 604 3800',
  // Full URLs, e.g. 'https://www.linkedin.com/in/your-handle'. null = hidden.
  linkedin: 'https://www.linkedin.com/in/htun-htun-aung-a282a8346',
  github: 'https://github.com/htunhtunaung-tech',
  // Social media: paste the full link between quotes. null = hidden.
  facebook: 'https://www.facebook.com/louisleohtun', // e.g. 'https://www.facebook.com/your.name'
  instagram: 'https://www.instagram.com/htun_louis/', // e.g. 'https://www.instagram.com/your.handle'
  line: 'https://line.me/ti/p/edXeabUw9S', // e.g. 'https://line.me/ti/p/~your-line-id'
  whatsapp: 'https://wa.me/66616043800', // e.g. 'https://wa.me/66612345678' (country code + number, no + or spaces)
};

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'approach', label: 'Approach' },
  { id: 'contact', label: 'Contact' },
];
