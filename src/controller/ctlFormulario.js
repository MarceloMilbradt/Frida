import * as db from "./firebase";
const Swal = require('sweetalert2')

var listarTodos = function listarTodos() {
    db.avaliacao.get().then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        console.log("Todas Avaliações = ", data);
    });
}

var bucarPorId = function bucarPorId(id) {
    db.avaliacao
        .doc(id).get()
        .then((doc) => {
            if (!doc.exists) return;
            console.log("Dados da Avaliação Selecionada = ", doc.data());
        })
        .catch((error) => {
            console.error("Erro ao buscar Avaliação", error);
            Swal.fire("Erro!", "A código da Avaliação fornecido não existe!", "error");
        });
}

var incluir = function incluir(dados) {
    db.avaliacao
        .add(dados)
        .then((ref) => {
            Swal.fire("Salvo!", "A avaliação foi salvo com sucesso!", "success");
        })
        .catch((error) => {
            console.error("Erro ao incluir avaliação", error);
            Swal.fire("Erro!", "Houve um problema ao tentar incluir a avaliação!", "error");
        });
}

var alterar = function alterar(id, dados) {
    db.avaliacao
        .doc(id)
        .update(dados)
        .then(() => {
            Swal.fire("Atualizado!", "A avaliação foi atualizada com sucesso!", "success");
        })
        .catch((error) => {
            console.error("Erro ao alterar avaliação", error);
            Swal.fire("Erro!", "Houve um problema ao tentar alterar a avaliação!", "error");
        });
}

var excluir = function excluir(id) {
    db.avaliacao
        .doc(id)
        .delete()
        .then(() => {
            Swal.fire("Deletado!", "Sua avaliação foi deletada com sucesso!", "success");
        })
        .catch((error) => {
            console.error("Erro ao excluir avaliação", error);
            Swal.fire("Erro!", "Houve um problema ao tentar excluir a avaliação!", "error");
        });
}

export {
    listarTodos,
    bucarPorId,
    incluir,
    alterar,
    excluir
}