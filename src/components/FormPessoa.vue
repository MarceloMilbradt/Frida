<template>
  <el-card class="box-card">
    <el-container>
      <el-header style="text-align: left" height="20px">{{ text }}</el-header>
      <el-divider></el-divider>
      <el-main>
        <el-form
          :rules="rules"
          :model="form"
          :label-position="'right'"
          label-width="60px"
          ref="form"
        >
          <el-row :gutter="20">
            <el-col :span="15" :xs="24" :sm="24" :md="11" :lg="13" :xl="15">
              <Nome prop="nome" v-model="form.nome" />
            </el-col>

            <el-col :span="6" :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
              <DataNascimento
                prop="datanascimento"
                v-model="form.datanascimento"
              />
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="15" :xs="24" :sm="24" :md="11" :lg="12" :xl="12">
              <CPF v-model="form.CPF" />
            </el-col>
            <el-col :span="15" :xs="24" :sm="24" :md="11" :lg="12" :xl="12">
              <Telefone v-model="form.telefone" />
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="14" :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
              <Logradouro v-model="form.logradouro" />
            </el-col>
            <el-col :span="10" :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
              <Bairro v-model="form.bairro" />
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="15" :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <Numero v-model="form.numero" />
            </el-col>
            <el-col :span="15" :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <CEP v-model="form.cep" />
            </el-col>
          </el-row>
          <el-row :gutter="20"> <slot></slot> </el-row>
        </el-form>
      </el-main>
      <el-footer>
        <FormFooter
          @btn-click-next="$emit('btn-click-next')"
          @btn-click-prev="$emit('btn-click-prev')"
          :hide="hideBtn"
          :type="typeBtn"
          :text="textBtn"
        />
      </el-footer>
    </el-container>
  </el-card>
</template>

<script>
import FormFooter from "./FormFooter.vue";
import CEP from "./CepInput.vue";
import CPF from "./CpfInput.vue";
import Numero from "./NumeroInput.vue";
import Bairro from "./BairroInput.vue";
import Logradouro from "./LogradouroInput.vue";
import Telefone from "./TelefoneInput.vue";
import DataNascimento from "./NascimentoInput.vue";
import Nome from "./NomeInput.vue";
export default {
  components: {
    FormFooter,
    CEP,
    Numero,
    Bairro,
    Logradouro,
    Telefone,
    CPF,
    DataNascimento,
    Nome,
  },
  name: "FormPessoa",
  props: {
    text: String,
    anonimo: Boolean,
    hideBtn: {
      type: Array,
      default: () => [false, false],
    },
    typeBtn: {
      type: Array,
      default: () => ["default", "primary"],
    },
    textBtn: {
      type: Array,
      default: () => ["Voltar", "Avançar"],
    },
  },
  data() {
    return {
      form: {
        name: "",
        CPF: "",
        logradouro: "",
        bairro: "",
        numero: "",
        cep: "",
        telefone: "",
        datanascimento: null,
      },
    };
  },
  computed: {
    rules() {
      return {
        nome: [
          {
            required: !this.anonimo,
            message: "Obrigatório",
            trigger: "blur",
          },
        ],
        datanascimento: [
          {
            type: "date",
            required: !this.anonimo,
            message: "Obrigatório",
            trigger: "blur",
          },
        ],
      };
    },
  },
};
</script>

<style scoped>
.box-card {
  margin: 0px 0 20px 0;
}
</style>