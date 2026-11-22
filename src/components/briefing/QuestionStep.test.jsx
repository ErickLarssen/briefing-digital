import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuestionStep from './QuestionStep';

const group = [
  { id: 'nome_completo', type: 'text', label: 'Nome completo' },
  {
    id: 'orcamento',
    type: 'select',
    label: 'Orçamento',
    required: false,
    helperText: 'Pode pular se preferir',
    options: [{ value: 'ate_5k', label: 'Até R$ 5 mil' }],
  },
];

function renderStep(answers = {}) {
  const onNext = vi.fn();
  render(
    <QuestionStep group={group} answers={answers} onAnswer={vi.fn()} onNext={onNext} onBack={vi.fn()} />
  );
  return { onNext };
}

describe('QuestionStep', () => {
  it('regressão: resposta só com espaços bloqueia o avanço E mostra o erro', async () => {
    const { onNext } = renderStep({ nome_completo: '   ' });

    await userEvent.click(screen.getByRole('button', { name: 'Próximo' }));

    expect(onNext).not.toHaveBeenCalled();
    expect(screen.getByText('Campo obrigatório')).toBeInTheDocument();
  });

  it('regressão: pergunta opcional mostra "(opcional)" e o texto de ajuda', () => {
    renderStep();
    expect(screen.getByLabelText('Orçamento (opcional)')).toBeInTheDocument();
    expect(screen.getByText('Pode pular se preferir')).toBeInTheDocument();
  });

  it('leva o foco ao primeiro campo ao montar a etapa', () => {
    renderStep();
    expect(screen.getByLabelText('Nome completo')).toHaveFocus();
  });
});
