import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import ScrollToTop from './components/ScrollToTop';
import Index from './pages/Index';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import { ErrorFallback } from './components/ErrorBoundary';

import './App.css';
import 'highlight.js/styles/github-dark-dimmed.css'; // Estilo para blocos de código

// Componente para envolver cada rota com ErrorBoundary
const RouteWithErrorBoundary = ({ component: Component, ...rest }: { component: React.ComponentType }) => (
  <ErrorBoundary 
    fallback={
      <ErrorFallback 
        error={new Error('Ocorreu um erro ao carregar esta página.')} 
        resetErrorBoundary={() => window.location.reload()} 
      />
    }
  >
    <Component {...rest} />
  </ErrorBoundary>
);

function App() {
  return (
    <ErrorBoundary 
      fallback={
        <ErrorFallback 
          error={new Error('Ocorreu um erro inesperado no aplicativo.')} 
          resetErrorBoundary={() => window.location.reload()} 
        />
      }
    >
      <ThemeProvider>
        <Router basename="/AS---Blog">
          <div className="min-h-screen">
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<RouteWithErrorBoundary component={Index} />} />
              <Route path="/about" element={<RouteWithErrorBoundary component={About} />} />
              <Route path="/blog" element={<RouteWithErrorBoundary component={Blog} />} />
              <Route path="/post/:slug" element={<RouteWithErrorBoundary component={BlogPost} />} />
              <Route path="/contact" element={<RouteWithErrorBoundary component={Contact} />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
