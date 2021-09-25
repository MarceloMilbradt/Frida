<template>
  <el-tabs v-model="tab" style="margin-top: 1.25em">
    <el-tab-pane label="Adicionais">
      <el-card class="box-card">

        <FormAdicional v-model="denuncia" @btn-click-next="onClickSaveSubmit" :text="'Informacoes Adicionais'" />
        <FormFooter @btn-click-next="changeTab(+1)" @btn-click-prev="goBack"  :text="['Cancelar', null]"/>

      </el-card>

    </el-tab-pane>
    <el-tab-pane>
      <template #label>
        <span>Vitima <i v-if="vitimaIsValid === false" class="el-icon-warning-outline"></i></span>
      </template>
      <el-card class="box-card">
        <FormPessoa :text="'Dados da Vítima'" @form-validate="setVitimaValid" v-model="denuncia.vitima">
        </FormPessoa>
        <FormFooter @btn-click-next="changeTab(+1)" @btn-click-prev="changeTab(-1)" :hide="[false, false]" />
      </el-card>
    </el-tab-pane>

    <el-tab-pane>
      <template #label>
        <span>Agressor(a) <i v-if="agressorIsValid === false" class="el-icon-warning-outline"></i></span>
      </template>
      <el-card class="box-card">
        <FormPessoa :text="'Dados do(a) Agressor(a)'" @form-validate="setAgressorValid" v-model="denuncia.agressor">
        </FormPessoa>
        <FormFooter @btn-click-next="onClickSaveSubmit" @btn-click-prev="changeTab(-1)"  :text="[null, 'Salvar!']"/>
      </el-card>
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
    parseObject(denuncia){
        delete denuncia.vitima.isValid;
        delete denuncia.vitima.valid;
        delete denuncia.agressor.isValid;
        delete denuncia.agressor.valid;
        return {...denuncia};
    },
    onClickSaveSubmit() {
      let denuncia = this.parseObject(this.denuncia);

      if (this.id) {
        controller.alterar(this.id, denuncia).then(() => {
          this.goBack();
        });
      } else {
        controller.incluir(denuncia).then(() => {
          this.goBack();
        });
      }
    },
    goBack(){
       this.$router.push({ path: "/ListarDenuncia" });
    }
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