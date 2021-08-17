<template>
  <el-form-item label="Numero">
    <el-input maxlength="200" v-model="value" v-maska="'#*'"></el-input>
  </el-form-item>
</template>

<script>
export default {
  name: "Numero",
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