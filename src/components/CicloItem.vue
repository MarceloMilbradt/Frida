<template>
  <div class="outer-grid">
    <div class="inner-grid">
      <span class="el-step__head is-finish el-step__icon is-text ">
        {{index}}
      </span>
      <span class="title">
        {{title}}
      </span>
    </div>
    <font-awesome-icon class="icon" style="font-size: 2em" :icon="icon" />
    <div class="text" v-html="text">
    </div>
  </div>
  <slot></slot>
</template>

<script>
export default {
  name: "CicloItem",
  props: ["title", "index", "text", "icon"],
};
</script>

<style scoped>
.inner-grid {
  display: flex;
  align-items: center;
  padding: 5px;
  grid-area: title;
  max-height: 34px;
}
.outer-grid {
  max-width: 700px;
  display: grid;
  grid-column-gap: 1em;
  grid-template-columns: 1fr 1fr 4fr;
  grid-template-areas:
    "title icon text"
    ". icon text";
}
.text {
  grid-area: text;
}
.icon{
  grid-area: icon;
}
.el-step__head {
  min-width: 24px;
  min-height: 24px;
}
.title {
  min-width: 200px;
}
</style>