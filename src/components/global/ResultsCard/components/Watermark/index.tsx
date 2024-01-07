import styles from './styles.module.scss';

const Watermark = () => {
  const text = 'undrstand.me';
  return (
    <div className={styles.watermark}>
      <div className={styles.watermarkText}>
        <img className={styles.logo} src='/logo64.png' />
        <span>{text}</span>
        <img className={styles.logo} src='/logo64.png' />
        <span>{text}</span>
        <img className={styles.logo} src='/logo64.png' />
        <span>{text}</span>
        <img className={styles.logo} src='/logo64.png' />
        <span>{text}</span>
        <img className={styles.logo} src='/logo64.png' />
        <span>{text}</span>
      </div>
      <div className={styles.watermarkText}>
        <img className={styles.logo} src='/logo64.png' />
        <span>{text}</span>
        <img className={styles.logo} src='/logo64.png' />
        <span>{text}</span>
        <img className={styles.logo} src='/logo64.png' />
        <span>{text}</span>
        <img className={styles.logo} src='/logo64.png' />
        <span>{text}</span>
        <img className={styles.logo} src='/logo64.png' />
        <span>{text}</span>
      </div>
    </div>
  );
};

export default Watermark;
