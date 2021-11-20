import * as repo from "./ctlRepositorioBase";
import { ajuda } from "./firebase";
import { logout, loginAnonimo } from './AuthService';
const Swal = require('sweetalert2')

repo.ativarLog('ajuda', ajuda);
const listarTodos = async () => repo.listarOrderBy(ajuda, 'data', 'desc')
const bucarPorId = async (id) => repo.bucarPorId(ajuda, id)

const listarUltimosN = async n => {
    let date = new Date();
    date.setMonth(date.getMonth() - 1)
    let list = await ajuda.where("data", ">=", date).orderBy('data', 'desc').limit(n ?? 5).get();
    list = list.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return list
}


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

const excluir = (id) => repo.excluir(ajuda, id)

// const alterar = (id, dados) => repo.alterar(ajuda, id, dados)
var alterar = function alterar(id, doc) {
    return ajuda.doc(id).update(doc)
}

const buscarStatusAjuda = () => [
    {
        value: 0,
        descricao: "Aguardando Ação",
        icon: "exclamation",
        color: "yellow",
    },
    {
        value: 1,
        descricao: "Atendido",
        icon: "check",
        color: "green",
    },
    {
        value: 2,
        descricao: "Arquivado",
        icon: "ban",
        color: "red",
    },
];

export {
    listarTodos,
    bucarPorId,
    incluir,
    alterar,
    excluir,
    listarUltimosN,
    buscarStatusAjuda
}