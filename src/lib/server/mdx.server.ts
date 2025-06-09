import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost } from '@/types/blog';

// Caminho para a pasta de posts
const postsDirectory = path.join(process.cwd(), 'src/content/blog');

// Função para obter todos os posts
export function getAllPosts(): BlogPost[] {
  // Verificar se o diretório existe
  if (!fs.existsSync(postsDirectory)) {
    console.warn(`Diretório de posts não encontrado: ${postsDirectory}`);
    return [];
  }

  // Obter nomes dos arquivos em /content/blog
  const fileNames = fs.readdirSync(postsDirectory);
  
  // Obter dados de cada post
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map((fileName) => {
      try {
        // Remover extensão do nome do arquivo para obter o slug
        const slug = fileName.replace(/\.mdx?$/, '');

        // Ler o arquivo markdown como string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Usar gray-matter para analisar o frontmatter do post
        const { data, content } = matter(fileContents);

        // Calcular tempo de leitura (aproximadamente 200 palavras por minuto)
        const wordsPerMinute = 200;
        const wordCount = content.split(/\s+/).length;
        const readTime = Math.ceil(wordCount / wordsPerMinute);

        // Combinar os dados com o slug e conteúdo
        return {
          slug,
          content,
          frontmatter: {
            title: data.title || 'Sem título',
            date: data.date || new Date().toISOString(),
            excerpt: data.excerpt || '',
            image: data.image || '/images/blog/default.jpg',
            category: data.category || 'Geral',
            tags: data.tags || [],
            author: data.author || 'Alexandre Spada',
            authorRole: data.authorRole || 'Fundador',
            authorAvatar: data.authorAvatar || '/images/team/alexandre-spada.jpg',
            authorBio: data.authorBio || 'Escreve sobre tecnologia, marketing digital e produtividade.',
            readTime: data.readTime || `${readTime} min de leitura`,
          },
        };
      } catch (error) {
        console.error(`Erro ao processar o arquivo ${fileName}:`, error);
        return null;
      }
    })
    .filter((post): post is BlogPost => post !== null);

  // Ordenar posts por data (mais recentes primeiro)
  return allPostsData.sort((a, b) => {
    return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
  });
}

// Função para obter posts em destaque
export function getFeaturedPosts(): BlogPost[] {
  const allPosts = getAllPosts();
  return allPosts.slice(0, 3); // Retorna os 3 primeiros posts
}

// Função para obter um post pelo slug
export function getPostBySlug(slug: string): BlogPost | undefined {
  try {
    const posts = getAllPosts();
    return posts.find(post => post.slug === slug);
  } catch (error) {
    console.error('Erro ao buscar post por slug:', error);
    return undefined;
  }
}
