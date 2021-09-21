import * as repo from "./ctlRepositorioBase";
import { ajuda } from "./firebase";

repo.ativarLog('ajuda', ajuda);
var listarTodos = async () => repo.listarTodos(ajuda)
var bucarPorId = async (id) => repo.bucarPorId(ajuda, id)
var incluir = (dados) => repo.incluir(ajuda, dados)
var alterar = (id, dados) => repo.alterar(ajuda, id, dados)
var excluir = (id) => repo.excluir(ajuda, id)

export {
    listarTodos,
    bucarPorId,
    incluir,
    alterar,
    excluir
}