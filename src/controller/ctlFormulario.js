import * as repo from "./ctlRepositorioBase";
import { avaliacao } from "./firebase";
import * as db from "./firebase";
const Swal = require('sweetalert2')

repo.ativarLog('avaliacao', avaliacao);
var listarTodos = async () => repo.listarOrderBy(avaliacao, 'data', 'desc')
var bucarPorId = async (id) => repo.bucarPorId(avaliacao, id)

var incluir = (dados) => {
    return avaliacao
        .add(dados)
        .then((doc) => { repo.incluirLog(avaliacao, doc.id, 'Incluir') })
}

var alterar = (id, dados) => {
    return avaliacao
        .doc(id)
        .update(dados)
        .then(() => { repo.incluirLog(avaliacao, id, 'Alterar') })
}

var excluir = (id) => repo.excluir(avaliacao, id)

var buscarPorCaso = async (idCaso) => {
    return await avaliacao
        .where("idCaso", "==", idCaso)
        .get()
        .then((snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            return data[0];
        });
}

export {
    listarTodos,
    bucarPorId,
    buscarPorCaso,
    incluir,
    alterar,
    excluir
}