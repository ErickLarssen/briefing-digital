import styles from './PageContainer.module.css';

// Centraliza a lógica de largura máxima + padding responsivo que antes
// vivia espalhada como inline style em Briefing.jsx. Qualquer ajuste de
// respiro/breakpoint agora tem um único lugar para acontecer.
//
// O conteúdo fica dentro de um "painel" de vidro (blur + borda + glow sutil)
// para dar profundidade sobre o fundo ambiente da página — o `sheen` é
// puramente decorativo e o `inner` garante que ele nunca fique por cima do
// conteúdo real, independentemente de como o navegador empilha o ::before.
function PageContainer({ children, width = 'default' }) {
  return (
    <div className={`${styles.container} ${styles[width]}`}>
      <span className={styles.sheen} aria-hidden="true" />
      <div className={styles.inner}>{children}</div>
    </div>
  );
}

export default PageContainer;
