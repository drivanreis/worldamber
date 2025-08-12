# WorldAmber - Website de Contato Empresarial

Este é um projeto de website frontend completo para a WorldAmber, desenvolvido para ser hospedado no GitHub Pages. O site inclui um formulário de contato que envia dados diretamente para uma planilha do Google Sheets.

## 📋 Funcionalidades

- **Design Responsivo**: Adaptável para desktop, tablet e mobile
- **Formulário de Contato**: Com validação frontend completa
- **Integração Google Sheets**: Dados enviados automaticamente via Google Apps Script
- **Animações Suaves**: Interface moderna com transições elegantes
- **Acessibilidade**: Seguindo boas práticas de UX/UI
- **100% Frontend**: Sem necessidade de backend ou servidor

## 🚀 Como Publicar no GitHub Pages

### Passo 1: Criar Repositório no GitHub

1. Acesse [GitHub](https://github.com) e faça login
2. Clique em "New repository" ou acesse: https://github.com/new
3. Nome do repositório: `worldamber-website` (ou o nome de sua preferência)
4. Marque como "Public"
5. Marque "Add a README file"
6. Clique em "Create repository"

### Passo 2: Fazer Upload dos Arquivos

1. No repositório criado, clique em "uploading an existing file"
2. Arraste todos os arquivos do projeto ou clique em "choose your files"
3. Faça upload dos seguintes arquivos:
   - `index.html`
   - `css/styles.css`
   - `js/app.js`
   - `README.md`
4. Adicione uma mensagem de commit: "Initial commit - WorldAmber website"
5. Clique em "Commit changes"

### Passo 3: Ativar GitHub Pages

1. No seu repositório, clique na aba "Settings"
2. No menu lateral, clique em "Pages"
3. Em "Source", selecione "Deploy from a branch"
4. Em "Branch", selecione "main" (ou "master")
5. Deixe "/ (root)" selecionado
6. Clique em "Save"

### Passo 4: Acessar o Site

Após alguns minutos, seu site estará disponível em:
```
https://SEU-USUARIO.github.io/worldamber-website/
```

Substitua `SEU-USUARIO` pelo seu nome de usuário do GitHub.

## 🔧 Configuração do Google Apps Script

Para que o formulário de contato funcione, você precisa configurar um Google Apps Script conectado a uma planilha do Google Sheets.

### Passo 1: Criar a Planilha

1. Acesse [Google Sheets](https://sheets.google.com)
2. Crie uma nova planilha
3. Renomeie para "Contatos-Empresariais"
4. Na primeira linha, adicione os cabeçalhos:
   - A1: "Timestamp"
   - B1: "Nome"
   - C1: "Email"
   - D1: "Empresa"
   - E1: "Mensagem"

### Passo 2: Criar o Apps Script

1. Na planilha, vá em "Extensões" > "Apps Script"
2. Apague o código existente e cole o seguinte:

```javascript
function doPost(e) {
  try {
    // Obtém a planilha ativa
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Obtém os parâmetros enviados
    const params = e.parameter;
    
    // Prepara os dados para inserir
    const timestamp = new Date();
    const nome = params.name || '';
    const email = params.email || '';
    const empresa = params.company || '';
    const mensagem = params.message || '';
    
    // Adiciona uma nova linha com os dados
    sheet.appendRow([
      timestamp,
      nome,
      email,
      empresa,
      mensagem
    ]);
    
    // Retorna sucesso
    return ContentService
      .createTextOutput('Dados salvos com sucesso!')
      .setMimeType(ContentService.MimeType.TEXT);
      
  } catch (error) {
    // Em caso de erro, retorna a mensagem de erro
    return ContentService
      .createTextOutput('Erro: ' + error.toString())
      .setMimeType(ContentService.MimeType.TEXT);
  }
}

function doGet() {
  return ContentService
    .createTextOutput('Script funcionando! Use POST para enviar dados.')
    .setMimeType(ContentService.MimeType.TEXT);
}
```

### Passo 3: Configurar e Publicar

1. Clique em "Salvar" (ícone de disquete)
2. Dê um nome ao projeto: "WorldAmber Contact Form"
3. Clique em "Implantar" > "Nova implantação"
4. Clique no ícone de engrenagem e selecione "Aplicativo da Web"
5. Em "Executar como", selecione "Eu"
6. Em "Quem tem acesso", selecione "Qualquer pessoa"
7. Clique em "Implantar"
8. Copie a URL do aplicativo da Web gerada
9. **IMPORTANTE**: Substitua a URL no arquivo `js/app.js` pela URL que você copiou

### Passo 4: Testar o Apps Script

1. Cole a URL do Apps Script no navegador
2. Você deve ver a mensagem: "Script funcionando! Use POST para enviar dados."
3. Se aparecer, o script está configurado corretamente

## 📁 Estrutura de Arquivos

```
worldamber-website/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos CSS
├── js/
│   └── app.js         # JavaScript e validações
└── README.md          # Este arquivo
```

## 🎨 Personalização

### Cores e Design
Para alterar as cores do site, edite as variáveis CSS no arquivo `css/styles.css`:
- Gradiente principal: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- Cor de destaque: `#667eea`
- Cor secundária: `#764ba2`

### Conteúdo
Para alterar textos e conteúdo:
1. **Título principal**: Edite a tag `<h1>` no `index.html`
2. **Descrição**: Modifique o conteúdo da seção `.hero-description`
3. **Benefícios**: Altere os itens em `.contact-benefits`

### Validação do Formulário
As regras de validação estão no arquivo `js/app.js`:
- Nome: 2-100 caracteres
- Email: Formato válido
- Empresa: 2-100 caracteres  
- Mensagem: 10-1000 caracteres

## 🔒 Segurança e Privacidade

- Todos os dados são enviados diretamente para sua planilha do Google Sheets
- Não há armazenamento de dados no servidor
- A comunicação com o Google Apps Script é feita via HTTPS
- Recomenda-se configurar notificações por email na planilha para novos contatos

## 📱 Compatibilidade

- ✅ Chrome (versão 90+)
- ✅ Firefox (versão 88+)
- ✅ Safari (versão 14+)
- ✅ Edge (versão 90+)
- ✅ Dispositivos móveis (iOS/Android)

## 🐛 Resolução de Problemas

### Formulário não envia
1. Verifique se a URL do Google Apps Script está correta no `js/app.js`
2. Confirme que o script está publicado como "Aplicativo da Web"
3. Verifique se as permissões estão configuradas como "Qualquer pessoa"

### Erros de CORS
- Certifique-se de que o Apps Script está configurado para aceitar requisições de qualquer origem
- Verifique se o modo CORS está habilitado no script

### Dados não aparecem na planilha
1. Confirme que os cabeçalhos da planilha estão corretos
2. Verifique se a planilha não está protegida por senha
3. Teste o script diretamente pela URL

## 📞 Suporte

Se encontrar problemas durante a configuração:

1. **GitHub Pages**: Consulte a [documentação oficial](https://docs.github.com/pt/pages)
2. **Google Apps Script**: Acesse a [documentação do Google](https://developers.google.com/apps-script)
3. **Issues técnicas**: Verifique o console do navegador (F12) para erros JavaScript

## 📄 Licença

Este projeto é fornecido como está, para uso da WorldAmber. Todos os direitos reservados.

---

**Desenvolvido para WorldAmber - Conectando negócios ao redor do mundo** 🌍