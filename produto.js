import { Comercializavel } from "./comercializavel.js";

export class Produto extends Comercializavel {
    constructor(codigo, descricao, preco, imagem, estoque) {
        super(codigo, descricao, preco);
        this.imagem = imagem;
        this.estoque = estoque;
    }

    setImagem(imagem) {
        this.imagem = imagem;
    }
    getImagem() {
        return this.imagem;
    }

    setEstoque(estoque) {
        this.estoque = estoque;
    }
    getEstoque() {
        return this.estoque;
    }
}