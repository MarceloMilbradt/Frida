<template>

  <steps :tab="tab" />

  <el-card class="box-card" v-if="tab === 2">
    <FormAdicional v-model="denuncia" @btn-click-next="onClickSaveSubmit" :text="'Informacoes Adicionais'" />
    <FormFooter @btn-click-prev="changeTab(-1)" @btn-click-next="onClickSaveSubmit" :text="[null, 'Salvar!']" />
  </el-card>

  <el-card class="box-card" v-if="tab === 0">
    <FormPessoa :text="'Dados da Vítima'" @form-validate="setVitimaValid" v-model="denuncia.vitima" ref="vitima">
    </FormPessoa>
    <FormFooter @btn-click-next="changeTab(+1, 'vitima')" @btn-click-prev="goBack" :text="['Cancelar', null]" />
  </el-card>

  <el-card class="box-card" v-if="tab === 1">
    <FormPessoa :text="'Dados do(a) Agressor(a)'" @form-validate="setAgressorValid" v-model="denuncia.agressor" ref="agressor">
    </FormPessoa>
    <FormFooter @btn-click-next="changeTab(+1, 'agressor')" @btn-click-prev="changeTab(-1)" :hide="[false, false]" />
  </el-card>
</template>

<script>
import FormPessoa from "../components/FormPessoa.vue";
import FormAdicional from "../components/FormAdicional.vue";
import FormFooter from "../components/FormFooter.vue";
import * as controller from "../controller/ctlDenuncia";
import Steps from "../components/Steps.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    FormPessoa,
    FormAdicional,
    FormFooter,
    Steps,
  },
  data() {
    return {
      id: null,
      tab: 0,
      denuncia: {
        data: new Date().toISOString(),

        agressao: [],

        vitima: {
          endereco: {},
          trabalho: {},
          filiacao: {},
          isValid: true,
        },

        agressor: {
          endereco: {},
          trabalho: {},
          filiacao: {},
          isValid: true,
        },
      },
    };
  },
  async created() {
    let id = this.$route.params.id;
    if (id) {
      let dados = await controller.bucarPorId(id);
      this.denuncia = { ...dados, id };
      this.id = id;
    }
    this.$store.dispatch("denuncia/setDenuncia", this.denuncia);
  },
  computed: {
    ...mapGetters({
      getDenuncia: "denuncia/getDenuncia",
      vitimaIsValid: "denuncia/vitimaIsValid",
      agressorIsValid: "denuncia/agressorIsValid",
      denunciaIsValid: "denuncia/denunciaIsValid",
    }),
  },
  methods: {
    submitForm(formName) {
      return this.$refs[formName].$refs.form.validate((valid) => valid);
    },
    setVitimaValid(valid) {
      this.$store.dispatch("denuncia/setValidVitima", valid);
      this.denuncia.vitima.valid = valid;
    },
    setAgressorValid(valid) {
      this.$store.dispatch("denuncia/setValidAgressor", valid);
      this.denuncia.agressor.valid = valid;
    },
    async changeTab(tab, formName) {
      let valid = 1;
      if (formName) {
        await this.submitForm(formName);
        if (formName === "vitima") valid = this.vitimaIsValid;
        if (formName === "agressor") valid = this.agressorIsValid;
      }
      this.tab += tab * valid;
    },
    parseObject(denuncia) {
      delete denuncia.vitima.isValid;
      delete denuncia.vitima.valid;
      delete denuncia.agressor.isValid;
      delete denuncia.agressor.valid;
      return { ...denuncia };
    },
    onClickSaveSubmit() {
      let denuncia = this.parseObject(this.denuncia);

      if (this.id) {
        controller.alterar(this.id, denuncia).then(() => {
          this.goBack();
        });
      } else {
        const anonima = this.$store.getters.getLogged
        controller.incluir(denuncia, !anonima).then(() => {
          this.goBack();
        });
      }
    },
    goBack() {
      if (this.$store.getters.getLogged)
        this.$router.push({ path: "/ListarDenuncia" });
      else this.$router.push({ path: "/" });
    },
  },
};
</script>

<style scoped>
.box-card {
  margin: 0 0 1.25em 0;
}
.el-icon-warning-outline {
  color: #f56c6c;
}
</style>