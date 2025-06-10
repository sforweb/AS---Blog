#!/bin/bash

# Cores para mensagens
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Imprimir informações do ambiente
echo -e "${BLUE}===== Informações do Ambiente =====${NC}"
echo -e "${BLUE}Node version:${NC}"
node -v
echo -e "${BLUE}NPM version:${NC}"
npm -v

# Limpar cache do npm se existir
echo -e "${YELLOW}Limpando cache npm...${NC}"
npm cache clean --force

# Instalar dependências
echo -e "${YELLOW}Instalando dependências...${NC}"
npm install

# Verificar se o vite foi instalado corretamente
echo -e "${YELLOW}Verificando instalação do Vite...${NC}"
if [ ! -f "./node_modules/.bin/vite" ]; then
  echo -e "${RED}Vite não encontrado. Instalando explicitamente...${NC}"
  npm install --save-dev vite@5.4.1
fi

# Executar build usando o path direto para o vite
echo -e "${GREEN}Executando build...${NC}"
./node_modules/.bin/vite build

# Verificar resultado
if [ $? -eq 0 ]; then
  echo -e "${GREEN}Build concluído com sucesso!${NC}"
  exit 0
else
  echo -e "${RED}Erro durante o build.${NC}"
  exit 1
fi
