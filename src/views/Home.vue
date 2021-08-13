<template>
  <div>
    <Menu :items="items"></Menu>
  </div>
</template>

<script>
import Menu from "../components/Menu";
export default {
  name: "Home",
  components: { Menu },
  data() {
    return {
      items: [
        {
          to: "/formulario",
          text: "Estou em Risco ?",
        },
      ],
    };
  },
};
</script>
