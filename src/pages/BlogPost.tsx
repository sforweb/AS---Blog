import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Share2,
  Twitter,
  Facebook,
  Linkedin,
} from 'lucide-react';

import { useTheme } from '../contexts/ThemeContext';
import { getPostBySlug } from '@/lib/mdx';
import { getImagePath } from '@/lib/path';
import { BlogPost } from '@/types/blog';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReadingProgress from '../components/ReadingProgress';

/* -------------------------------------------------------------------------- */
/* Tipos                                                                      */
/* -------------------------------------------------------------------------- */

type RouteParams = { slug?: string };

/* -------------------------------------------------------------------------- */
/* Componente                                                                 */
/* -------------------------------------------------------------------------- */

const BlogPost: React.FC = () => {
  const { slug } = useParams<RouteParams>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  // Função para obter o caminho da imagem
  const getImageSrc = (imagePath: string | undefined) => {
    if (!imagePath) return '';
    return getImagePath(imagePath.replace(/^\//, ''));
  };
  
  // Função para obter thumbnail do Google Drive
  const thumbnailUrl = (id: string) =>
    `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
    
  // IDs das imagens da newsletter no Google Drive
  const newsletterImageLight = thumbnailUrl('18GRBiqaJ3TLxh6chfVIM9-lzfVsK3VKQ');
  const newsletterImageDark = thumbnailUrl('1d_eQl3B2zJ7aP7G992GrzHpYFr74D57x');

  /* ---------------------------------------------------------------------- */
  /* Carregar o post                                                        */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        const postData = await getPostBySlug(slug);
        if (!postData) {
          navigate('/blog');
          return;
        }
        setPost(postData);
      } catch (err) {
        console.error(err);
        navigate('/blog');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
    window.scrollTo(0, 0);
  }, [slug, navigate]);

  /* ---------------------------------------------------------------------- */
  /* Estados de carregamento e 404                                          */
  /* ---------------------------------------------------------------------- */

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#020525]">
        <Header />
        <main className="pt-28 pb-16 min-h-[50vh] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-300">
              Carregando artigo...
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#020525]">
        <Header />
        <ReadingProgress />
        <main className="pt-28 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Artigo não encontrado
            </h1>
            <Link
              to="/blog"
              className="inline-flex items-center text-[#67c9f8] hover:text-[#4ab9f7]"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  /* ---------------------------------------------------------------------- */
  /* Dados formatados                                                        */
  /* ---------------------------------------------------------------------- */

  const shareUrl = window.location.href;
  const shareText = `${post.frontmatter.title}${
    post.frontmatter.excerpt ? ` - ${post.frontmatter.excerpt}` : ''
  }`;
  const formattedDate = new Date(post.frontmatter.date).toLocaleDateString(
    'pt-BR',
    { day: '2-digit', month: 'long', year: 'numeric' },
  );

  /* ---------------------------------------------------------------------- */
  /* Render                                                                  */
  /* ---------------------------------------------------------------------- */

  return (
    <div className="min-h-screen bg-white dark:bg-[#020525]">
      <Header />
      <ReadingProgress />
      <main className="pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 mb-8 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center text-[#67c9f8] hover:text-[#4ab9f7]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao blog
          </Link>
        </div>

        {/* Artigo */}
        <article className="w-full max-w-[760px] mx-auto px-5 sm:px-4">
          {/* Cabeçalho */}
          <header className="mb-12">
            <div className="text-center mb-8 max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-lora font-bold mb-4 text-gray-900 dark:text-white">
                {post.frontmatter.title}
              </h1>
              {post.frontmatter.excerpt && (
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  {post.frontmatter.excerpt}
                </p>
              )}
            </div>

            {/* Autor e data */}
            <div className="max-w-2xl mx-auto px-5 sm:px-0">
              <div className="flex items-center justify-center space-x-6 mb-6">
                <div className="flex items-center">
                  <img
                    src={getImageSrc(post.frontmatter.authorAvatar)}
                    alt={post.frontmatter.author}
                    className="w-12 h-12 rounded-full mr-3 border-2 border-[#67c9f8]/20"
                    onError={(e) => {
                      // Fallback para imagem padrão em caso de erro
                      const target = e.target as HTMLImageElement;
                      target.src = getImagePath('images/team/foto-de-perfil.png');
                      target.style.opacity = '1';
                    }}
                  />
                  <div>
                    <p className="font-medium">{post.frontmatter.author}</p>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formattedDate}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap justify-center gap-2 mb-8 px-5 sm:px-0">
                {post.frontmatter.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#67c9f8]/10 text-[#67c9f8]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Imagem de capa */}
              {post.frontmatter.image && (
                <div className="relative mb-12 -mx-3 sm:mx-0 sm:-mx-4 md:-mx-8 lg:-mx-16">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <img
                      src={getImageSrc(post.frontmatter.image)}
                      alt={post.frontmatter.title}
                      className="w-full h-auto object-cover"
                      onError={(e) => {
                        // Fallback para imagem padrão em caso de erro
                        const target = e.target as HTMLImageElement;
                        target.src = getImagePath('images/fallback-blog-image.png');
                        target.style.opacity = '1';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                </div>
              )}
            </div>
          </header>

          {/* Conteúdo do artigo */}
          <div className="prose dark:prose-invert max-w-none px-5 sm:px-0">
            <div
              className="[&>p]:mb-6 [&>p:last-child]:mb-0"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Compartilhar */}
          <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700/50 px-5 sm:px-0">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Compartilhar artigo</h3>
              <div className="flex space-x-3">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    shareText,
                  )}&url=${encodeURIComponent(
                    shareUrl,
                  )}&via=alexandrespada`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Compartilhar no Twitter"
                  className="group p-2 bg-gray-100 rounded-full hover:bg-[#67c9f8] hover:text-white text-gray-700 dark:text-gray-200 transition-all duration-200 transform hover:scale-110 border border-gray-200 dark:border-gray-800/20 dark:bg-[#030630]/50 dark:hover:bg-[#67c9f8]"
                >
                  <Twitter className="w-5 h-5 dark:group-hover:text-[#03092a]" />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    shareUrl,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Compartilhar no Facebook"
                  className="group p-2 bg-gray-100 rounded-full hover:bg-[#67c9f8] hover:text-white text-gray-700 dark:text-gray-200 transition-all duration-200 transform hover:scale-110 border border-gray-200 dark:border-gray-800/20 dark:bg-[#030630]/50 dark:hover:bg-[#67c9f8]"
                >
                  <Facebook className="w-5 h-5 dark:group-hover:text-[#03092a]" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    shareUrl,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Compartilhar no LinkedIn"
                  className="group p-2 bg-gray-100 rounded-full hover:bg-[#67c9f8] hover:text-white text-gray-700 dark:text-gray-200 transition-all duration-200 transform hover:scale-110 border border-gray-200 dark:border-gray-800/20 dark:bg-[#030630]/50 dark:hover:bg-[#67c9f8]"
                >
                  <Linkedin className="w-5 h-5 dark:group-hover:text-[#03092a]" />
                </a>
                <button
                  type="button"
                  onClick={() => navigator.clipboard.writeText(shareUrl)}
                  aria-label="Copiar link para compartilhar"
                  className="group p-2 bg-gray-100 rounded-full hover:bg-[#67c9f8] hover:text-white text-gray-700 dark:text-gray-200 transition-all duration-200 transform hover:scale-110 border border-gray-200 dark:border-gray-800/20 dark:bg-[#030630]/50 dark:hover:bg-[#67c9f8]"
                >
                  <Share2 className="w-5 h-5 dark:group-hover:text-[#03092a]" />
                </button>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <section className="mt-16 py-16 pb-24 sm:pb-16 px-5 sm:px-0">
            <div className="bg-[#03092a] dark:bg-white rounded-2xl overflow-hidden border border-gray-700/30 dark:border-gray-200">
              <div className="flex flex-col md:flex-row items-stretch">
                {/* Texto / formulário */}
                <div className="flex-1 p-12 md:p-16">
                  <h2 className="text-2xl md:text-3xl font-bold text-white dark:text-gray-900 mb-4">
                    Receba novidades em primeira mão
                  </h2>
                  <p className="text-gray-200 dark:text-gray-700 mb-8 max-w-md">
                    Conteúdo prático sobre IA, automações e marketing.
                  </p>

                  <form
                    onSubmit={(e) => e.preventDefault()}
                    className="w-full max-w-lg"
                  >
                    <div className="flex flex-col sm:flex-row">
                      <input
                        type="email"
                        required
                        placeholder="Seu e-mail"
                        className="flex-1 px-4 py-3 rounded-lg sm:rounded-r-none border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-[#67c9f8] focus:border-transparent"
                      />
                      <button
                        type="submit"
                        className="mt-4 sm:mt-0 sm:rounded-l-none px-6 py-3 rounded-r-full bg-[#67c9f8] hover:bg-[#4ab9f7] text-white font-semibold"
                      >
                        Assinar
                      </button>
                    </div>
                  </form>
                </div>

                {/* Imagem */}
                <div className="w-full md:w-5/12 h-80 md:h-auto overflow-hidden px-6 pb-6 md:pr-8 md:pb-0 flex items-center justify-center">
                  <img
                    src={theme === 'dark' ? newsletterImageDark : newsletterImageLight}
                    alt="Newsletter"
                    className="w-full h-full max-h-80 object-contain"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.onerror = null;
                      // Se houver erro, tenta carregar a imagem alternativa
                      target.src = theme === 'dark' 
                        ? 'https://via.placeholder.com/800x600/1e3a8a/ffffff?text=Newsletter'
                        : 'https://via.placeholder.com/800x600/1e40af/ffffff?text=Newsletter';
                    }}
                  />
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;