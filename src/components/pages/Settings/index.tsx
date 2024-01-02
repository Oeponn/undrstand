import {useTheme} from 'components/contexts/ThemeContext';
import Checkbox from 'components/shared/ModernCheckbox';
import styles from './styles.module.scss';
const Settings = () => {
  const {
    theme,
    toggleTheme,
    showTyping,
    toggleShowTyping,
    storeState,
    toggleStoreState,
  } = useTheme();

  return (
    <div className={styles.container}>
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
          toggle={toggleTheme}
        />
      </div>
      <hr className={styles.divider}/>

      <div className={styles.settingWrapper}>
        <div className={styles.settingText}>
          <div>
            Show Typing Animation
          </div>
          <div className={styles.hint}>
            You can turn off the typing animation if you want
          </div>
        </div>
        <Checkbox
          id="typingAnimation"
          checked={showTyping}
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
          If you come back later you can always start where you left off.
          </div>
        </div>
        <Checkbox
          id="storeState"
          checked={storeState}
          toggle={toggleStoreState}
        />
      </div>
      <hr className={styles.divider}/>
    </div>
  );
};

export default Settings;
