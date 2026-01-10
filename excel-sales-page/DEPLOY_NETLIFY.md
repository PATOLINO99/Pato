# 🚀 Guia Completo: Deploy no Netlify

## 📋 Pré-requisitos

- ✅ Conta no GitHub (ou GitLab/Bitbucket)
- ✅ Conta no Netlify (gratuita)
- ✅ Git instalado no seu computador

---

## 🎯 Método 1: Deploy via GitHub (RECOMENDADO)

### **Passo 1: Preparar o Repositório Git**

```powershell
# Navegue até a pasta do projeto (se ainda não estiver)
cd "C:\Users\gui\Desktop\Cpy;ANTIGRAVITY\excel-sales-page"

# Inicialize o Git (se ainda não foi feito)
git init

# Adicione todos os arquivos
git add .

# Faça o commit
git commit -m "Initial commit - Excel Sales Page"
```

### **Passo 2: Criar Repositório no GitHub**

1. Acesse: https://github.com/new
2. Nome do repositório: `excel-sales-page`
3. Visibilidade: **Público** ou **Privado** (funciona nos dois)
4. **NÃO** marque "Initialize with README"
5. Clique em **"Create repository"**

### **Passo 3: Conectar e Enviar Código**

```powershell
# Adicione o repositório remoto (substitua USERNAME pelo seu usuário do GitHub)
git remote add origin https://github.com/USERNAME/excel-sales-page.git

# Renomeie a branch para main (se necessário)
git branch -M main

# Envie o código
git push -u origin main
```

### **Passo 4: Deploy no Netlify**

1. **Acesse**: https://app.netlify.com
2. Clique em **"Add new site"** → **"Import an existing project"**
3. Escolha **"Deploy with GitHub"**
4. **Autorize** o Netlify a acessar sua conta GitHub
5. Selecione o repositório **`excel-sales-page`**
6. Configurações de build:
   - **Build command**: `echo "No build needed"`
   - **Publish directory**: `.` (ponto final)
7. Clique em **"Deploy site"**

### **Passo 5: Aguardar Deploy**

- ⏱️ O deploy leva ~30-60 segundos
- ✅ Quando concluir, você verá uma URL como: `https://random-name-123.netlify.app`

---

## 🎯 Método 2: Deploy via Drag & Drop (MAIS RÁPIDO)

### **Passo 1: Preparar Arquivos**

1. Abra a pasta: `C:\Users\gui\Desktop\Cpy;ANTIGRAVITY\excel-sales-page`
2. Selecione **todos** os arquivos:
   - `index.html`
   - `style.css`
   - `script.js`
   - `netlify.toml` (se criado)

### **Passo 2: Upload no Netlify**

1. Acesse: https://app.netlify.com/drop
2. **Arraste** os arquivos para a área indicada
3. ✅ Deploy automático em segundos!

**⚠️ DESVANTAGEM**: Não terá integração com Git (updates manuais)

---

## 🎯 Método 3: Deploy via Netlify CLI

### **Passo 1: Instalar Netlify CLI**

```powershell
# Instale o Node.js primeiro (se não tiver): https://nodejs.org

# Depois instale o Netlify CLI
npm install -g netlify-cli
```

### **Passo 2: Login no Netlify**

```powershell
# Navegue até a pasta do projeto
cd "C:\Users\gui\Desktop\Cpy;ANTIGRAVITY\excel-sales-page"

# Faça login
netlify login
```

(Abrirá o navegador para autenticação)

### **Passo 3: Deploy**

```powershell
# Deploy manual (para teste)
netlify deploy

# Deploy em produção
netlify deploy --prod
```

---

## ⚙️ Configurações Pós-Deploy

### **1. Personalizar URL**

1. No painel do Netlify, vá em **"Site settings"**
2. Clique em **"Change site name"**
3. Digite: `meu-site-excel` (ou outro nome disponível)
4. Nova URL: `https://meu-site-excel.netlify.app`

### **2. Adicionar Domínio Próprio (Opcional)**

1. No painel, clique em **"Domains"**
2. **"Add custom domain"**
3. Digite seu domínio (ex: `www.meusiteexcel.com`)
4. Siga as instruções para configurar DNS

### **3. HTTPS (Automático)**

- ✅ Netlify ativa HTTPS automaticamente
- ⏱️ Pode levar alguns minutos

### **4. Variáveis de Ambiente (Se Necessário)**

1. **Site settings** → **"Environment variables"**
2. Adicione variáveis se precisar (ex: API keys)

---

## 🔄 Atualizações Futuras

### **Se usou GitHub (Método 1)**:

```powershell
# Edite seus arquivos localmente
# Depois:

git add .
git commit -m "Descrição da mudança"
git push

# ✅ Deploy automático no Netlify!
```

### **Se usou Drag & Drop (Método 2)**:

1. Edite os arquivos localmente
2. Arraste novamente para https://app.netlify.com/drop
3. Ou vá no **site** → **"Deploys"** → **"Drag and drop"**

---

## 🎨 Otimizações Recomendadas

### **1. Configurar Redirects (SPA)**

Já incluído no `netlify.toml`:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### **2. Headers de Segurança**

Já incluído no `netlify.toml`:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
```

### **3. Cache de Assets**

Já configurado para CSS e JS

---

## 🐛 Troubleshooting

### **Problema: Site não carrega CSS/JS**

```toml
# Verifique o netlify.toml
[build]
  publish = "."  # Deve ser "." (ponto)
```

### **Problema: 404 ao navegar**

```toml
# Adicione redirect no netlify.toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### **Problema: Build falhou**

```toml
# Use comando simples
[build]
  command = "echo 'Static site'"
```

---

## 📊 Checklist de Deploy

- [ ] Arquivos testados localmente
- [ ] Git inicializado e commit feito
- [ ] Repositório criado no GitHub
- [ ] Código enviado para GitHub
- [ ] Site importado no Netlify
- [ ] Deploy concluído com sucesso
- [ ] URL testada e funcionando
- [ ] HTTPS ativado
- [ ] Nome do site personalizado (opcional)
- [ ] Domínio próprio configurado (opcional)

---

## 🎉 Pronto!

Seu site está no ar! 🚀

**URL de exemplo**: `https://seu-site.netlify.app`

---

## 📞 Links Úteis

- 🌐 **Netlify Dashboard**: https://app.netlify.com
- 📚 **Documentação**: https://docs.netlify.com
- 💬 **Suporte**: https://answers.netlify.com
- 🎓 **Tutoriais**: https://www.netlify.com/blog

---

## 💡 Dicas Profissionais

1. **Use GitHub**: Facilita atualizações e controle de versão
2. **Custom Domain**: Transmite mais profissionalismo
3. **Analytics**: Netlify oferece analytics gratuito
4. **Forms**: Netlify Forms para capturar leads sem backend
5. **Functions**: Netlify Functions para lógica serverless (se precisar)

---

**Status**: ✅ Guia completo criado!

Escolha o **Método 1 (GitHub)** para a melhor experiência ou **Método 2 (Drag & Drop)** para o deploy mais rápido!
