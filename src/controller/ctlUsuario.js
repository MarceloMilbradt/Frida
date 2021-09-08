import * as db from "./firebase";
import { createCredentials } from './AuthService'
const Swal = require('sweetalert2')

var validaLogin = function validaLogin(login, senha) {
    db.usuario
        .where("login", "==", login)
        .where("senha", "==", senha)
        .limit(1).get()
        .then((snapshot) => {
            if (snapshot.size > 0) {
                var data = snapshot.docs[0].data();
                localStorage.setItem('nome', data.nome);
                //console.log('Nome Storage', localStorage.getItem('nome'))

                mensagemLoginSucesso();
            } else {
                Swal.fire("Erro!", "Usuário ou senha inválido", "error");
            }
        });
}

function mensagemLoginSucesso() {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: 'success',
        title: 'Logado com sucesso!'
    })
}

var listarTodos = async function listarTodos() {
    return await db.usuario
        .orderBy("nome", "asc").get()
        .then((snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            return data;
        });
}

var bucarPorId = async function bucarPorId(id) {
    return await db.usuario
        .doc(id).get()
        .then((doc) => {
            if (!doc.exists) return;
            return doc.data();
        })
        .catch((error) => {
            console.error("Erro ao buscar Usuário", error);
            Swal.fire("Erro!", "A código do Usuário fornecido não existe!", "error");
        });
}

var incluir = function incluir(dados) {
    db.usuario
        .add(dados)
        .then((ref) => {
            createCredentials(dados.email)
            Swal.fire("Salvo!", "O usuário foi salvo com sucesso!", "success");
        })
        .catch((error) => {
            console.error("Erro ao incluir usuário", error);
            Swal.fire("Erro!", "Houve um problema ao tentar incluir o usuário!", "error");
        });
}

var alterar = function alterar(id, dados) {
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
    Swal.fire({
        title: 'Atenção',
        text: "Deseja realmente excluir o registro?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
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
    })
}

export {
    validaLogin,
    listarTodos,
    bucarPorId,
    incluir,
    alterar,
    excluir
}