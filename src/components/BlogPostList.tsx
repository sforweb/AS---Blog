import React from 'react';
import { BlogPost } from '@/types/blog';
import { BlogPostCard } from '@/components/BlogPostCard';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';
import { featuredPostsTheme } from './featured-posts-theme';

interface BlogPostListProps {
  posts: BlogPost[];
  className?: string;
  gridLayout?: 'default' | 'featured';
}

export function BlogPostList({ 
  posts, 
  className, 
  gridLayout = 'default' 
}: BlogPostListProps) {
  const { theme } = useTheme();
  
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p style={{ color: featuredPostsTheme[theme].secondaryText }}>Nenhum post encontrado.</p>
      </div>
    );
  }

  return (
    <div 
      className={cn(
        'grid gap-6',
        gridLayout === 'default' 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
        className
      )}
      style={{
        '--grid-gap': '1.5rem',
      } as React.CSSProperties}
    >
      {posts.map((post) => (
        <BlogPostCard 
          key={post.slug} 
          post={post} 
          className={gridLayout === 'featured' ? 'md:first:col-span-2 md:first:row-span-2' : ''}
        />
      ))}
    </div>
  );
}
