import { Link } from 'react-router-dom';
import Logo from '@/components/layout/Logo';
import styles from './BriefingHeader.module.css';

// Cabeçalho fixo do fluxo de briefing: dá uma saída clara para a Home (o
// fluxo antes não tinha nenhuma navegação para fora dele) e mantém a marca
// visível em todas as etapas, não só na Home.
function BriefingHeader() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.back} aria-label="Voltar para a página inicial">
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </svg>
        <span>Voltar</span>
      </Link>

      <Link to="/" className={styles.brand} aria-label="Erick Silva — página inicial">
        <Logo className={styles.brandLogo} />
        <span className={styles.brandName}>ERICK SILVA</span>
      </Link>

      <span className={styles.spacer} aria-hidden="true" />
    </header>
  );
}

export default BriefingHeader;
