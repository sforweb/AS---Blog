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

# Limpar cache do npm
echo -e "${YELLOW}Limpando cache npm...${NC}"
npm cache clean --force

# Instalar dependências
echo -e "${YELLOW}Instalando dependências...${NC}"
npm install --legacy-peer-deps

# Instalar Vite e plugins necessários
echo -e "${YELLOW}Instalando Vite e plugins...${NC}"
npm install --save-dev vite@5.4.1 @vitejs/plugin-react-swc --legacy-peer-deps

# Usar configuração simplificada
cp vite.config.js vite.config.temp.js

# Executar build
echo -e "${GREEN}Executando build...${NC}"
NODE_OPTIONS=--openssl-legacy-provider npx vite build --config vite.config.temp.js

# Verificar resultado
if [ $? -eq 0 ]; then
  echo -e "${GREEN}Build concluído com sucesso!${NC}"
  ls -la ./dist
  # Remover arquivo temporário
  rm -f vite.config.temp.js
  exit 0
else
  echo -e "${RED}Erro durante o build.${NC}"
  # Manter o arquivo temporário para debug em caso de erro
  exit 1
fi
