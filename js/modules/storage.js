// ===========================
// STORAGE - Funções de leitura/escrita no localStorage
// Centraliza o acesso ao armazenamento local do navegador
// ===========================

// Integração com a biblioteca externa Day.js, via CDN em formato de
// módulo ES (ESM), para formatação de datas de forma legível ao usuário
import dayjs from "https://esm.sh/dayjs@1.11.10";
import "https://esm.sh/dayjs@1.11.10/locale/pt-br";
dayjs.locale("pt-br");

const CHAVE_CADASTROS = "institutoEsperanca_cadastros";
const CHAVE_RASCUNHO = "institutoEsperanca_rascunhoCadastro";

/**
 * Salva um novo cadastro na lista já existente no localStorage
 */
export function salvarCadastro(dadosCadastro) {
    const cadastrosExistentes = obterCadastros();
    cadastrosExistentes.push({
        ...dadosCadastro,
        dataEnvio: new Date().toISOString()
    });
    localStorage.setItem(CHAVE_CADASTROS, JSON.stringify(cadastrosExistentes));
}

/**
 * Formata a data de envio (armazenada em ISO 8601) para um
 * formato legível em português, usando o Day.js
 */
export function formatarDataEnvio(dataIso) {
    return dayjs(dataIso).format("DD [de] MMMM [de] YYYY [às] HH:mm");
}

/**
 * Retorna todos os cadastros salvos (ou array vazio se não houver nenhum)
 */
export function obterCadastros() {
    const dados = localStorage.getItem(CHAVE_CADASTROS);
    return dados ? JSON.parse(dados) : [];
}

/**
 * Salva o progresso do formulário como rascunho,
 * permitindo que o usuário continue de onde parou
 * caso feche a aba acidentalmente
 */
export function salvarRascunho(dadosParciais) {
    localStorage.setItem(CHAVE_RASCUNHO, JSON.stringify(dadosParciais));
}

/**
 * Recupera o rascunho salvo, se existir
 */
export function obterRascunho() {
    const dados = localStorage.getItem(CHAVE_RASCUNHO);
    return dados ? JSON.parse(dados) : null;
}

/**
 * Limpa o rascunho (chamado após envio bem-sucedido do formulário)
 */
export function limparRascunho() {
    localStorage.removeItem(CHAVE_RASCUNHO);
}
