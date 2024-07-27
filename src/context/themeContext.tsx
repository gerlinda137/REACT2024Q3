import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react';

interface ThemeContextType {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkTheme(savedTheme === 'dark');
      document.documentElement.setAttribute(
        'dark',
        savedTheme === 'dark' ? 'true' : 'false'
      );
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkTheme ? 'light' : 'dark';
    setIsDarkTheme(!isDarkTheme);
    document.documentElement.setAttribute(
      'dark',
      newTheme === 'dark' ? 'true' : 'false'
    );
    localStorage.setItem('theme', newTheme);
  };
  useEffect(() => {
    document.documentElement.setAttribute(
      'dark',
      isDarkTheme ? 'true' : 'false'
    );
  }, [isDarkTheme]);

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export { ThemeProvider, useTheme };
