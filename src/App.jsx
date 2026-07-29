import { BriefingProvider } from './context/BriefingContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import AppRoutes from './routes/AppRoutes.jsx';

function App() {
  return (
    <ToastProvider>
      <BriefingProvider>
        <AppRoutes />
      </BriefingProvider>
    </ToastProvider>
  );
}

export default App;
