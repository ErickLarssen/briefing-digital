import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { niches } from '@/data/niches';
import Card from '@/components/ui/Card';
import { EASE, DURATION, STAGGER } from '@/utils/motion';
import styles from './NicheSelection.module.css';

function NicheSelection({ onSelect }) {
  const gridRef = useRef(null);

  useLayoutEffect(() => {
    // gsap.context garante que as animações sejam limpas corretamente ao
    // desmontar — importante porque o React 18 StrictMode roda efeitos
    // duas vezes em desenvolvimento, e sem isso teríamos animações duplicadas.
    const ctx = gsap.context(() => {
      gsap.from('[data-niche-card]', {
        opacity: 0,
        y: 16,
        duration: DURATION,
        ease: EASE,
        stagger: STAGGER,
        clearProps: 'opacity,transform',
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: 'var(--space-5)' }}>Qual tipo de projeto você precisa?</h2>
      <div className={styles.grid} ref={gridRef}>
        {niches.map((niche) => (
          <Card key={niche.slug} hoverable onClick={() => onSelect(niche.slug)} data-niche-card>
            {niche.label}
          </Card>
        ))}
      </div>
    </div>
  );
}

export default NicheSelection;
