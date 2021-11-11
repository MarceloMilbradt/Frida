<template>
  <FormDenunciaAnonima @clickSubmit="onClickSaveSubmit" v-if="!$route.query.id" />
  <el-card v-else>
    <CardDenunciaAnonima v-model="dados" :edit="true"/>
  </el-card>
</template>

<script>
import FormDenunciaAnonima from "../components/FormDenunciaAnonima.vue";
import CardDenunciaAnonima from "../components/CardDenunciaAnonima.vue";
import * as controller from "../controller/ctlDenunciaAnonima";

export default {
  components: {
    CardDenunciaAnonima,
    FormDenunciaAnonima
  },
  data() {
    return {
      dados: {},
    };
  },
  methods: {
    onClickSaveSubmit(id, denunciaAnonima) {
          controller.incluir(denunciaAnonima).then(() => {
            this.$router.push({ path: "/" });
          })
    }
  },
  async created() {
    var id = this.$route.query.id;
    if (id) {
      var dados = await controller.bucarPorId(id);
      this.dados = dados;
      this.id = id;
    }
  },
};
</script>
<style>
.border-separate table {
  border-collapse: separate !important;
}
.label-min {
  width: 140px;
}
</style>