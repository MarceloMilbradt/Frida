<template>
  <el-footer>
    <div>
      <el-button
        :type="'primary'"
        @click="onClick"
        v-bind:style="{ background: color }"
      >
        {{ text }}
      </el-button>
    </div>
  </el-footer>
</template>

<script>
export default {
  name: "Button",
  props: {
    text: {
      type: String,
      default: "Salvar",
    },
    color: {
      type: String,
      default: "green",
    },
  },
  methods: {
    onClick() {
      this.$emit("btn-click");
    },
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