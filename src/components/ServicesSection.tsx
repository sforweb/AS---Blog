import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import { servicesSectionTheme } from './services-section-theme';
import { useSectionStyle } from '@/hooks/use-section-style';
import { getImagePath } from '@/lib/path';

// Ícones (claro / escuro)
const consultingLightIcon = 'images/icons/consulting-light.png';
const consultingDarkIcon = 'images/icons/consulting-dark.png';
const lecturesLightIcon = 'images/icons/palestras-light.png';
const lecturesDarkIcon = 'images/icons/palestras-dark.png';
const trainingsLightIcon = 'images/icons/treinamentos-light.png';
const trainingsDarkIcon = 'images/icons/treinamentos-dark.png';

const services = [
  {
    light: consultingLightIcon,
    dark: consultingDarkIcon,
    title: 'Consultoria Estratégica',
    description:
      'Aplicamos inteligência artificial, automação de processos e ferramentas digitais para transformar desafios em soluções práticas. O foco está em aumentar a eficiência operacional, escalar marketing e vendas, e acelerar resultados de forma sustentável.',
  },
  {
    light: trainingsLightIcon,
    dark: trainingsDarkIcon,
    title: 'Treinamentos Corporativos',
    description:
      'Exploramos ferramentas de IA, automação e marketing digital em treinamentos personalizados e diretos ao ponto, pensados para gerar competência técnica e tomada de decisão mais ágil, preparando seu time para os desafios atuais do mercado.',
  },
  {
    light: lecturesLightIcon,
    dark: lecturesDarkIcon,
    title: 'Palestras Customizadas',
    description:
      'Apresentações dinâmicas, com linguagem acessível, e que entregam insights acionáveis sobre inovação, marketing, vendas, inteligência artificial e transformação digital. Foco total no que realmente importa: gerar resultados consistentes e escaláveis',
  },
];

const ServicesSection: React.FC = () => {
  const { theme } = useTheme();

  // Se quiser manter consistência de espaçamento/overlap entre seções
  const { containerClasses, backgroundStyle } = useSectionStyle({
    type: 'b',
    isOverlapping: false,
  });

  return (
    <section id="servicos" className="scroll-mt-20">
      <div
        className={containerClasses}
        style={{
          ...backgroundStyle,
          backgroundColor: servicesSectionTheme[theme].background,
        }}
      >
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Título */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-inter text-gray-900 dark:text-white mb-4">
                <span className="font-light">Consultoria, </span>
                <span className="font-bold text-[#65c7f8]">Treinamentos </span>
                <span className="font-light">e </span>
                <span className="font-bold text-[#65c7f8]">Palestras</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Três formatos, um objetivo: destravar o crescimento da sua empresa com tecnologia aplicada e visão estratégica.
              </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div key={service.title} className="relative group">
                  <div
                    className={`relative z-10 h-full backdrop-blur-lg rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 border p-8 text-center 
                      ${theme === 'dark' 
                        ? 'border-gray-700/30 hover:border-[#67c9f8]' 
                        : 'border-transparent hover:border-[#67c9f8]'}`}
                    style={{ backgroundColor: servicesSectionTheme[theme].card }}
                  >
                    {/* Ícone */}
                    <div className="flex justify-center mb-6">
                      <div className="w-16 h-16 flex-shrink-0 bg-tech-blue-50 dark:bg-tech-blue-900/20 rounded-xl flex items-center justify-center p-2">
                        <img 
                          src={getImagePath(service.light)} 
                          alt="" 
                          className="h-8 w-8 dark:hidden" 
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.opacity = '0';
                          }}
                        />
                        <img 
                          src={getImagePath(service.dark)} 
                          alt="" 
                          className="h-8 w-8 hidden dark:block"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.opacity = '0';
                          }}
                        />
                      </div>
                    </div>

                    {/* Conteúdo */}
                    <h3 className="text-xl font-lora font-semibold text-gray-900 dark:text-white mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Botão Fale Conosco */}
            <div className="mt-16 text-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center bg-gradient-to-r from-[#67c9f8] to-[#4ab9f7] text-white font-semibold py-3 px-8 rounded-full hover:opacity-90 transition-all duration-200 hover:shadow-xl hover:shadow-[#67c9f8]/25 transform hover:scale-105 relative overflow-hidden group h-14"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                <span className="relative z-10">Fale com o nosso time</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;