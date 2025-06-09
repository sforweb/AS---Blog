interface HeroConfig {
  type: 'video' | 'image';
  url: string;
  fallbackImage?: string; // Imagem de fallback para vídeos ou imagem principal
}

export const heroConfig: HeroConfig = {
  type: 'video',
  url: 'LY-O1y_8JMY', // ID do vídeo do YouTube ou URL da imagem
  fallbackImage: '/images/blog/fall-back.png', // Imagem de fallback para vídeo ou imagem principal
};
