#!/usr/bin/env sh

# Cores para mensagens
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "${YELLOW}Iniciando deploy para a branch main...${NC}"

# Aborta em caso de erros
set -e

# Instala as dependências
echo "${YELLOW}Instalando dependências...${NC}"
npm install

# Executa o build
echo "${YELLOW}Construindo a aplicação...${NC}"
npm run build

# Verifica se estamos na branch main
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "${YELLOW}AVISO: Você não está na branch main. Atual branch: $CURRENT_BRANCH${NC}"
    read -p "Deseja continuar mesmo assim? (s/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Ss]$ ]]; then
        echo "${YELLOW}Deploy cancelado.${NC}"
        exit 1
    fi
fi

# Adiciona e faz commit das alterações
echo "${YELLOW}Preparando arquivos para commit...${NC}"
git add -A

# Verifica se há alterações para commitar
if git diff-index --quiet HEAD --; then
    echo "${GREEN}Nenhuma alteração para commitar.${NC}"
else
    git commit -m "Atualização de produção - $(date +"%Y-%m-%d %H:%M:%S")"
    
    # Faz o push para o repositório remoto
    echo "${YELLOW}Enviando alterações para o repositório remoto...${NC}"
    git push origin "$CURRENT_BRANCH"
    
    echo "${GREEN}Deploy para a branch $CURRENT_BRANCH concluído com sucesso!${NC}"
    echo "${YELLOW}O Netlify irá detectar as alterações e fazer o deploy automaticamente.${NC}"
fi

echo "${GREEN}Processo finalizado.${NC}"
