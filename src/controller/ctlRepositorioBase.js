import * as db from "./firebase";
const Swal = require('sweetalert2')
import { getNomeUser } from "./AuthService";
var nomeTabela = '';

var ativarLog = (nome, tabela) => {
    nomeTabela = nome;

}



var incluirLog = async (tabela, id, tipo) => {
    let dados = await bucarPorId(tabela, id);
    db.log.add({
        id: id,
        usuario: getNomeUser(),
        tabela: nomeTabela,
        tipo: tipo,
        data: new Date(),
        dados: dados
    }).catch((error) => console.error("Erro ao incluir log", error));
}

var incluirLogOpExcluir = async (id, dados) => {
    /*Precisa passar os dados como parâmetro, pq depois que excluir não vai mais existir esses dados*/
    db.log.add({
        id: id,
        usuario: getNomeUser(),
        tabela: nomeTabela,
        tipo: 'Excluir',
        data: new Date(),
        dados: dados
    }).catch((error) => console.error("Erro ao incluir log", error));
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

var listarOrderBy = async (tabela, field, sort) => {
    return await tabela.orderBy(field, sort).get().then((snapshot) => {
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
            incluirLog(tabela, doc.id, 'Incluir');
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
        .update(dados)
        .then(() => {
            incluirLog(tabela, id, 'Alterar');
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
    }).then(async (result) => {
        if (result.isConfirmed) {
            let dados = await bucarPorId(tabela, id);
            tabela
                .doc(id)
                .delete()
                .then(() => {
                    incluirLogOpExcluir(id, dados);
                    Swal.fire("Deletado!", "O registro foi deletado com sucesso!", "success");
                })
                .catch((error) => {
                    console.error("Erro ao excluir registro", error);
                    Swal.fire("Erro!", "Houve um problema ao tentar excluir o registro!", "error");
                });
        }
    });
}

var addNovoCampo = async (tabela, campo) => {
    return await tabela.get().then((snapshot) => {
        snapshot.forEach(async function (doc) {
            await tabela.doc(doc.id).set(campo, { merge: true });
        });
    });
}

export {
    incluirLog,
    incluirLogOpExcluir,
    ativarLog,
    listarTodos,
    listarOrderBy,
    bucarPorId,
    incluir,
    alterar,
    excluir,
    addNovoCampo,
}