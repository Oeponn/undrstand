import styles from './styles.module.scss';
const ModernCheckbox = ({
  id,
  checked,
  disabled,
  reference,
  toggle,
}: {
  id: string,
  checked: boolean,
  disabled?: boolean,
  reference?: React.RefObject<HTMLInputElement>,
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
        disabled={disabled}
        ref={reference}
      />
      <label htmlFor={id}/>
    </div>
  );
};

export default ModernCheckbox;
