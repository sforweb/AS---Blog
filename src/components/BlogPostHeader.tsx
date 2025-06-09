import React from 'react';
import { ArrowLeft, Clock, Calendar, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/date-utils';
import { BlogPost } from '@/types/blog';

interface BlogPostHeaderProps {
  post: BlogPost;
  onBack: () => void;
  onShare: () => void;
}

export function BlogPostHeader({ post, onBack, onShare }: BlogPostHeaderProps) {
  const { frontmatter } = post;
  const formattedDate = formatDate(frontmatter.date);
  
  return (
    <div className="relative">
      {/* Imagem de capa */}
      <div className="h-64 md:h-96 w-full overflow-hidden">
        <img
          src={frontmatter.image}
          alt={frontmatter.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70" />
      </div>
      
      {/* Conteúdo do cabeçalho */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-6 text-white hover:bg-white/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          
          {/* Categoria */}
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-gradient-to-r from-[#67c9f8] to-[#4ab9f7] text-white text-sm font-medium rounded-full">
              {frontmatter.category}
            </span>
          </div>
          
          {/* Título */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {frontmatter.title}
          </h1>
          
          {/* Metadados */}
          <div className="flex flex-wrap items-center text-sm text-gray-200 gap-4">
            <div className="flex items-center">
              <img
                src={frontmatter.authorAvatar}
                alt={frontmatter.author}
                className="w-8 h-8 rounded-full mr-2 border-2 border-white/20"
              />
              <span>{frontmatter.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{frontmatter.readTime || '3 min de leitura'}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto text-white hover:bg-white/10"
              onClick={onShare}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Compartilhar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
