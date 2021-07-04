import React from 'react';
import clsx from 'clsx';
import { Moon, Sun } from 'react-feather';
import { useDarkMode } from '../../hooks/useDarkMode';

export interface AppBarProps {}

const AppBar: React.FC<AppBarProps> = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <header className={clsx('flex items-center justify-between', 'py-3')}>
      <h1 className={clsx('text-xl font-medium')}>
        <a href="/">Typing Test</a>
      </h1>

      <button
        type="button"
        className={clsx(
          'p-2',
          'rounded-full',
          'hover:bg-gray-200 dark:hover:bg-gray-500',
          'transition-colors',
        )}
        onClick={toggleDarkMode}
      >
        {isDarkMode ? <Sun /> : <Moon />}
      </button>
    </header>
  );
};

export default AppBar;
