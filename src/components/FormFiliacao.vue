<template>
  <el-row :gutter="20">
    <el-col :sm="24" :lg="16">
      <TextField v-model="filiacao.mae" label="Mãe" />
    </el-col>
  </el-row>

  <el-row :gutter="20">
    <el-col :sm="24" :lg="16">
      <TextField v-model="filiacao.pai" label="Pai" />
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
    filiacao: {
      get() {
        return this.modelValue;
      },
      set(filiacao) {
        this.$emit("update:modelValue", filiacao);
      },
    },
  },
};
</script>

<style scoped>
</style>