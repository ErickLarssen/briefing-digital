import styles from './ProgressBar.module.css';

function ProgressBar({ value = 0, max = 100 }) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div
      className={styles.track}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <div className={styles.fill} style={{ width: `${percentage}%` }} />
    </div>
  );
}

export default ProgressBar;
