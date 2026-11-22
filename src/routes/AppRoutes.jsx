import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Cada página só é baixada quando o usuário realmente navega até ela —
// quem chega pela Home não paga o custo do motor de perguntas, GSAP do
// fluxo e SDK do EmailJS até precisar deles de verdade.
const Home = lazy(() => import('../pages/Home.jsx'));
const Briefing = lazy(() => import('../pages/Briefing.jsx'));
const Success = lazy(() => import('../pages/Success.jsx'));
// O import() precisa ficar dentro da condição: se ficar fora, o Vite gera o
// chunk mesmo sem rota. Com import.meta.env.DEV (constante no build), o ramo
// inteiro é eliminado e o UI Kit não vai para dist/.
const UIKitPreview = import.meta.env.DEV ? lazy(() => import('../pages/UIKitPreview.jsx')) : null;

function AppRoutes() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/briefing/*" element={<Briefing />} />
        <Route path="/sucesso" element={<Success />} />
        {/* Rota de conferência do UI Kit — só existe em desenvolvimento */}
        {UIKitPreview && <Route path="/ui-kit" element={<UIKitPreview />} />}
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
