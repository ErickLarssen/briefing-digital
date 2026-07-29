import { useId } from 'react';
import styles from './Input.module.css';

function Input({ label, error, helperText, multiline = false, ...rest }) {
  const id = useId();
  const Element = multiline ? 'textarea' : 'input';

  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <Element
        id={id}
        className={`${styles.input} ${multiline ? styles.textarea : ''} ${error ? styles.inputError : ''}`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...rest}
      />
      {error && (
        <span id={`${id}-error`} className={styles.error} role="alert">
          {error}
        </span>
      )}
      {!error && helperText && <span className={styles.helper}>{helperText}</span>}
    </div>
  );
}

export default Input;
