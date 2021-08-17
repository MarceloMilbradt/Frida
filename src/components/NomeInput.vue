<template>
  <el-form-item label="Nome">
    <el-input v-model="value" prop="'nome'" maxlength="200"></el-input>
  </el-form-item>
</template>

<script>
export default {
  name: "Nome",
  props: ["modelValue"],
  emits: ["update:modelValue"],
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
};
</script>

<style scoped>
</style>