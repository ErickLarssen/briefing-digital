import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { EASE, DURATION } from '@/utils/motion';

function Success() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 16,
        duration: DURATION,
        ease: EASE,
        clearProps: 'opacity,transform',
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-4)',
        textAlign: 'center',
        padding: 'var(--space-6)',
      }}
    >
      <h2>Recebemos seu briefing</h2>
      <p style={{ color: 'var(--text-secondary)', maxWidth: 420 }}>
        Obrigado por compartilhar os detalhes do seu projeto. Em breve entraremos em contato.
      </p>
      <Link to="/" style={{ color: 'var(--gold-500)', fontSize: 14 }}>
        Voltar ao início
      </Link>
    </div>
  );
}

export default Success;
