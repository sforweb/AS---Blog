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

# Listar diretórios para debug
echo -e "${BLUE}Conteúdo da pasta atual:${NC}"
ls -la

# Limpar cache do npm se existir
echo -e "${YELLOW}Limpando cache npm...${NC}"
npm cache clean --force

# Instalar dependências
echo -e "${YELLOW}Instalando dependências...${NC}"
npm install

# Instalar vite explicitamente
echo -e "${YELLOW}Instalando Vite explicitamente...${NC}"
npm install --save-dev vite@5.4.1

# Listar o conteúdo de node_modules para debug
echo -e "${BLUE}Verificando pasta node_modules/.bin:${NC}"
if [ -d "./node_modules/.bin" ]; then
  ls -la ./node_modules/.bin
else
  echo -e "${RED}Diretório node_modules/.bin não encontrado!${NC}"
fi

# Executar build usando npx
echo -e "${GREEN}Executando build...${NC}"
npx --yes vite@5.4.1 build

# Verificar resultado
if [ $? -eq 0 ]; then
  echo -e "${GREEN}Build concluído com sucesso!${NC}"
  ls -la ./dist
  exit 0
else
  echo -e "${RED}Erro durante o build.${NC}"
  exit 1
fi
