<template>
  <el-form-item label="CEP">
    <el-input maxlength="200" v-model="value" v-maska="'#####-###'"></el-input>
  </el-form-item>
</template>

<script>
export default {
  name: "CEP",
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