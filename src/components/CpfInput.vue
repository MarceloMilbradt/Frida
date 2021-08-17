<template>
  <el-form-item label="CPF">
    <el-input
      v-maska="'###.###.###-##'"
      maxlength="14"
      v-model="value"
    ></el-input>
  </el-form-item>
</template>

<script>
export default {
  name: "CPF",
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

<style>
</style>