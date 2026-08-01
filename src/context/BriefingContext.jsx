import { createContext, useContext, useEffect, useReducer } from 'react';
import { useAutosave } from '@/hooks/useAutosave';

const initialState = {
  nicheSlug: null,
  answers: {},
  files: [],
  currentStepIndex: 0, // 0 = tela de seleção de nicho
};

export function briefingReducer(state, action) {
  switch (action.type) {
    case 'SELECT_NICHE':
      return { ...state, nicheSlug: action.nicheSlug, currentStepIndex: state.currentStepIndex + 1 };
    case 'ANSWER_QUESTION':
      return { ...state, answers: { ...state.answers, [action.questionId]: action.value } };
    case 'ADD_FILES':
      return { ...state, files: [...state.files, ...action.files] };
    case 'REMOVE_FILE':
      return { ...state, files: state.files.filter((item) => item.id !== action.fileId) };
    case 'NEXT_STEP':
      return { ...state, currentStepIndex: state.currentStepIndex + 1 };
    case 'PREV_STEP':
      return { ...state, currentStepIndex: Math.max(0, state.currentStepIndex - 1) };
    case 'RESET':
      return initialState;
    case 'RESTORE':
      return action.state;
    default:
      return state;
  }
}

const BriefingContext = createContext(null);

export function BriefingProvider({ children }) {
  const [state, dispatch] = useReducer(briefingReducer, initialState);
  const { restore, persist } = useAutosave('briefing-progress');

  // Restaura progresso salvo uma única vez, ao montar.
  useEffect(() => {
    const saved = restore();
    if (saved) dispatch({ type: 'RESTORE', state: { ...initialState, ...saved } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Salva a cada mudança relevante de estado — files fica de fora de propósito,
  // porque File não é serializável em JSON/localStorage.
  useEffect(() => {
    const { nicheSlug, answers, currentStepIndex } = state;
    persist({ nicheSlug, answers, currentStepIndex });
  }, [state, persist]);

  return <BriefingContext.Provider value={{ state, dispatch }}>{children}</BriefingContext.Provider>;
}

export function useBriefing() {
  const context = useContext(BriefingContext);
  if (!context) {
    throw new Error('useBriefing precisa ser usado dentro de um BriefingProvider.');
  }
  return context;
}
