// ===========================
// TEMPLATES - Sistema de templates em JavaScript
// Gera elementos repetitivos do DOM a partir de um array
// de dados de origem, evitando reescrever marcação HTML manualmente
// ===========================

/**
 * "Fonte de dados" dos projetos. Em uma aplicação real, isso
 * normalmente viria de uma API ou de um arquivo JSON externo.
 * Aqui está centralizado em um array de objetos, que é a estrutura
 * consumida pela função de template abaixo.
 */
const dadosProjetos = [
    {
        titulo: "Educação para Todos",
        descricao: "Oferece reforço escolar e aulas de informática básica para crianças e adolescentes de comunidades carentes, com o objetivo de reduzir a evasão escolar.",
        categoria: "voluntario"
    },
    {
        titulo: "Horta Comunitária",
        descricao: "Promove segurança alimentar e geração de renda por meio do cultivo coletivo de hortas em bairros periféricos.",
        categoria: "voluntario"
    },
    {
        titulo: "Capacitação Profissional",
        descricao: "Cursos gratuitos de qualificação profissional para jovens e adultos em situação de vulnerabilidade social.",
        categoria: "doacao"
    }
];

/**
 * TEMPLATE: recebe um único objeto de dados e retorna
 * o elemento DOM correspondente, construído via document.createElement.
 * Essa função é o "molde" reaproveitado para cada item do array.
 */
function criarCartaoProjeto({ titulo, descricao, categoria }) {
    const article = document.createElement("article");

    const badge = document.createElement("span");
    badge.className = `badge badge--${categoria}`;
    badge.textContent = categoria === "voluntario" ? "Voluntariado" : "Doação";

    const h3 = document.createElement("h3");
    h3.textContent = titulo;

    const p = document.createElement("p");
    p.textContent = descricao;

    article.append(badge, h3, p);
    return article;
}

/**
 * RENDERIZAÇÃO EM LOTE: percorre o array de dados com .forEach(),
 * chama o template para cada item, e injeta o resultado no
 * contêiner-alvo usando um DocumentFragment — que agrupa os
 * elementos em memória antes de tocar o DOM real uma única vez,
 * evitando múltiplos reflows/repaints do navegador.
 */
export function renderizarListaProjetos() {
    const container = document.getElementById("projetos-atuais-lista");
    if (!container) return; // só executa quando a rota /projetos está ativa

    const fragmento = document.createDocumentFragment();

    dadosProjetos.forEach(projeto => {
        const cartao = criarCartaoProjeto(projeto);
        fragmento.appendChild(cartao);
    });

    container.innerHTML = ""; // limpa qualquer conteúdo estático anterior
    container.appendChild(fragmento);
}

/**
 * Controla a abertura/fechamento do modal de confirmação
 * via classe CSS, em vez de :target (agora feito via JS
 * para se integrar ao fluxo de envio do formulário)
 */
export function configurarModal() {
    const modal = document.getElementById("modal-confirmacao");
    const botaoFechar = document.getElementById("fechar-modal");

    if (!modal || !botaoFechar) return;

    botaoFechar.addEventListener("click", () => {
        modal.classList.remove("aberto");
    });

    // Fecha o modal também ao clicar fora da caixa de diálogo
    modal.addEventListener("click", (evento) => {
        if (evento.target === modal) {
            modal.classList.remove("aberto");
        }
    });
}
