// import {useEffect} from 'react';
import {useTheme} from 'components/contexts/ThemeContext';
import styles from './styles.module.scss';
const Settings = () => {
  const {theme, toggleTheme} = useTheme();

  // useEffect(() => {
  //   console.log('theme:', theme);
  // }, [theme]);


  return (
    <div className={styles.container}>
      <h1>
        Settings
      </h1>

      <div className={styles.settingWrapper}>
        <div>
          Dark Mode
        </div>
        <div className={styles.toggleWrapper}>
          <input
            type="checkbox"
            name="darkMode"
            className={styles.mobileToggle}
            id="darkMode"
            checked={theme === 'dark'}
            onChange={toggleTheme}
          />
          <label htmlFor="darkMode"/>
        </div>
      </div>
    </div>
  );
};

export default Settings;
