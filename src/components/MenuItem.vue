<template>
  <div class="menuitem">
    <router-link class="link" :to="to">{{ text }}</router-link>
  </div>
</template>

<script>
export default {
  name: "MenuItem",
  props: {
    text: String,
    to: String,
  },
};
</script>

<style scoped>
.menuitem {
  margin: 2px;
  box-shadow: 0 2px 7px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
  width: 100%;
}
@media (max-width: 800px) {
  .menuitem {
    margin: 2px;

    box-shadow: 0 2px 7px -1px rgba(0, 0, 0, 0.2),
      0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
    width: unset;
  }
}
a.link {
  text-decoration: none;
  display: block;
  color: #333;
  padding: 20px;
}
</style>