<template>
  <el-table
    :data="
      this.dados.filter(
        (data) =>
          !search || data.envolvidos.toLowerCase().includes(search.toLowerCase())
      )
    "
    border
    style="width: 100%"
  >
    <el-table-column label="Motivo" prop="motivo"> </el-table-column>
    <el-table-column label="Envolvidos" prop="envolvidos"> </el-table-column>
    <el-table-column label="Local" prop="local"> </el-table-column>
    <el-table-column label="Data" prop="periodo"> </el-table-column>
    <el-table-column align="right">
      <template #header>
        <el-input
          v-model="search"
          size="mini"
          placeholder="Pesquisar envolvidos..."
        />
      </template>
      <template #default="scope">
        <el-button size="mini" type="success" @click="handleArquivar(scope.row)">Arquivar</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import * as controller from "../controller/ctlDenunciaAnonima";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      search: "",
      dados: [],
    };
  },
  methods: {
    async listarDados() {
      this.dados = await controller.listarTodos();
    },
    handleArquivar(row) {
      //Tornar essa denuncia em um Caso
      //this.$router.push({ path: "DenunciaAnonima", query: { id: row.id } });
    },
  },
  async created() {
    this.listarDados();
  },
};
</script>

<style scoped>
p {
  text-align: center;
}
</style>
