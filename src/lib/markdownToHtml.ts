import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';
import highlight from 'highlight.js';
import { Frontmatter, extractFrontmatter as extractFrontmatterUtil } from './frontmatter';

// Função para aplicar highlight.js ao conteúdo HTML
function applyHighlighting(html: string): string {
  // Verifica se estamos no navegador
  if (typeof document === 'undefined') {
    return html;
  }
  
  // Cria um elemento temporário para manipular o HTML
  const temp = document.createElement('div');
  temp.innerHTML = html;
  
  // Aplica highlight.js em todos os blocos de código
  temp.querySelectorAll('pre code').forEach((block) => {
    // Se já não tiver a classe hljs, aplica o highlight
    if (!block.classList.contains('hljs')) {
      block.classList.add('hljs');
      highlight.highlightElement(block as HTMLElement);
    }
  });
  
  return temp.innerHTML;
}

export async function markdownToHtml(markdown: string): Promise<string> {
  try {
    // Processa o markdown para HTML
    const result = await unified()
      .use(remarkParse)
      .use(remarkHtml, {
        sanitize: false, // Permite HTML puro
      })
      .process(markdown);
    
    // Converte para string e aplica o highlight
    const htmlContent = String(result);
    
    // Se estiver no navegador, aplica o highlight
    if (typeof window !== 'undefined') {
      return applyHighlighting(htmlContent);
    }
    
    return htmlContent;
  } catch (error) {
    console.error('Erro ao converter markdown para HTML:', error);
    return markdown; // Retorna o markdown original em caso de erro
  }
}

/**
 * Processa o conteúdo markdown e extrai o frontmatter
 */
export async function processMarkdownContent(markdown: string): Promise<{
  frontmatter: Frontmatter;
  content: string;
}> {
  try {
    // Extrai o frontmatter e o conteúdo
    const { frontmatter, content } = extractFrontmatterUtil(markdown);
    
    // Processa o conteúdo markdown para HTML
    const htmlContent = await markdownToHtml(content);
    
    return {
      frontmatter,
      content: htmlContent
    };
  } catch (error) {
    console.error('Erro ao processar markdown:', error);
    // Retorna valores padrão em caso de erro
    return {
      frontmatter: {
        title: 'Erro ao carregar o post',
        excerpt: 'Ocorreu um erro ao carregar este conteúdo.',
        date: new Date().toISOString(),
        author: 'Alexandre Spada',
        authorAvatar: '/images/team/foto-de-perfil.png',
        authorRole: 'Fundador',
        category: 'Erro',
        tags: [],
        featured: false
      },
      content: markdown
    };
  }
}
