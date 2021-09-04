<template>
  <el-tabs v-model="tab" style="margin-top: 1.25em">
    <el-tab-pane label="Vítima">
      <FormPessoa :text="'Dados da Vítima'" ref="0" v-model="formVitima">
        <FormFooter
          @btn-click-next="changeTab(+1)"
          @btn-click-prev="changeTab(-1)"
          :hide="[true, false]"
        />
      </FormPessoa>
    </el-tab-pane>

    <el-tab-pane label="Agressor">
      <FormPessoa :text="'Dados do Agressor'"  v-model="formAgressor">
        <FormFooter
          @btn-click-next="changeTab(+1)"
          @btn-click-prev="changeTab(-1)"
        />
      </FormPessoa>
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
import FormFooter from "../components/FormFooter.vue";
import * as controller from "../controller/ctlDenuncia";

export default {
  components: {
    FormPessoa,
    FormAdicional,
    FormFooter,
  },
  data() {
    return {
      tab: "0",
      formVitima: {
        endereco: {},
        trabalho: {},
        filiacao: {},
      },
      formAgressor: {
        endereco: {},
        trabalho: {},
        filiacao: {},
      },
    };
  },
  methods: {
    changeTab(tab) {
      this.tab = `${+this.tab + tab}`;
    },
    onClickSaveSubmit() {
      var formVitima = this.formVitima;
      var formAgressor = this.formAgressor;

      controller.incluirDenuncia(formVitima, formAgressor);
    },
  },

};
</script>

<style>
</style>