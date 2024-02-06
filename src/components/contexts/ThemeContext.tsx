import React, {createContext, useContext, useState, useEffect} from 'react';


type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  showTyping: boolean;
  toggleShowTyping: () => void;
  storeState: boolean;
  toggleStoreState: () => void;
  showHeader: boolean;
  toggleShowHeader: (show: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
  showTyping: false,
  toggleShowTyping: () => {},
  storeState: true,
  toggleStoreState: () => {},
  showHeader: true,
  toggleShowHeader: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> =
 ({children}) => {
   const storedState = localStorage.getItem('undrstandSettings');
   let localTheme: Theme = 'dark';
   let localTyping = false;
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
   const [showHeader, setShowHeader] = useState<boolean>(true);

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

   useEffect(() => {
     const documentStyle = document.documentElement.style;
     const currentTheme = documentStyle.getPropertyValue('--themeColor1');
     //  console.log('currentTheme:', currentTheme);
     //  console.log('!currentTheme:', !currentTheme);
     //  console.log('bool', currentTheme === '--themeColor1');
     if (!currentTheme) {
       console.log('no delay');
       if (theme === 'dark') {
         documentStyle.setProperty('--themeColor1', '59,63,73');
         documentStyle.setProperty('--themeColor2', '40,44,52');
         documentStyle.setProperty('--themeColor3', '30,33,39');
         documentStyle.setProperty('--accentColor', '255,255,255');
       } else if (theme === 'light') {
         documentStyle.setProperty('--themeColor1', '255, 255, 255');
         documentStyle.setProperty('--themeColor2', '255, 255, 255');
         documentStyle.setProperty('--themeColor3', '255, 255, 255');
         documentStyle.setProperty('--accentColor', '0,0,0');
       }
     } else {
       setTimeout(() => {
         if (theme === 'dark') {
           documentStyle.setProperty('--themeColor1', '59,63,73');
           documentStyle.setProperty('--themeColor2', '40,44,52');
           documentStyle.setProperty('--themeColor3', '30,33,39');
           documentStyle.setProperty('--accentColor', '255,255,255');
         } else if (theme === 'light') {
           documentStyle.setProperty('--themeColor1', '255, 255, 255');
           documentStyle.setProperty('--themeColor2', '255, 255, 255');
           documentStyle.setProperty('--themeColor3', '255, 255, 255');
           documentStyle.setProperty('--accentColor', '0,0,0');
         }
       }, 750);
     }
   }, [theme]);


   const toggleTheme = () => {
     setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
   };

   const toggleShowTyping = () => {
     setShowTyping((prevShowTyping) => !prevShowTyping);
   };

   const toggleStoreState = () => {
     setStoreState((prevStoreState) => !prevStoreState);
   };

   const toggleShowHeader = (show: boolean) => {
     setShowHeader(show);
   };

   return (
     <ThemeContext.Provider value={{
       theme,
       toggleTheme,
       showTyping,
       toggleShowTyping,
       storeState,
       toggleStoreState,
       showHeader,
       toggleShowHeader,
     }}>
       {children}
     </ThemeContext.Provider>
   );
 };
