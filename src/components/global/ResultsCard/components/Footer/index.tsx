import styles from './styles.module.scss';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.expoInfo}>
        <div className={styles.invert}/>
        <div className={styles.date}>
          "Elements" Test Built by Anonymous User Jan 6 2023
        </div>
      </div>
    </div>
  );
};

export default Footer;
