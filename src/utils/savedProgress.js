import { niches } from '@/data/niches';
import { buildFlow } from '@/utils/buildFlow';

// Versão do formato salvo no localStorage. Suba este número sempre que uma
// mudança nas perguntas fizer os índices antigos apontarem para telas
// diferentes (ex: reordenar ou inserir grupos) — progresso de versão antiga
// passa a ser descartado em vez de cair numa etapa errada.
export const PROGRESS_VERSION = 1;

function isPlainObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

// Valida o progresso salvo antes de usá-lo. Devolve só os campos confiáveis,
// ou null quando o progresso não serve mais (nicho removido, índice fora do
// fluxo, versão antiga, dado corrompido). Sem isso, um slug que deixou de
// existir levava a uma tela vazia, só com o Stepper.
export function sanitizeSavedProgress(saved) {
  if (!isPlainObject(saved)) return null;

  // Progresso salvo antes da criação do campo `version` tem o mesmo formato
  // da versão 1; as checagens abaixo já pegam o que ficou inválido nele.
  const version = saved.version ?? 1;
  if (version !== PROGRESS_VERSION) return null;

  const { nicheSlug, answers, currentStepIndex } = saved;

  const nicheExists = niches.some((niche) => niche.slug === nicheSlug);
  if (nicheSlug !== null && !nicheExists) return null;
  if (!isPlainObject(answers)) return null;

  // Etapas: 0 = nicho, 1..N = perguntas, N+1 = upload, N+2 = revisão.
  const lastStepIndex = nicheSlug === null ? 0 : buildFlow(nicheSlug).length + 2;
  if (!Number.isInteger(currentStepIndex) || currentStepIndex < 0 || currentStepIndex > lastStepIndex) {
    return null;
  }

  return { nicheSlug, answers, currentStepIndex };
}
