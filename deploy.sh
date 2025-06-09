#!/usr/bin/env sh

# Cores para mensagens
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "${YELLOW}Iniciando processo de deploy...${NC}"

# Aborta em caso de erros
set -e

# Instala as dependências
echo "${YELLOW}Instalando dependências...${NC}"
npm install

# Executa o build
echo "${YELLOW}Construindo a aplicação...${NC}"
npm run build

# navigate into the build output directory
cd dist

# Cria o arquivo .nojekyll para evitar processamento do Jekyll
if [ ! -f .nojekyll ]; then
    echo "${YELLOW}Criando arquivo .nojekyll...${NC}"
    touch .nojekyll
fi

# Copia o arquivo CNAME para a pasta de build
if [ -f ../public/CNAME ]; then
    echo "${YELLOW}Copiando CNAME...${NC}"
    cp ../public/CNAME .
fi

# Inicializa o repositório Git se não existir
if [ ! -d .git ]; then
    echo "${YELLOW}Inicializando repositório Git...${NC}"
    git init
    git checkout -B gh-pages
fi

# Adiciona e faz commit das alterações
echo "${YELLOW}Preparando arquivos para deploy...${NC}"
git add -A
git commit -m 'Atualização de deploy - $(date +"%Y-%m-%d %H:%M:%S")'

# if you are deploying to https://sforweb.github.io
# git push -f https://github.com/sforweb/sforweb.github.io.git gh-pages

# Faz o push para o GitHub Pages
echo "${YELLOW}Enviando alterações para o GitHub Pages...${NC}"
git push -f https://github.com/sforweb/AS---Blog.git gh-pages

# Volta para o diretório anterior
cd -

echo "${GREEN}Deploy concluído com sucesso! 🚀${NC}"
echo "Acesse: https://sforweb.github.io/AS---Blog/"
