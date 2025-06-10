# Instruções para Deploy no Netlify

## Pré-requisitos
- Conta no [Netlify](https://www.netlify.com/)
- Código do projeto em um repositório no GitHub

## Passo a Passo

### 1. Preparação do Código
1. Certifique-se de que seu código está na branch `main`
2. Verifique se o `package.json` tem os scripts necessários:
   ```json
   {
     "scripts": {
       "build": "vite build",
       "preview": "vite preview"
     }
   }
   ```

### 2. Configuração no Netlify
1. Acesse [app.netlify.com](https://app.netlify.com/)
2. Clique em "Add new site" > "Import an existing project"
3. Conecte sua conta do GitHub
4. Selecione seu repositório

### 3. Configurações de Build
- **Branch para deploy:** `main`
- **Build command:** `npm run build`
- **Publish directory:** `dist`

### 4. Variáveis de Ambiente (se necessário)
Se seu projeto usa variáveis de ambiente:
1. Vá em "Site settings" > "Build & deploy" > "Environment"
2. Adicione as variáveis necessárias

### 5. Domínio Personalizado (opcional)
1. Vá em "Domain settings"
2. Siga as instruções para configurar seu domínio

### 6. Deploy Contínuo
O Netlify fará deploy automaticamente a cada push para a branch `main`.

## Solução de Problemas Comuns
- **Build falhando:** Verifique os logs de build no painel do Netlify
- **Arquivos estáticos não encontrados:** Confira se o "Publish directory" está correto
- **Variáveis de ambiente faltando:** Adicione-as nas configurações do site

## Links Úteis
- [Documentação do Netlify](https://docs.netlify.com/)
- [Configuração de Domínios](https://docs.netlify.com/domains-https/custom-domains/)
