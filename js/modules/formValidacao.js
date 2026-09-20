// ===========================
// FORM VALIDAÇÃO - Validação do formulário de cadastro em JavaScript
// Complementa as validações nativas do HTML5 (required, pattern, type)
// com feedback visual imediato e regras adicionais
// ===========================

import { salvarCadastro, salvarRascunho, obterRascunho, limparRascunho } from "./storage.js";

/**
 * Aplica máscara de CPF conforme o usuário digita: 000.000.000-00
 */
function mascararCPF(valor) {
    return valor
        .replace(/\D/g, "")
        .slice(0, 11)
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

/**
 * Aplica máscara de telefone: (00) 00000-0000
 */
function mascararTelefone(valor) {
    return valor
        .replace(/\D/g, "")
        .slice(0, 11)
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d{4})$/, "$1-$2");
}

/**
 * Aplica máscara de CEP: 00000-000
 */
function mascararCEP(valor) {
    return valor
        .replace(/\D/g, "")
        .slice(0, 8)
        .replace(/(\d{5})(\d{1,3})$/, "$1-$2");
}

/**
 * Valida um campo individual usando a API nativa de Constraint Validation
 * e aplica classes visuais + mensagem de erro
 */
function validarCampo(campo) {
    const mensagemErro = document.querySelector(`[data-erro-de="${campo.name}"]`);
    const valido = campo.checkValidity();

    campo.classList.toggle("campo-valido", valido && campo.value !== "");
    campo.classList.toggle("campo-invalido", !valido);

    if (mensagemErro) {
        mensagemErro.textContent = valido ? "" : obterMensagemPersonalizada(campo);
    }

    return valido;
}

/**
 * Gera mensagens de erro mais amigáveis do que o padrão do navegador
 */
function obterMensagemPersonalizada(campo) {
    if (campo.validity.valueMissing) return "Este campo é obrigatório.";
    if (campo.validity.patternMismatch) {
        const exemplos = {
            cpf: "Formato esperado: 000.000.000-00",
            telefone: "Formato esperado: (00) 00000-0000",
            cep: "Formato esperado: 00000-000"
        };
        return exemplos[campo.name] || "Formato inválido.";
    }
    if (campo.validity.typeMismatch) return "Formato inválido.";
    if (campo.validity.tooShort) return `Mínimo de ${campo.minLength} caracteres.`;
    return "Verifique este campo.";
}

/**
 * Valida o formulário inteiro, campo a campo
 */
function validarFormularioCompleto(formulario) {
    const campos = formulario.querySelectorAll("input, select, textarea");
    let formularioValido = true;

    campos.forEach(campo => {
        if (campo.hasAttribute("required") || campo.value !== "") {
            const campoValido = validarCampo(campo);
            if (!campoValido) formularioValido = false;
        }
    });

    return formularioValido;
}

/**
 * Configura as máscaras de entrada em tempo real
 */
function configurarMascaras(formulario) {
    const campoCPF = formulario.querySelector("#cpf");
    const campoTelefone = formulario.querySelector("#telefone");
    const campoCEP = formulario.querySelector("#cep");

    if (campoCPF) {
        campoCPF.addEventListener("input", () => {
            campoCPF.value = mascararCPF(campoCPF.value);
        });
    }
    if (campoTelefone) {
        campoTelefone.addEventListener("input", () => {
            campoTelefone.value = mascararTelefone(campoTelefone.value);
        });
    }
    if (campoCEP) {
        campoCEP.addEventListener("input", () => {
            campoCEP.value = mascararCEP(campoCEP.value);
        });
    }
}

/**
 * Restaura um rascunho salvo anteriormente, se existir
 */
function restaurarRascunho(formulario) {
    const rascunho = obterRascunho();
    if (!rascunho) return;

    Object.keys(rascunho).forEach(nomeCampo => {
        const campo = formulario.elements[nomeCampo];
        if (campo) campo.value = rascunho[nomeCampo];
    });
}

/**
 * Coleta os dados atuais do formulário em um objeto simples
 */
function coletarDadosFormulario(formulario) {
    const formData = new FormData(formulario);
    return Object.fromEntries(formData.entries());
}

/**
 * Exibe um alerta (sucesso ou erro) na tela
 */
function exibirAlerta(tipo) {
    const alertaSucesso = document.getElementById("alerta-sucesso");
    const alertaErro = document.getElementById("alerta-erro");

    if (alertaSucesso) alertaSucesso.hidden = tipo !== "sucesso";
    if (alertaErro) alertaErro.hidden = tipo !== "erro";
}

/**
 * Abre o modal de confirmação de cadastro
 */
function abrirModalConfirmacao() {
    const modal = document.getElementById("modal-confirmacao");
    if (modal) modal.classList.add("aberto");
}

/**
 * Inicializa toda a lógica do formulário de cadastro:
 * validação em tempo real, máscaras, rascunho e envio
 */
export function iniciarFormularioCadastro() {
    const formulario = document.getElementById("form-cadastro-ong");
    if (!formulario) return; // só executa quando a rota /cadastro está ativa

    configurarMascaras(formulario);
    restaurarRascunho(formulario);

    // Valida cada campo assim que o usuário sai dele (blur)
    formulario.querySelectorAll("input, select, textarea").forEach(campo => {
        campo.addEventListener("blur", () => validarCampo(campo));

        // Salva rascunho a cada alteração
        campo.addEventListener("input", () => {
            salvarRascunho(coletarDadosFormulario(formulario));
        });
    });

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const formularioValido = validarFormularioCompleto(formulario);

        if (!formularioValido) {
            exibirAlerta("erro");
            return;
        }

        const dados = coletarDadosFormulario(formulario);
        salvarCadastro(dados);
        limparRascunho();

        exibirAlerta("sucesso");
        formulario.reset();
        formulario.querySelectorAll(".campo-valido").forEach(campo => {
            campo.classList.remove("campo-valido");
        });

        abrirModalConfirmacao();
    });
}
