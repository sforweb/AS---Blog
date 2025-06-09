import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { getImagePath } from '@/lib/path';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

const NotFound = () => {
  const location = useLocation();
  const { theme } = useTheme();

  useEffect(() => {
    console.error(
      '404 Error: User attempted to access non-existent route:',
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#020523] transition-colors duration-200">
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12 sm:py-16">
        <div className="text-center max-w-3xl mx-auto">
          {/* Imagem no topo */}
          <div className="mb-8">
            <img 
              src={theme === 'dark' ? getImagePath('404-dark-mode.png') : getImagePath('404-light-mode.png')} 
              alt="Página não encontrada"
              className="max-w-xs sm:max-w-sm md:max-w-md mx-auto"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
          
          {/* Título com estilo de fonte diferenciado */}
          <h2 className="text-4xl md:text-5xl font-inter text-gray-900 dark:text-white mb-6">
            <span className="font-light">Página </span>
            <span className="font-bold text-[#65c7f8]">não encontrada</span>
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Ops! Parece que a página que você está procurando não existe ou foi movida.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="bg-[#67c9f8] hover:bg-[#4ab9f7] text-white rounded-full px-6 py-3 font-medium shadow-sm hover:shadow transition-all duration-200">
              <Link to="/">
                Voltar para a página inicial
              </Link>
            </Button>
            <Button variant="outline" asChild className="rounded-full px-6 py-3 font-medium border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800 transition-all duration-200">
              <Link to="/blog">
                Ver artigos do blog
              </Link>
            </Button>
          </div>
          
          {/* Botões de ação */}
        </div>
      </main>
    </div>
  );
};

export default NotFound;
