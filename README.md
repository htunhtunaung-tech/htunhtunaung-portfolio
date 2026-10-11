# Htun Htun Aung — Portfolio

Personal portfolio built with **React + Vite**, plain **CSS** and **JavaScript**.
No animation or UI libraries: every animation is CSS plus a few small React hooks, so the site stays fast and easy to read.

## Run it on your computer

You need [Node.js](https://nodejs.org) 18 or newer.

```bash
npm install     # once
npm run dev     # start the site at http://localhost:5173
```

Other commands:

```bash
npm run build     # production build into /dist
npm run preview   # serve the production build locally
```

## Edit your content — one file

Everything the site says about you lives in **`src/data/site.js`**: name, headline, about text, projects, skills, experience, contact details and links.

Two rules make it safe to edit:

- A value of `null` (or an empty list) is simply **not shown** — no broken links, no empty rows.
- A project with `placeholder: true` shows a visible "Placeholder" badge. Replace it with real content, or set `settings.hidePlaceholderProjects` to `true` to publish with only your real projects.

Files you add (photo, CV, screenshots) go in **`/public`**, and you refer to them by file name:

| What | Put the file in | Then set in `site.js` |
| --- | --- | --- |
| Profile photo | `public/me.jpg` | `profile.photo: 'me.jpg'` |
| Resume / CV | `public/resume.pdf` | `profile.resume: 'resume.pdf'` |
| Project screenshot | `public/projects/interntrack.png` | that project's `image: 'projects/interntrack.png'` |
| Blender renders | `public/renders/one.jpg` … | that project's `gallery: ['renders/one.jpg', …]` |

To change the accent colour or any other colour, edit **`src/styles/tokens.css`** (electric blue by default; violet `#a08bff` and cyan `#4cc9f0` are noted there).

## Deploy to Vercel (free Hobby plan)

**Option A — through GitHub (recommended: every push redeploys automatically)**

1. Create a new repository on GitHub and push this folder to it:
   ```bash
   git init
   git add .
   git commit -m "Portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com), sign in with GitHub, choose **Add New → Project**, and import the repository.
3. Vercel detects Vite by itself (build command `npm run build`, output folder `dist`). Press **Deploy**.

**Option B — from the terminal, no GitHub needed**

```bash
npx vercel          # first run asks you to log in and creates a preview
npx vercel --prod   # publish to your production URL
```

**After the first deploy**, replace `YOUR-DOMAIN.vercel.app` with your real address in three places so search engines and link previews work: `index.html` (the two `og:` lines), `public/robots.txt` and `public/sitemap.xml`. Commit and push again.

## Make the contact form send email

Out of the box the form does **not** pretend to send anything: it validates the fields and then opens the visitor's own email app with the message filled in.

To have it deliver messages directly:

1. Create a free form at a form service such as [Formspree](https://formspree.io) and copy its endpoint URL (it looks like `https://formspree.io/f/abcdwxyz`).
2. In Vercel: **Project → Settings → Environment Variables**, add `VITE_FORM_ENDPOINT` with that URL, then redeploy.
3. For local testing, copy `.env.example` to `.env.local` and put the URL there. `.env.local` is ignored by git, so it never becomes public.

The form shows "Sent" only when the service confirms it, and a clear "Not sent" message with your email address if anything fails.

## Before you publish — checklist

Content (all in `src/data/site.js`):

- [ ] **InternTrack** — replace `role: 'Team member'` with what you personally built; check the problem sentence; add `links.github` / `links.live`; add a real screenshot as `image`.
- [ ] **ClickJoy** — confirm the "Built" and "Planned" lists and the technologies; add a repo link if there is one.
- [ ] **Data project** and **3D & motion studies** — these are placeholders. Replace them with real work, or set `hidePlaceholderProjects: true`.
- [ ] **TechTrek Edu** — add your contributions, challenges, and an `outcome` only if you can back the number up; add the website link.
- [ ] **Skills** — keep only tools you can talk about in an interview (Django and PostgreSQL are listed because of InternTrack).
- [ ] **Experience** — check every date and title; add a start year to "Founder"; add hackathons or awards to `recognition`.
- [ ] **Education** — confirm you want "Full four-year scholarship" shown.
- [ ] **Contact** — add your `linkedin` and `github` URLs; set `settings.showPhone` to `false` if you would rather not publish your number.

Files:

- [ ] `public/resume.pdf` + `profile.resume` (until then the buttons say "Request Resume" and lead to the contact form).
- [ ] Profile photo (optional) + `profile.photo`.
- [ ] Your real domain in `index.html`, `public/robots.txt`, `public/sitemap.xml`.
- [ ] `VITE_FORM_ENDPOINT` in Vercel if you want the form to send email directly.

## What animates

| Where | Animation |
| --- | --- |
| Page load | Hero pieces fade up in sequence; the headline rises word by word |
| Hero | Labels orbit the sphere (passing in front of and behind it), the globe lines rotate, the object leans toward the pointer, a soft light follows the cursor, the grid drifts |
| Navigation | Reading-progress bar, underline that slides to the current section, animated theme switch, full-screen mobile menu with staggered links |
| Every section | Label, heading and content reveal as they scroll into view |
| About | Divider lines draw themselves in |
| Projects | Cards lift and light up under the pointer, covers zoom, skeleton rows slide in; **ClickJoy is a working tap demo**; details open in a sliding panel |
| Skills | Items cascade in; hover slides in an accent dash |
| Experience | Rows stagger in and highlight on hover; education cards stay in view on wide screens |
| Approach | The five steps fill in as you scroll through them |
| Contact | Focus glow, shake on invalid fields, loading spinner, status messages slide in |

Visitors who have **reduced motion** switched on in their device settings get the same content with no movement.

## Accessibility and SEO, in short

- Semantic HTML, a skip link, keyboard-reachable everything, visible focus rings, labelled form fields with linked error messages.
- The mobile menu and project panel trap focus, close on `Esc`, and return focus to where you were.
- Light and dark themes (dark by default; the choice is remembered on the device).
- Page title, description, Open Graph tags, a sharing image (`public/og.png`), favicon, `robots.txt`, `sitemap.xml`, a branded `404.html`, and `Person` structured data.
- Fonts (Geist, Geist Mono, Instrument Serif) are bundled with the site — no third-party requests.

## Project structure

```
index.html              page shell, meta tags, theme bootstrap
public/                 favicon, og.png, robots.txt, sitemap.xml, 404.html (+ your files)
src/
  main.jsx              entry: fonts, styles, <App />
  App.jsx               page layout
  data/site.js          ← all content
  components/           Nav, Hero, OrbitVisual, About, Work, ProjectCovers,
                        ProjectDialog, Skills, Experience, Approach, Contact,
                        Footer, Reveal (scroll animations), Icons, ResumeLink
  hooks/                useInView, useActiveSection, useOverlay, useTheme,
                        useReducedMotion
  styles/               tokens.css (colours, type, spacing) + one file per area
```
