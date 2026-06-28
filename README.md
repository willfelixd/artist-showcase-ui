# 🎤 Artist Showcase UI

![CI](https://github.com/willfelixd/artist-showcase-ui/actions/workflows/ci.yml/badge.svg) ![Em Desenvolvimento](https://img.shields.io/badge/status-em%20desenvolvimento-yellow) ![React](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) [![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](https://choosealicense.com/licenses/mit/)

> Interface web para o portfólio da cantora Isa Tavares — landing page pública
> e painel administrativo, com dark/light mode e suporte a pt-BR e English.

---

## 📌 Sobre o projeto

Este projeto consiste na interface web completa do portfólio da cantora Isa,
consumindo a Artist Showcase API. Inclui páginas públicas para o público
geral e um painel administrativo protegido para gerenciamento de conteúdo.

> ⚠️ Projeto em desenvolvimento ativo. Novas funcionalidades serão adicionadas
> a cada fase.

---

## 🛠️ Tecnologias utilizadas

| Tecnologia | Uso no projeto |
|---|---|
| React 18 | Biblioteca principal de UI |
| TypeScript 5 | Tipagem estática |
| Vite | Bundler e servidor de desenvolvimento |
| React Router DOM | Roteamento client-side |
| Axios | Requisições HTTP com interceptors JWT |
| React Hook Form + Zod | Formulários e validação |
| i18next + react-i18next | Internacionalização pt-BR / English |
| Lucide React | Ícones SVG |
| date-fns | Manipulação e formatação de datas |
| GitHub Actions | CI automatizado |

---

## 🧱 Arquitetura do projeto

O projeto segue uma arquitetura em camadas:

```mermaid
flowchart LR
    Pages["Pages"] --> Components["Components"]
    Pages --> Hooks["Custom Hooks"]
    Hooks --> Services["Services / Axios"]
    Services --> API["Artist Showcase API"]
    Pages --> Contexts["Contexts (Auth, Theme, Language)"]
    Components --> UI["UI Components"]
```

As páginas consomem hooks customizados que encapsulam as chamadas aos
services. Os contexts gerenciam estado global de autenticação, tema e
idioma. Os components são reutilizáveis e desacoplados das páginas.

---

## 📈 Evolução do projeto

- [x] #1 Setup inicial do projeto
- [ ] #2 Tema dark/light mode
- [ ] #3 Internacionalização pt-BR / English
- [ ] #4 Página Home
- [ ] #5 Página Repertório
- [ ] #6 Página Vídeos
- [ ] #7 Página Agenda
- [ ] #8 Página Contato
- [ ] #9 Painel Admin
- [ ] #10 Deploy Vercel e CD

---

## ⚙️ Funcionalidades

### Páginas públicas
- ✅ Home com branding e perfil da artista
- ✅ Repertório com busca e filtro por gênero
- ✅ Vídeos com player do YouTube
- ✅ Agenda com calendário e formulário de agendamento
- ✅ Contato com formulário validado

### Painel Admin
- ✅ Login protegido com JWT
- ✅ Gerenciamento de perfil, músicas, vídeos e agenda
- ✅ Visualização de mensagens de contato

### Experiência
- ✅ Dark / Light mode com persistência
- ✅ Tradução pt-BR / English com detecção automática
- ✅ Design responsivo mobile-first

---

## ▶️ Como executar o projeto

### Pré-requisitos

- Node.js 20+
- Artist Showcase API rodando em `http://localhost:8080`

### 1. Clonar o repositório

```bash
git clone https://github.com/willfelixd/artist-showcase-ui.git
```

### 2. Entrar na pasta

```bash
cd artist-showcase-ui
```

### 3. Configurar variáveis de ambiente

```bash
cp .env.example .env.development

# Edite o arquivo com a URL da API
```

### 4. Instalar dependências

```bash
npm install
```

### 5. Rodar em desenvolvimento

```bash
npm run dev
```

Acesse `http://localhost:5173`

---

## 📁 Estrutura de pastas

```
src
├── 📂 assets          # Imagens e recursos estáticos
├── 🧩 components
│   ├── 🎨 ui          # Botões, inputs, cards genéricos
│   └── 🏗️ layout      # Header, Footer, Sidebar
├── 🌍 contexts        # Auth, Theme, Language
├── 🪝 hooks           # Custom hooks
├── 🌐 pages
│   ├── 🏠 Home
│   ├── 🎵 Repertoire
│   ├── 🎥 Videos
│   ├── 📅 Schedule
│   ├── 📞 Contact
│   └── 🔐 Admin
├── ⚙️ services        # Chamadas à API
├── 🏷️ types           # Interfaces TypeScript
└── 🛠️ utils           # Funções utilitárias
```

---

## 🧪 Testes

```bash
npm run build
```

O build inclui verificação completa de tipos TypeScript, erros de tipo
bloqueiam o CI antes de chegar em produção.

---

## 📸 Demonstração

*(Em breve — prints das páginas e do painel admin)*

<!--<p>
  <img src="docs/screenshot-home.png" alt="Página Home" width="700"/>
</p>

<p>
  <img src="docs/demo.gif" alt="Demo do fluxo" width="700"/>
</p>-->

---

## 📚 Aprendizados

- Desenvolvimento de interfaces modernas com React 18 e TypeScript
- Arquitetura em camadas com separação de responsabilidades
- Autenticação JWT no frontend com interceptors Axios
- Internacionalização com i18next
- Dark/light mode com CSS variables e Context API
- Formulários com React Hook Form e validação com Zod
- CI com verificação de tipos TypeScript no GitHub Actions

---

## 🔗 Repositórios relacionados

* **Backend:** [artist-showcase-api](https://github.com/willfelixd/artist-showcase-api)

---

## 📄 Licença

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](https://choosealicense.com/licenses/mit/)

---

## ✍️ Autor

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/willfelixd">
        <img src="https://avatars.githubusercontent.com/willfelixd?v=4" width="120px;" />
      </a><br/>
      <a href="https://github.com/willfelixd"><b>William Felix</b></a><br/>
      <a href="https://www.linkedin.com/in/william-felix-souza/">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white" alt="LinkedIn"/>
      </a>
      <a href="mailto:willfelixd@gmail.com?subject=Proposta%20de%20Projeto&body=Olá,%20vi%20seu%20portfólio%20e%20gostaria%20de%20falar%20sobre%20um%20projeto.">
        <img src="https://img.shields.io/badge/Gmail-D14836?style=flat&logo=gmail&logoColor=white" alt="Gmail"/>
      </a>
    </td>
  </tr>
</table>
