# Instituto Esperança — Plataforma Web

Aplicação web (Single Page Application) desenvolvida para uma organização fictícia do terceiro setor, permitindo à ONG divulgar seus projetos sociais, captar recursos e cadastrar doadores e voluntários.

Projeto desenvolvido como parte das Experiências Práticas I a IV da disciplina de Desenvolvimento Front-end.

## 🚀 Tecnologias utilizadas

- **HTML5** semântico (header, nav, main, section, article, footer)
- **CSS3**: variáveis nativas (Design System), Grid de 12 colunas, Flexbox, 5 breakpoints responsivos
- **JavaScript (ES6 Modules)**: SPA com History API, templates dinâmicos, validação de formulários, localStorage
- **Day.js**: formatação de datas (via CDN, integração externa)
- **Git & GitHub**: versionamento seguindo o padrão GitFlow

## 📁 Estrutura do projeto

```
projeto-ong-spa/
├── css/
│   ├── reset.css       # Normalização de estilos do navegador
│   └── style.css       # Design System, Grid, Flexbox, componentes
├── html/
│   ├── index.html      # Shell da SPA
│   └── templates/      # Fragmentos HTML injetados dinamicamente
│       ├── home.html
│       ├── projetos.html
│       └── cadastro.html
├── img/
│   └── logo.png
└── js/
    ├── main.js          # Ponto de entrada da aplicação
    └── modules/
        ├── router.js         # Navegação SPA (History API)
        ├── templates.js       # Geração de elementos DOM a partir de dados
        ├── formValidacao.js   # Validação, máscaras e envio do formulário
        └── storage.js         # Persistência via localStorage
```

## ⚙️ Pré-requisitos

- Navegador atualizado (Chrome, Firefox, Edge ou Brave)
- VS Code com a extensão **Live Server** instalada
- Conexão com a internet (necessária para carregar a fonte e a biblioteca Day.js via CDN)

> ⚠️ **Importante:** por usar `fetch()` para carregar os templates dinamicamente, o projeto **não funciona** abrindo o `index.html` diretamente pelo navegador (protocolo `file://`). É obrigatório servir os arquivos por HTTP.

## 🔧 Instalação e execução local

1. Clone o repositório:
   ```
   git clone https://github.com/tadashisakaidev/instituto-esperanca.git
   ```
2. Abra a pasta do projeto no VS Code.
3. Clique com o botão direito no arquivo `html/index.html`.
4. Selecione **"Open with Live Server"**.
5. O navegador abrirá automaticamente em `http://127.0.0.1:5500/html/index.html`.

Não há dependências para instalar via `npm` — o projeto usa apenas JavaScript nativo (ES6 Modules) e uma única biblioteca externa carregada via CDN.

## 🌳 Estratégia de versionamento (GitFlow)

- **`main`**: versões estáveis, prontas para produção
- **`develop`**: linha de integração do desenvolvimento contínuo
- **`feature/*`**: uma branch por funcionalidade nova (ex: `feature/corrige-footer`)
- **`hotfix/*`**: correções urgentes aplicadas diretamente sobre a `main`

As mensagens de commit seguem o padrão **Conventional Commits** (`feat:`, `fix:`, `docs:`, `style:`, `chore:`).

## ♿ Acessibilidade

O projeto segue as diretrizes **WCAG 2.1 (Nível AA)**, incluindo:
- Skip link para navegação por teclado
- Atributos ARIA (`aria-live`, `aria-label`, `role="dialog"`)
- Foco visível reforçado em todos os elementos interativos
- Movimentação automática de foco ao trocar de rota na SPA

## 📄 Licença

Projeto acadêmico, desenvolvido para fins educacionais.

## 👤 Autor

Desenvolvido por Tadashi Sakairi como parte da disciplina de Desenvolvimento Front-end.
