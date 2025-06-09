import React from 'react';
import { BlogPost } from '@/types/blog';

interface BlogAuthorProps {
  post: BlogPost;
}

export function BlogAuthor({ post }: BlogAuthorProps) {
  const { frontmatter } = post;
  
  return (
    <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
      <div className="flex flex-col md:flex-row items-center">
        <img
          src={frontmatter.authorAvatar}
          alt={frontmatter.author}
          className="w-20 h-20 rounded-full border-2 border-[#67c9f8]/20 mb-4 md:mb-0 md:mr-6"
        />
        <div className="text-center md:text-left">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {frontmatter.author}
          </h3>
          {frontmatter.authorRole && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              {frontmatter.authorRole}
            </p>
          )}
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {frontmatter.authorBio || 'Escreve sobre tecnologia, marketing digital e produtividade.'}
          </p>
        </div>
      </div>
    </div>
  );
}
