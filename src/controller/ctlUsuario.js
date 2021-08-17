import * as db from "./firebase";
const Swal = require('sweetalert2')

var validaLogin = async function validaLogin(login, senha) {
    var isValido = false;
    try {
        var retorno = await db.usuario
            .where("login", "==", login)
            .where("senha", "==", senha)
            .get();
        if (retorno.size > 0) isValido = true;

        console.log("isvalido", isValido)
        return isValido;
    }
    catch (err) {
        console.log('Error getting documents', err);
    }
}

var listarTodos = function listarTodos() {
    db.usuario.get().then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        console.log("Todos Usuarios = ", data);
    });
}

var bucarPorId = function bucarPorId(id) {
    db.usuario
        .doc(id).get()
        .then((doc) => {
            if (!doc.exists) return;
            console.log("Dados do Usuário Selecionado = ", doc.data());
        })
        .catch((error) => {
            console.error("Erro ao buscar Usuário", error);
            Swal.fire("Erro!", "A código do Usuário fornecido não existe!", "error");
        });
}

var incluir = function incluir(dados) {
    db.usuario
        .add(dados)
        .then((ref) => {
            Swal.fire("Salvo!", "O usuário foi salvo com sucesso!", "success");
        })
        .catch((error) => {
            console.error("Erro ao incluir usuário", error);
            Swal.fire("Erro!", "Houve um problema ao tentar incluir o usuário!", "error");
        });
}

var alterar = function alterar(id, dados) {
    db.usuario
        .doc(id)
        .update(dados)
        .then(() => {
            Swal.fire("Atualizado!", "O usuário foi atualizado com sucesso!", "success");
        })
        .catch((error) => {
            console.error("Erro ao alterar usuário", error);
            Swal.fire("Erro!", "Houve um problema ao tentar alterar o usuário!", "error");
        });
}

var excluir = function excluir(id) {
    db.usuario
        .doc(id)
        .delete()
        .then(() => {
            Swal.fire("Deletado!", "Seu usuário foi deletado com sucesso!", "success");
        })
        .catch((error) => {
            console.error("Erro ao excluir usuário", error);
            Swal.fire("Erro!", "Houve um problema ao tentar excluir o usuário!", "error");
        });
}

export {
    validaLogin,
    listarTodos,
    bucarPorId,
    incluir,
    alterar,
    excluir
}