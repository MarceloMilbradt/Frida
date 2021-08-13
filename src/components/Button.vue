<template>
  <header>
    <button class="btn" @click="onClick" v-bind:style="{ background: color }">
      {{ text }}
    </button>
  </header>
</template>

<script>
export default {
  name: "Button",
  props: {
    text: {
      type: String,
      default: "Add Task",
    },
    color: {
      type: String,
      default: "green",
    },
  },
  methods: {
      onClick() {
          this.$emit('btn-click')
      }
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>