import styles from './PageContainer.module.css';

// Centraliza a lógica de largura máxima + padding responsivo que antes
// vivia espalhada como inline style em Briefing.jsx. Qualquer ajuste de
// respiro/breakpoint agora tem um único lugar para acontecer.
function PageContainer({ children, width = 'default' }) {
  return <div className={`${styles.container} ${styles[width]}`}>{children}</div>;
}

export default PageContainer;
