import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { useSectionStyle } from '@/hooks/use-section-style';
import { useTheme } from '../contexts/ThemeContext';
import { featuredPostsTheme } from './featured-posts-theme';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { getImagePath } from '@/lib/path';

const FeaturedPosts: React.FC = () => {
  const { featuredPosts, loading } = useBlogPosts(3);
  const { theme } = useTheme();

  const hasPosts = featuredPosts && featuredPosts.length > 0;
  
  // Função para obter o caminho da imagem
  const getImageSrc = (imagePath: string | undefined) => {
    if (!imagePath) return getImagePath('images/fallback-blog-image.jpg');
    return getImagePath(imagePath.replace(/^\//, ''));
  };

  /* estilo da seção (tipo B) */
  const { containerClasses, backgroundStyle } = useSectionStyle({
    type: 'b',
    isOverlapping: false,
  });

  return (
    <div
      className={containerClasses}
      style={{
        ...backgroundStyle,
        backgroundColor: featuredPostsTheme[theme].background,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Título */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-inter text-gray-900 dark:text-white mb-4">
            <span className="font-light">Novidades do </span>
            <span className="font-bold text-[#65c7f8]">Blog</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore conteúdos estratégicos sobre IA, automação, marketing e inovação produzidos para quem quer transformar conhecimento em resultado.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            /* Skeletons */
            Array(3)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="relative group animate-pulse">
                  <div
                    className="relative z-10 block h-full rounded-2xl overflow-hidden transition-transform duration-300 border dark:border-gray-700/30"
                    style={{
                      backgroundColor: featuredPostsTheme[theme].card,
                      borderColor:
                        theme === 'dark' ? 'rgba(55,65,81,0.3)' : 'transparent',
                    }}
                  >
                    <div className="h-48 bg-gray-200 dark:bg-gray-700" />
                    <div className="p-6">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4" />
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-4" />
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 mr-3" />
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16" />
                      </div>
                    </div>
                  </div>
                </div>
              ))
          ) : hasPosts ? (
            featuredPosts.map((post) => (
              <div key={post.slug} className="relative group">
                <Link
                  to={`/post/${post.slug}`}
                  className="relative z-10 block h-full rounded-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-2 border dark:border-gray-700/30 shadow-none"
                  style={{
                    backgroundColor: featuredPostsTheme[theme].card,
                    borderColor:
                      theme === 'dark' ? 'rgba(55,65,81,0.3)' : 'transparent',
                  }}
                >
                  {/* Imagem */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={getImageSrc(post.frontmatter.image)}
                      alt={post.frontmatter.title}
                      className="w-full h-48 object-cover rounded-t-2xl"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = getImagePath('images/fallback-blog-image.jpg');
                        target.style.opacity = '1';
                      }}
                    />
                    {!post.frontmatter.image && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#67c9f8] to-[#4ab9f7]">
                        <span className="text-white text-4xl font-bold">
                          {post.frontmatter.title ? post.frontmatter.title.charAt(0).toUpperCase() : 'P'}
                        </span>
                      </div>
                    )}
                    {post.frontmatter.category && (
                      <div className="absolute top-4 left-4">
                        <span className="inline-block px-3 py-1 bg-gradient-to-r from-[#67c9f8] to-[#4ab9f7] text-white text-sm font-medium rounded-full">
                          {post.frontmatter.category}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#67c9f8]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Conteúdo */}
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <Clock className="w-4 h-4 mr-1" />
                      {new Date(post.frontmatter.date).toLocaleDateString(
                        'pt-BR',
                        { day: '2-digit', month: 'long', year: 'numeric' },
                      )}
                    </div>

                    <h3 
                      className="text-xl font-lora font-semibold mb-3 line-clamp-2 transition-colors duration-200"
                      style={{ 
                        color: featuredPostsTheme[theme].text,
                        '--hover-color': '#67c9f8',
                        '--transition-duration': '200ms'
                      } as React.CSSProperties}
                      onMouseOver={(e) => (e.currentTarget.style.color = '#67c9f8')}
                      onMouseOut={(e) => (e.currentTarget.style.color = featuredPostsTheme[theme].text)}
                    >
                      {post.frontmatter.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {post.frontmatter.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          src={
                            post.frontmatter.authorAvatar 
                              ? getImagePath(post.frontmatter.authorAvatar.replace(/^\//, ''))
                              : getImagePath('team/placeholder-avatar.jpg')
                          }
                          alt={post.frontmatter.author}
                          className="w-8 h-8 rounded-full mr-3 border-2 border-[#67c9f8]/20 object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = getImagePath('team/placeholder-avatar.jpg');
                            
                            // Cria um fallback com as iniciais do autor
                            const parent = target.parentElement;
                            if (parent) {
                              const fallback = document.createElement('div');
                              fallback.className = 'w-8 h-8 rounded-full mr-3 border-2 border-[#67c9f8]/20 bg-[#67c9f8] flex items-center justify-center text-white text-xs font-medium';
                              fallback.textContent = post.frontmatter.author ? post.frontmatter.author.charAt(0).toUpperCase() : 'A';
                              parent.insertBefore(fallback, target);
                              target.style.display = 'none';
                            }
                          }}
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                          {post.frontmatter.author}
                        </span>
                      </div>

                      <span className="text-[#67c9f8] hover:text-[#4ab9f7] text-sm font-medium transition-colors">
                        Ler mais →
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            /* Nenhum post */
            <div className="col-span-3 text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                Nenhum post em destaque encontrado.
              </p>
            </div>
          )}
        </div>

        {/* Botão: mais artigos */}
        <div className="mt-16 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center justify-center bg-gradient-to-r from-[#67c9f8] to-[#4ab9f7] text-white font-semibold py-3 px-8 rounded-full hover:opacity-90 transition-all duration-200 hover:shadow-xl hover:shadow-[#67c9f8]/25 transform hover:scale-105 relative overflow-hidden group h-14"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative z-10">Acessar mais artigos</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPosts;