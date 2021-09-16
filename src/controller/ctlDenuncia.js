import * as db from "./firebase";
const Swal = require('sweetalert2')

var listarTodos = async function listarTodos() {
    return await db.denuncia
        .get()
        .then((snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            return data;
        });
}

var bucarPorId = async function bucarPorId(id) {
    return await db.denuncia
        .doc(id)
        .get()
        .then((doc) => {
            if (!doc.exists) return;
            return doc.data();
        })
        .catch((error) => {
            console.error("Erro ao buscar Vitima", error);
            Swal.fire("Erro!", "O código da Vitima fornecido não existe!", "error");
        });
}

var incluir = function incluir(denuncia) {
    return db.denuncia.add(denuncia)
        .then(() => {
            Swal.fire("Salvo!", "A Denúncia foi salvo com sucesso!", "success");
        })
        .catch((error) => {
            console.error("Erro ao incluir Denúncia", error);
            Swal.fire("Erro!", "Houve um problema ao tentar incluir a Denúncia!", "error");
        });
}

var alterar = function alterar(id, denuncia) {
    return db.denuncia
        .doc(id)
        .update(denuncia)
        .then(() => {
            Swal.fire("Atualizado!", "A Denúncia foi atualizada com sucesso!", "success");
        })
        .catch((error) => {
            console.error("Erro ao alterar Denúncia", error);
            Swal.fire("Erro!", "Houve um problema ao tentar alterar a Denúncia!", "error");
        });
}

var excluir = function excluir(id) {
    return Swal.fire({
        title: "Atenção",
        text: "Deseja realmente excluir o registro?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, excluir!",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            db.denuncia
                .doc(id)
                .delete()
                .then(() => {
                    Swal.fire("Deletado!", "Sua Denúncia foi deletada com sucesso!", "success");
                })
                .catch((error) => {
                    console.error("Erro ao excluir Denúncia", error);
                    Swal.fire("Erro!", "Houve um problema ao tentar excluir a Denúncia!", "error");
                });
        }
    });
}

export {
    listarTodos,
    bucarPorId,
    incluir,
    alterar,
    excluir
}