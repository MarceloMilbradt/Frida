<template>
  <el-form-item
    class="input-data-nascimento"
    label-width="150px"
    label="Data de nascimento"
  >
    <el-input
      type="date"
      v-model="value"
      :max="maxDate"
      prop="datanascimento"
      placeholder="Data de nascimento"
    ></el-input>
  </el-form-item>
</template>

<script>
export default {
  name: "DataNascimento",
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
  data() {
    return {
      maxDate: new Date().toISOString("YYYY-MM-DD").split("T")[0],
    };
  },
};
</script>

<style scoped>
@media (max-width: 650px) {
  .input-data-nascimento {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
  }
}
</style>