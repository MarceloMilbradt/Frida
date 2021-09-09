import * as db from "./firebase";
import { createCredentials } from "./AuthService";
const Swal = require("sweetalert2");

var listarTodos = async function listarTodos() {
  return await db.usuario
    .orderBy("nome", "asc")
    .get()
    .then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return data;
    });
};

var bucarPorId = async function bucarPorId(id) {
  return await db.usuario
    .doc(id)
    .get()
    .then((doc) => {
      if (!doc.exists) return;
      return doc.data();
    })
    .catch((error) => {
      console.error("Erro ao buscar Usuário", error);
      Swal.fire("Erro!", "A código do Usuário fornecido não existe!", "error");
    });
};

var incluir = function incluir(dados) {
  return createCredentials(dados.email)
    .then((retorno) => {
      db.usuario
        .add(dados)
        .then((ref) => {
          Swal.fire("Salvo!", "O usuário foi salvo com sucesso!", "success");
        })
        .catch((error) => {
          console.error("Erro ao incluir usuário", error);
          Swal.fire(
            "Erro!",
            "Houve um problema ao tentar incluir o usuário!",
            "error"
          );
        });
    })
    .catch((error) => {
      console.error(
        "Erro ao incluir o usuário no Firebase Authentication",
        error
      );
      Swal.fire(
        "Erro!",
        "Houve um problema ao tentar incluir a autenticação do usuário!",
        "error"
      );
    });
};

var alterar = function alterar(id, dados) {
  return db.usuario
    .doc(id)
    .update(dados)
    .then(() => {
      Swal.fire(
        "Atualizado!",
        "O usuário foi atualizado com sucesso!",
        "success"
      );
    })
    .catch((error) => {
      console.error("Erro ao alterar usuário", error);
      Swal.fire(
        "Erro!",
        "Houve um problema ao tentar alterar o usuário!",
        "error"
      );
    });
};

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
      db.usuario
        .doc(id)
        .delete()
        .then(() => {
          Swal.fire(
            "Deletado!",
            "Seu usuário foi deletado com sucesso!",
            "success"
          );
        })
        .catch((error) => {
          console.error("Erro ao excluir usuário", error);
          Swal.fire(
            "Erro!",
            "Houve um problema ao tentar excluir o usuário!",
            "error"
          );
        });
    }
  });
};

export { listarTodos, bucarPorId, incluir, alterar, excluir };
