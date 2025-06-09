import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  console.log('Iniciando Vite com modo:', mode);
  
  return {
    // Configuração base vazia para funcionar em domínio raiz
    base: '/',
    publicDir: 'public',
    server: {
      host: "::",
      port: 8080,
      fs: {
        // Permite acessar arquivos fora do diretório do projeto
        strict: false,
        // Permite servir arquivos de fora do diretório raiz
        allow: ['..']
      },
      // Middleware personalizada para servir arquivos Markdown
      middleware: (req, res, next) => {
        if (req.url?.startsWith('/src/content/')) {
          console.log('Solicitando arquivo estático:', req.url);
        }
        next();
      }
    },
    plugins: [
      react(),
      mode === 'development' && componentTagger(),
      // Plugin para carregar arquivos Markdown como string
      {
        name: 'markdown-loader',
        enforce: 'pre', // Executa antes de outros plugins
        transform(code, id) {
          if (id.endsWith('.md') || id.endsWith('.mdx')) {
            console.log(`Processando arquivo Markdown: ${id}`);
            // Retorna o conteúdo do arquivo como uma string
            return `export default ${JSON.stringify(code)}`;
          }
        },
        // Habilita HMR para arquivos Markdown
        handleHotUpdate({ file, server }) {
          if (file.endsWith('.md') || file.endsWith('.mdx')) {
            console.log(`Arquivo Markdown alterado: ${file}`);
            server.ws.send({
              type: 'full-reload',
              path: '*'
            });
          }
        },
      },
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // Configuração para lidar com arquivos Markdown
    assetsInclude: ['**/*.md', '**/*.mdx'],
    optimizeDeps: {
      // Garante que o Vite processe os arquivos Markdown corretamente
      include: [
        'react-markdown',
        'remark-gfm',
        'gray-matter',
        'remark-parse',
        'unified',
        'vfile',
        'vfile-message'
      ],
      // Força a inclusão de dependências necessárias
      force: true,
      // Desativa a exclusão de imports não utilizados
      exclude: [],
    },
    // Configurações de desenvolvimento
    define: {
      'import.meta.env.DEV': JSON.stringify(mode === 'development'),
      'import.meta.env.PROD': JSON.stringify(mode === 'production'),
      'import.meta.env.MODE': JSON.stringify(mode),
    },
    build: {
      // Garante que os arquivos Markdown sejam incluídos no build
      rollupOptions: {
        // Não marca os arquivos Markdown como externos
        external: [],
      },
      // Aumenta o limite de avisos de tamanho de bundle
      chunkSizeWarningLimit: 2000,
    },
  };
});
