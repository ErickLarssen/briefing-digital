import styles from './Button.module.css';

const VARIANT_CLASS = {
  primary: styles.primary,
  secondary: styles.secondary,
  ghost: styles.ghost,
};

function Button({ children, variant = 'primary', type = 'button', disabled = false, ...rest }) {
  return (
    <button
      type={type}
      className={`${styles.button} ${VARIANT_CLASS[variant]}`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
