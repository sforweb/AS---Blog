#!/usr/bin/env sh

# Cores para mensagens
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Função para exibir mensagens de erro
error() {
    echo "${RED}Erro: $1${NC}" >&2
    exit 1
}

echo "${YELLOW}Iniciando deploy automático para a branch main...${NC}"

# Aborta em caso de erros
set -e

# Verifica se o diretório é um repositório git
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
    error "Este diretório não é um repositório Git."
fi

# Verifica se estamos na branch main
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "${YELLOW}Mudando para a branch main...${NC}"
    git checkout main 2>/dev/null || git checkout -b main
fi

# Limpa arquivos não rastreados
echo "${YELLOW}Limpando arquivos não rastreados...${NC}"
git clean -fdX 2>/dev/null || true

# Atualiza o repositório local
echo "${YELLOW}Atualizando repositório local...${NC}"
git fetch origin

# Verifica se o branch remoto existe
if ! git show-ref --verify --quiet refs/remotes/origin/main; then
    echo "${YELLOW}Branch remoto não encontrado. Criando...${NC}"
    git push -u origin main || error "Falha ao criar branch remoto"
fi

# Sincroniza com o repositório remoto
echo "${YELLOW}Sincronizando com o repositório remoto...${NC}"
if ! git pull --rebase origin main; then
    # Se o rebase falhar, tenta um merge
    git rebase --abort 2>/dev/null || true
    git merge -X theirs -m "Merge automático de atualizações remotas" origin/main || {
        echo "${RED}Falha ao sincronizar com o repositório remoto.${NC}"
        echo "${YELLOW}Por favor, execute manualmente:${NC}"
        echo "  1. git stash"
        echo "  2. git pull --rebase origin main"
        echo "  3. git stash pop"
        echo "  4. Resolva os conflitos"
        echo "  5. Execute o script novamente"
        exit 1
    }
fi

# Instala as dependências
echo "${YELLOW}Instalando dependências...${NC}"
npm install

# Executa o build
echo "${YELLOW}Construindo a aplicação...${NC}"
npm run build

# Verifica se houve alterações no build
if ! git diff --quiet || ! git diff --cached --quiet; then
    echo "${YELLOW}Preparando arquivos para commit...${NC}"
    git add -u
    git commit -m "Atualização de produção - $(date +"%Y-%m-%d %H:%M:%S")" || true
    
    # Faz o push para o repositório remoto
    echo "${YELLOW}Enviando alterações para o repositório remoto...${NC}"
    if ! git push origin main; then
        git pull --rebase origin main
        git push --force-with-lease origin main || {
            echo "${RED}Falha ao enviar alterações.${NC}"
            exit 1
        }
    fi
    
    echo "${GREEN}Deploy para a branch main concluído com sucesso!${NC}"
    echo "${YELLOW}O Netlify irá detectar as alterações e fazer o deploy automaticamente.${NC}"
else
    echo "${GREEN}Nenhuma alteração para enviar.${NC}"
fi

echo "${GREEN}Processo finalizado.${NC}"
