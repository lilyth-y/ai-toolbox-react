import { useState, useEffect } from 'react';

interface UseThemeReturn {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export function useTheme(): UseThemeReturn {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') || 'dark') as 'light' | 'dark';
  });

  useEffect(() => {
    // Apply theme to html element for global CSS availability
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return { theme, toggleTheme };
}
