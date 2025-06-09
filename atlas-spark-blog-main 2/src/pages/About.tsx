import React, { useRef, useEffect, useState } from 'react';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Progress } from '../components/ui/progress';

interface Skill {
  name: string;
  percentage: number;
}

interface Education {
  date: string;
  degree: string;
  institution: string;
  location: string;
}

const About = () => {
  const [skillsInView, setSkillsInView] = useState(false);
  const [skillsProgress, setSkillsProgress] = useState<{[key: string]: number}>({});
  const skillsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const skills: Skill[] = [
    { name: 'Empreendedorismo', percentage: 70 },
    { name: 'Gestão de Negócios', percentage: 80 },
    { name: 'Automação de Processos com IA', percentage: 86 },
    { name: 'Inteligência Artificial aplicada ao Marketing', percentage: 95 },
    { name: 'Marketing Digital Estratégico', percentage: 98 }
  ];

  const education: Education[] = [
    {
      date: '22 setembro 2023',
      degree: 'Doutorando em Gestão de Empresas',
      institution: 'Universidade de Coimbra',
      location: 'Coimbra - Portugal'
    },
    {
      date: '24 outubro 2019',
      degree: 'Mestrado em Inovação e Tecnologia',
      institution: 'Centro Universitário Teresa D\'Ávila',
      location: 'São Paulo - Brasil'
    },
    {
      date: '27 novembro 2015',
      degree: 'MBA em Gestão Estratégica de Negócios',
      institution: 'Centro Universitário Salesiano',
      location: 'São Paulo - Brasil'
    },
    {
      date: '09 novembro 2012',
      degree: 'Especialização em Engenharia Web',
      institution: 'Universidade Federal de Itajubá',
      location: 'Minas Gerais - Brasil'
    },
    {
      date: '02 dezembro 2011',
      degree: 'Bacharelado em Ciência da Computação',
      institution: 'Centro Universitário Salesiano',
      location: 'Lorena - Brasil'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !skillsInView) {
            setSkillsInView(true);
            // Animate each skill with delay
            skills.forEach((skill, index) => {
              setTimeout(() => {
                setSkillsProgress(prev => ({
                  ...prev,
                  [skill.name]: skill.percentage
                }));
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => observer.disconnect();
  }, [skillsInView]);

  const scrollTimeline = (direction: 'left' | 'right') => {
    if (timelineRef.current) {
      const scrollAmount = 400;
      const newScrollLeft = timelineRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
      timelineRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-tech-blue-950">
      <Header />
      
      {/* Seção 1 - Hero com Serviços - Nova versão futurista */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 bg-white dark:bg-tech-blue-950 overflow-hidden">
        {/* Background Elements Futuristas */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-tech-blue-400/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-[30%] right-[10%] w-96 h-96 bg-tech-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute bottom-[5%] left-[20%] w-64 h-64 bg-tech-blue-600/30 rounded-full blur-3xl animate-pulse delay-2000"></div>
          </div>
          
          {/* Grid de linhas futuristas */}
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px] dark:bg-grid-white/[0.05]"></div>
          
          {/* Círculos conectados */}
          <div className="absolute top-1/4 left-10 w-4 h-4 bg-tech-blue-500 rounded-full glow-blue-500"></div>
          <div className="absolute top-1/4 left-10 w-40 h-[1px] bg-gradient-to-r from-tech-blue-500 to-transparent transform rotate-[30deg] origin-left"></div>
          <div className="absolute top-1/3 right-10 w-4 h-4 bg-tech-blue-400 rounded-full glow-blue-400"></div>
          <div className="absolute top-1/3 right-10 w-40 h-[1px] bg-gradient-to-l from-tech-blue-400 to-transparent transform -rotate-[30deg] origin-right"></div>
          <div className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-tech-blue-300 rounded-full glow-blue-300"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-tech-blue-400 to-tech-blue-600 rounded-2xl flex items-center justify-center transform rotate-12 shadow-lg">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center transform -rotate-12">
                    <div className="text-white text-2xl font-bold">AS</div>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-tech-blue-300 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-tech-blue-500 rounded-full animate-pulse delay-500"></div>
              </div>
            </div>
            <h1 className="text-4xl md:text-7xl font-lora font-bold text-gray-900 dark:text-white mb-6 tracking-tight relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-tech-blue-500 to-tech-blue-300">
                Sobre Mim
              </span>
              <div className="absolute -right-4 -top-4 w-8 h-8 border-2 border-tech-blue-500/50 rounded-full blur-[1px] dark:blur-[2px]"></div>
              <div className="absolute -left-2 bottom-0 w-4 h-4 border border-tech-blue-400/50 rounded-sm transform rotate-45 blur-[1px] dark:blur-[2px]"></div>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed backdrop-blur-sm">
              Use o poder da tecnologia para inovar e aumentar a eficiência e a lucratividade da sua empresa
            </p>
            
            <div className="mt-10 mb-4 w-24 h-[1px] bg-gradient-to-r from-transparent via-tech-blue-500 to-transparent mx-auto"></div>
          </div>

          {/* Cards de Serviços com Design Futurista */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group relative backdrop-blur-sm bg-gradient-to-br from-white/5 to-white/10 dark:from-tech-blue-900/10 dark:to-tech-blue-800/30 p-8 rounded-2xl border border-white/10 dark:border-tech-blue-700/30 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-tech-blue-500/20 hover:border-tech-blue-400/30">
              <div className="absolute inset-0 bg-gradient-to-br from-tech-blue-500/0 via-tech-blue-500/0 to-tech-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-tech-blue-500/10 blur-2xl rounded-full transform translate-x-12 -translate-y-12 group-hover:bg-tech-blue-500/20 transition-all duration-500"></div>
              
              <h3 className="relative text-2xl font-lora font-bold text-gray-900 dark:text-white mb-4">
                Consultoria
                <div className="absolute -left-2 -top-2 w-2 h-2 bg-tech-blue-400 rounded-full"></div>
              </h3>
              <p className="relative text-gray-700 dark:text-gray-300 leading-relaxed z-10">
                Não perca tempo e dinheiro com estratégias que não funcionam. Com a minha consultoria sua empresa será capaz de implementar soluções tecnológicas práticas e comprovadas para otimizar ações de marketing, reduzir custos e escalar vendas.
              </p>
              <div className="absolute bottom-2 right-2 w-10 h-[1px] bg-tech-blue-400/50"></div>
            </div>

            <div className="group relative backdrop-blur-sm bg-gradient-to-br from-white/5 to-white/10 dark:from-tech-blue-900/10 dark:to-tech-blue-800/30 p-8 rounded-2xl border border-white/10 dark:border-tech-blue-700/30 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-tech-blue-500/20 hover:border-tech-blue-400/30">
              <div className="absolute inset-0 bg-gradient-to-br from-tech-blue-500/0 via-tech-blue-500/0 to-tech-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-tech-blue-500/10 blur-2xl rounded-full transform translate-x-12 -translate-y-12 group-hover:bg-tech-blue-500/20 transition-all duration-500"></div>
              
              <h3 className="relative text-2xl font-lora font-bold text-gray-900 dark:text-white mb-4">
                Treinamentos
                <div className="absolute -left-2 -top-2 w-2 h-2 bg-tech-blue-400 rounded-full"></div>
              </h3>
              <p className="relative text-gray-700 dark:text-gray-300 leading-relaxed z-10">
                Proporcione ao seu time conhecimentos que geram resultados. Meus treinamentos são diretos ao ponto, com foco em eficiência máxima e com o uso de técnicas e ferramentas que realmente aceleram o desempenho e o crescimento empresarial.
              </p>
              <div className="absolute bottom-2 right-2 w-10 h-[1px] bg-tech-blue-400/50"></div>
            </div>

            <div className="group relative backdrop-blur-sm bg-gradient-to-br from-white/5 to-white/10 dark:from-tech-blue-900/10 dark:to-tech-blue-800/30 p-8 rounded-2xl border border-white/10 dark:border-tech-blue-700/30 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-tech-blue-500/20 hover:border-tech-blue-400/30">
              <div className="absolute inset-0 bg-gradient-to-br from-tech-blue-500/0 via-tech-blue-500/0 to-tech-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-tech-blue-500/10 blur-2xl rounded-full transform translate-x-12 -translate-y-12 group-hover:bg-tech-blue-500/20 transition-all duration-500"></div>
              
              <h3 className="relative text-2xl font-lora font-bold text-gray-900 dark:text-white mb-4">
                Palestras
                <div className="absolute -left-2 -top-2 w-2 h-2 bg-tech-blue-400 rounded-full"></div>
              </h3>
              <p className="relative text-gray-700 dark:text-gray-300 leading-relaxed z-10">
                Sem perda de tempo e com viés tecnológico, minhas palestras mostram o que funciona em marketing, vendas e gestão – sem teorias complexas e com foco em estratégias práticas e insights acionáveis para levar sua empresa ao próximo nível.
              </p>
              <div className="absolute bottom-2 right-2 w-10 h-[1px] bg-tech-blue-400/50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 2 - Quem é Alexandre Spada */}
      <section className="py-16 bg-gradient-to-r from-tech-blue-50 to-tech-blue-100 dark:from-tech-blue-900/30 dark:to-tech-blue-800/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-lora font-bold text-gray-900 dark:text-white mb-8">
                Quem é Alexandre Spada?
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  Apaixonado por negócios desde jovem, sou um empreendedor com experiência em setores como entretenimento, distribuição de produtos e desenvolvimento de software.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  Desde 2013, lidero a <a href="https://sforweb.com.br" target="_blank" rel="noopener noreferrer" className="text-tech-blue-500 hover:text-tech-blue-600 dark:hover:text-tech-blue-400 inline-flex items-center gap-1">SFORWEB Agência de Soluções Digitais <ExternalLink className="w-4 h-4" /></a>, especializada em criar e implementar estratégias completas de Marketing e Vendas para empresas de diferentes portes. Além disso, estou à frente da Alexandre Spada Consultoria e Treinamentos, onde capacito empresas e profissionais nas áreas de Inovação, Marketing e Tecnologia, ajudando-os a alcançar resultados reais e escaláveis. Também lidero a <a href="https://automatiza.pt" target="_blank" rel="noopener noreferrer" className="text-tech-blue-500 hover:text-tech-blue-600 dark:hover:text-tech-blue-400 inline-flex items-center gap-1">Automatiza <ExternalLink className="w-4 h-4" /></a>, uma empresa europeia focada na automação de processos empresariais por meio de Inteligência Artificial.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Sou autor do <a href="https://livromarketinginteligente.com.br" target="_blank" rel="noopener noreferrer" className="text-tech-blue-500 hover:text-tech-blue-600 dark:hover:text-tech-blue-400 inline-flex items-center gap-1">livro Marketing Inteligente de Conteúdo: A Arte de Fazer Marketing Sem Fazer Propaganda <ExternalLink className="w-4 h-4" /></a>, no qual compartilho estratégias práticas para atrair, engajar e converter clientes por meio de conteúdo digital. Minha experiência também inclui atuação como professor em cursos de pós-graduação, lecionando disciplinas como Planejamento Estratégico de Marketing, Marketing Digital, Gerenciamento de Projetos, UX, Inovação e Empreendedorismo.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-80 h-80 bg-gradient-to-br from-tech-blue-400 to-tech-blue-600 rounded-2xl shadow-2xl flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-4xl font-bold">AS</span>
                  </div>
                  <p className="text-lg font-medium">Foto do Alexandre</p>
                  <p className="text-sm opacity-80">será inserida aqui</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 3 - Formação Acadêmica - Timeline Clean */}
      <section className="py-20 bg-white dark:bg-tech-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-lora font-bold text-gray-900 dark:text-white mb-6">
              Formação Acadêmica
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-tech-blue-400 to-tech-blue-600 mx-auto rounded-full"></div>
          </div>

          {/* Timeline Controls */}
          <div className="flex justify-center mb-12">
            <div className="flex gap-4">
              <button
                onClick={() => scrollTimeline('left')}
                className="p-3 bg-tech-blue-500 hover:bg-tech-blue-600 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollTimeline('right')}
                className="p-3 bg-tech-blue-500 hover:bg-tech-blue-600 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Timeline Clean e Minimalista */}
          <div className="relative">
            <div
              ref={timelineRef}
              className="overflow-x-auto scrollbar-hide pb-8"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="flex gap-12 px-4" style={{ width: 'max-content' }}>
                {/* Linha horizontal */}
                <div className="absolute top-20 left-0 right-0 h-0.5 bg-gray-200 dark:bg-tech-blue-800"></div>
                
                {education.map((edu, index) => (
                  <div key={index} className="flex-shrink-0 w-80 relative">
                    {/* Ponto na linha */}
                    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-tech-blue-500 rounded-full border-4 border-white dark:border-tech-blue-950 z-10"></div>
                    
                    {/* Card simples */}
                    <div className="bg-white dark:bg-tech-blue-900 p-6 rounded-lg border border-gray-200 dark:border-tech-blue-700 shadow-sm hover:shadow-md transition-all duration-300 mt-8">
                      {/* Ano */}
                      <div className="text-center mb-4">
                        <span className="text-2xl font-bold text-tech-blue-500">
                          {edu.date.split(' ')[2]}
                        </span>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {`${edu.date.split(' ')[0]} de ${edu.date.split(' ')[1]}`}
                        </p>
                      </div>
                      
                      {/* Conteúdo */}
                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 leading-tight">
                          {edu.degree}
                        </h3>
                        <p className="text-tech-blue-600 dark:text-tech-blue-400 font-medium mb-2">
                          {edu.institution}
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          {edu.location}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 4 - Expertises em 2 colunas */}
      <section className="py-20 bg-gradient-to-br from-tech-blue-50 via-white to-tech-blue-100 dark:from-tech-blue-900/30 dark:via-tech-blue-950 dark:to-tech-blue-800/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-lora font-bold text-gray-900 dark:text-white mb-6">
              Minhas Expertises
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-tech-blue-400 to-tech-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Coluna da esquerda - Texto */}
            <div className="space-y-6">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                Estas são as áreas onde concentro minha dedicação e experiência, aplicando estratégias práticas e comprovadas que geram resultados sólidos para empresas de todos os tamanhos e setores.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-justify">
                Combinando inovação, tecnologia e gestão estratégica, meu objetivo é ajudar negócios a superar desafios e explorar oportunidades, escalando operações com precisão e eficiência. Cada uma dessas habilidades foi desenvolvida e refinada ao longo de anos de trabalho direto com empresas que buscam se destacar em mercados altamente competitivos.
              </p>
            </div>

            {/* Coluna da direita - Barras de progresso */}
            <div ref={skillsRef} className="space-y-8">
              {skills.map((skill, index) => (
                <div key={skill.name} className="group">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-tech-blue-600 dark:group-hover:text-tech-blue-400 transition-colors duration-300">
                      {skill.name}
                    </span>
                    <span className="text-xl font-bold text-tech-blue-500 bg-tech-blue-50 dark:bg-tech-blue-900/50 px-3 py-1 rounded-lg">
                      {skillsProgress[skill.name] || 0}%
                    </span>
                  </div>
                  <div className="relative">
                    <Progress
                      value={skillsProgress[skill.name] || 0}
                      className="h-4 bg-gray-200 dark:bg-tech-blue-800 rounded-full overflow-hidden"
                    />
                    {/* Efeito de brilho na barra */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
