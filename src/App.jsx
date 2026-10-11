import { useCallback, useState } from 'react';
import { About } from './components/About.jsx';
import { Approach } from './components/Approach.jsx';
import { Contact } from './components/Contact.jsx';
import { Experience } from './components/Experience.jsx';
import { Footer } from './components/Footer.jsx';
import { Hero } from './components/Hero.jsx';
import { Nav } from './components/Nav.jsx';
import { ProjectDialog } from './components/ProjectDialog.jsx';
import { Skills } from './components/Skills.jsx';
import { Work } from './components/Work.jsx';
import { useTheme } from './hooks/useTheme.js';

export default function App() {
  const [theme, toggleTheme] = useTheme();
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
        <About />
        <Work onOpen={setOpenProject} />
        <Skills />
        <Experience />
        <Approach />
        <Contact />
      </main>
      <Footer />
      <ProjectDialog project={openProject} onClose={closeProject} />
    </>
  );
}
