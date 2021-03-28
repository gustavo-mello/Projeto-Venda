import { ItemVenda } from './item-venda.js';
import { Venda } from './venda.js';
import { DominioException } from './dominio-exception.js'
import { enviarVenda } from './envio-venda.js';


const array_item = [];


window.addEventListener('load', function() {

    const quantidade = document.getElementById('quantidade');
    quantidade.addEventListener('blur', function() {
        if (quantidade.value <= 0) {
            quantidade.value = 1;
        }
    });


    const codigo = document.getElementById('codigo');
    const descricao = document.getElementById('descricao');
    const duracao = document.getElementById('duracao');
    const imagem = document.getElementById('imagem');
    const img = document.createElement('img');


    codigo.addEventListener('blur', function() {
        try {
            const item_venda = new ItemVenda(quantidade.value, codigo.value);
            if (codigo.value.substring(0, 1) == 'P') {
                descricao.value = item_venda.getComercializavel().getDescricao() + ' - R$' + item_venda.getComercializavel().getPreco();
                img.src = './img/' + item_venda.getComercializavel().getImagem();
                imagem.appendChild(img);
                duracao.innerHTML = 'N/A';
            } else if (codigo.value.substring(0, 1) == 'S') {
                descricao.value = item_venda.getComercializavel().getDescricao() + ' - R$' + item_venda.getComercializavel().getPreco();
                img.src = '';
                imagem.appendChild(img);
                duracao.innerHTML = item_venda.getComercializavel().getDuracaoEmMinutos() + 'minutos';
            }
        } catch (e) {
            alert(e);
        }
    });

    const venda = new Venda(percentual.value, desconto.innerHTML);

    function atualuzaVenda() {
        const subtotal = document.getElementById('subtotal-venda');
        const percentual = document.getElementById('percentual');
        const desconto = document.getElementById('desconto');
        const total = document.getElementById('total-venda');

        venda.concederDesconto(percentual.value);
        let subT = venda.subtotal(array_item);
        venda.setDescontoValor(subT * venda.getDescontoPercentual())
        subtotal.innerText = subT;
        desconto.innerText = venda.getDescontoValor();
        total.innerHTML = venda.total();
    }

    percentual.addEventListener('blur', function() {
        if (percentual.value < 0) {
            percentual.value = 0;
        } else {
            if (percentual.value > 15) {
                percentual.value = 15;
            }
        }
        atualuzaVenda();
    });

    const adicionar = document.getElementById('adicionar');
    adicionar.addEventListener('click', function() {
        try {
            const item_venda = new ItemVenda(quantidade.value, codigo.value);
            if (codigo.value.substring(0, 1) == 'P' && item_venda.getComercializavel().getEstoque() < quantidade.value) {
                throw new DominioException('Quantidade indisponivel de estoque. Disponivél:' + item_venda.getComercializavel().getEstoque());
            } else {
                const corpoTabela = document.querySelector('#item tbody');

                const linha1 = document.createElement('tr');
                const linha1cel1 = document.createElement('td');
                linha1cel1.innerHTML = item_venda.getComercializavel().getCodigo();
                linha1.appendChild(linha1cel1);

                const linha1cel2 = document.createElement('td');
                linha1cel2.innerHTML = item_venda.getComercializavel().getDescricao();
                linha1.appendChild(linha1cel2);

                const linha1cel3 = document.createElement('td');
                linha1cel3.innerHTML = item_venda.getComercializavel().getPreco();
                linha1.appendChild(linha1cel3);

                const linha1cel4 = document.createElement('td');
                const input = document.createElement('input');
                input.type = 'number';
                input.value = quantidade.value;
                linha1cel4.appendChild(input);
                linha1.appendChild(linha1cel4);

                const linha1cel5 = document.createElement('td');
                linha1cel5.innerHTML = item_venda.subtotalItemVenda();
                linha1.appendChild(linha1cel5);

                const linha1cel6 = document.createElement('td');
                const butao_remover = document.createElement('button');
                butao_remover.innerHTML = 'Remover';
                linha1cel6.appendChild(butao_remover);
                linha1.appendChild(linha1cel6);

                corpoTabela.appendChild(linha1);

                venda.adicionar(array_item, quantidade.value, codigo.value);

                atualuzaVenda();

                butao_remover.addEventListener('click', function() {
                    corpoTabela.removeChild(linha1);
                    venda.remover(array_item, item_venda.getComercializavel().getCodigo());
                    atualuzaVenda();
                });

                input.addEventListener('blur', function() {
                    try {
                        if (item_venda.getComercializavel().getCodigo().substring(0, 1) == 'P' && item_venda.getComercializavel().getEstoque() < input.value) {
                            throw new DominioException('Quantidade indisponivel de estoque. Disponivél:' + item_venda.getComercializavel().getEstoque());
                        } else {
                            if (input.value <= 0) {
                                input.value = 1;
                                throw new DominioException('Estoque não pode ser 0 nem negativo.');
                            } else {

                                item_venda.setQuantidade(input.value);
                                linha1cel5.innerHTML = item_venda.subtotalItemVenda();
                                venda.atualizar_venda(array_item, item_venda);
                                atualuzaVenda();
                            }
                        }
                    } catch (e) {
                        alert(e);
                    }
                })
            }
        } catch (e) {
            alert(e);
        }

    });
});

const concluir = document.getElementById('concluir');
concluir.addEventListener('click', function() {
    try {
        if (array_item.length == 0 || array_item.length == []) {
            throw new DominioException('Não pode comcluir uma venda sem nenhum item selecionado.');
        }
        enviarVenda(array_item);
        alert("Venda concluida com SUCESSO.")
        window.location.reload();
    } catch (e) {
        alert(e);
        window.location.reload();
    }



});