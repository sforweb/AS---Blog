import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useScrollToTop } from '@/hooks/useScrollToTop';

interface ScrollToTopButtonProps {
  className?: string;
  showAt?: number;
  offset?: number;
}

export function ScrollToTopButton({ 
  className = '',
  showAt = 300,
  offset = 24
}: ScrollToTopButtonProps) {
  const { isVisible, scrollToTop } = useScrollToTop(showAt);
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleScroll = () => {
      setIsScrolling(true);
      
      // Limpa o timeout anterior se existir
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      // Define um novo timeout
      timeoutId = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);
  
  // Não renderiza se não estiver visível
  if (!isVisible) {
    return null;
  }
  
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={scrollToTop}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'fixed z-50 rounded-full shadow-lg transition-all duration-300',
        'bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm',
        'hover:bg-white dark:hover:bg-gray-700',
        'border-gray-200 dark:border-gray-600',
        'group',
        isScrolling ? 'opacity-70' : 'opacity-100',
        isHovered ? 'scale-110' : 'scale-100',
        className
      )}
      style={{
        right: `${offset}px`,
        bottom: `${offset}px`,
        transform: `translateY(${isHovered ? '-5px' : '0'})`,
      }}
      aria-label="Voltar ao topo"
    >
      <ArrowUp className={cn(
        'h-5 w-5 transition-transform',
        isHovered ? '-translate-y-0.5' : 'translate-y-0'
      )} />
    </Button>
  );
}
