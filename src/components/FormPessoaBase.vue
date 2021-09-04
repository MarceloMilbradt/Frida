<template>
  <div>
    <TextField
      prop="nome"
      label="Nome"
      v-model="pessoa.nome"
      :rules="rules.nome"
    />

    <el-row :gutter="20">
      <el-col :sm="24" :md="13">
        <TextField
          :rules="rules.cpf"
          v-model="pessoa.CPF"
          label="CPF"
          prop="CPF"
          v-maska="'###.###.###-##'"
          maxlength="14"
        />
      </el-col>

      <el-col :sm="24" :md="6">
        <DateField
          prop="datanascimento"
          label="Data de Nascimento"
          v-model="pessoa.datanascimento"
        />
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col v-if="emailField" :sm="24" :lg="12">
        <TextField
          label="Email"
          prop="email"
          :rules="rules.email"
          v-model="pessoa.email"
        />
      </el-col>
      <el-col :sm="24" :lg="emailField ? 12 : 24">
        <TextField
          v-model="pessoa.telefone"
          label="Telefone"
          prop="telefone"
          v-maska="['(##) ####-####', '(##) #####-####']"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TextField from "./TextField.vue";
import DateField from "./DateField.vue";

export default {
  components: {
    TextField,
    DateField,
  },
  name: "FormPessoaBase",
  emits: ["update:modelValue"],

  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },
    emailField: Boolean,
  },
  computed: {
    pessoa: {
      get() {
        return this.modelValue;
      },
      set(pessoa) {
        this.$emit("update:modelValue", pessoa);
      },
    },
    rules() {
      return {
        nome: [
          {
            required:true,
            message: "Infome ao menos um nome ou apelido",
            trigger: "blur",
          },
        ],
        CPF: [
          {
            min: 14,
            message: "Informe o CPF completo",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "Email é obrigatório!",
            trigger: "blur",
          },
          {
            type: "email",
            message: "Email inválido!",
            trigger: ["blur", "change"],
          },
        ],
      };
    },
  },
};
</script>

<style scoped>
</style>