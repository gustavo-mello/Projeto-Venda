import { Comercializavel } from "./comercializavel.js";

export class Servico extends Comercializavel {
    constructor(codigo, descricao, preco, duracaoEmMinutos) {
        super(codigo, descricao, preco);
        this.duracaoEmMinutos = duracaoEmMinutos;
    }

    setDuracaoEmMinutos(duracaoEmMinutos) {
        this.duracaoEmMinutos = duracaoEmMinutos;
    }

    getDuracaoEmMinutos() {
        return this.duracaoEmMinutos;
    }
}