import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export function BlogPostSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Cabeçalho */}
      <div className="h-64 md:h-96 w-full bg-gray-200 dark:bg-gray-800" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Botão Voltar */}
        <div className="mb-8">
          <Skeleton className="h-10 w-24" />
        </div>
        
        {/* Categoria */}
        <div className="mb-6">
          <Skeleton className="h-6 w-32" />
        </div>
        
        {/* Título */}
        <div className="mb-6">
          <Skeleton className="h-12 w-full max-w-3xl" />
          <Skeleton className="h-12 w-full max-w-2xl mt-2" />
        </div>
        
        {/* Metadados */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="flex items-center">
            <Skeleton className="h-8 w-8 rounded-full mr-2" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
        </div>
        
        {/* Conteúdo */}
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-3/4 mt-8" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/5 mt-8" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        
        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <Skeleton className="h-4 w-16 mb-4" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
          </div>
        </div>
        
        {/* Autor */}
        <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
          <div className="flex items-center">
            <Skeleton className="h-20 w-20 rounded-full mr-6" />
            <div className="flex-1">
              <Skeleton className="h-5 w-32 mb-2" />
              <Skeleton className="h-4 w-24 mb-3" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
        
        {/* Posts Relacionados */}
        <div className="mt-16">
          <Skeleton className="h-8 w-48 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/5" />
                <div className="flex items-center justify-between pt-4">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
