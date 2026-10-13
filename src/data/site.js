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
  hidePlaceholderProjects: true,
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
  photo: 'me.jpg',
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
  },
  {
    id: 'interntrack',
    category: 'Full-Stack Web Application · UX/UI',
    badge: 'Team project',
    title: 'InternTrack',
    summary:
      'A team-built web app that keeps every internship application, interview and company in one place. I designed it in Figma, from research to final screens, and built the frontend.',
    cover: 'browser',
    image: 'projects/interntrack-dashboard.jpg',
    featured: true,
    role: 'UX/UI Designer and frontend developer',
    outcome: null,
    tech: ['Figma', 'UX research', 'HTML', 'CSS', 'JavaScript', 'Django', 'PostgreSQL'],
    links: { figma: 'https://www.figma.com/design/BB33jeuOBuxQAjCmsok66e/InternTrack-%E2%80%94-UX-UI-Master-Design?node-id=0-1', github: 'https://github.com/htunhtunaung-tech/InternTrack_htunhtunaung', live: null },
    screens: [
      { src: 'projects/interntrack-dashboard.jpg', alt: 'InternTrack dashboard with application totals, a journey chart and a status donut' },
      { src: 'projects/interntrack-login.jpg', alt: 'InternTrack login page with the Track it. Apply it. Land it. tagline' },
      { src: 'projects/interntrack-add.jpg', alt: 'Add new internship form with company and application details' },
      { src: 'projects/interntrack-interviews.jpg', alt: 'Upcoming interviews list with date filters' },
      { src: 'projects/interntrack-companies.jpg', alt: 'Companies table showing each company and its furthest stage' },
      { src: 'projects/interntrack-export.jpg', alt: 'Export page for downloading applications as CSV or PDF' },
    ],
    screensNote: 'Screens from the working Django app, run with sample data. Company names are examples.',
    details: {
      problem:
        'Applying for internships means keeping up with many applications, deadlines and interviews at once. InternTrack gives each application one place to be recorded and followed, from applied to accepted.',
      contributions: [
        'Designed the whole UX/UI in Figma: UX research, user flow, wireframes and the final desktop screens.',
        'Created the visual system: navy, orange and yellow palette, Poppins type scale, and a colour for each application status.',
        'Built the frontend from the design: the page templates, CSS and JavaScript for every screen.',
      ],
      sections: [
        { title: 'Design process', items: ['UX research', 'User flow', 'Wireframes', 'High-fidelity desktop UI'] },
      ],
      built: [
        'Login, registration and password reset',
        'Dashboard with an application-journey chart and a status donut',
        'Applications list with status filters, plus add, edit and delete',
        'Application details with a timeline and interviews',
        'Interviews, Companies, and Search & filter pages',
        'Export to CSV and PDF, and a Settings page',
      ],
      challenges: [],
      outcomes: [],
    },
  },
  {
    id: 'clickjoy',
    category: 'Interactive Desktop App',
    badge: 'Team project',
    title: 'ClickJoy',
    summary:
      'A click-based relaxation app with 12 satisfying mini-games, scores, daily tasks, rewards and a ranking, made to help people relieve stress and pass time.',
    cover: 'clickjoy',
    image: 'projects/clickjoy-cover.jpg',
    role: 'Interactive Designer for the whole project',
    outcome: 'Presented in the Interaction Programming course, 31 March 2026',
    tech: ['Python', 'PySide6 (Qt)', 'CSV storage', 'Dark & light themes'],
    links: { github: 'https://github.com/htunhtunaung-tech/ClickJoy_htunhtunaung', live: null },
    screens: [
      { src: 'projects/clickjoy-menu.jpg', alt: 'ClickJoy main menu with score, streak and the list of mini-games' },
      { src: 'projects/clickjoy-normal.jpg', alt: 'Normal Click mini-game with a glowing TAP button' },
      { src: 'projects/clickjoy-pop.jpg', alt: 'Pop It mini-game with a grid of bubbles to pop' },
      { src: 'projects/clickjoy-colorshift.jpg', alt: 'Color Shift mini-game with six colour buttons' },
      { src: 'projects/clickjoy-tasks.jpg', alt: 'Tasks page with goals that earn rewards' },
      { src: 'projects/clickjoy-profile.jpg', alt: 'Player profile page with avatar, bio and stats' },
    ],
    screensNote: 'Screens from the working app, captured with a demo player.',
    details: {
      problemTitle: 'The idea',
      problem:
        'A digital playground for your hands: quick, satisfying clicking games that give anyone a short mental break, for all ages and with no in-app purchases. It was designed for the general public and for people managing stress or ADHD.',
      contributions: [
        'Interactive designer across the whole project: how every page and mini-game looks, moves and responds to a click.',
        'Designed the flow between pages: login, main menu, games, ranking, tasks, rewards, profile and settings.',
      ],
      built: [
        '12 mini-games: Normal Click, Flip Coin, Switch, Swap Click, Click per Time, Stopwatch, Pop It, Focus Burst, Chaos Control, Memory Flash, Dopamine Meter and Color Shift',
        'Login and player profiles with avatar and bio',
        'Scores, daily tasks, rewards and a player ranking',
        'Neon glow, particle and transition animations',
        'Dark and light themes in Settings, an animated side menu and a feedback form',
      ],
      sections: [
        {
          title: 'Goals',
          items: [
            'Reduce stress',
            'Improve concentration',
            'Keep people coming back with rewards and a ranking',
            'Stay simple enough for every age',
          ],
        },
      ],
      challenges: [],
      outcomes: [],
    },
  },
  {
    id: 'asean-digital-divide',
    category: 'Data Analytics',
    badge: 'Solo project',
    title: 'Bridging the Gap: ASEAN Digital Divide',
    summary:
      'An end-to-end analysis of internet access and education across the 11 ASEAN countries, 2000–2024: live World Bank data, a cleaned panel, fixed-effects regressions, clustering and an interactive dashboard.',
    cover: 'chart',
    image: 'projects/asean-cover.jpg',
    featured: true,
    role: 'Data pipeline, statistical modelling and dashboard',
    outcome: 'Live Streamlit dashboard, with a pipeline that rebuilds every result in one command',
    tech: ['Python', 'pandas', 'statsmodels', 'linearmodels', 'scikit-learn', 'Streamlit', 'Plotly', 'pytest', 'World Bank API'],
    links: { github: 'https://github.com/htunhtunaung-tech/asean-digital-divide', live: 'https://asean-digital-divide.streamlit.app' },
    screens: [
      { src: 'projects/asean-trends.jpg', alt: 'Line chart of internet use across ASEAN 2000 to 2024, with Myanmar and the ASEAN median highlighted' },
      { src: 'projects/asean-regression.jpg', alt: 'Coefficient chart: the internet and enrollment link is positive across countries but not distinguishable from zero with fixed effects' },
      { src: 'projects/asean-clusters.jpg', alt: 'Scatter of ASEAN countries grouped into three k-means clusters by income and internet use' },
      { src: 'projects/asean-relationships.jpg', alt: 'Scatter of internet use against secondary enrollment for every country-year' },
    ],
    screensNote: 'Figures generated by the project pipeline from World Bank data (CC BY 4.0).',
    details: {
      problemTitle: 'The question',
      problem:
        'How has internet use changed across ASEAN since 2000, and is internet access linked to secondary-school enrollment once income, urbanization and fixed differences between countries are taken into account?',
      built: [
        'Pipeline that pulls 7 World Development Indicators from the World Bank API, with pagination and retries',
        'Cleaning step that fills only short gaps within each country, flags every filled value and logs each decision',
        'Five panel regressions, from pooled OLS to two-way fixed effects, with Driscoll–Kraay standard errors',
        'k-means clustering, with the number of groups chosen by silhouette score',
        'Findings report generated automatically from the outputs',
        'Interactive Streamlit dashboard: map, trends, relationships, clusters, regressions and data quality',
        'pytest suite that runs on synthetic data, with no internet needed',
      ],
      sections: [
        {
          title: 'Key findings',
          items: [
            'The ASEAN median reached 72.8% internet use; Thailand grew fastest since 2010, at about 4.9 points a year.',
            'Myanmar rose from 0.2% in 2010 to 45.5% in 2020, still 44.1 points behind Malaysia, and the World Bank series stops after 2020.',
            'Across countries, +10 points of internet use goes with +1.01 points of enrollment, but with country and year fixed effects the estimate is −0.84 (95% CI −3.46 to +1.77): no clear link within countries.',
            'Countries fall into three loose groups (silhouette 0.28); Cambodia and Lao PDR stand apart on enrollment, not connectivity.',
          ],
        },
        {
          title: 'Why these methods',
          items: [
            'Fixed effects compare each country with itself, so stable differences like income do not pose as an internet effect.',
            'Driscoll–Kraay errors, because with only 11 countries cluster-robust errors are unreliable.',
            "No borrowing data across countries: filling Myanmar's gaps with Thailand's numbers would invent data.",
          ],
        },
        {
          title: 'Limitations',
          items: [
            'Eleven countries is a small panel, so estimates are imprecise.',
            'Gross enrollment can exceed 100% and does not measure learning.',
            'Results are associations, not causal effects.',
          ],
        },
      ],
      contributions: [],
      challenges: [],
      outcomes: [],
    },
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
  phone: '+66 061 604 3800',
  // Full URLs, e.g. 'https://www.linkedin.com/in/your-handle'. null = hidden.
  linkedin: 'https://www.linkedin.com/in/htun-htun-aung-a282a8346',
  github: 'https://github.com/htunhtunaung-tech',
  // Social media: paste the full link between quotes. null = hidden.
  facebook: 'https://www.facebook.com/louisleohtun', // e.g. 'https://www.facebook.com/your.name'
  instagram: 'https://www.instagram.com/htun_louis/', // e.g. 'https://www.instagram.com/your.handle'
  line: 'https://line.me/ti/p/edXeabUw9S', // e.g. 'https://line.me/ti/p/~your-line-id'
  whatsapp: 'https://wa.me/660616043800', // e.g. 'https://wa.me/66612345678' (country code + number, no + or spaces)
};

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'approach', label: 'Approach' },
  { id: 'contact', label: 'Contact' },
];
