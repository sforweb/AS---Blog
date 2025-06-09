import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export function NotFoundHeader() {
  const navigate = useNavigate();
  
  return (
    <div className="relative h-64 md:h-80 w-full bg-gradient-to-r from-blue-600 to-blue-800 overflow-hidden">
      {/* Efeito de partículas ou padrão sutil */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')]" />
      </div>
      
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">Página não encontrada</h2>
        <p className="text-blue-100 max-w-2xl mb-8">
          Ops! Parece que você se perdeu. A página que você está procurando não existe ou foi movida.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            onClick={() => navigate(-1)} 
            className="bg-white text-blue-700 hover:bg-blue-50 transition-colors"
          >
            Voltar
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="text-white border-white hover:bg-white/10 transition-colors"
          >
            Página inicial
          </Button>
        </div>
      </div>
    </div>
  );
}
