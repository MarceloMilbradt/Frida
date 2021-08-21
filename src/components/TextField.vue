<template>
  <el-form-item :label="label" >
    <el-input :maxlength="maxlength" v-model="value" size="large"></el-input>
  </el-form-item>
</template>

<script>
export default {
  name: "TextField",
  emits: ["update:modelValue"],
  props: {
    label: String,
    maxlength: {
      type: Number,
      default: 200,
    },
    modelValue: String,
  },
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