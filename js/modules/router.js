// ===========================
// ROUTER - Controla a navegação SPA
// Usa a History API para trocar de "página"
// sem recarregar o documento
// ===========================

const rotas = {
    "/": "home.html",
    "/projetos": "projetos.html",
    "/cadastro": "cadastro.html"
};

const containerPrincipal = document.getElementById("app");

// Caminho absoluto da pasta de templates, capturado UMA ÚNICA VEZ
// a partir da URL original de carregamento do index.html (antes de
// qualquer pushState alterar window.location). Isso evita que o fetch
// quebre depois que a URL virtual muda para /projetos ou /cadastro.
const BASE_TEMPLATES = window.location.pathname.replace(/[^/]*$/, "") + "templates/";

/**
 * Busca o template HTML correspondente à rota
 * e injeta dentro da div principal (#app)
 */
async function renderizarRota(caminho) {
    const arquivoTemplate = rotas[caminho] || rotas["/"];

    try {
        const resposta = await fetch(`${BASE_TEMPLATES}${arquivoTemplate}`);

        if (!resposta.ok) {
            throw new Error(`Template não encontrado: ${arquivoTemplate}`);
        }

        const html = await resposta.text();
        containerPrincipal.innerHTML = html;

        atualizarMenuAtivo(caminho);

        // Avisa outros módulos (ex: formValidacao.js) que a rota mudou
        document.dispatchEvent(new CustomEvent("rotaCarregada", {
            detail: { caminho }
        }));

    } catch (erro) {
        containerPrincipal.innerHTML = `<p>Erro ao carregar a página: ${erro.message}</p>`;
        console.error(erro);
    }
}

/**
 * Navega para uma nova rota, atualizando a URL
 * via History API (pushState), sem recarregar a página
 */
function navegarPara(caminho) {
    window.history.pushState({}, "", caminho);
    renderizarRota(caminho);
}

/**
 * Marca visualmente o item de menu correspondente à rota atual
 */
function atualizarMenuAtivo(caminho) {
    document.querySelectorAll("nav a").forEach(link => {
        link.classList.toggle("ativo", link.getAttribute("data-rota") === caminho);
    });
}

/**
 * Intercepta cliques em links de navegação internos,
 * impedindo o comportamento padrão (recarregar a página)
 */
function interceptarLinks() {
    document.body.addEventListener("click", (evento) => {
        const link = evento.target.closest("[data-rota]");
        if (link) {
            evento.preventDefault();
            const caminho = link.getAttribute("data-rota");
            navegarPara(caminho);

            // Fecha o menu mobile após navegar (se estiver aberto)
            const menuToggle = document.getElementById("menu-toggle");
            if (menuToggle) menuToggle.checked = false;
        }
    });
}

/**
 * Escuta os botões "voltar/avançar" do navegador
 */
function escutarNavegacaoNavegador() {
    window.addEventListener("popstate", () => {
        renderizarRota(window.location.pathname);
    });
}

/**
 * Inicializa o roteador
 */
export function iniciarRouter() {
    interceptarLinks();
    escutarNavegacaoNavegador();
    renderizarRota(window.location.pathname);
}
