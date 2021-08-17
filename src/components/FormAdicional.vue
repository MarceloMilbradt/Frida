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
              <TextField prop="nome" label="nome" v-model="form.nome" />
            </el-col>

            <el-col :span="6" :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
              <DateField
                prop="datanascimento"
                label="Data de Nascimento"
                v-model="form.datanascimento"
              />
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="15" :xs="24" :sm="24" :md="11" :lg="12" :xl="12">
              <TextField
                v-model="form.CPF"
                label="CPF"
                v-maska="'###.###.###-##'"
                maxlength="9"
              />
            </el-col>
            <el-col :span="15" :xs="24" :sm="24" :md="11" :lg="12" :xl="12">
              <TextField
                v-model="form.telefone"
                label="Telefone"
                v-maska="['(##) ####-####', '(##) #####-####']"
              />
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="14" :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
              <TextField label="Rua" v-model="form.logradouro" />
            </el-col>
            <el-col :span="10" :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
              <TextField label="Bairro" v-model="form.bairro" />
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="15" :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <TextField label="Numero" v-model="form.numero" />
            </el-col>
            <el-col :span="15" :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <TextField label="CEP" v-maska="'#####-###'" v-model="form.cep" />
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
import TextField from "./TextField.vue";
import DateField from "./DateField.vue";

export default {
  components: {
    FormFooter,
    TextField,
    DateField,
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
      default: () => ["default", "success"],
    },
    textBtn: {
      type: Array,
      default: () => ["Voltar", "Salvar"],
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