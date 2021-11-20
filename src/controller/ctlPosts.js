import * as repo from "./ctlRepositorioBase";
import { loginAnonimo, logout } from "./AuthService";
import { posts, storage } from "./firebase";
const Swal = require('sweetalert2')

repo.ativarLog('posts', posts);
var listarTodos = async () => repo.listarOrderBy(posts, 'data', 'desc')
var listarTodosAnonimo = async limit => {
    await loginAnonimo();
    let dados = await repo.listarOrderBy(posts, 'data', 'desc')
    await logout();
    if (limit)
        return dados.splice(0, 4);
    else
        return dados
}
var bucarPorId = async (id) => { 
    await loginAnonimo();
    const post= await repo.bucarPorId(posts, id)
    await logout();
    return post;
}

var incluir = (dados) => {
    return repo.incluir(posts, dados)

}

var alterar = (id, dados) => {
    return repo.alterar(posts, id, dados)

}

var excluir = (id) => repo.excluir(posts, id)

const upload = async (file) => {
    const id = "posts/" + new Date().getTime() + ".png";
    const snapshot = await storage.child(id).put(file);
    const url = await snapshot.ref.getDownloadURL();
    return { id, url };
};

export {
    listarTodos,
    bucarPorId,
    incluir,
    alterar,
    excluir,
    upload,
    listarTodosAnonimo
}