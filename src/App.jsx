import { useCallback, useState } from 'react';
import { About } from './components/About.jsx';
import { Contact } from './components/Contact.jsx';
import { Experience } from './components/Experience.jsx';
import { Footer } from './components/Footer.jsx';
import { Hero } from './components/Hero.jsx';
import { Nav } from './components/Nav.jsx';
import { ProjectDialog } from './components/ProjectDialog.jsx';
import { Skills } from './components/Skills.jsx';
import { Work } from './components/Work.jsx';
import { useMagnetic } from './hooks/useMagnetic.js';
import { useTheme } from './hooks/useTheme.js';

export default function App() {
  const [theme, toggleTheme] = useTheme();
  useMagnetic();
  const [openProject, setOpenProject] = useState(null);
  const closeProject = useCallback(() => setOpenProject(null), []);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav theme={theme} onToggleTheme={toggleTheme} />
      <main id="main">
        <Hero />
        <Work onOpen={setOpenProject} />
        <About />
        <Skills onOpen={setOpenProject} />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <ProjectDialog project={openProject} onClose={closeProject} />
    </>
  );
}
