import styles from './Card.module.css';

function Card({ children, hoverable = false, className = '', ...rest }) {
  return (
    <div className={`${styles.card} ${hoverable ? styles.hoverable : ''} ${className}`} {...rest}>
      {children}
    </div>
  );
}

export default Card;
