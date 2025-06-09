import React from 'react';
import { BlogPost } from '@/types/blog';
import { BlogPostCard } from '@/components/BlogPostCard';

interface RelatedPostsProps {
  posts: BlogPost[];
  currentPostSlug: string;
}

export function RelatedPosts({ posts, currentPostSlug }: RelatedPostsProps) {
  // Filtrar posts relacionados (excluindo o post atual)
  const relatedPosts = posts.filter(post => post.slug !== currentPostSlug).slice(0, 3);
  
  if (relatedPosts.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
        Leia também
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
