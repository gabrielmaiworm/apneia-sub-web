'use client';

import { useEffect, useState } from 'react';

const THEME_STORAGE_KEY = 'apneia-theme';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'deck' | 'night'>('night');

  useEffect(() => {
    const storedTheme =
      window.localStorage.getItem(THEME_STORAGE_KEY) === 'deck' ? 'deck' : 'night';
    document.documentElement.dataset.theme = storedTheme;
    setTheme(storedTheme);
  }, []);

  function updateTheme(nextTheme: 'deck' | 'night') {
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    setTheme(nextTheme);
  }

  return (
    <div className="inline-flex rounded-full border border-white/15 bg-white/5 p-1 text-xs font-medium text-white/70">
      <button
        className={`rounded-full px-3 py-1.5 transition ${
          theme === 'night' ? 'bg-white text-storm' : 'text-white/70'
        }`}
        onClick={() => updateTheme('night')}
        type="button"
      >
        Night
      </button>
      <button
        className={`rounded-full px-3 py-1.5 transition ${
          theme === 'deck' ? 'bg-white text-storm' : 'text-white/70'
        }`}
        onClick={() => updateTheme('deck')}
        type="button"
      >
        Deck
      </button>
    </div>
  );
}
