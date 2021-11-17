import * as repo from "./ctlRepositorioBase";
import { log } from "./firebase";

var listarTodos = async () => repo.listarOrderBy(log, 'data', 'desc')

export {
    listarTodos
}