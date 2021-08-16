<template>
  <el-card class="box-card">
    <el-container>
      <el-header style="text-align: left" height="20px">{{ text }}</el-header>
      <el-divider></el-divider>
      <el-main>
        <el-form :label-position="'right'" label-width="60px" ref="form">
          <el-row :gutter="20">
            <el-col :span="15" :xs="24" :sm="24" :md="11" :lg="13" :xl="15">
              <el-form-item label="Nome">
                <el-input v-model="form.nome" maxlength="200"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6" :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
              <el-form-item class="input-data-nascimento" label-width="150px" label="Data de nascimento">
                <el-input
                  type="date"
                  v-model="form.datanascimento"
                  :max="maxDate"
                  placeholder="Data de nascimento"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="15" :xs="24" :sm="24" :md="11" :lg="12" :xl="12">
              <el-form-item label="CPF">
                <el-input
                  v-maska="'###.###.###-##'"
                  maxlength="14"
                  v-model="form.CPF"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="15" :xs="24" :sm="24" :md="11" :lg="12" :xl="12">
              <el-form-item label="Telefone">
                <el-input
                  v-maska="['(##) ####-####', '(##) #####-####']"
                  
                  v-model="form.telefone"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="15" :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
              <el-form-item label="Rua">
                <el-input maxlength="200" v-model="form.logradouro"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="15" :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
              <el-form-item label="Bairro">
                <el-input maxlength="200" v-model="form.bairro"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="15" :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <el-form-item label="Numero">
                <el-input
                  maxlength="200"
                  v-model="form.numero"
                  v-maska="'#*'"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="15" :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <el-form-item label="CEP">
                <el-input
                  maxlength="200"
                  v-model="form.cep"
                  v-maska="'#####-###'"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
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
export default {
  components: { FormFooter },
  name: "FormPessoa",
  props: {
    text: String,
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
      maxDate: new Date().toISOString("YYYY-MM-DD").split("T")[0],
    };
  },
};
</script>

<style scoped>
.box-card {
  margin: 0px 0 20px 0;
}
@media (max-width: 650px) {
  .input-data-nascimento {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
  }
}
</style>