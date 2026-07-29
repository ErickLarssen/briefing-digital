import { universalIntroGroups, universalOutroGroups } from '@/data/questions/universal';
import { nicheQuestionGroups } from '@/data/questions';

// Monta a lista ordenada de "telas de pergunta" para um nicho:
// perguntas universais de entrada -> perguntas do nicho -> perguntas universais finais (orçamento).
export function buildFlow(nicheSlug) {
  const nicheGroups = nicheQuestionGroups[nicheSlug] || [];
  return [...universalIntroGroups, ...nicheGroups, ...universalOutroGroups];
}
