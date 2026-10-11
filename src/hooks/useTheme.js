import { useCallback, useEffect, useState } from 'react';

const THEME_COLORS = { dark: '#0A0B0E', light: '#F5F5F2' };

/** Dark is the default; the choice is remembered on this device. */
export function useTheme() {
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute('data-theme') || 'dark'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', THEME_COLORS[theme]);
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      /* storage can be unavailable (private mode); the toggle still works */
    }
  }, [theme]);

  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), []);
  return [theme, toggle];
}
