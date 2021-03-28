/**
 * Simula o envio de uma venda para um servidor fictÃ­cio.
 * Por simplificaÃ§Ã£o, nÃ£o usa Promises.
 * Pode lanÃ§ar exceÃ§Ã£o.
 *
 * @param {Venda} venda
 * @throws Error
 */
export function enviarVenda(venda) {
    console.log('Enviando venda ', venda);
    if (Math.random() % 2 == 0) {
        throw new Error('Houve algum erro no processamento do servidor.');
    }
}