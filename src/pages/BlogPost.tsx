import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, Share2, Twitter, Facebook, Linkedin } from 'lucide-react';
import { getPostBySlug } from '../data/blogPosts';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReadingProgress from '../components/ReadingProgress';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : null;

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!post) {
    return (
      <div className="min-h-screen bg-white dark:bg-tech-blue-950">
        <Header />
        <ReadingProgress />
        <main className="pt-20 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Artigo não encontrado
            </h1>
            <Link
              to="/"
              className="inline-flex items-center text-tech-blue-500 hover:text-tech-blue-600 dark:hover:text-tech-blue-400"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao início
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const shareUrl = window.location.href;
  const shareText = `${post.title} - ${post.subtitle}`;

  return (
    <div className="min-h-screen bg-white dark:bg-tech-blue-950">
      <Header />
      <ReadingProgress />
      <main className="pt-20 pb-16">
        {/* Back Navigation - Centralizado */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center text-tech-blue-500 hover:text-tech-blue-600 dark:hover:text-tech-blue-400 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao início
          </Link>
        </div>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-12">
            {/* Title and Subtitle */}
            <div className="max-w-2xl mx-auto text-center mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-lora font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                {post.title}
              </h1>
              {post.subtitle && (
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  {post.subtitle}
                </p>
              )}
            </div>

            {/* Author and Meta Info */}
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-6 mb-6">
                <div className="flex items-center">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-12 h-12 rounded-full mr-3 border-2 border-tech-blue-500/20"
                  />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {post.author.name}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4 mr-1" />
                      {post.date}
                    </div>
                  </div>
                </div>
              </div>

              {/* Category and Tags */}
              <div className="flex justify-center mb-8">
                <span className="inline-flex items-center px-4 py-2 bg-tech-blue-500/10 dark:bg-tech-blue-500/20 text-tech-blue-600 dark:text-tech-blue-400 rounded-full text-sm font-medium border border-tech-blue-500/20">
                  <Tag className="w-4 h-4 mr-2" />
                  {post.category}
                </span>
              </div>
            </div>

            {/* Cover Image */}
            <div className="relative overflow-hidden rounded-2xl shadow-2xl mb-12">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </header>

          {/* Article Content */}
          <div className="max-w-2xl mx-auto">
            <div className="prose prose-lg dark:prose-invert prose-gray dark:prose-tech-blue max-w-none text-left">
              {post.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-2xl md:text-3xl font-lora font-bold text-gray-900 dark:text-white mt-12 mb-6 leading-tight">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return (
                    <blockquote key={index} className="border-l-4 border-tech-blue-500 pl-6 italic text-lg text-gray-700 dark:text-gray-300 my-8 bg-gray-50 dark:bg-tech-blue-900/20 py-4 rounded-r-lg">
                      {paragraph.replace(/\*\*/g, '')}
                    </blockquote>
                  );
                }
                return (
                  <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-base md:text-lg">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Share Buttons */}
            <div className="mt-16 pt-8 border-t border-gray-200 dark:border-tech-blue-800/50">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Compartilhar artigo
                </h3>
                <div className="flex space-x-3">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 dark:bg-tech-blue-800/50 rounded-lg hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white transition-all duration-200 text-gray-600 dark:text-gray-400"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 dark:bg-tech-blue-800/50 rounded-lg hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all duration-200 text-gray-600 dark:text-gray-400"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 dark:bg-tech-blue-800/50 rounded-lg hover:bg-blue-700 hover:text-white dark:hover:bg-blue-700 dark:hover:text-white transition-all duration-200 text-gray-600 dark:text-gray-400"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <button className="p-2 bg-gray-100 dark:bg-tech-blue-800/50 rounded-lg hover:bg-tech-blue-500 hover:text-white dark:hover:bg-tech-blue-500 dark:hover:text-white transition-all duration-200 text-gray-600 dark:text-gray-400">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-16 p-8 bg-gradient-to-r from-tech-blue-50 to-tech-blue-100 dark:from-tech-blue-900/30 dark:to-tech-blue-800/30 rounded-2xl border border-tech-blue-200 dark:border-tech-blue-700/50">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Gostou do conteúdo?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Inscreva-se para receber novidades e artigos exclusivos diretamente no seu e-mail.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Seu melhor e-mail"
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-tech-blue-600 bg-white dark:bg-tech-blue-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-tech-blue-500"
                  />
                  <button className="px-6 py-3 bg-tech-blue-500 hover:bg-tech-blue-600 text-white font-medium rounded-lg transition-colors duration-200">
                    Inscrever-se
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
