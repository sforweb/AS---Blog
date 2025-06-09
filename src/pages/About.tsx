// src/pages/About.tsx
import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import AboutHero from '../components/AboutHero';
import { Progress } from '../components/ui/progress';

import { useSectionStyle } from '@/hooks/use-section-style';
import { useTheme } from '@/contexts/ThemeContext';
import { themeConfig } from '@/config/theme';
import { getImagePath } from '@/lib/path';

/* -------------------------------------------------------------------------- */
/*  TIPAGENS                                                                  */
/* -------------------------------------------------------------------------- */
interface Skill {
  name: string;
  percentage: number;
}

interface Education {
  date: string;       // Ex.: '22 setembro 2023'
  degree: string;
  institution: string;
  location: string;
}

/* -------------------------------------------------------------------------- */
/*  COMPONENTE PRINCIPAL                                                      */
/* -------------------------------------------------------------------------- */
const About: React.FC = () => {
  /* ---------------------------- SKILLS (barras) --------------------------- */
  const [skillsInView, setSkillsInView] = useState(false);
  const [skillsProgress, setSkillsProgress] = useState<Record<string, number>>(
    {}
  );
  const skillsRef = useRef<HTMLDivElement>(null);

  /* ---------------------------- TIMELINE (EDU) ---------------------------- */
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0); // item em foco
  const { theme } = useTheme();

  /* ------------------------------- DADOS ---------------------------------- */
  // Função para obter o caminho da imagem
  const getImageSrc = (imagePath: string) => {
    return getImagePath(imagePath.replace(/^\//, ''));
  };

  const skills: Skill[] = [
    { name: 'Empreendedorismo', percentage: 70 },
    { name: 'Gestão de Negócios', percentage: 80 },
    { name: 'Automação de Processos com IA', percentage: 86 },
    { name: 'IA aplicada ao Marketing', percentage: 95 },
    { name: 'Marketing Digital Estratégico', percentage: 98 }
  ];

  const education: Education[] = [
    {
      date: '22 setembro 2023',
      degree: 'Doutorando em Gestão de Empresas',
      institution: 'Universidade de Coimbra',
      location: 'Coimbra – Portugal'
    },
    {
      date: '24 outubro 2019',
      degree: 'Mestrado em Inovação e Tecnologia',
      institution: 'Centro Universitário Teresa DÁvila',
      location: 'São Paulo – Brasil'
    },
    {
      date: '27 novembro 2015',
      degree: 'MBA em Gestão Estratégica de Negócios',
      institution: 'Centro Universitário Salesiano',
      location: 'São Paulo – Brasil'
    },
    {
      date: '09 novembro 2012',
      degree: 'Especialização em Engenharia Web',
      institution: 'Universidade Federal de Itajubá',
      location: 'Minas Gerais – Brasil'
    },
    {
      date: '02 dezembro 2011',
      degree: 'Bacharelado em Ciência da Computação',
      institution: 'Centro Universitário Salesiano',
      location: 'Lorena – Brasil'
    }
  ];

  /* ---------------------------------------------------------------------- */
  /*  EFEITO – ANIMAR BARRAS DE SKILL QUANDO VISÍVEIS                       */
  /* ---------------------------------------------------------------------- */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !skillsInView) {
            setSkillsInView(true);
            skills.forEach((skill, i) => {
              setTimeout(() => {
                setSkillsProgress((p) => ({ ...p, [skill.name]: skill.percentage }));
              }, i * 200);
            });
          }
        });
      },
      { threshold: 0.5 }
    );
    if (skillsRef.current) obs.observe(skillsRef.current);
    return () => obs.disconnect();
  }, [skillsInView, skills]);

  // Removemos as funções de scroll da timeline horizontal, pois agora é vertical
  
  /* ---------------------------------------------------------------------- */
  /*  RENDER                                                                 */
  /* ---------------------------------------------------------------------- */
  return (
    <div className="min-h-screen bg-white dark:bg-tech-blue-950">
      <Header />
      <AboutHero />

      {/* ------------------------------------------------------------------ */}
      {/* Seção - Quem é Alexandre Spada                                     */}
      {/* ------------------------------------------------------------------ */}
      <Section type="a" bgLight="#f8fafc" bgDark="#030929">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-lora mb-8">
                <span className="font-light text-gray-900 dark:text-white">Quem é </span>
                <span className="font-bold" style={{ color: '#67c9f8' }}>Alexandre Spada?</span>
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  Sou um <span className="font-bold" style={{ color: '#67c9f8' }}>estrategista de negócios</span> movido por empreendedorismo, uma jornada que me levou da distribuição de produtos ao desenvolvimento de software.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                   Hoje lidero três frentes complementares:
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">	                 •	<span className="font-bold" style={{ color: '#67c9f8' }}>SFORWEB</span>, agência que desde 2013 implementa estratégias completas de marketing e vendas para empresas que querem crescer com consistência.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">	                 •	<span className="font-bold" style={{ color: '#67c9f8' }}>Alexandre Spada Consultoria & Treinamentos</span>, onde capacito negócios e profissionais para escalar com o uso de IA, automações e estratégias digitais aplicadas.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                   •	<span className="font-bold" style={{ color: '#67c9f8' }}>Automatiza</span>, uma empresa europeia especializada em automatizar processos empresariais com inteligência artificial.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                   Sou também autor do livro Marketing Inteligente de Conteúdo, onde compartilho a filosofia que sigo: fazer marketing sem parecer propaganda.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Além disso, leciono em cursos de pós-graduação temas como <span className="font-bold" style={{ color: '#67c9f8' }}>Inovação, Marketing Estratégico, Gestão de Projetos e UX</span>, sempre com o compromisso de levar para sala de aula o que de fato funciona no mercado.
                </p>
              </div>
            </div>
            <div className="w-full h-full flex items-start">
              {/* Versão Light - visível apenas no tema claro */}
              <img 
                src={getImageSrc('images/AlexandreSpada-LightMode.png')} 
                alt="Alexandre Spada" 
                className="w-full h-auto max-w-full dark:hidden object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.opacity = '0';
                }}
              />
              
              {/* Versão Dark - visível apenas no tema escuro */}
              <img 
                src={getImageSrc('images/AlexandreSpada-DarkMode.png')} 
                alt="Alexandre Spada" 
                className="w-full h-auto max-w-full hidden dark:block object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.opacity = '0';
                }}
              />
            </div>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* TIMELINE – FORMAÇÃO ACADÊMICA                                    */}
      {/* ------------------------------------------------------------------ */}
<Section type="b" bgLight="#ffffff" bgDark="#01031e">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Título */}
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-lora mb-6">
        <span className="font-light text-gray-900 dark:text-white">Formação </span>
        <span className="font-bold" style={{ color: '#67c9f8' }}>Acadêmica</span>
      </h2>
    </div>

    {/* Bloco da timeline */}
    <div className="relative">
      <div className="relative mx-auto w-full md:w-[900px] px-4">
        {/* Container da timeline com linha vertical */}
        <div className="relative py-8">
          {/* Linha vertical */}
          <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gray-200 dark:bg-gray-700 -translate-x-1/2 z-0" />
          
          {/* Itens da timeline */}
          <div className="space-y-24">
            {education.map((edu, idx) => {
              const year = edu.date.split(' ')[2];
              const isRight = idx % 2 === 0; // Alternando entre direita e esquerda

              return (
                <div key={idx} className="relative">
                  {/* Marcador central na linha do tempo (posicionado no meio do card) */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="w-4 h-4 rounded-full border-4 border-white dark:border-tech-blue-950 shadow-md bg-tech-blue-600" />
                  </div>
                  
                  {/* Card com conteúdo */}
                  <div 
                    className={`${isRight ? 'ml-auto mr-0 pl-8' : 'mr-auto ml-0 pr-8'} w-full md:w-[420px] relative`}
                  >
                    <div 
                      className={`relative z-10 transition-all duration-300 p-6 rounded-lg border ${
                        isRight ? 'text-left' : 'text-right'
                      } ${theme === 'dark' 
                        ? 'border-gray-700/30' 
                        : 'border-gray-200'}`}
                      style={{
                        backgroundColor: theme === 'dark' 
                          ? '#03092a' // Cor de fundo escura para os cards
                          : '#f7fafd'  // Cor de fundo clara para os cards
                      }}
                    >
                      {/* Removemos as setas */}

                  <div className="mb-4 font-bold text-xl" style={{ color: '#67c9f8' }}>
                    {year}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {edu.degree}
                  </h3>
                  <p className="font-medium mb-1" style={{ color: '#67c9f8' }}>
                    {edu.institution}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {edu.location}
                  </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  </div>
</Section>

      {/* ------------------------------------------------------------------ */}
      {/* RESTANTE DO SEU COMPONENTE (skills, etc.)                           */}
      {/* ------------------------------------------------------------------ */}

      <Footer />
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  SECTION WRAPPER (sem alterações de lógica)                                */
/* -------------------------------------------------------------------------- */
let sectionCounter = 0;

interface SectionProps {
  type: 'a' | 'b';
  children: React.ReactNode;
  className?: string;
  bgLight?: string;
  bgDark?: string;
}

function Section({ type, children, className = '', bgLight, bgDark }: SectionProps) {
  const isFirst = sectionCounter === 0;
  const computedType = isFirst ? type : sectionCounter % 2 === 0 ? 'a' : 'b';

  const { containerClasses } = useSectionStyle({
    type: computedType,
    isOverlapping: false
  });

  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const backgroundStyle = {
    backgroundColor: isDark
      ? bgDark || themeConfig.sections[computedType].dark
      : bgLight || themeConfig.sections[computedType].light
  };

  useEffect(() => {
    sectionCounter++;
    return () => {
      if (isFirst) sectionCounter = 0;
    };
  }, [isFirst]);

  return (
    <section className={`${containerClasses} ${className}`} style={backgroundStyle}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export default About;