import { describe, it, expect } from 'vitest';
import { sanitizeSavedProgress, PROGRESS_VERSION } from './savedProgress';
import { buildFlow } from './buildFlow';

const valid = {
  version: PROGRESS_VERSION,
  nicheSlug: 'landing-page',
  answers: { nome_completo: 'Erick' },
  currentStepIndex: 3,
};

describe('sanitizeSavedProgress', () => {
  it('aceita um progresso válido e devolve só os campos conhecidos', () => {
    expect(sanitizeSavedProgress({ ...valid, lixo: true })).toEqual({
      nicheSlug: 'landing-page',
      answers: { nome_completo: 'Erick' },
      currentStepIndex: 3,
    });
  });

  it('aceita a tela de revisão (último índice do fluxo)', () => {
    const last = buildFlow('landing-page').length + 2;
    expect(sanitizeSavedProgress({ ...valid, currentStepIndex: last })).not.toBeNull();
  });

  it.each(['social-media', 'modelagem-3d', 'nicho-inventado'])(
    'regressão: descarta progresso com nicho que não existe mais (%s)',
    (nicheSlug) => {
      expect(sanitizeSavedProgress({ ...valid, nicheSlug, currentStepIndex: 8 })).toBeNull();
    }
  );

  it('descarta índice além da revisão (evita tela vazia)', () => {
    const beyond = buildFlow('landing-page').length + 3;
    expect(sanitizeSavedProgress({ ...valid, currentStepIndex: beyond })).toBeNull();
  });

  it.each([-1, 1.5, '3', null])('descarta índice inválido (%s)', (currentStepIndex) => {
    expect(sanitizeSavedProgress({ ...valid, currentStepIndex })).toBeNull();
  });

  it('sem nicho escolhido, só aceita a etapa 0', () => {
    expect(sanitizeSavedProgress({ ...valid, nicheSlug: null, currentStepIndex: 0 })).not.toBeNull();
    expect(sanitizeSavedProgress({ ...valid, nicheSlug: null, currentStepIndex: 2 })).toBeNull();
  });

  it('descarta progresso de outra versão do formato', () => {
    expect(sanitizeSavedProgress({ ...valid, version: PROGRESS_VERSION + 1 })).toBeNull();
  });

  it('aceita progresso antigo sem o campo version, se o resto for válido', () => {
    const { version: _version, ...legacy } = valid;
    expect(sanitizeSavedProgress(legacy)).not.toBeNull();
  });

  it.each([null, 'texto', [], { ...valid, answers: null }, { ...valid, answers: [] }])(
    'descarta dado corrompido (%#)',
    (saved) => {
      expect(sanitizeSavedProgress(saved)).toBeNull();
    }
  );
});
