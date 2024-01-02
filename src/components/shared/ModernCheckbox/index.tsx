import styles from './styles.module.scss';
const ModernCheckbox = ({
  id,
  checked,
  toggle,
}: {
  id: string,
  checked: boolean,
  toggle: () => void
}) => {
  return (
    <div className={styles.toggleWrapper}>
      <input
        type="checkbox"
        className={styles.mobileToggle}
        id={id}
        checked={checked}
        onChange={toggle}
      />
      <label htmlFor={id}/>
    </div>
  );
};

export default ModernCheckbox;
