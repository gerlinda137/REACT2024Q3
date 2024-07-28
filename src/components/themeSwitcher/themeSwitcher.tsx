import React from 'react';
import { useTheme } from '../../context/themeContext';
import './themeSwitcher.scss';

const ThemeSwitcher: React.FC = () => {
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="theme-switcher">
      Switch to {isDarkTheme ? 'Light' : 'Dark'} Theme
    </button>
  );
};

export default ThemeSwitcher;
