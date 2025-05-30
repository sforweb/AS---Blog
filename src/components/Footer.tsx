
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Twitter, Instagram, Facebook, Heart } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Mail, href: 'mailto:contato@atlascollective.com', label: 'Email' },
  ];

  return (
    <footer className="bg-white dark:bg-tech-blue-950 border-t border-gray-200 dark:border-tech-blue-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-tech-gradient rounded-xl flex items-center justify-center shadow-lg shadow-tech-blue-500/25">
                <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                  <div className="w-4 h-4 bg-gradient-to-br from-tech-blue-400 to-tech-blue-600 rounded-full"></div>
                </div>
              </div>
              <span className="text-xl font-lora font-semibold text-gray-900 dark:text-white">
                Atlas Collective
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md text-left">
              Compartilhando histórias de viagem e inspirando exploradores a descobrir 
              os cantos mais fascinantes do nosso mundo.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 bg-gray-100 dark:bg-tech-blue-800/50 rounded-lg hover:bg-tech-blue-500 hover:text-white dark:hover:bg-tech-blue-600 transition-all duration-200 transform hover:scale-110 border dark:border-tech-blue-700/50"
                >
                  <social.icon className="w-5 h-5" />
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
                  Início
                </Link>
              </li>
              <li>
                <a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-tech-blue-500 dark:hover:text-tech-blue-400 transition-colors duration-200">
                  Sobre
                </a>
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
        <div className="border-t border-gray-200 dark:border-tech-blue-800/50 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-start">
            <p className="text-gray-600 dark:text-gray-300 text-sm flex items-center mb-2 md:mb-0">
              © 2024 Atlas Collective. Feito com <Heart className="w-4 h-4 mx-1 text-red-500" /> 
              para exploradores.
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Inspire-se. Explore. Compartilhe.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
