import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import QuestionRenderer from './QuestionRenderer';
import Button from '@/components/ui/Button';
import { EASE, DURATION } from '@/utils/motion';

function QuestionStep({ group, answers, onAnswer, onNext, onBack }) {
  const [attempted, setAttempted] = useState(false);
  const containerRef = useRef(null);

  // Roda uma vez por montagem (a cada passo, graças à key em Briefing.jsx).
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 12,
        duration: DURATION,
        ease: EASE,
        clearProps: 'opacity,transform',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const isValid = group.every((question) => {
    if (question.required === false) return true;
    const value = answers[question.id];
    return typeof value === 'string' && value.trim().length > 0;
  });

  function handleNextClick() {
    if (!isValid) {
      setAttempted(true);
      return;
    }
    onNext();
  }

  return (
    <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
      {group.map((question) => (
        <QuestionRenderer
          key={question.id}
          question={question}
          value={answers[question.id]}
          onChange={onAnswer}
          error={
            attempted && question.required !== false && !answers[question.id] ? 'Campo obrigatório' : null
          }
        />
      ))}
      <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'space-between' }}>
        <Button variant="ghost" onClick={onBack}>
          Voltar
        </Button>
        <Button variant="primary" onClick={handleNextClick}>
          Próximo
        </Button>
      </div>
    </div>
  );
}

export default QuestionStep;
