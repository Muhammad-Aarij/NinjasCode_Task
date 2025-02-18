// ThemeContext.js
import React, { createContext, useState, useEffect } from 'react';
import { lightTheme, darkTheme } from './theme';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);

  useEffect(() => {
    const currentHour = new Date().getHours();
    const initialTheme = (currentHour >= 6 && currentHour < 18) ? lightTheme : darkTheme;
    setTheme(initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === lightTheme ? darkTheme : lightTheme;
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
