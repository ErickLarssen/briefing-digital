import { describe, it, expect } from 'vitest';
import { buildFlow } from './buildFlow';
import { universalIntroGroups, universalOutroGroups } from '@/data/questions/universal';
import { nicheQuestionGroups } from '@/data/questions';

describe('buildFlow', () => {
  it('concatena intro + perguntas do nicho + orçamento, nessa ordem', () => {
    const flow = buildFlow('landing-page');
    const expectedLength =
      universalIntroGroups.length + nicheQuestionGroups['landing-page'].length + universalOutroGroups.length;

    expect(flow).toHaveLength(expectedLength);
    expect(flow[0]).toBe(universalIntroGroups[0]);
    expect(flow[flow.length - 1]).toBe(universalOutroGroups[universalOutroGroups.length - 1]);
  });

  it('um nicho inexistente cai só nas perguntas universais (não quebra)', () => {
    const flow = buildFlow('nicho-que-nao-existe');
    expect(flow).toHaveLength(universalIntroGroups.length + universalOutroGroups.length);
  });
});
