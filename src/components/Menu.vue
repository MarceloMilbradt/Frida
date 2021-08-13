<template>
  <div class="menu">
    <MenuItem
      v-bind:key="item.to"
      v-for="item in items"
      :to="item.to"
      :text="item.text"
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
  gap: 15px;
}

@media (max-width: 800px) {
  .menu {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 15px;
    padding: 10px;
  }
}
</style>