import styles from './Stepper.module.css';

// totalSteps é calculado em tempo real (nicho + perguntas universais),
// nunca um número fixo — reflete a decisão da Etapa 2.
function Stepper({ totalSteps, currentStep }) {
  return (
    <div
      className={styles.stepper}
      role="list"
      aria-label={`Etapa ${currentStep} de ${totalSteps}`}
    >
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const isFilled = stepNumber <= currentStep;
        return (
          <span
            key={stepNumber}
            role="listitem"
            className={`${styles.segment} ${isFilled ? styles.filled : ''}`}
          />
        );
      })}
    </div>
  );
}

export default Stepper;
