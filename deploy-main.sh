#!/usr/bin/env sh

# Cores para mensagens
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para exibir mensagens de erro
error() {
    echo "${RED}Erro: $1${NC}" >&2
    exit 1
}

# Função para limpar arquivos não rastreados
clean_untracked() {
    echo "${YELLOW}Limpando arquivos não rastreados...${NC}"
    # Remove arquivos ignorados e diretórios vazios
    git clean -fdX
    echo "${GREEN}Limpeza concluída!${NC}"
}

# Função para verificar se há alterações não rastreadas
check_unstaged_changes() {
    # Primeiro, verifica se há alterações em arquivos rastreados
    if ! git diff --quiet || ! git diff --cached --quiet; then
        echo "${YELLOW}Encontradas alterações não commitadas:${NC}"
        git status --untracked-files=no  # Mostra apenas arquivos rastreados
        
        # Verifica se há apenas arquivos ignorados alterados
        UNTRACKED_ONLY=$(git ls-files --others --exclude-standard)
        if [ -z "$UNTRACKED_ONLY" ]; then
            # Se não houver arquivos não rastreados, pergunta o que fazer
            echo "${BLUE}Deseja:${NC}"
            echo "1. Descartar todas as alterações locais"
            echo "2. Fazer commit das alterações"
            echo "3. Sair e resolver manualmente"
            read -p "Escolha uma opção (1-3): " choice
            
            case $choice in
                1)
                    echo "${YELLOW}Descartando todas as alterações locais...${NC}"
                    git reset --hard
                    git clean -fd
                    ;;
                2)
                    echo "${YELLOW}Fazendo commit das alterações...${NC}"
                    git add .
                    git commit -m "Alterações locais antes do deploy"
                    ;;
                *)
                    echo "${YELLOW}Por favor, resolva as alterações manualmente e tente novamente.${NC}"
                    exit 1
                    ;;
            esac
        else
            # Se houver apenas arquivos ignorados, limpa automaticamente
            echo "${YELLOW}Arquivos ignorados detectados. Limpando automaticamente...${NC}"
            clean_untracked
        fi
    fi
}

echo "${YELLOW}Iniciando deploy para a branch main...${NC}"

# Aborta em caso de erros
set -e

# Verifica se o diretório é um repositório git
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
    error "Este diretório não é um repositório Git."
fi

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

# Verifica e lida com alterações não rastreadas
check_unstaged_changes

# Atualiza o repositório local
echo "${YELLOW}Atualizando repositório local...${NC}"
git fetch origin

# Verifica o status do repositório remoto
echo "${YELLOW}Verificando status do repositório remoto...${NC}"
git fetch origin

# Verifica se o branch remoto existe
if ! git show-ref --verify --quiet refs/remotes/origin/"$CURRENT_BRANCH"; then
    echo "${YELLOW}Branch remoto não encontrado. Criando...${NC}"
    git push -u origin "$CURRENT_BRANCH"
    echo "${GREEN}Branch remoto criado com sucesso!${NC}
    ${YELLOW}Por favor, execute o script novamente.${NC}"
    exit 0
fi

# Verifica se há alterações remotas
LOCAL_COMMIT=$(git rev-parse @)
REMOTE_COMMIT=$(git rev-parse "origin/$CURRENT_BRANCH")

if [ "$LOCAL_COMMIT" != "$REMOTE_COMMIT" ]; then
    echo "${YELLOW}Encontradas alterações remotas. Sincronizando...${NC}"
    
    # Primeiro, tenta um pull simples
    if git pull origin "$CURRENT_BRANCH" --no-rebase; then
        echo "${GREEN}Sincronização concluída com sucesso!${NC}"
    else
        # Se falhar, tenta um rebase
        echo "${YELLOW}Merge automático falhou. Tentando rebase...${NC}"
        git merge --abort 2>/dev/null || true
        
        if ! git pull --rebase origin "$CURRENT_BRANCH"; then
            echo "${RED}Não foi possível sincronizar com o repositório remoto.${NC}"
            echo "${YELLOW}Por favor, execute os seguintes comandos manualmente:${NC}"
            echo "  1. git stash"
            echo "  2. git pull --rebase origin $CURRENT_BRANCH"
            echo "  3. git stash pop (se necessário)"
            echo "  4. Resolva os conflitos, se houver"
            echo "  5. Execute o script novamente"
            exit 1
        fi
    fi
else
    echo "${GREEN}O repositório local já está atualizado.${NC}"
fi

# Instala as dependências
echo "${YELLOW}Instalando dependências...${NC}"
npm install

# Executa o build
echo "${YELLOW}Construindo a aplicação...${NC}"
npm run build

# Adiciona e faz commit das alterações
echo "${YELLOW}Preparando arquivos para commit...${NC}"

# Verifica se houve alterações no build
if git diff --quiet && git diff --cached --quiet; then
    echo "${GREEN}Nenhuma alteração para commitar.${NC}"
else
    # Adiciona apenas arquivos rastreados que foram modificados
    git add -u
    git commit -m "Atualização de produção - $(date +"%Y-%m-%d %H:%M:%S")"
    
    # Tenta fazer o push para o repositório remoto
    echo "${YELLOW}Enviando alterações para o repositório remoto...${NC}"
    if ! git push origin "$CURRENT_BRANCH"; then
        echo "${YELLOW}Primeira tentativa de push falhou. Atualizando e tentando novamente...${NC}"
        git pull --rebase origin "$CURRENT_BRANCH"
        if ! git push --force-with-lease origin "$CURRENT_BRANCH"; then
            echo "${RED}Falha ao enviar alterações para o repositório remoto.${NC}"
            echo "${YELLOW}Por favor, verifique se você tem permissões de push.${NC}"
            exit 1
        fi
    fi
    
    echo "${GREEN}Deploy para a branch $CURRENT_BRANCH concluído com sucesso!${NC}"
    echo "${YELLOW}O Netlify irá detectar as alterações e fazer o deploy automaticamente.${NC}"
fi

echo "${GREEN}Processo finalizado.${NC}"
