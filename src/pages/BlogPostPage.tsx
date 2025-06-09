import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tag } from 'lucide-react';

import { BlogPost } from '@/types/blog';
import { MarkdownContent } from '@/components/MarkdownContent';
import { Button } from '@/components/ui/button';
import { useSectionStyle } from '@/hooks/use-section-style';
import { getPostBySlug } from '@/lib/mdx';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { BlogPostSkeleton } from '@/components/BlogPostSkeleton';
import { BlogPostHeader } from '@/components/BlogPostHeader';
import { BlogAuthor } from '@/components/BlogAuthor';
import { RelatedPosts } from '@/components/RelatedPosts';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { posts, loading: loadingPosts } = useBlogPosts();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Carregar o post
  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        if (slug) {
          // Aguarda a resolução da promessa
          const postData = await getPostBySlug(slug);
          
          if (!postData) {
            console.error(`Post com slug "${slug}" não encontrado`);
            navigate('/blog'); // Redireciona para a lista de posts se não encontrar
            return;
          }
          
          setPost(postData);
        }
      } catch (error) {
        console.error('Erro ao carregar o post:', error);
        navigate('/blog'); // Redireciona em caso de erro
      } finally {
        setLoading(false);
      }
    };
    
    loadPost();
  }, [slug, navigate]);
  
  // Rola para o topo da página ao carregar
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  
  // Função para compartilhar o post
  const handleShare = useCallback(async () => {
    if (!post) return;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: post.frontmatter.title,
          text: post.frontmatter.excerpt,
          url: window.location.href,
        });
      } else {
        // Fallback para copiar o link
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copiado para a área de transferência!');
      }
    } catch (error) {
      console.error('Erro ao compartilhar:', error);
    }
  }, [post]);
  
  // Função para voltar
  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);
  
  // Exibir esqueleto enquanto carrega
  if (loading || loadingPosts) {
    return <BlogPostSkeleton />;
  }
  
  // Se o post não for encontrado
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-tech-blue-950">
        <div className="text-center p-8 max-w-2xl">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Post não encontrado
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            O post que você está procurando não existe ou foi removido.
          </p>
          <Button onClick={() => navigate('/blog')}>
            ← Voltar para o Blog
          </Button>
        </div>
      </div>
    );
  }
  
  const { content } = post;
  
  // Seção B (não sobreposta)
  const { containerClasses, backgroundStyle } = useSectionStyle({
    type: 'b',
    isOverlapping: false,
  });
  
  return (
    <div className="min-h-screen bg-white dark:bg-tech-blue-950">
      {/* Cabeçalho do Post */}
      <BlogPostHeader 
        post={post} 
        onBack={handleBack} 
        onShare={handleShare} 
      />
      
      {/* Conteúdo do Post */}
      <div className={containerClasses} style={backgroundStyle}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <article className="prose dark:prose-invert max-w-none">
            <MarkdownContent content={content} />
          </article>
          
          {/* Tags */}
          {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700/30">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-4">
                <Tag className="w-4 h-4 mr-2" />
                <span className="font-medium">Tags:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Autor */}
          <BlogAuthor post={post} />
          
          {/* Posts Relacionados */}
          <RelatedPosts 
            posts={posts} 
            currentPostSlug={post.slug} 
          />
          
          {/* Botão flutuante de voltar ao topo */}
          <ScrollToTopButton />
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
