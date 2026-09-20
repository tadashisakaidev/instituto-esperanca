// ===========================
// MAIN - Ponto de entrada da aplicação
// Inicializa o router e orquestra os demais módulos
// ===========================

import { iniciarRouter } from "./modules/router.js";
import { iniciarFormularioCadastro } from "./modules/formValidacao.js";
import { configurarModal, renderizarListaProjetos } from "./modules/templates.js";

document.addEventListener("DOMContentLoaded", () => {
    iniciarRouter();
    configurarModal();
});

// Sempre que uma nova rota terminar de ser renderizada,
// o router dispara este evento. Aqui reagimos a ele para
// religar a lógica de cada página, já que o HTML injetado
// é novo a cada troca de rota (os listeners antigos "somem" junto)
document.addEventListener("rotaCarregada", (evento) => {
    if (evento.detail.caminho === "/cadastro") {
        iniciarFormularioCadastro();
    }
    if (evento.detail.caminho === "/projetos") {
        renderizarListaProjetos();
    }
});
