// Utilitário para lidar com caminhos de forma consistente

/**
 * Obtém o caminho relativo para um recurso
 * @param path Caminho relativo a partir da raiz do projeto
 * @returns Caminho formatado
 */
export function getAssetPath(path: string): string {
  // Remove a barra inicial se existir
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `/${cleanPath}`;
}

/**
 * Obtém a URL completa para um recurso
 * @param path Caminho relativo a partir da raiz do projeto
 * @returns URL completa
 */
export function getFullUrl(path: string): string {
  const baseUrl = import.meta.env.BASE_URL || '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${baseUrl}${cleanPath}`;
}

/**
 * Obtém o caminho para uma imagem no diretório público
 * @param path Caminho relativo a partir da pasta public
 * @returns Caminho formatado com o base path do GitHub Pages
 */
export function getImagePath(path: string): string {
  // Remove a barra inicial se existir
  let cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Se o caminho já começar com 'images/', mantém como está
  // Se não, adiciona 'images/'
  if (!cleanPath.startsWith('images/')) {
    cleanPath = `images/${cleanPath}`;
  }
  
  // Adiciona o base path do GitHub Pages
  const basePath = import.meta.env.BASE_URL || '/';
  
  // Garante que não haja barras duplas
  const fullPath = `${basePath}${cleanPath}`.replace(/([^:]\/)\/+/g, '$1');
  
  console.log(`Caminho da imagem gerado: ${fullPath}`);
  return fullPath;
}
