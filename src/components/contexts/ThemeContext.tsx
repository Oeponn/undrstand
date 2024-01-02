import React, {createContext, useContext, useState, useEffect} from 'react';


type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  showTyping: boolean;
  toggleShowTyping: () => void;
  storeState: boolean;
  toggleStoreState: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
  showTyping: true,
  toggleShowTyping: () => {},
  storeState: true,
  toggleStoreState: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> =
 ({children}) => {
   const storedState = localStorage.getItem('undrstandSettings');
   let localTheme: Theme = 'dark';
   let localTyping = true;
   let localStoreState = true;
   if (storedState) {
     const parsedState = JSON.parse(storedState);
     localTheme = parsedState.theme;
     localTyping = parsedState.showTyping;
     localStoreState = parsedState.storeState;
   }
   const [theme, setTheme] = useState<Theme>(localTheme);
   const [showTyping, setShowTyping] = useState<boolean>(localTyping);
   const [storeState, setStoreState] = useState<boolean>(localStoreState);

   //  on load fetch from localstorage and set if present:
   useEffect(() => {
     const storedState = localStorage.getItem('undrstandSettings');
     if (storedState) {
       const parsedState = JSON.parse(storedState);
       setTheme(parsedState.theme);
       setShowTyping(parsedState.showTyping);
       setStoreState(parsedState.storeState);
     }
   }, []);

   useEffect(() => {
     localStorage.setItem('undrstandSettings', JSON.stringify({
       theme,
       showTyping,
       storeState,
     }));
   }, [theme, showTyping, storeState]);


   const toggleTheme = () => {
     setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
   };

   const toggleShowTyping = () => {
     setShowTyping((prevShowTyping) => !prevShowTyping);
   };

   const toggleStoreState = () => {
     setStoreState((prevStoreState) => !prevStoreState);
   };

   return (
     <ThemeContext.Provider value={{
       theme,
       toggleTheme,
       showTyping,
       toggleShowTyping,
       storeState,
       toggleStoreState,
     }}>
       {children}
     </ThemeContext.Provider>
   );
 };
