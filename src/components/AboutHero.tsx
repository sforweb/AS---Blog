import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { heroConfig } from '../config/hero';
import { themeConfig } from '../config/theme';
import { getImagePath } from '@/lib/path';

const AboutHero = () => {
  const { theme } = useTheme();
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center"> 
      <div className="absolute inset-0 overflow-hidden" style={{ 
        backgroundColor: theme === 'dark' ? themeConfig.hero.dark : themeConfig.hero.light 
      }}>
        {/* Background de mídia */}
        <div className="absolute inset-0 overflow-hidden">
          {heroConfig.type === 'video' ? (
            <div className="absolute inset-0 overflow-hidden rounded-b-[2rem]">
              <iframe 
                src={`https://www.youtube.com/embed/${heroConfig.url}?autoplay=1&mute=1&controls=0&loop=1&playlist=${heroConfig.url}&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=https://alexandrespada.com.br`}
                title="Background Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="absolute w-[350%] sm:w-[250%] md:w-[180%] lg:w-[130%] h-[200%] sm:h-[180%] md:h-[150%] lg:h-[120%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{ opacity: videoLoaded ? 1 : 0, transition: 'opacity 1s ease-in-out' }}
                onLoad={() => setVideoLoaded(true)}
                frameBorder="0"
              />
              {!videoLoaded && heroConfig.fallbackImage && (
                <img 
                  src={getImagePath(heroConfig.fallbackImage.replace(/^\//, ''))}
                  alt="Background Fallback"
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.opacity = '0';
                  }}
                />
              )}
            </div>
          ) : (
            <div className="absolute inset-0 overflow-hidden rounded-b-[2rem]">
              <img 
                src={getImagePath(heroConfig.url.replace(/^\//, ''))}
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
        
        {/* Efeitos de círculos */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none rounded-b-[20px]">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#67c9f8] rounded-full mix-blend-multiply filter blur-xl animate-pulse-tech transition-transform duration-500"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#4ab9f7] rounded-full mix-blend-multiply filter blur-xl animate-pulse-tech delay-1000 transition-transform duration-500"></div>
        </div>
      </div>
      
      <div className="relative z-10 w-full text-center px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col items-center justify-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-inter animate-fade-in">
            <span className="font-light text-gray-800 dark:text-white">Conheça quem está por trás </span>
            <span className="font-bold text-[#65c7f8]">dessa jornada</span>
          </h1>

          {/* Subtitle */}
          <div className="max-w-3xl mx-auto -mt-2">
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-200 leading-relaxed animate-fade-in font-light">
              Quem é Alexandre Spada?
            </p>
          </div>
          
          {/* Divider */}
          
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
