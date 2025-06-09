
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, User } from 'lucide-react';
import { getFeaturedPosts } from '../data/blogPosts';

const FeaturedPosts = () => {
  const featuredPosts = getFeaturedPosts();

  return (
    <section className="py-20 bg-gray-50 dark:bg-tech-blue-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-lora font-bold text-gray-900 dark:text-white mb-4">
            Posts em Destaque
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Descobertas recentes e histórias inspiradoras de nossa comunidade de exploradores
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post, index) => (
            <Link 
              key={post.id}
              to={`/post/${post.slug}`}
              className="group bg-white dark:bg-tech-blue-900/50 dark:backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl dark:hover:shadow-tech-blue-500/10 transition-all duration-300 transform hover:-translate-y-2 dark:border dark:border-tech-blue-800/50 block"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 bg-tech-blue-900/80 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-tech-blue-500/30">
                    {post.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-tech-blue-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3 space-x-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.date}
                  </div>
                </div>

                <h3 className="text-xl font-lora font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-tech-blue-500 transition-colors duration-200">
                  {post.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full mr-3 border-2 border-tech-blue-500/20"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                      {post.author.name}
                    </span>
                  </div>

                  <span className="text-tech-blue-500 hover:text-tech-blue-600 dark:hover:text-tech-blue-400 font-medium text-sm transition-colors duration-200">
                    Ler mais →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
