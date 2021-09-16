<template>
  <el-tabs v-model="tab" style="margin-top: 1.25em">
    <el-tab-pane>
      <template #label>
        <span>Vitima <i v-if="!vitimaIsValid" class="el-icon-warning-outline"></i></span>
      </template>
      <FormPessoa :text="'Dados da Vítima'"  @form-validate="setVitimaValid" v-model="denuncia.vitima">
        <FormFooter @btn-click-next="changeTab(+1)" @btn-click-prev="changeTab(-1)" :hide="[true, false]" />
      </FormPessoa>
    </el-tab-pane>

    <el-tab-pane>
      <template #label>
        <span>Agressor(a) <i v-if="!agressorIsValid" class="el-icon-warning-outline"></i></span>
      </template>
      <FormPessoa :text="'Dados do(a) Agressor(a)'" @form-validate="setAgressorValid" v-model="denuncia.agressor">
        <FormFooter @btn-click-next="changeTab(+1)" @btn-click-prev="changeTab(-1)" />
      </FormPessoa>
    </el-tab-pane>

    <el-tab-pane label="Adicionais">
      <FormAdicional @btn-click-prev="changeTab(-1)" @btn-click-next="onClickSaveSubmit" :text="'Informacoes Adicionais'" ref="formAdicional" />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import FormPessoa from "../components/FormPessoa.vue";
import FormAdicional from "../components/FormAdicional.vue";
import FormFooter from "../components/FormFooter.vue";
import * as controller from "../controller/ctlDenuncia";
import { mapGetters } from "vuex";

export default {
  components: {
    FormPessoa,
    FormAdicional,
    FormFooter,
  },
  data() {
    return {
      id: null,
      tab: "0",
    };
  },
  async created() {
    var id = this.$route.query.id;
    if (id) {
      var dados = await controller.bucarPorId(id);
      this.denuncia = dados;
      this.id = id;
    }
  },
  computed: {
    ...mapGetters({
      getDenuncia: "denuncia/getDenuncia",
      vitimaIsValid: "denuncia/vitimaIsValid",
      agressorIsValid: "denuncia/agressorIsValid",
      denunciaIsValid: "denuncia/denunciaIsValid",
    }),
    denuncia() {
      return this.getDenuncia;
    },
  },
  methods: {
    setVitimaValid(valid) {
      this.$store.dispatch("denuncia/setValidVitima", valid);
      this.denuncia.vitima.valid = valid;
    },
    setAgressorValid(valid) {
      this.$store.dispatch("denuncia/setValidAgressor", valid);
      this.denuncia.agressor.valid = valid;
    },
    changeTab(tab) {
      this.tab = `${+this.tab + tab}`;
    },
    onClickSaveSubmit() {
      var denuncia = { vitima: this.denuncia.vitima, agressor: this.denuncia.agressor, adicional: null};

      if (this.id) {
        controller.alterar(this.id, denuncia).then(() => {
          this.$router.push({ path: "ListarDenuncia" });
        });
      } else {
        controller.incluir(denuncia).then(() => {
          this.$router.push({ path: "ListarDenuncia" });
        });
      }
    },
  },
};
</script>

<style>
.el-icon-warning-outline {
  color: #f56c6c;
}
</style>