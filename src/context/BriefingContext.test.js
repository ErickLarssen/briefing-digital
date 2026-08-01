import { describe, it, expect } from 'vitest';
import { briefingReducer } from './BriefingContext';

const initialState = {
  nicheSlug: null,
  answers: {},
  files: [],
  currentStepIndex: 0,
};

describe('briefingReducer', () => {
  it('SELECT_NICHE define o nicho e avança para a próxima etapa', () => {
    const next = briefingReducer(initialState, { type: 'SELECT_NICHE', nicheSlug: 'landing-page' });
    expect(next.nicheSlug).toBe('landing-page');
    expect(next.currentStepIndex).toBe(1);
  });

  it('ANSWER_QUESTION mescla a resposta nova sem apagar as anteriores', () => {
    const withOne = briefingReducer(initialState, {
      type: 'ANSWER_QUESTION',
      questionId: 'nome_completo',
      value: 'Erick',
    });
    const withTwo = briefingReducer(withOne, {
      type: 'ANSWER_QUESTION',
      questionId: 'email',
      value: 'erick@teste.com',
    });
    expect(withTwo.answers).toEqual({ nome_completo: 'Erick', email: 'erick@teste.com' });
  });

  it('ADD_FILES acrescenta arquivos à lista existente, sem substituí-la', () => {
    const state = { ...initialState, files: [{ id: '1', file: {} }] };
    const next = briefingReducer(state, { type: 'ADD_FILES', files: [{ id: '2', file: {} }] });
    expect(next.files).toHaveLength(2);
  });

  it('REMOVE_FILE remove somente o arquivo com o id indicado', () => {
    const state = {
      ...initialState,
      files: [
        { id: '1', file: {} },
        { id: '2', file: {} },
      ],
    };
    const next = briefingReducer(state, { type: 'REMOVE_FILE', fileId: '1' });
    expect(next.files).toEqual([{ id: '2', file: {} }]);
  });

  it('NEXT_STEP avança o índice em 1', () => {
    const next = briefingReducer(initialState, { type: 'NEXT_STEP' });
    expect(next.currentStepIndex).toBe(1);
  });

  it('PREV_STEP nunca deixa o índice ficar negativo', () => {
    const next = briefingReducer(initialState, { type: 'PREV_STEP' });
    expect(next.currentStepIndex).toBe(0);
  });

  it('RESET volta ao estado inicial mesmo com dados preenchidos', () => {
    const dirty = {
      nicheSlug: 'aplicativo',
      answers: { a: '1' },
      files: [{ id: '1', file: {} }],
      currentStepIndex: 5,
    };
    const next = briefingReducer(dirty, { type: 'RESET' });
    expect(next).toEqual(initialState);
  });

  it('uma ação desconhecida devolve o mesmo estado, sem alterações', () => {
    const next = briefingReducer(initialState, { type: 'ACAO_INEXISTENTE' });
    expect(next).toBe(initialState);
  });
});
