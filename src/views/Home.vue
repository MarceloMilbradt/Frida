<template>
  <Menu :items="menus" />
</template>

<script>
import Menu from "../components/Menu.vue";
export default {
  name: "Home",
  components: {
    Menu,
  },
  data() {
    return {
      menus: [
        {
          to: "/Avaliacao",
          text: "Estou em Risco ?",
        },
        {
          to: "/Info",
          text: "Mais informaçoes",
        },
        {
          to: "/Denuncia",
          text: "Fazer denuncia",
        },
      ],
    };
  },
};

/*INICIO TESTE FIREBASE*/
import { usuariosCollection } from "../firebase";

usuariosCollection.get().then((snapshot) => {
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  console.log("All data in 'usuarios' collection", data);
});

function incluirUsuario() {
  usuariosCollection
    .add({ nome: "Mr.", sobrenome: "Bubbles", idade: 51 })
    .then((ref) => {
      console.log("Added doc with ID: ", ref.id);
    });
}

function alterarUsuario(id, dados) {
  //dados = { idade: 23 };
  usuariosCollection
    .doc(id)
    .update(dados)
    .then(() => {
      console.log("Document updated");
    })
    .catch((error) => {
      console.error("Error updating doc", error);
    });
}

function excluirUsuario(id) {
  usuariosCollection
    .doc(id)
    .delete()
    .then(() => console.log("Document deleted"))
    .catch((error) => console.error("Error deleting document", error));
}
/*FIM TESTE FIREBASE*/
</script>

<style scoped>
p {
  text-align: center;
}
</style>
