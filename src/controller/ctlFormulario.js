import * as db from "../firebase";
const Swal = require('sweetalert2')

var listarTodos = function listarTodos() {
    db.avaliacao.get().then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        console.log("All data in 'avaliação' collection", data);
    });
}

var incluir = function incluir(dados) {
    db.avaliacao
        .add(dados)
        .then((ref) => {
            Swal.fire("Salvo!", "O avaliação foi salvo com sucesso!", "success");
        })
        .catch((error) => {
            console.error("Erro ao incluir avaliação", error);
            Swal.fire("Erro!", "Houve um problema ao tentar incluir o avaliação!", "error");
        });
}

var alterar = function alterar(id, dados) {
    db.avaliacao
        .doc(id)
        .update(dados)
        .then(() => {
            Swal.fire("Atualizado!", "O avaliação foi atualizado com sucesso!", "success");
        })
        .catch((error) => {
            console.error("Erro ao alterar avaliação", error);
            Swal.fire("Erro!", "Houve um problema ao tentar alterar o avaliação!", "error");
        });
}

var excluir = function excluir(id) {
    db.avaliacao
        .doc(id)
        .delete()
        .then(() => {
            Swal.fire("Deletado!", "Seu avaliação foi deletado com sucesso!", "success");
        })
        .catch((error) => {
            console.error("Erro ao excluir avaliação", error);
            Swal.fire("Erro!", "Houve um problema ao tentar excluir o avaliação!", "error");
        });
}

export {
    listarTodos,
    incluir,
    alterar,
    excluir
}