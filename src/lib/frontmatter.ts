export interface Frontmatter {
  title: string;
  excerpt?: string;
  date: string;
  author?: string;
  authorAvatar?: string;
  authorRole?: string;
  category?: string;
  tags?: string[];
  readTime?: string;
  image?: string;
  featured?: boolean;
}

// Função simples para extrair frontmatter de arquivos markdown
export function extractFrontmatter(content: string): { frontmatter: Frontmatter; content: string } {
  // Verifica se há frontmatter (começa e termina com ---)
  const frontmatterRegex = /^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    // Se não encontrar frontmatter, retorna o conteúdo inteiro
    return {
      frontmatter: createDefaultFrontmatter(),
      content: content.trim()
    };
  }

  const frontmatterContent = match[1];
  const markdownContent = match[2].trim();
  
  // Processa o frontmatter linha por linha
  const frontmatter: Record<string, any> = createDefaultFrontmatter();
  
  frontmatterContent.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      
      // Remove aspas se existirem
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.substring(1, value.length - 1);
      }
      
      // Converte para o tipo apropriado
      if (key === 'tags') {
        // Remove colchetes e divide por vírgula
        const tags = value.replace(/[\[\]]/g, '').split(',').map(tag => tag.trim());
        frontmatter[key] = tags;
      } else if (key === 'featured') {
        frontmatter[key] = value.toLowerCase() === 'true';
      } else if (key === 'date' && value) {
        // Tenta converter a data para um formato ISO
        try {
          frontmatter[key] = new Date(value).toISOString();
        } catch (e) {
          frontmatter[key] = value;
        }
      } else {
        frontmatter[key] = value;
      }
    }
  });
  
  return {
    frontmatter: frontmatter as Frontmatter,
    content: markdownContent
  };
}

// Cria um frontmatter padrão
function createDefaultFrontmatter(): Frontmatter {
  return {
    title: 'Sem título',
    excerpt: '',
    date: new Date().toISOString(),
    author: 'Alexandre Spada',
    authorAvatar: '/images/team/foto-de-perfil.png',
    authorRole: 'Fundador',
    category: 'Geral',
    tags: [],
    featured: false
  };
}
