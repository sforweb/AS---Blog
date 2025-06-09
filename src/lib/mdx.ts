import { BlogPost } from '@/types/blog';

// Lista manual dos posts (substitua pelos seus próprios posts)
const MANUAL_POSTS: BlogPost[] = [
  {
    slug: 'introducao-ao-marketing-de-conteudo-com-ia',
    frontmatter: {
      title: 'Introdução ao Marketing de Conteúdo com IA',
      excerpt: 'Descubra como a inteligência artificial está revolucionando o marketing de conteúdo e como você pode se beneficiar dessas inovações.',
      date: '2025-06-02',
      author: 'Alexandre Spada',
      authorAvatar: '/images/team/alexandre-spada.jpg',
      authorRole: 'Fundador',
      authorBio: 'Especialista em marketing digital e tecnologia, apaixonado por compartilhar conhecimento sobre como a IA está transformando o mundo digital.',
      category: 'Marketing Digital',
      tags: ['IA', 'Marketing Digital', 'Conteúdo', 'Tecnologia'],
      readTime: '5 min de leitura',
      image: '/images/blog/marketing-ia.jpg',
      featured: true
    },
    content: `# Introdução ao Marketing de Conteúdo com IA

A inteligência artificial está transformando a maneira como criamos e distribuímos conteúdo digital. Neste artigo, exploraremos como as ferramentas baseadas em IA podem potencializar sua estratégia de marketing de conteúdo.

## O que é Marketing de Conteúdo com IA?

O marketing de conteúdo com IA envolve o uso de algoritmos de inteligência artificial para criar, otimizar e distribuir conteúdo relevante para seu público-alvo. Isso inclui:

- Geração automática de ideias
- Criação de conteúdo básico
- Otimização para mecanismos de busca
- Personalização em escala

## Vantagens da IA no Marketing de Conteúdo

1. **Eficiência**: Redução significativa no tempo de produção
2. **Escalabilidade**: Crie mais conteúdo em menos tempo
3. **Personalização**: Conteúdo adaptado às necessidades específicas do público
4. **Análise de desempenho**: Insights em tempo real sobre o engajamento

## Como Começar

1. **Escolha as ferramentas certas**: Existem diversas plataformas de IA para criação de conteúdo
2. **Defina sua estratégia**: A IA é uma ferramenta, não uma estratégia completa
3. **Mantenha o toque humano**: Revise e personalize todo conteúdo gerado
4. **Meça os resultados**: Acompanhe métricas de engajamento e ajuste conforme necessário

## Conclusão

A IA veio para ficar e está transformando o marketing de conteúdo. Ao adotar essas tecnologias de forma estratégica, você pode se manter à frente da concorrência e oferecer experiências mais relevantes para seu público.

Gostou deste conteúdo? Assine nossa newsletter para receber mais artigos como este diretamente no seu e-mail!`
  },
  {
    slug: 'primeiro-post',
    frontmatter: {
      title: 'Meu Primeiro Post',
      excerpt: 'Este é um exemplo de post no blog.',
      date: '2023-06-01',
      author: 'Alexandre Spada',
      authorAvatar: '/images/team/alexandre-spada.jpg',
      authorRole: 'Fundador',
      authorBio: 'Apaixonado por tecnologia e compartilhamento de conhecimento.',
      category: 'Desenvolvimento',
      tags: ['início', 'tecnologia'],
      readTime: '3 min de leitura',
      image: '/images/blog/default.jpg',
      featured: true
    },
    content: `# Meu Primeiro Post

Bem-vindo ao meu blog! Este é um exemplo de post.

## Subtítulo

Conteúdo do post aqui...`
  }
];

// Função para carregar posts da pasta /src/content/blog/
async function loadMarkdownPosts(): Promise<BlogPost[]> {
  try {
    // Usamos import.meta.glob para carregar os arquivos em qualquer ambiente
    const modules = import.meta.glob('@/content/blog/*.{md,mdx}');
    const posts: BlogPost[] = [];
    
    // Se não houver módulos, retorna os posts manuais (apenas em produção)
    if (Object.keys(modules).length === 0 && import.meta.env.PROD) {
      return MANUAL_POSTS;
    }
    
    // Usamos Promise.all para carregar todos os posts em paralelo
    const postPromises = Object.entries(modules).map(async ([path, module]) => {
      try {
        // Extrai o slug do caminho do arquivo
        const slug = path
          .split('/')
          .pop()
          ?.replace(/\.(md|mdx)$/, '') || '';
        
        console.log(`Carregando post: ${slug}`);
        
        // Carrega o conteúdo do arquivo
        const content = await loadMarkdownFile(path);
        
        // Extrai o frontmatter e o conteúdo
        const post = await extractFrontmatter(content, slug);
        console.log(`Post carregado: ${slug}`, { 
          title: post.frontmatter.title,
          date: post.frontmatter.date,
          image: post.frontmatter.image
        });
        
        return post;
      } catch (error) {
        console.error(`Erro ao carregar o post do arquivo ${path}:`, error);
        return null;
      }
    });
    
    // Aguarda todas as promessas serem resolvidas e filtra quaisquer valores nulos
    const loadedPosts = (await Promise.all(postPromises)).filter(Boolean) as BlogPost[];
    
    // Ordena os posts por data (mais recentes primeiro)
    const sortedPosts = loadedPosts.sort((a, b) => 
      new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
    );
    
    console.log(`Total de ${sortedPosts.length} posts carregados com sucesso.`);
    return sortedPosts;
  } catch (error) {
    console.error('Erro ao carregar posts do markdown:', error);
    return [];
  }
}

// Função para obter todos os posts
export async function getAllPosts(): Promise<BlogPost[]> {
  console.log('Carregando posts...');
  
  // Carrega apenas os posts de Markdown da pasta /src/content/blog/
  const markdownPosts = await loadMarkdownPosts();
  
  // Filtra posts inválidos e ordena por data (mais recentes primeiro)
  return markdownPosts
    .filter(post => post && post.frontmatter && post.frontmatter.date)
    .sort((a, b) => {
      return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
    });
}

// Função auxiliar para carregar um arquivo Markdown
export async function loadMarkdownFile(path: string): Promise<string> {
  try {
    // Remove o prefixo /src se existir, pois o import.meta.glob já está configurado com @
    const normalizedPath = path.startsWith('/src/') ? path.substring(5) : path;
    
    // Usa import.meta.glob para carregar o conteúdo do arquivo
    const modules = import.meta.glob('@/content/blog/*.{md,mdx}', { as: 'raw' });
    
    // Encontra o módulo correspondente ao caminho
    const moduleKey = Object.keys(modules).find(key => key.includes(normalizedPath));
    
    if (!moduleKey || !modules[moduleKey]) {
      throw new Error(`Arquivo não encontrado: ${path}`);
    }
    
    // Carrega o conteúdo do arquivo
    const content = await modules[moduleKey]();
    return content as string;
  } catch (error) {
    console.error(`Erro ao carregar o arquivo ${path}:`, error);
    throw error;
  }
}

import { processMarkdownContent } from './markdownToHtml';

// Função para extrair o frontmatter do conteúdo
async function extractFrontmatter(content: string, slug: string) {
  try {
    console.log(`Processando frontmatter para o post: ${slug}`);
    
    // Processa o conteúdo markdown e extrai o frontmatter
    const { frontmatter, content: markdownContent } = await processMarkdownContent(content);

    // Log do frontmatter extraído
    console.log(`Frontmatter extraído para ${slug}:`, {
      title: frontmatter.title,
      date: frontmatter.date,
      excerpt: frontmatter.excerpt?.substring(0, 50) + '...',
      image: frontmatter.image
    });

    // Verifica campos obrigatórios
    if (!frontmatter.title) {
      throw new Error(`Título não encontrado no post: ${slug}`);
    }

    if (!frontmatter.date) {
      console.warn(`Data não encontrada no post: ${slug}, usando data atual`);
      frontmatter.date = new Date().toISOString();
    }

    // Garante que os campos opcionais tenham valores padrão
    const processedFrontmatter: BlogPost['frontmatter'] = {
      title: frontmatter.title,
      excerpt: frontmatter.excerpt || '',
      date: frontmatter.date,
      author: frontmatter.author || 'Alexandre Spada',
      authorAvatar: frontmatter.authorAvatar || '/images/team/foto-de-perfil.png',
      authorRole: frontmatter.authorRole || 'Fundador',
      category: frontmatter.category || 'Geral',
      tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
      readTime: frontmatter.readTime,
      image: frontmatter.image || '',
      featured: Boolean(frontmatter.featured)
    };

    console.log(`Post carregado: ${slug}`, { 
      title: processedFrontmatter.title,
      date: processedFrontmatter.date,
      image: processedFrontmatter.image
    });

    return {
      slug,
      frontmatter: processedFrontmatter,
      content: markdownContent
    };
  } catch (error) {
    console.error(`Erro ao processar o post ${slug}:`, error);
    throw error;
  }
}

// Retorna os posts em destaque (marcados com featured: true)
export async function getFeaturedPosts(): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  // Filtra apenas os posts marcados como featured e pega os 3 mais recentes
  return allPosts
    .filter(post => post.frontmatter.featured)
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())
    .slice(0, 3);
}

// Retorna um post específico pelo seu slug
export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  try {
    const posts = await getAllPosts();
    return posts.find(post => post.slug === slug);
  } catch (error) {
    console.error(`Erro ao buscar post com slug: ${slug}`, error);
    return undefined;
  }
}

// Função auxiliar para carregar um post diretamente do arquivo (útil para SSR/SSG)
export async function loadMarkdownPost(slug: string): Promise<BlogPost | undefined> {
  try {
    const content = await loadMarkdownFile(`/src/content/blog/${slug}.md`);
    return await extractFrontmatter(content, slug);
  } catch (error) {
    console.error(`Erro ao carregar o post ${slug}:`, error);
    return undefined;
  }
}
