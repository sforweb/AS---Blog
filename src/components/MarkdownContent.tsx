import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  return (
    <article className={cn('prose dark:prose-invert max-w-none', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={oneDark}
                language={match[1]}
                PreTag="div"
                className="rounded-lg"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          img: ({ node, ...props }) => (
            <div className="my-6 rounded-lg overflow-hidden">
              <img
                {...props}
                alt={props.alt || ''}
                className="w-full h-auto rounded-lg"
                loading="lazy"
              />
              {props.alt && (
                <p className="text-center text-sm text-gray-500 mt-2">
                  {props.alt}
                </p>
              )}
            </div>
          ),
          a: ({ node, ...props }) => (
            <a
              {...props}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#67c9f8] hover:underline"
            />
          ),
          h2: ({ node, ...props }) => (
            <h2
              {...props}
              className="text-2xl font-bold mt-10 mb-4 text-gray-900 dark:text-white"
            />
          ),
          h3: ({ node, ...props }) => (
            <h3
              {...props}
              className="text-xl font-semibold mt-8 mb-3 text-gray-900 dark:text-white"
            />
          ),
          p: ({ node, ...props }) => (
            <p {...props} className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed" />
          ),
          ul: ({ node, ...props }) => (
            <ul
              {...props}
              className="list-disc pl-6 mb-6 space-y-2 text-gray-700 dark:text-gray-300"
            />
          ),
          ol: ({ node, ...props }) => (
            <ol
              {...props}
              className="list-decimal pl-6 mb-6 space-y-2 text-gray-700 dark:text-gray-300"
            />
          ),
          li: ({ node, ...props }) => (
            <li {...props} className="mb-1 pl-2" />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote
              {...props}
              className="border-l-4 border-[#67c9f8] pl-4 italic my-6 text-gray-600 dark:text-gray-400"
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
