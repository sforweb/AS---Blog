
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Twitter, Instagram, Facebook, Heart } from 'lucide-react';
import { getImagePath } from '@/lib/path';

const Footer = () => {
  const socialLinks = [
    { icon: Twitter, href: 'https://x.com/alexandrespada', label: 'X (Twitter)' },
    { icon: Instagram, href: 'https://www.instagram.com/alexandrespada/', label: 'Instagram' },
    { icon: Facebook, href: 'https://www.facebook.com/alexandrespada.mkt', label: 'Facebook' },
    { icon: Mail, href: 'mailto:falecom@alexandrespada.com.br', label: 'Email' },
  ];

  return (
    <footer className="bg-white dark:bg-[#020525] border-t border-gray-200 dark:border-gray-700/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="inline-block group mb-4">
              <div className="h-12 flex items-center transition-all duration-300 group-hover:scale-105">
                <img 
                  src={getImagePath('logo-light-mode.png')}
                  alt="Alexandre Spada" 
                  className="h-full w-auto object-contain block dark:hidden" 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    console.error('Erro ao carregar o logo light mode (footer)');
                    target.style.opacity = '0';
                  }}
                />
                <img 
                  src={getImagePath('logo-dark-mode.png')}
                  alt="Alexandre Spada" 
                  className="h-full w-auto object-contain hidden dark:block"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    console.error('Erro ao carregar o logo dark mode (footer)');
                    target.style.opacity = '0';
                  }}
                />
              </div>
            </Link>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md text-left">
              Desenvolvemos o potencial humano para alcançar resultados excepcionais com tecnologia e inteligência artificial.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="group p-2 bg-gray-100 rounded-full hover:bg-[#67c9f8] hover:text-white text-gray-700 dark:text-gray-200 transition-all duration-200 transform hover:scale-110 border border-gray-200 dark:border-gray-800/20 dark:bg-[#030630]/50 dark:hover:bg-[#67c9f8]"
                >
                  <social.icon className="w-5 h-5 dark:group-hover:text-[#03092a]" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-left">
              Links Rápidos
            </h3>
            <ul className="space-y-2 text-left">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-tech-blue-500 dark:hover:text-tech-blue-400 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-tech-blue-500 dark:hover:text-tech-blue-400 transition-colors duration-200">
                  Sobre
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 dark:text-gray-300 hover:text-tech-blue-500 dark:hover:text-tech-blue-400 transition-colors duration-200">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-tech-blue-500 dark:hover:text-tech-blue-400 transition-colors duration-200">
                  Contato
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-tech-blue-500 dark:hover:text-tech-blue-400 transition-colors duration-200">
                  Política de Privacidade
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 dark:border-gray-700/30 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-start">
            <p className="text-gray-600 dark:text-gray-300 text-sm flex items-center mb-2 md:mb-0">
              © {new Date().getFullYear()} Alexandre Spada. Todos os direitos reservados.
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Capacite-se. Inspire-se. Compartilhe.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
