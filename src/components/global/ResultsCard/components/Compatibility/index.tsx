import {personalities} from 'components/shared/personalityTemplates';
import {mb} from 'types/deck';
import styles from './styles.module.scss';

const Compatibility = ({compatible, incompatible}:{
  compatible: mb[],
  incompatible: mb[],
}) => {
  const compat = compatible.map((c) => personalities[c].element);
  const incompat = incompatible.map((i) => personalities[i].element);
  return (
    <div className={styles.compatibility}>
      <div className={styles.compatible}>
        <span className={styles.label}>Most{'\n'}Compatible</span>
        {/* <div className={styles.elements}> */}
        {compat.map((ele) => {
          const filePath = `/elementIcons/${ele.replaceAll(' ', '')}.png`;
          return (
            <div className={styles.element} key={ele}>
              <img className={styles.elementIcon} src={filePath} />
              <p className={styles.type}>{ele}</p>
            </div>
          );
        })}
        {/* </div> */}
      </div>
      <div className={styles.incompatible}>
        <span className={styles.label}>Least{'\n'}Compatible</span>
        {/* <div className={styles.elements}> */}
        {incompat.map((ele) => {
          const filePath = `/elementIcons/${ele.replaceAll(' ', '')}.png`;
          return (
            <div className={styles.element} key={ele}>
              <img className={styles.elementIcon} src={filePath} />
              <p className={styles.type}>{ele}</p>
            </div>
          );
        })}
        {/* </div> */}
      </div>
    </div>
  );
};

export default Compatibility;
