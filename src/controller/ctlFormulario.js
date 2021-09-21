import * as db from "./firebase";
const Swal = require('sweetalert2')

var listarTodos = async function listarTodos() {
    return await db.avaliacao.get().then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return data;
    });
}

var bucarPorId = async function bucarPorId(id) {
    return await db.avaliacao
        .doc(id).get()
        .then((doc) => {
            if (!doc.exists) return;
            return doc.data();
        })
        .catch((error) => {
            console.error("Erro ao buscar Avaliação", error);
            Swal.fire("Erro!", "A código da Avaliação fornecido não existe!", "error");
        });
}

function geraResultado(respostas) {
    var resp = Object.values(respostas);
    var counts = {};
    for (var num of resp) {
        counts[num] = counts[num] ? counts[num] + 1 : 1;
    }

    var qtdeSim = counts[1];
    var qtdeNao = /*counts[2]*/ + counts[3] + counts[4];
    var risco = '';

    switch (qtdeSim) {
        case 0:
        case 1:
        case 2:
            risco = (qtdeNao > 0) ? 'M' : 'B';
            break;
        case 3:
            risco = (qtdeNao > 7) ? 'M' : 'B';
            break;
        case 4:
            risco = (qtdeNao > 3) ? 'M' : 'B';
            break;
        case 5:
            risco = (qtdeNao == 10) ? 'E' : 'M';
            break;
        case 6:
            risco = (qtdeNao > 7 && qtdeNao < 11) ? 'E' : 'M';
            break;
        case 7:
            risco = (qtdeNao > 5 && qtdeNao < 11) ? 'E' : 'M';
            break;
        case 8:
            risco = (qtdeNao > 3 && qtdeNao < 11) ? 'E' : 'M';
            break;
        case 9:
            risco = (qtdeNao > 1 && qtdeNao < 11) ? 'E' : 'M';
            break;
        default:
            risco = 'E';
            break;
    }

    return {
        qtdeSim: qtdeSim,
        qtdeNao: qtdeNao,
        risco: risco,
    };
}

var incluir = function incluir(form) {
    form.resultado = geraResultado(form.resposta);
    return db.avaliacao
        .add(form)
        .then(() => {
            if (form.resultado.risco == 'E') {
                Swal.fire({
                    title: 'Você está sob risco Elevado',
                    text: "Deseja fazer uma Denúncia de agressão ?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sim, fazer denúncia!',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.href = '/Denuncia';
                    }
                })
            }
            else {
                Swal.fire("Salvo!", "A avaliação foi salvo com sucesso!", "success");
            }
        })
        .catch((error) => {
            console.error("Erro ao incluir avaliação", error);
            Swal.fire("Erro!", "Houve um problema ao tentar incluir a avaliação!", "error");
        });
}

var alterar = function alterar(id, form) {
    form.resultado = geraResultado(form.resposta);
    return db.avaliacao
        .doc(id)
        .update(form)
        .then(() => {
            Swal.fire("Atualizado!", "A avaliação foi atualizada com sucesso!", "success");
        })
        .catch((error) => {
            console.error("Erro ao alterar avaliação", error);
            Swal.fire("Erro!", "Houve um problema ao tentar alterar a avaliação!", "error");
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
    });
}

export {
    listarTodos,
    bucarPorId,
    incluir,
    alterar,
    excluir
}