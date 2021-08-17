<template>
  <el-form-item label="Bairro">
    <el-input maxlength="200" v-model="value"></el-input>
  </el-form-item>
</template>

<script>
export default {
  name: "Bairro",
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