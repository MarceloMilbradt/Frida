<template>
  <el-form-item label="Telefone">
    <el-input
      v-maska="['(##) ####-####', '(##) #####-####']"
      v-model="value"
    ></el-input>
  </el-form-item>
</template>

<script>
export default {
  name: "Telefone",
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