
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isThemeResolved: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark'); // Definir dark como padrão inicial
  const [isThemeResolved, setIsThemeResolved] = useState(false);

  // Efeito para carregar o tema salvo
  useEffect(() => {
    // Verificar o tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    // Verificar a preferência do sistema
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Se não houver tema salvo, usar a preferência do sistema
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    // Aplicar o tema imediatamente para evitar flash
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Atualizar o estado
    setTheme(initialTheme);
    setIsThemeResolved(true);
  }, []);

  // Efeito para salvar o tema quando ele mudar
  useEffect(() => {
    if (!isThemeResolved) return; // Não fazer nada no primeiro render
    
    localStorage.setItem('theme', theme);
    
    // Adicionar/remover a classe dark no documento
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme, isThemeResolved]);

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isThemeResolved }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
