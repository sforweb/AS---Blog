import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Diretório onde estão os arquivos Markdown
const contentDir = path.join(__dirname, 'src/content');

// Função para corrigir os links em um arquivo
function fixLinksInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove /AS---Blog dos links internos
    const fixedContent = content.replace(/\/AS---Blog(\/[^\s\]\)\"\']+)/g, '$1');
    
    // Se o conteúdo foi alterado, salve o arquivo
    if (fixedContent !== content) {
      fs.writeFileSync(filePath, fixedContent, 'utf8');
      console.log(`✅ Links corrigidos em: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Erro ao processar o arquivo ${filePath}:`, error);
    return false;
  }
}

// Função para percorrer todos os arquivos Markdown
function fixLinksInDirectory(directory) {
  try {
    const files = fs.readdirSync(directory, { withFileTypes: true });
    let fixedCount = 0;
    
    for (const file of files) {
      const fullPath = path.join(directory, file.name);
      
      if (file.isDirectory()) {
        // Se for um diretório, chama a função recursivamente
        fixedCount += fixLinksInDirectory(fullPath) ? 1 : 0;
      } else if (file.name.endsWith('.md') || file.name.endsWith('.mdx')) {
        // Se for um arquivo Markdown, corrige os links
        fixedCount += fixLinksInFile(fullPath) ? 1 : 0;
      }
    }
    
    return fixedCount;
  } catch (error) {
    console.error(`❌ Erro ao ler o diretório ${directory}:`, error);
    return 0;
  }
}

// Executa a correção
console.log('🔍 Iniciando correção de links...');
const fixedFiles = fixLinksInDirectory(contentDir);

// Corrige também o componente BlogPostCard
const blogPostCardPath = path.join(__dirname, 'src/components/BlogPostCard.tsx');
if (fs.existsSync(blogPostCardPath)) {
  const fixed = fixLinksInFile(blogPostCardPath);
  if (fixed) {
    console.log(`✅ Links corrigidos em: ${blogPostCardPath}`);
  }
}

console.log(`✅ Concluído! ${fixedFiles} arquivos foram corrigidos.`);

export {};
