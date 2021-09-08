<template>
  <ListarDados :dados="usuarios" :controller="repo" />
</template>

<script>
import ListarDados from "../components/Listar.vue";
import * as controller from "../controller/ctlUsuario";

export default {
  name: "Home",
  components: {
    ListarDados,
  },
  data() {
    return {
      usuarios: [],
    };
  },
  async created() {
    this.usuarios = await controller.listarTodos();
    this.repo = controller;
  },
};
</script>

<style scoped>
p {
  text-align: center;
}
</style>
