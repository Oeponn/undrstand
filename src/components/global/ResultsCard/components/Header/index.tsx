import {pad} from 'components/shared/helpers';
import styles from './styles.module.scss';

const Header = ({element, title}:{element: string, title: string}) => {
  const name = 'Oponn';
  const id = 3427;

  return (
    <div className={styles.header}>
      <div className={styles.userInfo}>
        <div className={styles.numberContainer}>
          <div className={styles.circle}/>
          <div className={styles.number}>NO.{'\n'}{pad(id)}</div>
        </div>
        <div className={styles.name}>{name}</div>
      </div>
      <div className={styles.typeContainer}>
        <h4>
          Your element is:
        </h4>
        <p className={styles.resultElement}>{element}</p>
        <p className={styles.resultTitle}>"{title}"</p>
      </div>
    </div>
  );
};

export default Header;
