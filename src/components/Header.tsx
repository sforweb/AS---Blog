import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { themeConfig } from '@/config/theme';
import { getImagePath } from '@/lib/path';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  
  // Função para lidar com a navegação e fechar o menu móvel
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    // Se for um link para uma âncora na mesma página
    if (path.startsWith('#')) {
      e.preventDefault();
      const element = document.getElementById(path.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    // Fecha o menu móvel se estiver aberto
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Sobre', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Serviços', path: '/#servicos' },
    { name: 'Livro', path: '/book' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 px-6 sm:px-12">
      <div
        style={{
          backgroundColor: theme === 'dark'
            ? isScrolled ? themeConfig.header.dark.scrolled : themeConfig.header.dark.default
            : isScrolled ? themeConfig.header.light.scrolled : themeConfig.header.light.default,
          backdropFilter: 'blur(8px)'
        }}
        className="max-w-7xl mx-auto rounded-3xl transition-all duration-300 border border-gray-200 dark:border-gray-700/30"
      >
        <div className="flex justify-between items-center h-16 px-6 sm:px-12">
          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-200"
            aria-label="Menu"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>
          
          {/* Logo */}
          <Link to="/" onClick={(e) => handleNavigation(e, '/')} className="flex items-center h-full group">
            <div className="h-12 flex items-center transition-all duration-300 group-hover:scale-105">
              <img 
                src={getImagePath('logo-light-mode.png')}
                alt="Alexandre Spada" 
                className="h-full w-auto object-contain block dark:hidden"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  console.error('Erro ao carregar o logo light mode');
                  target.style.opacity = '0';
                }}
              />
              <img 
                src={getImagePath('logo-dark-mode.png')}
                alt="Alexandre Spada" 
                className="h-full w-auto object-contain hidden dark:block"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  console.error('Erro ao carregar o logo dark mode');
                  target.style.opacity = '0';
                }}
              />
            </div>
          </Link>

          {/* Desktop Navigation - Center */}
          <nav className="hidden md:flex items-center justify-center flex-1 mx-4">
            <div className="flex space-x-8">
              {navItems.map((item) => (
                <Link 
                  key={item.name}
                  to={item.path}
                  onClick={(e) => handleNavigation(e, item.path)}
                  className="text-gray-700 dark:text-gray-300 hover:text-[#67c9f8] transition-colors duration-200 font-medium relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#67c9f8] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>
          </nav>
          
          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-600/50 transition-all duration-200"
              aria-label="Alternar tema"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
            
            {/* Contact Button */}
            <Link
              to="/contact"
              onClick={(e) => scrollToTop(e, '/contact')}
              className="hidden sm:flex items-center px-4 py-2 bg-[#67c9f8] hover:bg-[#4ab9f7] text-white font-medium rounded-full transition-all duration-200 shadow-sm hover:shadow"
            >
              Fale Conosco
            </Link>
          </div>


        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden absolute top-full left-0 right-0 mt-2 px-4 z-50 transition-all duration-300 ease-in-out transform ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
          <div className="bg-white dark:bg-[#03062e] rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700/30 transition-all duration-300">
              <div className="px-2 py-3 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-[#67c9f8] hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-all duration-200"
                    onClick={(e) => {
                      handleNavigation(e, item.path);
                      setIsMenuOpen(false);
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  to="/contact"
                  className="block px-4 py-3 mt-2 bg-[#67c9f8] hover:bg-[#4ab9f7] text-white font-medium rounded-lg transition-all duration-200 text-center"
                  onClick={(e) => {
                    handleNavigation(e, '/contact');
                    setIsMenuOpen(false);
                  }}
                >
                  Fale Conosco
                </Link>
              </div>
            </div>
          </div>
      </div>
    </header>
  );
};

export default Header;
