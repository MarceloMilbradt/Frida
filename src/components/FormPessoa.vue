<template>
  <!-- <el-card class="box-card"> -->
  <el-container>
    <el-header style="text-align: left" height="1.250em">
      <div>{{text}}<i v-if="!valid" title="Formulário Inválido!" class="el-icon-warning-outline"></i></div>
    </el-header>
    <el-divider></el-divider>
    <el-main>
      <el-form @validate="validate" :model="form" :label-position="'right'" :label-width="'160px'" ref="form">
        <FormPessoaBase v-model="form" :emailField="emailField"></FormPessoaBase>
        <el-space direction="vertical" fill wrap style="width: 100%">

          <AddButton v-if="!exibeEndereco" v-model="exibeEndereco" label="Endereço" title="Adicionar Endereço" />

          <div v-if="exibeEndereco">
            <el-divider content-position="right">Endereço
              <AddRemoveButton v-model="exibeEndereco" @click="() => this.form.endereco = {}" />
            </el-divider>

            <FormEndereco v-model="form.endereco"></FormEndereco>
          </div>

          <AddButton v-if="!exibeFiliacao && form?.filiacao" v-model="exibeFiliacao" label="Fámilia" title="Adicionar informações da fámilia" />

          <div v-if="exibeFiliacao && form?.filiacao ">
            <el-divider content-position="right">Fámilia
              <AddRemoveButton v-model="exibeFiliacao" />
            </el-divider>

            <FormFiliacao v-model="form.filiacao"></FormFiliacao>
          </div>

          <AddButton v-if="!exibeTrabalho && form?.trabalho" v-model="exibeTrabalho" label="Ocupação" title="Adicionar informações da ocupação" />

          <div v-if="exibeTrabalho && form?.trabalho">
            <el-divider content-position="right">Ocupação
              <AddRemoveButton v-model="exibeTrabalho" />
            </el-divider>
            <FormProfissao v-model="form.trabalho"></FormProfissao>
          </div>

        </el-space>
      </el-form>
      <div style="margin-top: 20px">
        <slot></slot>
      </div>
    </el-main>
  </el-container>
  <!-- </el-card> -->
</template>

<script>
import FormEndereco from "./FormEndereco.vue";
import FormProfissao from "./FormProfissao.vue";
import FormFiliacao from "./FormFiliacao.vue";
import FormPessoaBase from "./FormPessoaBase.vue";
import AddButton from "./AddButton.vue";
import AddRemoveButton from "./AddRemoveButton.vue";

export default {
  components: {
    FormEndereco,
    FormFiliacao,
    FormProfissao,
    FormPessoaBase,
    AddButton,
    AddRemoveButton,
  },
  name: "FormPessoa",
  emits: ["update:modelValue", "form-validate"],
  data() {
    return {
      isValid: {},
      valid: true,
      exibeTrabalho: null,
      exibeFiliacao: null,
      exibeEndereco: null,
    };
  },
  props: {
    text: String,
    storeId: String,
    emailField: Boolean,
    modelValue: Object,
  },
  watch: {
    form: {
      deep: true,
      handler: function () {
        if (this.exibeEndereco == null)
          this.exibeEndereco = Object.keys(this.form.endereco).length > 0;
        if (this.exibeFiliacao == null)
          this.exibeFiliacao = Object.keys(this.form.filiacao).length > 0;
        if (this.exibeTrabalho == null)
          this.exibeTrabalho = Object.keys(this.form.trabalho).length > 0;
      },
    },
  },
  computed: {
    form: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
  methods: {
    async validate(p, v) {
      this.isValid[p] = v;
      let valid = Object.values(this.isValid).every((v) => v);
      if (this.form) this.form.valid = valid;
      this.$emit("form-validate", valid);
      this.valid = valid;
      return valid;
    },
    
  },
};
</script>

<style scoped>
.el-icon-warning-outline {
  color: #f56c6c;
  margin-left: 10px;
}
</style>