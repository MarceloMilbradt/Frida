<template>
  <div>
    <el-row :gutter="20">
      <el-col :sm="24" :md="16">
        <TextField prop="nome" label="Nome" v-model="pessoa.nome" :rules="rules.nome" />
      </el-col>

    </el-row>
    <el-row :gutter="20">
      <el-col :sm="24" :md="10">
        <TextField :rules="rules.cpf" v-model="pessoa.CPF" label="CPF" prop="CPF" v-maska="'###.###.###-##'" maxlength="14" />
      </el-col>

      <el-col :sm="24" :md="6">
        <DateField prop="datanascimento" label="Data de Nascimento" v-model="pessoa.datanascimento" />
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col v-if="emailField" :sm="24" :lg="16">
        <TextField label="Email" prop="email" :rules="rules.email" v-model="pessoa.email" />
      </el-col>
      <el-col :sm="24" :lg="10">
        <TextField v-model="pessoa.telefone" label="Telefone" prop="telefone" v-maska="['(##) ####-####', '(##) #####-####']" />
      </el-col>
      <el-col :sm="24" :lg="10">
        <el-form-item label="Sexo" >
          <el-select v-model="pessoa.sexo" placeholder="Sexo">
            <el-option v-for="sexo in sexos" :key="sexo.sigla" :label="sexo.descricao" :value="sexo.sigla">
            </el-option>
          </el-select>
        </el-form-item>
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
  data() {
    return {
      sexos: [
        {
          sigla: "M",
          descricao: "Masculino",
        },
        {
          sigla: "F",
          descricao: "Feminino",
        },
      ],
    };
  },
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
            required: true,
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