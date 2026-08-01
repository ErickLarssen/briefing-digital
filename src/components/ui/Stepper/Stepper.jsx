import styles from './Stepper.module.css';

// totalSteps é calculado em tempo real (nicho + perguntas universais),
// nunca um número fixo — reflete a decisão da Etapa 2.
function Stepper({ totalSteps, currentStep }) {
  return (
    <div className={styles.stepper}>
      <span className={styles.srOnly} aria-live="polite">
        {`Etapa ${currentStep} de ${totalSteps}`}
      </span>
      <div className={styles.track} aria-hidden="true">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isFilled = stepNumber <= currentStep;
          return (
            <span key={stepNumber} className={`${styles.segment} ${isFilled ? styles.filled : ''}`} />
          );
        })}
      </div>
    </div>
  );
}

export default Stepper;
