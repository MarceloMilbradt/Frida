import * as repo from "./ctlRepositorioBase";
import { denunciaAnonima } from "./firebase";
import { logout, loginAnonimo } from './AuthService';
const Swal = require('sweetalert2')

repo.ativarLog('denunciaAnonima', denunciaAnonima);
const listarTodos = async () => repo.listarOrderBy(denunciaAnonima, 'data', 'desc')
const bucarPorId = async (id) => repo.bucarPorId(denunciaAnonima, id)

const listarUltimosN = async n => {
    let date = new Date();
    date.setMonth(date.getMonth() - 1)
    let list = await denunciaAnonima.where("data", ">=", date).orderBy('data', 'desc').limit(n ?? 5).get();
    list = list.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return list
}


const incluir = async function incluir(dados) {
    return denunciaAnonima
        .add(dados)
        .then(() => {
            Swal.fire("Salvo!", "A sua denuncia foi salvo com sucesso!", "success");
        })
        .catch((error) => {
            console.error("Erro ao incluir avaliação", error);
            Swal.fire("Erro!", "Houve um problema ao tentar incluir a denuncia!", "error");
        });
}

const alterar = (id, dados) => repo.alterar(denunciaAnonima, id, dados)
const excluir = (id) => repo.excluir(denunciaAnonima, id)

const buscarStatusDenuncia = () => [
    {
        value: 0,
        descricao: "Em Andamento",
        icon: "exclamation",
        color: "yellow",
    },
    {
        value: 1,
        descricao: "Confirmado",
        icon: "check",
        color: "green",
    },
    {
        value: 2,
        descricao: "Negado",
        icon: "ban",
        color: "red",
    }
];

export {
    listarTodos,
    bucarPorId,
    incluir,
    alterar,
    excluir,
    listarUltimosN,
    buscarStatusDenuncia
}