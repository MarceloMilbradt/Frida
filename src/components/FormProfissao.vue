<template>
  <el-row :gutter="20">
    <el-col :sm="24" :lg="12">
      <TextField v-model="trabalho.profissao" label="Profissão" />
    </el-col>
    <el-col :sm="24" :lg="12">
      <TextField v-model="trabalho.local" label="Local de trabalho" />
    </el-col>
  </el-row>
</template>

<script>
import TextField from "./TextField.vue";

export default {
  components: {
    TextField,
  },
  name: "FormFiliacao",
  emits: ["update:modelValue"],

  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    trabalho: {
      get() {
        return this.modelValue;
      },
      set(trabalho) {
        this.$emit("update:modelValue", trabalho);
      },
    },
  },
};
</script>

<style scoped>
</style>