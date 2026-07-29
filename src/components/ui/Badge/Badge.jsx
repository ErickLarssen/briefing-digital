import styles from './Badge.module.css';

const VARIANT_CLASS = {
  neutral: styles.neutral,
  gold: styles.gold,
  success: styles.success,
  danger: styles.danger,
  warning: styles.warning,
  info: styles.info,
};

function Badge({ children, variant = 'neutral' }) {
  return <span className={`${styles.badge} ${VARIANT_CLASS[variant]}`}>{children}</span>;
}

export default Badge;
