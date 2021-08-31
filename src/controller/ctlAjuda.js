import * as db from "./firebase";
const Swal = require('sweetalert2')

var listarTodos = function listarTodos() {
    db.ajuda.get().then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        console.log("Todas Avaliações = ", data);
    });
}

var bucarPorId = function bucarPorId(id) {
    db.ajuda
        .doc(id).get()
        .then((doc) => {
            if (!doc.exists) return;
            console.log("Dados da Avaliação Selecionada = ", doc.data());
        })
        .catch((error) => {
            console.error("Erro ao buscar Avaliação", error);
            Swal.fire("Erro!", "A código da Ajuda fornecido não existe!", "error");
        });
}

var incluir = function incluir(dados) {
    db.ajuda
        .add(dados)
        .then((ref) => {
            Swal.fire("Salvo!", "O pedido de ajuda foi salvo com sucesso!", "success");
        })
        .catch((error) => {
            console.error("Erro ao incluir avaliação", error);
            Swal.fire("Erro!", "Houve um problema ao tentar incluir o pedido de ajuda!", "error");
        });
}

var alterar = function alterar(id, dados) {
    db.ajuda
        .doc(id)
        .update(dados)
        .then(() => {
            Swal.fire("Atualizado!", "O pedido de ajuda foi atualizado com sucesso!", "success");
        })
        .catch((error) => {
            console.error("Erro ao alterar avaliação", error);
            Swal.fire("Erro!", "Houve um problema ao tentar alterar o pedido de ajuda!", "error");
        });
}

var excluir = function excluir(id) {
    db.ajuda
        .doc(id)
        .delete()
        .then(() => {
            Swal.fire("Deletado!", "O pedido de ajuda foi deletado com sucesso!", "success");
        })
        .catch((error) => {
            console.error("Erro ao excluir avaliação", error);
            Swal.fire("Erro!", "Houve um problema ao tentar excluir o pedido de ajuda!", "error");
        });
}

export {
    listarTodos,
    bucarPorId,
    incluir,
    alterar,
    excluir
}