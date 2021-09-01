<template>
  <div class="menu">
    <MenuItem
      v-bind:key="item.to"
      v-for="item in items"
      :to="item.to"
      :text="item.text"
      :big="item.big"
      :red="item.red"
    ></MenuItem>
  </div>
</template>

<script>
import MenuItem from "./MenuItem";
export default {
  name: "Menu",
  components: { MenuItem },
  props: {
    items: {
      type: Array,
      default() {
        return [
          {
            to: "/",
            text: "Home",
          },
          {
            to: "/formulario",
            text: "Estou em Risco ?",
          },
        ];
      },
    },
  },
};
</script>

<style scoped>
.menu {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 0.938em;
}

@media (max-width: 800px) {
  .menu {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.938em;
    padding: 0.625em;
  }
}
</style>