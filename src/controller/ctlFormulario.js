import * as repo from "./ctlRepositorioBase";
import { avaliacao } from "./firebase";
const Swal = require('sweetalert2')

repo.ativarLog('avaliacao', avaliacao);
var listarTodos = async () => repo.listarTodos(avaliacao)
var bucarPorId = async (id) => repo.bucarPorId(avaliacao, id)

var incluir = (dados) => {
    return repo.incluir(avaliacao, dados)
        .then(() => {
            if (dados.resultado.risco == 'E') {
                Swal.fire({
                    title: 'Está avaliação foi categorizada como risco Elevado',
                    text: "Deseja fazer uma Denúncia de agressão ?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sim, fazer denúncia!',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.href = '/Denuncia';
                    }
                })
            }
        })
}

var alterar = (id, dados) => {
    return repo.alterar(avaliacao, id, dados)
        .then(() => {
            if (dados.resultado.risco == 'E') {
                Swal.fire({
                    title: 'Está avaliação foi categorizada como risco Elevado',
                    text: "Deseja fazer uma Denúncia de agressão ?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sim, fazer denúncia!',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.href = '/Denuncia';
                    }
                })
            }
        })
}

var excluir = (id) => repo.excluir(avaliacao, id)

export {
    listarTodos,
    bucarPorId,
    incluir,
    alterar,
    excluir
}