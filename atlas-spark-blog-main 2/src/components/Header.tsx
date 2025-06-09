
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

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

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/90 dark:bg-tech-blue-950/90 backdrop-blur-lg border-b border-gray-200/50 dark:border-tech-blue-800/50 shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-tech-gradient rounded-xl flex items-center justify-center shadow-lg shadow-tech-blue-500/25 group-hover:shadow-tech-blue-500/40 transition-all duration-300 group-hover:scale-105">
              <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                <div className="w-4 h-4 bg-gradient-to-br from-tech-blue-400 to-tech-blue-600 rounded-full"></div>
              </div>
            </div>
            <span className="text-xl font-lora font-semibold text-gray-900 dark:text-white group-hover:text-tech-blue-500 dark:group-hover:text-tech-blue-400 transition-colors duration-200">
              Atlas Collective
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/"
              className="text-gray-700 dark:text-gray-300 hover:text-tech-blue-500 dark:hover:text-tech-blue-400 transition-colors duration-200 font-medium"
            >
              Início
            </Link>
            <a 
              href="#about" 
              className="text-gray-700 dark:text-gray-300 hover:text-tech-blue-500 dark:hover:text-tech-blue-400 transition-colors duration-200 font-medium"
            >
              Sobre
            </a>
            <Link 
              to="/contact"
              className="text-gray-700 dark:text-gray-300 hover:text-tech-blue-500 dark:hover:text-tech-blue-400 transition-colors duration-200 font-medium"
            >
              Contato
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-tech-blue-800/50 hover:bg-gray-200 dark:hover:bg-tech-blue-700/50 transition-all duration-200 border dark:border-tech-blue-700/50"
              aria-label="Alternar tema"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Theme Toggle Mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-tech-blue-800/50 hover:bg-gray-200 dark:hover:bg-tech-blue-700/50 transition-all duration-200 border dark:border-tech-blue-700/50"
              aria-label="Alternar tema"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>

            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg bg-gray-100 dark:bg-tech-blue-800/50 hover:bg-gray-200 dark:hover:bg-tech-blue-700/50 transition-all duration-200 border dark:border-tech-blue-700/50"
              aria-label="Menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-tech-blue-900 rounded-lg mt-2 border border-gray-200 dark:border-tech-blue-700/50 shadow-lg">
              <Link
                to="/"
                className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-tech-blue-500 dark:hover:text-tech-blue-400 hover:bg-gray-50 dark:hover:bg-tech-blue-800/50 rounded-md transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </Link>
              <a
                href="#about"
                className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-tech-blue-500 dark:hover:text-tech-blue-400 hover:bg-gray-50 dark:hover:bg-tech-blue-800/50 rounded-md transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre
              </a>
              <Link
                to="/contact"
                className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-tech-blue-500 dark:hover:text-tech-blue-400 hover:bg-gray-50 dark:hover:bg-tech-blue-800/50 rounded-md transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Contato
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
