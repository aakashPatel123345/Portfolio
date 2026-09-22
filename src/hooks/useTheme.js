import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'theme';
const PAPER = { light: '#fbf8f1', dark: '#020a09' };

function getInitialTheme() {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

export default function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', PAPER[theme]);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // localStorage unavailable (private mode, etc.) — theme just won't persist
      }
      return next;
    });
  }, []);

  return [theme, toggleTheme];
}
