<template>
  <div>
    <el-row :gutter="20">
      <el-col :sm="24" :md="16">
        <TextField label="Rua" v-model="endereco.logradouro" />
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :sm="24" :md="10">
        <TextField label="Bairro" v-model="endereco.bairro" />
      </el-col>
      <el-col :sm="24" :md="6">
        <TextField label="Numero" v-model="endereco.numero" />
      </el-col>
    </el-row>

    <el-row :gutter="20">

      <el-col :sm="24" :md="10">
        <TextField label="CEP" maxlength="9" prop="CEP" v-maska="'#####-###'" v-model="endereco.cep" />
      </el-col>

    </el-row>
  </div>
</template>

<script>
import TextField from "./TextField.vue";

export default {
  components: {
    TextField,
  },
  name: "FormEndereco",
  emits: ["update:modelValue"],

  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    endereco: {
      get() {
        return this.modelValue;
      },
      set(endereco) {
        this.$emit("update:modelValue", endereco);
      },
    },
  },
};
</script>

<style scoped>
</style>