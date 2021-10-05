import * as db from "./firebase";
const Swal = require('sweetalert2')
import { getNomeUser } from "./AuthService";

var ativarLog = (nome, tabela) => {
    // tabela.onSnapshot((snapshot) => {
    //     if (snapshot.docChanges().length == 1) { /*Não mostrar quando tiver listando*/
    //         var change = snapshot.docChanges()[0];
    //         db.log.add({
    //             id: change.doc.id,
    //             usuario: getNomeUser(),
    //             tabela: nome,
    //             tipo: change.type,
    //             data: new Date().toISOString(),
    //             dados: change.doc.data()
    //         }).catch((error) => console.error("Erro ao incluir log", error));
    //     }
    // });
}

var listarTodos = async (tabela) => {
    return await tabela.get().then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return data;
    });
}

var bucarPorId = async (tabela, id) => {
    return await tabela
        .doc(id).get()
        .then((doc) => {
            if (!doc.exists) return;
            return doc.data();
        })
        .catch((error) => {
            console.error("Erro ao buscar registro", error);
            Swal.fire("Erro!", "O código do registro fornecido não existe!", "error");
        });
}

var incluir = (tabela, dados) => {
    return tabela
        .add(dados)
        .then((doc) => {
            db.log.add({
                id: doc.id,
                usuario: getNomeUser(),
                tabela,
                tipo: "I",
                data: new Date().toISOString(),
                dados: doc.data()
            }).catch((error) => console.error("Erro ao incluir log", error));
        
            Swal.fire("Salvo!", "O registro foi salvo com sucesso!", "success");
        })
        .catch((error) => {
            console.error("Erro ao incluir registro", error);
            Swal.fire("Erro!", "Houve um problema ao tentar incluir o registro!", "error");
        });
}

var alterar = (tabela, id, dados) => {
    return tabela
        .doc(id)
        .set(dados, { merge: true })
        .then((doc) => {
            db.log.add({
                id: doc.id,
                usuario: getNomeUser(),
                tabela,
                tipo: "A",
                data: new Date().toISOString(),
                dados: doc.data()
            }).catch((error) => console.error("Erro ao incluir log", error));
            Swal.fire("Atualizado!", "O registro foi atualizado com sucesso!", "success");
        })
        .catch((error) => {
            console.error("Erro ao alterar registro", error);
            Swal.fire("Erro!", "Houve um problema ao tentar alterar o registro!", "error");
        });
}

var excluir = (tabela, id) => {
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
            tabela
                .doc(id)
                .delete()
                .then((doc) => {
                    db.log.add({
                        id: doc.id,
                        usuario: getNomeUser(),
                        tabela,
                        tipo: "E",
                        data: new Date().toISOString(),
                        dados: doc.data()
                    }).catch((error) => console.error("Erro ao incluir log", error));
                    Swal.fire("Deletado!", "O registro foi deletado com sucesso!", "success");
                })
                .catch((error) => {
                    console.error("Erro ao excluir registro", error);
                    Swal.fire("Erro!", "Houve um problema ao tentar excluir o registro!", "error");
                });
        }
    });
}

export {
    ativarLog,
    listarTodos,
    bucarPorId,
    incluir,
    alterar,
    excluir
}