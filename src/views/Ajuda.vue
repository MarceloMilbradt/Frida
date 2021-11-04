<template>
  <FormAjuda @clickSubmit="onClickSaveSubmit" v-if="!$route.query.id" />
  <el-card v-else>
    <CardAjuda v-model="dados" :edit="true"/>
  </el-card>
</template>

<script>
import FormAjuda from "../components/FormAjuda.vue";
import * as controller from "../controller/ctlAjuda";
import CardAjuda from "../components/CardAjuda.vue";

export default {
  components: {
    FormAjuda,
    CardAjuda
  },
  data() {
    return {
      dados: {},
    };
  },
  methods: {
    onClickSaveSubmit(id, ajuda) {
      controller.incluir(ajuda).then(() => {
        this.$router.push({ path: "/" });
      });
    },

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