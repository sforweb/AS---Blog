import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Componente que rola para o topo da página sempre que a rota muda.
 * Deve ser usado dentro de um Router.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Rola suavemente para o topo quando o caminho muda
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return null; // Este componente não renderiza nada
};

export default ScrollToTop;