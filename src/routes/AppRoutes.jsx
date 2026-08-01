import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Cada página só é baixada quando o usuário realmente navega até ela —
// quem chega pela Home não paga o custo do motor de perguntas, GSAP do
// fluxo e SDK do EmailJS até precisar deles de verdade.
const Home = lazy(() => import('../pages/Home.jsx'));
const Briefing = lazy(() => import('../pages/Briefing.jsx'));
const Success = lazy(() => import('../pages/Success.jsx'));
const UIKitPreview = lazy(() => import('../pages/UIKitPreview.jsx'));

function AppRoutes() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/briefing/*" element={<Briefing />} />
        <Route path="/sucesso" element={<Success />} />
        {/* Rota de conferência do UI Kit — só existe em desenvolvimento */}
        {import.meta.env.DEV && <Route path="/ui-kit" element={<UIKitPreview />} />}
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
