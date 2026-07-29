import { useEffect } from 'react';
import styles from './Toast.module.css';

const VARIANT_CLASS = {
  success: styles.success,
  danger: styles.danger,
  info: styles.info,
};

function Toast({ message, variant = 'info', onDismiss, duration = 4000 }) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [onDismiss, duration]);

  return (
    <div className={`${styles.toast} ${VARIANT_CLASS[variant]}`} role="status">
      {message}
    </div>
  );
}

export default Toast;
