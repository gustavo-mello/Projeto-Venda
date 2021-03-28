import produtos from './produtos.js'
import servicos from './servicos.js'
import { Produto } from './produto.js';
import { Servico } from './servivo.js';
import { DominioException } from './dominio-exception.js'

export class ItemVenda {
    constructor(quantidade, codigo) {
        this.setQuantidade(quantidade);
        this.comercializavel = pesquisaComercializavel(codigo);
    }

    setQuantidade(quantidade) {
        this.quantidade = quantidade;
    }

    getQuantidade() {
        return this.quantidade;
    }

    getComercializavel() {
        return this.comercializavel;
    }

    subtotalItemVenda() {
        return (this.getQuantidade() * this.comercializavel.getPreco());
    }
}

function pesquisaComercializavel(codigo) {
    let nao_encontrado = true;
    if (codigo.substring(0, 1) == 'P') {
        for (let produ of produtos) {
            if (codigo == produ['codigo']) {
                let p = new Produto(produ['codigo'], produ['descricao'], produ['preco'], produ['imagem'], produ['estoque']);
                return p;
            } else {
                nao_encontrado = false;
            }
        }
        if (nao_encontrado == false) {
            throw new DominioException('Codigo não encontrado.')
        }
    } else if (codigo.substring(0, 1) == 'S') {
        for (let servi of servicos) {
            if (codigo == servi['codigo']) {
                let s = new Servico(servi['codigo'], servi['descricao'], servi['preco'], servi['duracaoEmMinutos'])
                return s;
            } else {
                nao_encontrado = false;
            }
        }
        if (nao_encontrado == false) {
            throw new DominioException('Codigo não encontrado.')
        }
    } else {
        throw new DominioException('Codigo não encontrado.')
    }
}