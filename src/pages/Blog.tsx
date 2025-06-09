import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useSectionStyle } from '@/hooks/use-section-style';
import { useTheme } from '@/contexts/ThemeContext';
import { featuredPostsTheme } from '@/components/featured-posts-theme';
import BlogHero from '@/components/BlogHero';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BlogPostList } from '@/components/BlogPostList';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

// Componente de loading para os cards
const BlogPostCardSkeleton = () => {
  const { theme } = useTheme();
  
  return (
    <div className="relative group h-full">
      <div 
        className="relative z-10 block h-full backdrop-blur-lg rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2"
        style={{
          backgroundColor: featuredPostsTheme[theme].card,
          border: `1px solid ${featuredPostsTheme[theme].border}`,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        }}
      >
        <div className="relative h-64 overflow-hidden" style={{ backgroundColor: featuredPostsTheme[theme].secondaryText, opacity: 0.1 }} />
        <div className="p-6">
          <div className="flex items-center mb-3">
            <Skeleton className="h-4 w-4 mr-2" style={{ backgroundColor: featuredPostsTheme[theme].secondaryText, opacity: 0.3 }} />
            <Skeleton className="h-4 w-24" style={{ backgroundColor: featuredPostsTheme[theme].secondaryText, opacity: 0.3 }} />
          </div>
          <Skeleton 
            className="h-6 w-full mb-3" 
            style={{ backgroundColor: featuredPostsTheme[theme].text, opacity: 0.1 }} 
          />
          <Skeleton 
            className="h-4 w-full mb-2" 
            style={{ backgroundColor: featuredPostsTheme[theme].secondaryText, opacity: 0.1 }} 
          />
          <Skeleton 
            className="h-4 w-4/5 mb-6" 
            style={{ backgroundColor: featuredPostsTheme[theme].secondaryText, opacity: 0.1 }} 
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Skeleton 
                className="w-8 h-8 rounded-full mr-3" 
                style={{ backgroundColor: featuredPostsTheme[theme].secondaryText, opacity: 0.2 }} 
              />
              <Skeleton 
                className="h-4 w-24" 
                style={{ backgroundColor: featuredPostsTheme[theme].secondaryText, opacity: 0.2 }} 
              />
            </div>
            <Skeleton 
              className="h-4 w-16" 
              style={{ backgroundColor: '#67c9f8', opacity: 0.3 }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Número de posts por página
const POSTS_PER_PAGE = 21;

const Blog: React.FC = () => {
  const { 
    posts, 
    loading, 
    error, 
    currentPage, 
    totalPages, 
    setCurrentPage 
  } = useBlogPosts(POSTS_PER_PAGE);
  
  const { theme } = useTheme();

  // Rola para o topo da página ao carregar e ao mudar de página
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Adiciona uma animação suave ao rolar
    });
  }, [currentPage]);

  // Seção B (não sobreposta)
  const { containerClasses, backgroundStyle } = useSectionStyle({
    type: 'b',
    isOverlapping: false,
  });

  // Gerar botões de paginação
  const paginationButtons = useMemo(() => {
    const buttons = [];
    const maxVisiblePages = 5; // Número máximo de botões de página visíveis
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Ajusta o início se estivermos perto do final
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    // Botão para a primeira página
    if (startPage > 1) {
      buttons.push(
        <button
          key="first"
          onClick={() => setCurrentPage(1)}
          className="flex items-center justify-center h-8 w-8 rounded-md transition-colors hover:bg-opacity-10 hover:bg-white"
          style={{
            border: `1px solid ${featuredPostsTheme[theme].border}`,
            backgroundColor: 'transparent',
            color: featuredPostsTheme[theme].text,
            opacity: currentPage === 1 ? 0.5 : 1,
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          }}
          disabled={currentPage === 1}
          aria-label="Primeira página"
        >
          <ChevronsLeft className="h-4 w-4" />
        </button>
      );
    }
    
    // Botão para a página anterior
    buttons.push(
      <button
        key="prev"
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="flex items-center justify-center h-8 w-8 rounded-md transition-colors hover:bg-opacity-10 hover:bg-white"
        style={{
          border: `1px solid ${featuredPostsTheme[theme].border}`,
          backgroundColor: 'transparent',
          color: featuredPostsTheme[theme].text,
          opacity: currentPage === 1 ? 0.5 : 1,
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
        }}
        aria-label="Página anterior"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
    );
    
    // Botões de página
    for (let i = startPage; i <= endPage; i++) {
      const isActive = i === currentPage;
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          data-active={isActive}
          className={`flex items-center justify-center h-8 w-8 rounded-md transition-colors
            ${isActive 
              ? 'bg-[#67c9f8] text-white hover:bg-[#4ab9f7]' 
              : 'hover:bg-opacity-10 hover:bg-white'}`}
          style={{
            border: `1px solid ${isActive ? 'transparent' : featuredPostsTheme[theme].border}`,
            backgroundColor: isActive ? '#67c9f8' : 'transparent',
            color: isActive ? 'white' : featuredPostsTheme[theme].text,
          }}
        >
          {i}
        </button>
      );
    }
    
    // Botão para a próxima página
    const isLastPage = currentPage >= totalPages;
    buttons.push(
      <button
        key="next"
        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
        disabled={isLastPage}
        className="flex items-center justify-center h-8 w-8 rounded-md transition-colors hover:bg-opacity-10 hover:bg-white"
        style={{
          border: `1px solid ${featuredPostsTheme[theme].border}`,
          backgroundColor: 'transparent',
          color: featuredPostsTheme[theme].text,
          opacity: isLastPage ? 0.5 : 1,
          cursor: isLastPage ? 'not-allowed' : 'pointer',
        }}
        aria-label="Próxima página"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    );
    
    // Botão para a última página
    if (endPage < totalPages) {
      buttons.push(
        <button
          key="last"
          onClick={() => setCurrentPage(totalPages)}
          className="flex items-center justify-center h-8 w-8 rounded-md transition-colors hover:bg-opacity-10 hover:bg-white"
          style={{
            border: `1px solid ${featuredPostsTheme[theme].border}`,
            backgroundColor: 'transparent',
            color: featuredPostsTheme[theme].text,
            opacity: isLastPage ? 0.5 : 1,
            cursor: isLastPage ? 'not-allowed' : 'pointer',
          }}
          disabled={isLastPage}
          aria-label="Última página"
        >
          <ChevronsRight className="h-4 w-4" />
        </button>
      );
    }
    
    return buttons;
  }, [currentPage, totalPages, setCurrentPage]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: featuredPostsTheme[theme].background }}>
      <Header />
      <main>
        <BlogHero />
        
        {/* Lista de Posts */}
        <div
          className={containerClasses}
          style={{
            ...backgroundStyle,
            backgroundColor: 'transparent', // Removendo o fundo duplicado
            paddingTop: '2rem', // Ajuste de espaçamento
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
            {/* Indicador de carregamento sutil no topo da página */}
            {loading && (
              <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#67c9f8] to-[#4ab9f7] z-50">
                <div className="h-full bg-white/30 animate-pulse"></div>
              </div>
            )}
            
            {error ? (
              <div className="text-center py-12">
                <p className="text-red-500 text-lg">Erro ao carregar os posts.</p>
                <p className="mt-2" style={{ color: featuredPostsTheme[theme].secondaryText }}>Por favor, tente novamente mais tarde.</p>
                <Button
                  onClick={() => window.location.reload()}
                  className="mt-4 bg-[#67c9f8] text-white hover:bg-[#4ab9f7]"
                >
                  Tentar novamente
                </Button>
              </div>
            ) : loading ? (
              // Estado de carregamento
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <BlogPostCardSkeleton key={`skeleton-${i}`} />
                ))}
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-12">
                <p style={{ color: featuredPostsTheme[theme].secondaryText }}>Nenhum post encontrado.</p>
              </div>
            ) : (
              // Conteúdo carregado
              <>
                <div className="flex justify-between items-center mb-8">
                  <h2 
                    className="text-2xl font-bold"
                    style={{ color: featuredPostsTheme[theme].text }}
                  >
                    Últimos Artigos
                  </h2>
                  <div 
                    className="text-sm"
                    style={{ color: featuredPostsTheme[theme].secondaryText }}
                  >
                    Página {currentPage} de {totalPages}
                  </div>
                </div>
                
                <BlogPostList 
                  posts={posts} 
                  className="mb-8"
                />
                
                {/* Controles de paginação */}
                {totalPages > 1 && (
                  <div className="mt-12 flex justify-center gap-2 flex-wrap">
                    {paginationButtons.map((button, index) => (
                      <div 
                        key={index} 
                        className={`pagination-button ${button.props['data-active'] ? 'active' : ''}`}
                        style={{
                          padding: '0.25rem',
                        }}
                      >
                        {React.cloneElement(button, {
                          style: {
                            height: '2rem',
                            width: '2rem',
                            minWidth: '2rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '0.375rem',
                            border: `1px solid ${featuredPostsTheme[theme].border}`,
                            backgroundColor: button.props['data-active'] 
                              ? '#67c9f8' 
                              : featuredPostsTheme[theme].card,
                            color: button.props['data-active'] 
                              ? 'white' 
                              : featuredPostsTheme[theme].text,
                            transition: 'all 0.2s ease-in-out',
                            cursor: 'pointer',
                            opacity: button.props.disabled ? 0.5 : 1,
                            pointerEvents: button.props.disabled ? 'none' : 'auto',
                          },
                          className: `hover:opacity-80 ${button.props.className || ''}`,
                        })}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
