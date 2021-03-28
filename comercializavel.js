export class Comercializavel {
    constructor(codigo, descricao, preco) {
        this.codigo = codigo;
        this.descricao = descricao;
        this.preco = preco;
    }

    setCodigo(codigo) {
        this.codigo = codigo;
    }

    getCodigo() {
        return this.codigo;
    }

    setDescricao(descricao) {
        this.descricao = descricao;
    }

    getDescricao() {
        return this.descricao;
    }

    setPreco(preco) {
        this.preco = preco;
    }

    getPreco() {
        return this.preco;
    }


}