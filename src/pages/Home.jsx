import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { EASE, DURATION } from '@/utils/motion';
import logo from '@/assets/logo.png';
import Navbar from '@/components/layout/Navbar';
import styles from './Home.module.css';

const STEPS = [
  { number: '01', text: 'Escolha o tipo de projeto que você precisa' },
  { number: '02', text: 'Responda perguntas rápidas e diretas' },
  { number: '03', text: 'Envie referências, se tiver — o resto é com a gente' },
];

function Home() {
  const heroRef = useRef(null);
  const logoRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: EASE, clearProps: 'opacity,transform' } });

      tl.from(logoRef.current, {
        opacity: 0,
        scale: 0.85,
        duration: 0.9,
        ease: 'power3.out',
      })
        .from(titleRef.current, { opacity: 0, y: 16, duration: DURATION }, '-=0.6')
        .from(subtitleRef.current, { opacity: 0, y: 16, duration: DURATION }, '-=0.4')
        .from(ctaRef.current, { opacity: 0, y: 16, duration: DURATION }, '-=0.4');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.page} id="top">
      <Navbar />

      <section className={styles.hero} ref={heroRef}>
        <div className={styles.copy}>
          <h1 className={styles.title} ref={titleRef}>
            Conte sua <span className={styles.highlight}>visão</span>.
          </h1>
          <p className={styles.subtitle} ref={subtitleRef}>
            Antes de começarmos seu projeto, queremos entender exatamente o que você precisa.
            Leva poucos minutos.
          </p>
          <Link to="/briefing" className={styles.cta} ref={ctaRef}>
            Começar
          </Link>
        </div>
        <img src={logo} alt="Erick Silva" className={styles.heroLogo} ref={logoRef} />
      </section>

      <section id="como-funciona" className={styles.section}>
        <h2 className={styles.sectionTitle}>Como funciona</h2>
        <div className={styles.steps}>
          {STEPS.map((step) => (
            <div key={step.number} className={styles.step}>
              <span className={styles.stepNumber}>{step.number}</span>
              <p className={styles.stepText}>{step.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
