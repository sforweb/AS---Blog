import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { 
      hasError: true, 
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  handleReload = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Se houver um fallback personalizado, renderize-o
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Renderize a UI de erro padrão
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
                <AlertCircle className="h-10 w-10 text-red-600 dark:text-red-400" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Ocorreu um erro
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Desculpe, algo deu errado. Por favor, tente recarregar a página.
            </p>
            
            <div className="flex justify-center space-x-4">
              <Button 
                onClick={this.handleReload}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Recarregar Página
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => window.history.back()}
                className="border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-200"
              >
                Voltar
              </Button>
            </div>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer mb-2">
                  Detalhes do erro (apenas em desenvolvimento)
                </summary>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md overflow-auto max-h-60">
                  <pre className="text-xs text-red-600 dark:text-red-400">
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook para usar o ErrorBoundary em componentes funcionais
export function useErrorHandler(error: Error | null, errorInfo?: ErrorInfo): void {
  React.useEffect(() => {
    if (error) {
      console.error('Error caught by useErrorHandler:', error, errorInfo);
    }
  }, [error, errorInfo]);
}

// Componente de Fallback padrão
export function ErrorFallback({ 
  error, 
  resetErrorBoundary 
}: { 
  error: Error; 
  resetErrorBoundary: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
            <AlertCircle className="h-10 w-10 text-red-600 dark:text-red-400" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Algo deu errado
        </h2>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {error.message || 'Ocorreu um erro inesperado.'}
        </p>
        
        <div className="flex justify-center space-x-4">
          <Button 
            onClick={resetErrorBoundary}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Tentar novamente
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-200"
          >
            Voltar
          </Button>
        </div>
      </div>
    </div>
  );
}
