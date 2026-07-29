import styles from './ToastViewport.module.css';

function ToastViewport({ children }) {
  return <div className={styles.viewport}>{children}</div>;
}

export default ToastViewport;
