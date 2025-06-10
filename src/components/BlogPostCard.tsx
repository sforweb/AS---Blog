import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { BlogPost } from '@/types/blog';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';
import { featuredPostsTheme } from './featured-posts-theme';
import { getImagePath } from '@/lib/path';

interface BlogPostCardProps {
  post: BlogPost;
  className?: string;
}

export function BlogPostCard({ post, className }: BlogPostCardProps) {
  const { theme } = useTheme();
  
  // Log para depuração
  React.useEffect(() => {
    console.log('Renderizando BlogPostCard:', {
      slug: post.slug,
      title: post.frontmatter.title,
      date: post.frontmatter.date,
      image: post.frontmatter.image,
      category: post.frontmatter.category,
      excerpt: post.frontmatter.excerpt,
      author: post.frontmatter.author,
      authorAvatar: post.frontmatter.authorAvatar
    });
  }, [post]);
  
  // Função para obter o caminho da imagem
  const getPostImage = (imagePath: string | undefined) => {
    if (!imagePath) return '';
    return getImagePath(imagePath.replace(/^\//, ''));
  };
  
  // Formatar a data no formato 'MMM d, yyyy' (ex: Mar 11, 2024)
  const formattedDate = new Date(post.frontmatter.date).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className={cn('group relative', className)}>
      <Link
        to={`/post/${post.slug}`}
        className="relative z-10 block h-full backdrop-blur-lg rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2"
        style={{
          backgroundColor: featuredPostsTheme[theme].card,
          border: `1px solid ${featuredPostsTheme[theme].border}`
        }}
      >
        {/* Imagem do post */}
        <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-800">
          {post.frontmatter.image ? (
            <img
              src={getPostImage(post.frontmatter.image)}
              alt={`Imagem de capa para o post: ${post.frontmatter.title}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
              onError={(e) => {
                // Fallback para uma imagem padrão em caso de erro
                const target = e.target as HTMLImageElement;
                target.src = getImagePath('images/placeholder-blog.jpg');
                target.style.opacity = '1';
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#67c9f8] to-[#4ab9f7]">
              <span className="text-white text-2xl font-bold">{post.frontmatter.title.charAt(0)}</span>
            </div>
          )}
          
          {/* Categoria */}
          <div className="absolute top-4 left-4">
            <span className="inline-block px-3 py-1 bg-gradient-to-r from-[#67c9f8] to-[#4ab9f7] text-white text-sm font-medium rounded-full">
              {post.frontmatter.category}
            </span>
          </div>
          
          {/* Efeito de hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#67c9f8]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Conteúdo do card */}
        <div className="p-6">
          {/* Data */}
          <div className="flex items-center text-sm mb-3" style={{ color: featuredPostsTheme[theme].secondaryText }}>
            <Clock className="w-4 h-4 mr-1" />
            <span>{formattedDate}</span>
          </div>

          {/* Título */}
          <h3 
            className="text-xl font-lora font-semibold mb-3 line-clamp-2 transition-colors duration-200"
            style={{ 
              color: featuredPostsTheme[theme].text,
              // Adiciona o hover diretamente no estilo para garantir que funcione
              '--hover-color': '#67c9f8',
              '--transition-duration': '200ms'
            } as React.CSSProperties}
            onMouseOver={(e) => (e.currentTarget.style.color = '#67c9f8')}
            onMouseOut={(e) => (e.currentTarget.style.color = featuredPostsTheme[theme].text)}
          >
            {post.frontmatter.title}
          </h3>

          {/* Resumo */}
          <p className="mb-4 line-clamp-3" style={{ color: featuredPostsTheme[theme].secondaryText }}>
            {post.frontmatter.excerpt}
          </p>

          {/* Autor */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {post.frontmatter.authorAvatar ? (
                <img
                  src={getImagePath(post.frontmatter.authorAvatar.replace(/^\//, ''))}
                  alt={`Foto de ${post.frontmatter.author}`}
                  className="w-8 h-8 rounded-full mr-3 border-2 border-[#67c9f8]/20"
                  onError={(e) => {
                    // Fallback para imagem padrão em caso de erro
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/team/foto-de-perfil.png';
                    
                    // Cria um fallback com as iniciais do autor
                    const parent = target.parentElement;
                    if (parent) {
                      const fallback = document.createElement('div');
                      fallback.className = 'w-8 h-8 rounded-full mr-3 border-2 border-[#67c9f8]/20 bg-[#67c9f8] flex items-center justify-center';
                      fallback.textContent = post.frontmatter.author ? post.frontmatter.author.charAt(0).toUpperCase() : 'A';
                      parent.insertBefore(fallback, target);
                      target.style.display = 'none';
                    }
                  }}
                />
              ) : (
                <div className="w-8 h-8 rounded-full mr-3 border-2 border-[#67c9f8]/20 bg-[#67c9f8] flex items-center justify-center text-white text-sm font-medium">
                  {post.frontmatter.author ? post.frontmatter.author.charAt(0).toUpperCase() : 'A'}
                </div>
              )}
              <span 
                className="text-sm font-medium transition-colors"
                style={{ color: featuredPostsTheme[theme].text }}
              >
                {post.frontmatter.author || 'Autor'}
              </span>
            </div>
            <span 
              className="text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: '#67c9f8' }}
            >
              Ler mais →
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
