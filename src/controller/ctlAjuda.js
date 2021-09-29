import * as repo from "./ctlRepositorioBase";
import { ajuda } from "./firebase";
import {logout, loginAnonimo} from './AuthService';
const Swal = require('sweetalert2')

repo.ativarLog('ajuda', ajuda);
const listarTodos = async () => repo.listarTodos(ajuda)
const bucarPorId = async (id) => repo.bucarPorId(ajuda, id)

const incluir = async function incluir(dados) {
    await loginAnonimo();
    return ajuda
        .add(dados)
        .then(() => {
            logout()
            Swal.fire("Salvo!", "O pedido de ajuda foi salvo com sucesso!", "success");
        })
        .catch((error) => {
            console.error("Erro ao incluir avaliação", error);
            Swal.fire("Erro!", "Houve um problema ao tentar incluir o pedido de ajuda!", "error");
        });
}

const alterar = (id, dados) => repo.alterar(ajuda, id, dados)
const excluir = (id) => repo.excluir(ajuda, id)

export {
    listarTodos,
    bucarPorId,
    incluir,
    alterar,
    excluir
}