<template>
  <FormAjuda @clickSubmit="onClickSaveSubmit" v-if="!$route.query.id" />
  <el-card v-else>
    <el-descriptions :column="1" border class="border-separate">
      <el-descriptions-item label-class-name="label-min">
        <template #label>
          <el-icon>
            <user />
          </el-icon>
          Data
        </template>
        {{ formatDate(dados.data?.toDate()) }}
      </el-descriptions-item>
      <el-descriptions-item label-class-name="label-min">
        <template #label>
          <el-icon>
            <user />
          </el-icon>
          Nome
        </template>
        {{ dados.nome }}
      </el-descriptions-item>
      <el-descriptions-item label-class-name="label-min">
        <template #label>
          <el-icon>
            <user />
          </el-icon>
          Contato
        </template>
        {{ dados.contato }}
      </el-descriptions-item>
      <el-descriptions-item label-class-name="label-min">
        <template #label>
          <el-icon>
            <user />
          </el-icon>
          Endereco
        </template>
        {{ dados.endereco }}
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>

<script>
import FormAjuda from "../components/FormAjuda.vue";
import * as controller from "../controller/ctlAjuda";

export default {
  components: {
    FormAjuda,
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
    formatDate(date) {
      return new Date(date).toLocaleString();
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