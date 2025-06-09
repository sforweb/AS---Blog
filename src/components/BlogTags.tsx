import React from 'react';
import { Tag as TagIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlogTagsProps {
  tags: string[];
  className?: string;
  tagClassName?: string;
}

export function BlogTags({ 
  tags, 
  className = '',
  tagClassName = '' 
}: BlogTagsProps) {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className={cn('pt-8 border-t border-gray-200 dark:border-gray-700/30', className)}>
      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-4">
        <TagIcon className="w-4 h-4 mr-2 flex-shrink-0" />
        <span className="font-medium">Tags:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <a
            key={tag}
            href={`/blog?tag=${encodeURIComponent(tag.toLowerCase())}`}
            className={cn(
              'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
              'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200',
              'hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
              'dark:focus:ring-offset-gray-900',
              tagClassName
            )}
            aria-label={`Ver mais posts sobre ${tag}`}
          >
            {tag}
          </a>
        ))}
      </div>
    </div>
  );
}
