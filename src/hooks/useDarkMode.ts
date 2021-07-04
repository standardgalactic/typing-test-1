import { useEffect, useState } from 'react';

const getDarkModePreference = () => {
  return 'darkMode' in localStorage
    ? localStorage.getItem('darkMode') === 'true'
    : window.matchMedia('(prefers-color-scheme: dark)').matches;
};

export const useDarkMode = () => {
  const [isDarkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setDarkMode(getDarkModePreference());
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    const mode = !isDarkMode;
    localStorage.setItem('darkMode', mode.toString());
    setDarkMode(mode);
  };

  return {
    isDarkMode,
    toggleDarkMode,
  };
};
