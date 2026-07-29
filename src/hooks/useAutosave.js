import { useCallback } from 'react';

// Hook fino sobre o localStorage — quem decide O QUE salvar é o BriefingContext.
// Isolar isso aqui significa que, se um dia trocarmos localStorage por outra
// estratégia (ex: sincronizar com um backend), só este arquivo muda.
export function useAutosave(storageKey) {
  const restore = useCallback(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      console.error('Não foi possível restaurar o progresso salvo:', error);
      return null;
    }
  }, [storageKey]);

  const persist = useCallback(
    (data) => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(data));
      } catch (error) {
        console.error('Não foi possível salvar o progresso:', error);
      }
    },
    [storageKey]
  );

  return { restore, persist };
}
