import { Link } from 'react-router-dom';
import Logo from './Logo';
import styles from './Navbar.module.css';

function Navbar() {
  return (
    <header className={styles.navbar}>
      <Link to="/" className={styles.brand}>
        <Logo className={styles.brandLogo} />
        <span className={styles.brandName}>ERICK SILVA</span>
      </Link>

      <nav className={styles.links} aria-label="Navegação principal">
        <a href="#top" className={styles.link}>
          Início
        </a>
        <a href="#como-funciona" className={styles.link}>
          Como funciona
        </a>
      </nav>

      <Link to="/briefing" className={styles.cta}>
        Começar
      </Link>
    </header>
  );
}

export default Navbar;
