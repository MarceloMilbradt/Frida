import * as db from "./firebase";
import { addToIndex, updateIndex, deleteFromIndex } from "./Algolia"
import { logout, loginAnonimo } from "./AuthService";
import { addNovoCampo } from "./ctlRepositorioBase";
const Swal = require('sweetalert2')

//addNovoCampo(db.denuncia, { status: 0 }) /*Descomente para criar o campo de status em todos documentos*/

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

var incluir = async function incluir(denuncia, anonima) {
    if (anonima)
        await loginAnonimo();
    return db.denuncia.add(denuncia)
        .then((snapshot) => {
            addToIndex(denuncia, snapshot.id)
            if (anonima)
                logout()
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
            updateIndex(denuncia, id)
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
                    deleteFromIndex(id)
                    Swal.fire("Deletado!", "Sua Denúncia foi deletada com sucesso!", "success");
                })
                .catch((error) => {
                    console.error("Erro ao excluir Denúncia", error);
                    Swal.fire("Erro!", "Houve um problema ao tentar excluir a Denúncia!", "error");
                });
        }
    });
}

const buscarStatusDenuncia = () => [
    {
        value: 0,
        descricao: "Em Análise",
        icon: "exclamation",
        color: "yellow",
    },
    {
        value: 1,
        descricao: "Acolhido",
        icon: "check",
        color: "green",
    },
    {
        value: 2,
        descricao: "Arquivado",
        icon: "ban",
        color: "red",
    }
];

export {
    listarTodos,
    bucarPorId,
    incluir,
    alterar,
    excluir,
    buscarStatusDenuncia
}