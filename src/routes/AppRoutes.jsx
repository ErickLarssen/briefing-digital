import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import Briefing from '../pages/Briefing.jsx';
import Success from '../pages/Success.jsx';
import UIKitPreview from '../pages/UIKitPreview.jsx';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/briefing/*" element={<Briefing />} />
      <Route path="/sucesso" element={<Success />} />
      {/* Rota temporária de conferência — remover quando o UI Kit estiver validado */}
      <Route path="/ui-kit" element={<UIKitPreview />} />
    </Routes>
  );
}

export default AppRoutes;
