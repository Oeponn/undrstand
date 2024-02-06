import {useEffect, useState, useRef} from 'react';
import {useTheme} from 'components/contexts/ThemeContext';
import Checkbox from 'components/shared/ModernCheckbox';
import styles from './styles.module.scss';
const Settings = (
    {appContainerRef}
    :
    {appContainerRef: React.RefObject<HTMLDivElement>},
) => {
  const {
    theme,
    toggleTheme,
    showTyping,
    toggleShowTyping,
    storeState,
    toggleStoreState,
  } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const checkboxRef = useRef<HTMLInputElement>(null);
  const [animating, setAnimating] = useState(false);
  const [toggledTheme, setToggledTheme] = useState(false);

  useEffect(() => {
    if (!toggledTheme) {
      return;
    }
    // if (!toggledTheme && (!theme || theme === 'dark')) {
    //   return;
    // }
    setAnimating(true);
    appContainerRef.current?.classList.remove(styles.darkTransition);
    appContainerRef.current?.classList.remove(styles.lightTransition);

    if (!checkboxRef || !checkboxRef.current || !appContainerRef.current) {
      return;
    }
    const checkboxRect = checkboxRef.current.getBoundingClientRect();
    const containerRect = appContainerRef.current.getBoundingClientRect();
    // eslint-disable-next-line max-len
    const centerX = ((checkboxRect.left + checkboxRect.right) / 2 - containerRect.left) / containerRect.width * 100;
    // eslint-disable-next-line max-len
    const centerY = ((checkboxRect.top + checkboxRect.bottom) / 2 - containerRect.top) / containerRect.height * 100;
    // eslint-disable-next-line max-len
    appContainerRef.current.style.clipPath = `circle(0% at ${centerX}% ${centerY}%)`;
    const documentStyle = document.documentElement.style;
    if (theme === 'dark') {
      documentStyle.setProperty('--accentColor', '255,255,255');
      // documentStyle.setProperty('--accentColor', '255, 17, 0');
      // documentStyle.setProperty('--transitionColor', '59,63,73');
      appContainerRef.current?.classList.add(styles.darkTransition);
    } else if (theme === 'light') {
      documentStyle.setProperty('--accentColor', '0,0,0');
      // documentStyle.setProperty('--accentColor', '4, 0, 255');
      // documentStyle.setProperty('--transitionColor', '255,255,255');
      appContainerRef.current?.classList.add(styles.lightTransition);
    }
    setTimeout(() => {
      // containerRef.current?.classList.remove(styles.anim);
      // appContainerRef.current?.classList.remove(styles.anim);
      appContainerRef.current?.classList.remove(styles.darkTransition);
      appContainerRef.current?.classList.remove(styles.lightTransition);
      if (appContainerRef.current) {
        appContainerRef.current.style.clipPath = '';
      }
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
      setAnimating(false);
    }, 750);
    // }, 30000);
    // }
  }, [theme]);

  return (
    <div className={styles.container} ref={containerRef}>
      <h1>
        Settings
      </h1>

      <hr className={styles.divider}/>
      <div className={styles.settingWrapper}>
        <div className={styles.settingText}>
          <div>
            Dark Mode
          </div>
          <div className={styles.hint}>
            Enabled by default
          </div>
        </div>
        <Checkbox
          id="darkMode"
          checked={theme === 'dark'}
          disabled={animating}
          toggle={() => {
            setToggledTheme(true);
            toggleTheme();
          }}
          reference={checkboxRef}
        />
      </div>
      <hr className={styles.divider}/>

      <div className={styles.settingWrapper}>
        <div className={styles.settingText}>
          <div>
            Show Typing Animation
          </div>
          <div className={styles.hint}>
            The typing animation can be slow on some older devices
          </div>
        </div>
        <Checkbox
          id="typingAnimation"
          checked={showTyping}
          disabled={animating}
          toggle={toggleShowTyping}
        />
      </div>
      <hr className={styles.divider}/>

      <div className={styles.settingWrapper}>
        <div className={styles.settingText}>
          <div>
          Store Progress
          </div>
          <div className={styles.hint}>
          If you turn this off you can go back to a fresh deck of cards.
          If you turn this on and come back later you can start where you left
          off.
          </div>
        </div>
        <Checkbox
          id="storeState"
          checked={storeState}
          disabled={animating}
          toggle={toggleStoreState}
        />
      </div>
      <hr className={styles.divider}/>
    </div>
  );
};

export default Settings;
