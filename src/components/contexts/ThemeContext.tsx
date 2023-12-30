import React, {createContext, useContext, useState, useEffect} from 'react';


type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> =
 ({children}) => {
   //  const [theme, setTheme] = useState<Theme>('dark');
   const [theme, setTheme] = useState<Theme>(() => {
     const storedTheme = localStorage.getItem('undrstandTheme');
     return storedTheme as Theme || 'dark';
   });

   useEffect(() => {
     //  console.log('storage theme:', localStorage.getItem('undrstandTheme'));
     //  console.log('localStorage:', localStorage);
     localStorage.setItem('undrstandTheme', theme);
   }, [theme]);


   const toggleTheme = () => {
     setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
   };

   return (
     <ThemeContext.Provider value={{theme, toggleTheme}}>
       {children}
     </ThemeContext.Provider>
   );
 };
