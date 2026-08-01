import { describe, it, expect } from 'vitest';
import { buildReviewSections } from './buildReviewSections';

describe('buildReviewSections', () => {
  it('organiza as respostas em 3 seções, com os títulos certos', () => {
    const sections = buildReviewSections('landing-page', {});
    expect(sections).toHaveLength(3);
    expect(sections[0].title).toBe('Seus dados');
    expect(sections[2].title).toBe('Orçamento');
  });

  it('pergunta não respondida aparece como travessão, não undefined', () => {
    const sections = buildReviewSections('landing-page', {});
    const nomeItem = sections[0].items.find((item) => item.id === 'nome_completo');
    expect(nomeItem.value).toBe('—');
  });

  it('pergunta do tipo select mostra o rótulo da opção, não o valor bruto salvo', () => {
    const sections = buildReviewSections('landing-page', { objetivo_conversao: 'captura_lead' });
    const item = sections[1].items.find((i) => i.id === 'objetivo_conversao');
    expect(item.value).toBe('Captura de lead');
  });

  it('regressão: respostas de um nicho anterior nunca vazam para o nicho atual', () => {
    // Simula o cenário real: o cliente respondeu perguntas de Identidade Visual,
    // depois voltou e escolheu Landing Page. A resposta antiga continua no
    // estado (por design, não limpamos ao trocar), mas jamais deve aparecer
    // na revisão do nicho atualmente selecionado.
    const answersComResiduoDeOutroNicho = {
      valores_marca: 'Resposta de um nicho diferente',
      objetivo_conversao: 'venda_direta',
    };

    const sections = buildReviewSections('landing-page', answersComResiduoDeOutroNicho);
    const idsExibidos = sections.flatMap((section) => section.items.map((item) => item.id));

    expect(idsExibidos).not.toContain('valores_marca');
    expect(idsExibidos).toContain('objetivo_conversao');
  });
});
