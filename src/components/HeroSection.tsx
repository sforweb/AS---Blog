import React, { useState, useRef } from 'react';
import { Mail } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useTheme } from '@/contexts/ThemeContext';
import { heroConfig } from '../config/hero';
import { themeConfig } from '../config/theme';
import { useSectionType } from '@/hooks/use-section-type';
import { getImagePath } from '@/lib/path';

const HeroSection = () => {
  // Reseta o contador de seções
  useSectionType(true);
  const [email, setEmail] = useState('');
  const { theme } = useTheme();
  const videoRef = useRef<HTMLIFrameElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  // Função para obter o caminho da imagem
  const getImageSrc = (imagePath: string | undefined) => {
    if (!imagePath) return '';
    return getImagePath(imagePath.replace(/^\//, ''));
  };
  
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Obrigado por se inscrever!",
        description: "Você receberá nossas últimas histórias em breve.",
      });
      setEmail('');
    }
  };

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center"> 
      <div className="absolute inset-0 overflow-hidden" style={{ 
        backgroundColor: theme === 'dark' ? themeConfig.hero.dark : themeConfig.hero.light 
      }}>
        {/* Background de mídia */}
        <div className="absolute inset-0 overflow-hidden">
          {heroConfig.type === 'video' ? (
            /* Container do vídeo */
            <div className="absolute inset-0 overflow-hidden rounded-b-[2rem]">
              <iframe 
                ref={videoRef}
                src={`https://www.youtube.com/embed/${heroConfig.url}?autoplay=1&mute=1&controls=0&loop=1&playlist=${heroConfig.url}&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=https://alexandrespada.com.br`}
                title="Background Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="absolute w-[350%] sm:w-[250%] md:w-[180%] lg:w-[130%] h-[200%] sm:h-[180%] md:h-[150%] lg:h-[120%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{ opacity: videoLoaded ? 1 : 0, transition: 'opacity 1s ease-in-out' }}
                onLoad={() => setVideoLoaded(true)}
                frameBorder="0"
              />
              {!videoLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-700">
                  {heroConfig.fallbackImage && (
                    <img 
                      src={getImageSrc(heroConfig.fallbackImage)}
                      alt="Background Fallback"
                      className="w-full h-full object-cover opacity-50"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.opacity = '0';
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          ) : (
            /* Container da imagem */
            <div className="absolute inset-0 overflow-hidden rounded-b-[2rem]">
              <img 
                src={getImageSrc(heroConfig.url)}
                alt="Background Image"
                className="absolute w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.opacity = '0';
                }}
              />
            </div>
          )}
          
          {/* Overlay para controlar a opacidade */}
          <div 
            className="absolute inset-0 transition-colors duration-500"
            style={{
              backgroundColor: theme === 'dark'
                ? `rgba(0, 0, 0, ${themeConfig.overlays.dark.opacity})`
                : `rgba(255, 255, 255, ${themeConfig.overlays.light.opacity})`
            }}
          />
        </div>
        
        {/* Mantém alguns efeitos de círculos para complementar o vídeo */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none rounded-b-[20px]">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#67c9f8] rounded-full mix-blend-multiply filter blur-xl animate-pulse-tech transition-transform duration-500"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#4ab9f7] rounded-full mix-blend-multiply filter blur-xl animate-pulse-tech delay-1000 transition-transform duration-500"></div>
        </div>
      </div>
      <div className="relative z-10 w-full text-center px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col items-center justify-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
        {/* Logo/Symbol */}
        

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-inter animate-fade-in">
          <span className="font-light text-gray-800 dark:text-white">Inove com </span>
          <span className="font-bold text-[#65c7f8]">propósito</span><br/>
          <span className="font-light text-gray-800 dark:text-white">Cresça com </span>
          <span className="font-bold text-[#65c7f8]">inteligência</span>
        </h1>

        {/* Subtitle */}
        <div className="max-w-3xl mx-auto -mt-2">
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-200 leading-relaxed animate-fade-in font-light">
          Combinando Inteligência Artificial, automação e gestão estratégica, ajudo empresas a escalarem com precisão, reduzindo custos, aumentando lucro e potencializando sua competitividade.
          </p>
        </div>

        {/* Email Signup */}
        <div className="w-full max-w-xl mx-auto animate-fade-in -mt-2">
          <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3 w-full">
            <div className="flex-1 min-w-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu melhor e-mail"
                className="w-full px-5 py-3 text-gray-900 bg-white/95 dark:bg-white/10 dark:text-white border border-gray-300 dark:border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#67c9f8] focus:border-transparent placeholder-gray-500 dark:placeholder-gray-300 backdrop-blur-sm text-sm sm:text-base h-14"
                required
              />
            </div>
            <div className="w-full sm:w-auto mt-2 sm:mt-0">
              <button
                type="submit"
                className="w-full sm:w-auto bg-gradient-to-r from-[#67c9f8] to-[#4ab9f7] text-white font-semibold py-3 px-6 sm:px-8 rounded-full hover:opacity-90 transition-all duration-200 hover:shadow-xl hover:shadow-[#67c9f8]/25 transform hover:scale-105 relative overflow-hidden group flex items-center justify-center gap-2 h-14 whitespace-nowrap"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
                <span className="relative z-10 text-sm sm:text-base">Receber Novidades</span>
              </button>
            </div>
          </form>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 mt-4 text-center w-full">
            Conhecimento prático direto na sua caixa de entrada. Sem spam.
          </p>
        </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
