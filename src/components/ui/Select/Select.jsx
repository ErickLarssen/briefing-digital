import { useId } from 'react';
import styles from './Select.module.css';

function Select({ label, error, helperText, options = [], placeholder, ...rest }) {
  const id = useId();

  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <select
        id={id}
        className={`${styles.select} ${error ? styles.selectError : ''}`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...rest}
      >
        <option value="" disabled>
          {placeholder || 'Selecione uma opção'}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <span id={`${id}-error`} className={styles.error} role="alert">
          {error}
        </span>
      )}
      {!error && helperText && <span className={styles.helper}>{helperText}</span>}
    </div>
  );
}

export default Select;
