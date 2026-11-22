import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import QuestionRenderer from './QuestionRenderer';
import Button from '@/components/ui/Button';
import { EASE, DURATION } from '@/utils/motion';

// Uma única regra para "respondido", usada tanto para liberar o "Próximo"
// quanto para mostrar o erro — antes eram regras diferentes, e uma resposta
// só com espaços travava o botão sem exibir mensagem nenhuma.
function isAnswered(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

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

    // O botão clicado é desmontado ao trocar de etapa e o foco cairia no
    // <body>; levamos o foco ao primeiro campo da tela nova (teclado e leitor
    // de tela). Fica DEPOIS do gsap.from: focar antes faz o foco se perder
    // quando o estilo inicial da animação é aplicado.
    containerRef.current?.querySelector('input, select, textarea')?.focus();

    return () => ctx.revert();
  }, []);

  const isValid = group.every(
    (question) => question.required === false || isAnswered(answers[question.id])
  );

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
            attempted && question.required !== false && !isAnswered(answers[question.id])
              ? 'Campo obrigatório'
              : null
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
