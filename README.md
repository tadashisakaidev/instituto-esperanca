# Instituto Esperança — Plataforma Web

Aplicação web (Single Page Application) desenvolvida para uma organização fictícia do terceiro setor, permitindo à ONG divulgar seus projetos sociais, captar recursos e cadastrar doadores e voluntários.

Projeto desenvolvido como parte das Experiências Práticas I a IV da disciplina de Desenvolvimento Front-end.

**Deploy:** https://instituto-esperanca.vercel.app/

## 🚀 Tecnologias utilizadas

- **HTML5** semântico (header, nav, main, section, article, footer)
- **CSS3**: variáveis nativas (Design System), Grid de 12 colunas, Flexbox, 5 breakpoints responsivos, dark mode via `prefers-color-scheme`
- **JavaScript (ES6 Modules)**: SPA com History API, templates dinâmicos, validação de formulários, localStorage
- **Day.js**: formatação de datas (via CDN, integração externa)
- **Vite**: bundler para build de produção (minificação de CSS/JS, otimização de assets)
- **Git & GitHub**: versionamento seguindo o padrão GitFlow
- **Vercel**: hospedagem e deploy contínuo (CI/CD)

## 📁 Estrutura do projeto

```
instituto-esperanca/
├── index.html            # Shell da SPA — ponto de entrada, na raiz do projeto
├── vite.config.js        # Configuração do bundler (root ".", saída em dist/)
├── package.json
├── css/
│   ├── reset.css         # Normalização de estilos do navegador
│   └── style.css         # Design System, Grid, Flexbox, componentes, dark mode
├── public/
│   └── templates/        # Fragmentos HTML injetados dinamicamente pela SPA.
│       ├── home.html     # Fica em public/ para o Vite copiar o conteúdo
│       ├── projetos.html # para dist/ sem processar — os arquivos são
│       └── cadastro.html # buscados via fetch() em tempo de execução,
│                          # não referenciados no HTML, então o Vite não
│                          # os detectaria automaticamente fora de public/.
├── img/
│   └── logo.png, logo.webp
└── js/
    ├── main.js            # Ponto de entrada da aplicação
    └── modules/
        ├── router.js         # Navegação SPA (History API)
        ├── templates.js      # Geração de elementos DOM a partir de dados
        ├── formValidacao.js  # Validação, máscaras e envio do formulário
        └── storage.js        # Persistência via localStorage
```

> A pasta `html/` que existia nas Práticas anteriores foi removida: o `index.html` foi movido para a raiz do projeto na Prática IV, pois o Vite precisa que os arquivos referenciados por caminhos absolutos (`/js/...`, `/css/...`) e a pasta `public/` estejam todos a partir de uma raiz única — ter `index.html` dentro de `html/` enquanto `css/`, `js/` e `img/` ficavam na raiz causava conflitos de caminho entre o ambiente de desenvolvimento e o build de produção.

## ⚙️ Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior) e npm, para rodar o Vite
- Navegador atualizado (Chrome, Firefox, Edge ou Brave)
- Conexão com a internet (necessária para carregar a fonte e a biblioteca Day.js via CDN)

> ⚠️ **Importante:** por usar `fetch()` para carregar os templates dinamicamente e por depender da pasta `public/` do Vite para servir esses templates corretamente, o projeto **precisa ser servido via Vite** (`npm run dev`) para funcionar como esperado. Abrir o `index.html` diretamente pelo navegador (protocolo `file://`) ou usar apenas um servidor estático simples sem build não é suficiente, pois os arquivos de `public/templates/` só são organizados corretamente pelo processo do Vite.

## 🔧 Instalação e execução local

1. Clone o repositório:
   ```
   git clone https://github.com/tadashisakaidev/instituto-esperanca.git
   cd instituto-esperanca
   ```
2. Instale as dependências:
   ```
   npm install
   ```
3. Rode o servidor de desenvolvimento:
   ```
   npm run dev
   ```
4. O terminal mostrará o endereço local, geralmente `http://localhost:5173/`. Abra essa URL no navegador.

Não há dependências de runtime além do Vite — o código da aplicação em si usa apenas JavaScript nativo (ES6 Modules) e uma única biblioteca externa (Day.js) carregada via CDN.

## 📦 Build e deploy

Para gerar a versão de produção (minificada, otimizada):

```
npm run build
```

Isso cria a pasta `dist/` com os arquivos finais. Para testar essa versão localmente antes de publicar:

```
npm run preview
```

O deploy é feito na **Vercel**, conectada ao repositório GitHub: todo push na branch `main` dispara automaticamente um novo build e publicação (CI/CD). A Vercel detecta o projeto Vite pelo `package.json`, roda `npm run build` e publica o conteúdo de `dist/`.

## 🌳 Estratégia de versionamento (GitFlow)

- **`main`**: versões estáveis, prontas para produção — conectada ao deploy automático na Vercel
- **`develop`**: linha de integração do desenvolvimento contínuo
- **`feature/*`**: uma branch por funcionalidade nova (ex: `feature/aria-formulario`)
- **`hotfix/*`**: correções urgentes aplicadas diretamente sobre a `main`

As mensagens de commit seguem o padrão **Conventional Commits** (`feat:`, `fix:`, `docs:`, `style:`, `chore:`).

## ♿ Acessibilidade

O projeto segue as diretrizes **WCAG 2.1 (Nível AA)**, incluindo:
- Skip link para navegação por teclado
- Atributos ARIA (`aria-live`, `aria-label`, `aria-expanded`, `role="dialog"`)
- Foco visível reforçado em todos os elementos interativos
- Movimentação automática de foco ao trocar de rota na SPA
- Modo escuro (`prefers-color-scheme: dark`) com contraste mínimo de 4.5:1 validado via WebAIM Contrast Checker

## 📄 Licença

Projeto acadêmico, desenvolvido para fins educacionais.

## 👤 Autor

Desenvolvido por Tadashi Sakairi como parte da disciplina de Desenvolvimento Front-end.
