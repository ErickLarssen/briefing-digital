import { universalIntroGroups, universalOutroGroups } from '@/data/questions/universal';
import { nicheQuestionGroups } from '@/data/questions';
import { niches } from '@/data/niches';

function resolveDisplayValue(question, rawValue) {
  if (!rawValue) return '—';
  if (question.type === 'select') {
    const option = question.options.find((opt) => opt.value === rawValue);
    return option ? option.label : rawValue;
  }
  return rawValue;
}

function mapGroupsToItems(groups, answers) {
  return groups.flat().map((question) => ({
    id: question.id,
    label: question.label,
    value: resolveDisplayValue(question, answers[question.id]),
  }));
}

// Fonte única para organizar as respostas em seções — usada pela tela de
// revisão E pelo corpo do e-mail. Como só olha para as perguntas do nicho
// ATUAL, respostas de um nicho trocado no meio do caminho nunca aparecem aqui.
export function buildReviewSections(nicheSlug, answers) {
  const niche = niches.find((item) => item.slug === nicheSlug);
  const nicheGroups = nicheQuestionGroups[nicheSlug] || [];

  return [
    { title: 'Seus dados', items: mapGroupsToItems(universalIntroGroups, answers) },
    { title: niche ? niche.label : 'Detalhes do projeto', items: mapGroupsToItems(nicheGroups, answers) },
    { title: 'Orçamento', items: mapGroupsToItems(universalOutroGroups, answers) },
  ];
}
