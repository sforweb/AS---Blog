import { useEffect, useState, useCallback } from 'react';
import { BlogPost } from '@/types/blog';

interface UseBlogPostsReturn {
  posts: BlogPost[];
  loading: boolean;
  error: Error | null;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  getFeaturedPosts: () => Promise<BlogPost[]>;
  getPostsByCategory: (category: string) => BlogPost[];
  getPostsByTag: (tag: string) => BlogPost[];
  featuredPosts: BlogPost[];
}

export function useBlogPosts(postsPerPage: number = 21): UseBlogPostsReturn {
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Calcular posts a serem exibidos na página atual
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.max(1, Math.ceil(allPosts.length / postsPerPage));
  
  // Log para depuração da paginação
  useEffect(() => {
    console.log('Página atual:', currentPage);
    console.log('Total de páginas:', totalPages);
    console.log('Posts na página atual:', currentPosts.length);
    console.log('Total de posts:', allPosts.length);
  }, [currentPage, totalPages, currentPosts.length, allPosts.length]);
  
  // Função para mudar de página
  const goToPage = useCallback((pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [totalPages]);

  useEffect(() => {
    console.log('useEffect do useBlogPosts foi chamado');
    
    const fetchPosts = async () => {
      try {
        console.log('Iniciando carregamento dos posts...');
        
        // 1. Verificando se estamos no navegador
        console.log('Verificando ambiente...');
        console.log('window está definido?', typeof window !== 'undefined');
        console.log('import.meta.env.DEV:', import.meta.env.DEV);
        console.log('import.meta.env.PROD:', import.meta.env.PROD);
        
        // 2. Importando o módulo mdx de forma dinâmica
        console.log('Importando módulo mdx...');
        const mdxModule = await import('@/lib/mdx');
        console.log('Módulo mdx carregado com sucesso!');
        
        // Verifica se a função getAllPosts existe
        if (typeof mdxModule.getAllPosts !== 'function') {
          const errorMsg = 'A função getAllPosts não foi encontrada no módulo mdx';
          console.error('ERRO:', errorMsg);
          throw new Error(errorMsg);
        }
        
        // 3. Chamando a função getAllPosts
        console.log('Chamando getAllPosts...');
        const allPosts = await mdxModule.getAllPosts();
        console.log('getAllPosts retornou com sucesso!');
        
        // 4. Validando a resposta
        if (!allPosts) {
          const errorMsg = 'getAllPosts retornou undefined';
          console.error('ERRO:', errorMsg);
          throw new Error(errorMsg);
        }
        
        if (!Array.isArray(allPosts)) {
          const errorMsg = `getAllPosts não retornou um array: ${typeof allPosts}`;
          console.error('ERRO:', errorMsg, allPosts);
          throw new Error('Formato de dados inválido ao carregar os posts');
        }
        
        // Log dos primeiros posts para depuração
        console.log(`${allPosts.length} posts carregados com sucesso.`);
        console.log('Primeiros 3 posts:', allPosts.slice(0, 3).map(p => ({
          slug: p.slug,
          title: p.frontmatter.title,
          date: p.frontmatter.date,
          image: p.frontmatter.image,
          category: p.frontmatter.category
        })));
        
        // 5. Atualizando o estado
        console.log('Atualizando estado de posts...');
        // Ordena os posts por data (mais recentes primeiro)
        const sortedPosts = [...allPosts].sort((a, b) => 
          new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
        );
        setAllPosts(sortedPosts);
        console.log('Estado de posts atualizado com sucesso!');
        
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Erro desconhecido ao carregar posts');
        console.error('ERRO no hook useBlogPosts:', error);
        console.error('Detalhes do erro:', {
          name: error.name,
          message: error.message,
          stack: error.stack
        });
        setError(error);
      } finally {
        console.log('Finalizando carregamento (setLoading(false))');
        setLoading(false);
      }
    };

    // Iniciando o carregamento
    fetchPosts().catch(err => {
      console.error('Erro não tratado em fetchPosts:', err);
    });
    
  }, []);

  const getFeaturedPosts = useCallback(async (): Promise<BlogPost[]> => {
    try {
      const { getFeaturedPosts } = await import('@/lib/mdx');
      const featured = await getFeaturedPosts();
      setFeaturedPosts(featured);
      return featured;
    } catch (error) {
      console.error('Erro ao buscar posts em destaque:', error);
      return [];
    }
  }, []);

  // Função para obter posts por categoria
  const getPostsByCategory = useCallback((category: string): BlogPost[] => {
    if (!allPosts || !allPosts.length) return [];
    return allPosts.filter(post => 
      post.frontmatter.category?.toLowerCase() === category.toLowerCase()
    );
  }, [allPosts]);

  // Função para obter posts por tag
  const getPostsByTag = useCallback((tag: string): BlogPost[] => {
    if (!allPosts || !allPosts.length) return [];
    return allPosts.filter(post => 
      post.frontmatter.tags?.some(
        (t: string) => t.toLowerCase() === tag.toLowerCase()
      )
    );
  }, [allPosts]);

  // Carregar posts em destaque
  useEffect(() => {
    const loadFeaturedPosts = async () => {
      try {
        const featured = await getFeaturedPosts();
        setFeaturedPosts(featured);
      } catch (err) {
        console.error('Erro ao carregar posts em destaque:', err);
      }
    };
    
    loadFeaturedPosts();
  }, [getFeaturedPosts]);

  return {
    posts: currentPosts,
    loading,
    error,
    currentPage,
    totalPages,
    setCurrentPage: goToPage,
    getFeaturedPosts,
    getPostsByCategory,
    getPostsByTag,
    featuredPosts
  };
}
