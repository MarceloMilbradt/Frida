<template>
  <el-tabs v-model="tab" style="margin-top: 1.250em">
    <el-tab-pane label="Vítima">
      <FormPessoa
        @btn-click-next="changeTab(+1)"
        :hideBtn="[true, false]"
        :text="'Dados da Vítima'"
        ref="formVitima"
      >
        <el-checkbox v-model="terceiro">Não sou a vitima </el-checkbox>
      </FormPessoa>
    </el-tab-pane>

    <el-tab-pane label="Voce" v-if="terceiro">
      <FormPessoa
        @btn-click-next="changeTab(+1)"
        @btn-click-prev="changeTab(-1)"
        :anonimo="anonimo"
        :text="'Dados Pessoais'"
        ref="formTerceiro"
      >
        <el-checkbox v-model="anonimo">Denuncia Anonima</el-checkbox>
      </FormPessoa>
    </el-tab-pane>

    <el-tab-pane label="Agressor">
      <FormPessoa
        @btn-click-next="changeTab(+1)"
        @btn-click-prev="changeTab(-1)"
        :text="'Dados do Agressor'"
        ref="formAgressor"
      />
    </el-tab-pane>

    <el-tab-pane label="Adicionais">
      <FormAdicional
        @btn-click-prev="changeTab(-1)"
        @btn-click-next="onClickSaveSubmit"
        :text="'Informacoes Adicionais'"
        ref="formAdicional"
      />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import FormPessoa from "../components/FormPessoa.vue";
import FormAdicional from "../components/FormAdicional.vue";
import * as controller from "../controller/ctlDenuncia";

export default {
  components: {
    FormPessoa,
    FormAdicional
  },
  data() {
    return {
      tab: "0",
      terceiro: false,
      anonimo: false,
    };
  },
  methods: {
    changeTab(tab) {
      this.tab = `${+this.tab + tab}`;
    },
    onClickSaveSubmit() {
      var formVitima = this.$refs.formVitima.$data.form;
      var formAgressor = this.$refs.formAgressor.$data.form;
      var formTerceiro = null;
      var formAdicional = null;
      if (this.terceiro) formTerceiro = this.$refs.formTerceiro.$data.form;

      controller.incluirDenuncia(formVitima, formAgressor, formTerceiro);
    },
  },
};
</script>

<style>
</style>