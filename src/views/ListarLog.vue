<template>
  <el-table
    :data="
      this.dados.filter(
        (data) =>
          !search || data.tabela.toLowerCase().includes(search.toLowerCase())
      )
    "
    border
    style="width: 100%"
  >
    <el-table-column type="expand">
      <template #default="props">
        <p>Dados: {{ props.row.dados }}</p>
      </template>
    </el-table-column>
    <el-table-column label="Código" prop="id"> </el-table-column>
    <el-table-column label="Usuário" prop="usuario"> </el-table-column>
    <el-table-column label="Tabela" prop="tabela"> </el-table-column>
    <el-table-column label="Operação" prop="tipo"> </el-table-column>
    <el-table-column label="Data">
      <template #default="scope">{{ formataData(scope.row.data) }}</template>
    </el-table-column>
    <el-table-column align="right">
      <template #header>
        <el-input
          v-model="search"
          size="mini"
          placeholder="Pesquisar nome da tabela..."
        />
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import * as controller from "../controller/ctlLog";
import * as util from "../controller/Util";
export default {
  name: "Log",
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
      console.log('Log Length', this.dados.length)
    },
    formataData(data) {
      //Formata a data para o formato 'dd/mm/yyyy hh mm'
      var options = { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
      return new Date(data).toLocaleDateString("pt-BR", options);
    }
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
