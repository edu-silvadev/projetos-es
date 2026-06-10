# 🛒 Ômega Tech - E-commerce de Eletrônicos

O **Ômega Tech** é um projeto de e-commerce completo (Full Stack) especializado na venda de aparelhos eletrônicos. O projeto nasceu como um desafio puramente de frontend e evoluiu para uma aplicação robusta, com arquitetura organizada, banco de dados relacional e forte foco em segurança da informação.


## 🚀 A Evolução do Projeto (A Jornada Técnica)

Este projeto reflete o meu crescimento e aprendizado como Engenheiro de Software. Ele foi construído em etapas evolutivas:
1. **Fase Inicial (Apenas Frontend):** Interface responsiva construída com HTML, CSS e JavaScript puro.
2. **Introdução ao Backend:** Integração do Node.js com o ORM Prisma e banco de dados SQLite para os primeiros testes de persistência.
3. **Refatoração para MVC & Escalabilidade:** Migração da arquitetura para o padrão **MVC (Model-View-Controller)** para melhor organização de código, substituição do SQLite pelo **PostgreSQL** para ambiente de produção, e conteinerização do banco de dados utilizando o **Docker**.


## 🛠️ Tecnologias Utilizadas

### **Frontend**
* **HTML5 & CSS3** (Design Responsivo e Semântico)
* **JavaScript (ES6+)** (Manipulação de DOM, requisições assíncronas com `Fetch API`)

### **Backend & Banco de Dados**
* **Node.js** com framework **Express**
* **Prisma ORM** (Modelagem de dados e queries)
* **PostgreSQL** (Banco de dados relacional robusto)

### **Infraestrutura & Ferramentas**
* **Docker** (Containerização do banco de dados PostgreSQL)
* **Thunder Client** (Testes automatizados e manuais de rotas da API)


## 🛡️ Implementações de Segurança

Para garantir que a aplicação seguisse padrões reais de mercado, implementei diversas camadas de segurança no fluxo de autenticação (`/login` e `/usuarios`):

* **Criptografia de Senhas (Bcrypt):** As senhas dos usuários nunca são salvas em texto limpo. É gerado um *hash* seguro utilizando a biblioteca `bcrypt` antes de salvar no PostgreSQL.
* **Autenticação via Cookies HttpOnly:** O token JWT (JSON Web Token) gerado no login é enviado ao cliente através de um Cookie com a flag `httpOnly`. Isso impede que scripts maliciosos (ataques XSS) acessem o token via JavaScript no frontend.
* **Proteção contra Força Bruta (Rate Limiting):** Utilização do `express-rate-limit` na rota de login para bloquear temporariamente IPs que realizem múltiplas tentativas consecutivas de acesso.
* **Políticas de CORS Estritas:** Configuração de controle de acesso para permitir requisições apenas da origem oficial do frontend, mitigando ataques de requisições não autorizadas.


## 📦 Funcionalidades Atuais

* [x] Cadastro de novos usuários com validação.
* [x] Autenticação de usuários (Login) com geração de sessão segura.
* [x] Listagem de usuários (Protegida/Admin).
* [x] Layout totalmente responsivo para dispositivos móveis e desktop.

## 🎯 Próximos Passos (Roadmap)

* [ ] **Implementação do Carrinho de Compras:** Persistência de produtos selecionados por sessão.
* [ ] Listagem e filtragem de produtos eletrônicos no catálogo.
* [ ] Integração com API de pagamentos (Simulação).


## 🔧 Como Executar o Projeto Localmente

### **Pré-requisitos**
* Node.js instalado
* Docker e Docker Desktop configurados

### **Passo a Passo**

1. **Clonar o repositório:**
   ```bash
   git clone [https://github.com/seu-usuario/omega-tech.git](https://github.com/seu-usuario/omega-tech.git)
   cd omega-tech

2. **Configure o Backend:**
**Navegue até a pasta do backend e instale as dependências:**
    Bash
    cd backend
    npm install

**Suba o banco de dados PostgreSQL usando o Docker:**
    Bash
    docker compose up -d

**Execute as migrações do Prisma para estruturar o banco:**
    Bash
    npx prisma migrate dev

**Inicie o servidor de desenvolvimento:**
    Bash
    npm run dev

3. **Configurar o Frontend:**
    Basta abrir o arquivo index.html (ou correspondente) utilizando uma extensão de servidor local, como o Live Server no VS Code.

Desenvolvido com notebook por Eduardo Silva Lima de Castro.