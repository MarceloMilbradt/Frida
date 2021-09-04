<template>
  <Menu v-if="!$store.getters.getLogged" :items="menuAjuda" />
  <Menu v-if="!$store.getters.getLogged" :items="menus" />
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
      menuAjuda:[
        {
          to: "/Ajuda",
          text: "ME AJUDA!",
          big:true,
          red:true,
        },
      ],
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
</script>

<style scoped>
p {
  text-align: center;
}
</style>
