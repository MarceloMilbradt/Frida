<template>
  <div class="menuitem">
    <router-link :class="'link ' + (big ? 'big' : '') + (red ? ' red' : '')" :to="to">{{
      text
    }}</router-link>
  </div>
</template>

<script>
export default {
  name: "MenuItem",
  props: {
    text: String,
    big: Boolean,
    red: Boolean,
    to: String,
  },
};
</script>

<style scoped>
.menuitem {
  margin: 0.078em;
  box-shadow: 0 0.078em 0.438em -0.063em rgba(0, 0, 0, 0.2),
    0 0.063em 0.063em 0 rgba(0, 0, 0, 0.14),
    0 0.063em 0.188em 0 rgba(0, 0, 0, 0.12);
  width: 100%;
  color: var(--el-text-color-primary);
  margin-bottom: 50px;
}
@media (max-width: 800px) {
  .menuitem {
    margin: 0.078em;

    box-shadow: 0 0.078em 0.438em -0.063em rgba(0, 0, 0, 0.2),
      0 0.063em 0.063em 0 rgba(0, 0, 0, 0.14),
      0 0.063em 0.188em 0 rgba(0, 0, 0, 0.12);
    width: unset;
  }
}
a.link {
  text-decoration: none;
  display: block;
  color: #333;
  padding: 1.25em;
}
a.link.big {
  height: 1em;
  font-size: 2rem;
}
a.link.big.red {
background-color: red;
color: White;
font-family: cursive;
}
@media (max-width: 800px) {
  a.link.big {
    height: 3em;
    font-size: 3rem;
  }
}
</style>