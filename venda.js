import { ItemVenda } from "./item-venda.js";
import { DominioException } from './dominio-exception.js'

export class Venda {
    sub_total = 0;
    constructor(descontoPercentual, descontoValor) {
        this.setDescontoPercentual(descontoPercentual);
        this.setDescontoValor(descontoValor);

    }

    setDescontoPercentual(descontoPercentual) {
        this.descontoPercentual = descontoPercentual;
    }

    getDescontoPercentual() {
        return this.descontoPercentual;
    }

    setDescontoValor(descontoValor) {
        this.descontoValor = descontoValor;
    }

    getDescontoValor() {
        return this.descontoValor;
    }


    adicionar(array_item, quantidade, codigo) {
        this.item_venda = new ItemVenda(quantidade, codigo);
        array_item.push(this.item_venda);
        return array_item;
    }

    atualizar_venda(array_item, comercializavel) {
        let atualizado = true;
        for (let i = 0; i < array_item.length; i++) {
            if (array_item[i].getComercializavel().getCodigo() == comercializavel.getComercializavel().getCodigo()) {
                array_item.splice(i, 1, comercializavel);
                atualizado = true;
                break;
            } else {
                atualizado = false;
            }
        }
        if (atualizado == false) {
            throw new DominioException('Erro ao atualizar quantidade.')
        }
        return array_item;
    }

    remover(array_item, codigo) {
        let removido = true;
        for (let i = 0; i < array_item.length; i++) {
            if (array_item[i].getComercializavel().getCodigo() == codigo) {
                array_item.splice(i, 1);
                removido = true;
            } else {
                removido = false;
            }
        }
        if (removido == false) {
            throw new DominioException('Erro ao remover.')
        }
        return array_item;
    }

    subtotal(array) {
        this.sub_total = 0;
        for (let sub of array) {
            this.sub_total += sub.subtotalItemVenda();
        }
        return this.sub_total;
    }


    concederDesconto(percentual) {
        this.setDescontoPercentual(percentual / 100);
    }

    total() {
        return this.sub_total - this.getDescontoValor();
    }
}