import * as db from "../firebase";
const Swal = require('sweetalert2')

var listarTodos = function listarTodos() {
    db.usuario.get().then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        console.log("All data in 'usuário' collection", data);
    });
}

var incluir = function incluir(dados) {
    //dados = { nome: "Mr.", sobrenome: "Bubbles", idade: 51 };
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
    //dados = { idade: 23 };
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
    listarTodos,
    incluir,
    alterar,
    excluir
}