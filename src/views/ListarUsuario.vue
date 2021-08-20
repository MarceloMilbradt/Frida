<template>
  <ListarDados :usuarios="usuarios" />
</template>

<script>
import ListarDados from "../components/Listar.vue";
export default {
  name: "Home",
  components: {
    ListarDados,
  },
  data() {
    return {
      usuarios: [
        {
          id: "1",
          login: "TomTheBoy",
          nome: "Tom",
        },
        {
          id: "2",
          login: "JohnTheBoy",
          nome: "John",
        },
      ],
    };
  },
};
</script>

<style scoped>
p {
  text-align: center;
}
</style>
