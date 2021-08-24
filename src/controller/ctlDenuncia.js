import * as db from "./firebase";
const Swal = require('sweetalert2')

var listarTodos = function listarTodos() {
    db.vitima.get().then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        console.log("Todas Vitimas = ", data);
    });
}

var bucarPorId = function bucarPorId(id) {
    db.vitima
        .doc(id).get()
        .then((doc) => {
            if (!doc.exists) return;
            console.log("Dados da Vitima Selecionada = ", doc.data());
        })
        .catch((error) => {
            console.error("Erro ao buscar Vitima", error);
            Swal.fire("Erro!", "A código da Vitima fornecido não existe!", "error");
        });
}

var incluir = function incluir(vitima, agressor, terceiro = null) {

    var batch = db.firebase.firestore().batch();
    batch.set(db.vitima.doc(), vitima);
    batch.set(db.agressor.doc(), agressor);
    if (terceiro) batch.set(db.denunciaTerceiro.doc(), terceiro);

    batch.commit()
        .then(() => {
            Swal.fire("Salvo!", "A Denúncia foi salvo com sucesso!", "success");
        })
        .catch((error) => {
            console.error("Erro ao incluir Denúncia", error);
            Swal.fire("Erro!", "Houve um problema ao tentar incluir a Denúncia!", "error");
        });
}


var incluirDenuncia = function incluirDenuncia (vitima, agressor, terceiro = null) {

    db.denuncia.add({vitima,agressor,terceiro})
        .then(() => {
            Swal.fire("Salvo!", "A Denúncia foi salvo com sucesso!", "success");
        })
        .catch((error) => {
            console.error("Erro ao incluir Denúncia", error);
            Swal.fire("Erro!", "Houve um problema ao tentar incluir a Denúncia!", "error");
        });
}

var alterar = function alterar(id, dados) {
    db.vitima
        .doc(id)
        .update(dados)
        .then(() => {
            Swal.fire("Atualizado!", "A Denúncia foi atualizada com sucesso!", "success");
        })
        .catch((error) => {
            console.error("Erro ao alterar Denúncia", error);
            Swal.fire("Erro!", "Houve um problema ao tentar alterar a Denúncia!", "error");
        });
}

var excluir = function excluir(id) {
    db.vitima
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

export {
    listarTodos,
    bucarPorId,
    incluir,
    alterar,
    excluir,
    incluirDenuncia
}