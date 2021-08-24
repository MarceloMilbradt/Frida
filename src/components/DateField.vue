<template>
  <el-form-item
    class="input-date"
    :label="label"
  >
    <el-input
      type="date"
      v-model="value"
      :max="maxDate"
    ></el-input>
  </el-form-item>
</template>

<script>
export default {
  name: "DataNascimento",
  props: ["modelValue","label"],
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
  data() {
    return {
      maxDate: new Date().toISOString("YYYY-MM-DD").split("T")[0],
    };
  },
};
</script>

<style scoped>

</style>