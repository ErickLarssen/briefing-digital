import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { niches } from '@/data/niches';
import Card from '@/components/ui/Card';
import { EASE, DURATION, STAGGER } from '@/utils/motion';
import styles from './NicheSelection.module.css';

// Ícones minimalistas (traço único, sem libs externas) — um por nicho, só
// para dar identidade visual ao card sem pesar o bundle.
const ICON_PATHS = {
  'identidade-visual': (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="9" cy="9.8" r="1" fill="currentColor" stroke="none" />
      <circle cx="14" cy="8.6" r="1" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="13.2" r="1" fill="currentColor" stroke="none" />
      <path d="M12 15.8c1.4 0 2.2-.8 2.2-1.8 0-.6-.5-1-1.2-1h-1.8c-1 0-1.9-.8-1.9-1.9 0-2.3 2-4.3 4.5-4.3" />
    </>
  ),
  'landing-page': (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
      <path d="M3.5 8.5h17" />
      <circle cx="6" cy="6.5" r=".6" fill="currentColor" stroke="none" />
      <circle cx="8.2" cy="6.5" r=".6" fill="currentColor" stroke="none" />
      <path d="M7 12.8h6M7 15.8h4" />
    </>
  ),
  'site-institucional': (
    <>
      <path d="M4 21h16" />
      <path d="M5 21V10l7-5 7 5v11" />
      <path d="M9.5 21v-6h5v6" />
      <path d="M9.5 12.5h5" />
    </>
  ),
  'sistema-web': (
    <>
      <rect x="3.5" y="5" width="17" height="12" rx="1.5" />
      <path d="M9 20h6M12 17v3" />
      <path d="M8.5 9.5 6.5 11l2 1.5M15.5 9.5l2 1.5-2 1.5" />
    </>
  ),
  aplicativo: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2.2" />
      <path d="M11 18.5h2" />
    </>
  ),
  'motion-design': (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M10 8.6l6 3.4-6 3.4z" fill="currentColor" stroke="none" />
    </>
  ),
};

function NicheIcon({ slug }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICON_PATHS[slug]}
    </svg>
  );
}

function NicheSelection({ onSelect }) {
  const gridRef = useRef(null);

  function handleKeyDown(event, slug) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect(slug);
    }
  }

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
      <span className={styles.eyebrow}>Etapa 1 de 3</span>
      <h2 className={styles.title}>Qual tipo de projeto você precisa?</h2>
      <p className={styles.subtitle}>
        Escolha a opção mais próxima do que você tem em mente — as próximas perguntas se ajustam a ela.
      </p>
      <div className={styles.grid} ref={gridRef}>
        {niches.map((niche) => (
          <Card
            key={niche.slug}
            hoverable
            onClick={() => onSelect(niche.slug)}
            onKeyDown={(event) => handleKeyDown(event, niche.slug)}
            role="button"
            tabIndex={0}
            data-niche-card
            className={styles.card}
          >
            <span className={styles.iconBadge}>
              <NicheIcon slug={niche.slug} />
            </span>
            <span className={styles.cardLabel}>{niche.label}</span>
            <span className={styles.cardDescription}>{niche.description}</span>
            <span className={styles.cardArrow} aria-hidden="true">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default NicheSelection;
