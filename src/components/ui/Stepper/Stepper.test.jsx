import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Stepper from './Stepper';
import styles from './Stepper.module.css';

describe('Stepper', () => {
  it('anuncia a etapa atual para leitores de tela', () => {
    const { getByText } = render(<Stepper totalSteps={9} currentStep={3} />);
    expect(getByText('Etapa 3 de 9')).toBeInTheDocument();
  });

  it('marca como preenchidos apenas os segmentos até a etapa atual', () => {
    const { container } = render(<Stepper totalSteps={5} currentStep={2} />);
    const segments = Array.from(container.querySelectorAll(`.${styles.segment}`));

    expect(segments).toHaveLength(5);
    const filledCount = segments.filter((el) => el.classList.contains(styles.filled)).length;
    expect(filledCount).toBe(2);
  });
});
