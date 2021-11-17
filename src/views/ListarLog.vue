<template>
  <el-table
    :data="
      this.listLog.filter(
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
    <el-table-column label="Data">
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top" v-if="scope.row.data">
          <template #default>
            {{ scope.row.dataLocal }}
          </template>
          <template #reference>
            <i class="el-icon-time"></i>
          </template>
        </el-popover>
        {{ scope.row.dataRelativa }}
      </template>
    </el-table-column>
    <el-table-column label="Código" prop="id"> </el-table-column>
    <el-table-column label="Usuário" prop="usuario"> </el-table-column>
    <el-table-column label="Tabela" prop="tabela"> </el-table-column>
    <el-table-column label="Operação" prop="tipo"> </el-table-column>
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
import { formatDate, formatRelativeDate } from "../controller/Util";
import * as controller from "../controller/ctlLog";
export default {
  name: "Log",
  components: {},
  data() {
    return {
      search: "",
      dados: [],
    };
  },
  computed: {
    listLog() {
      return this.dados.map((a, i) => {
        a.dataRelativa = formatRelativeDate(a.data);
        a.dataLocal = formatDate(a.data);
        a.index = i;
        return a;
      });
    }
  },
  methods: {
    async listarDados() {
      this.dados = await controller.listarTodos();
      console.log('Log Length', this.dados.length)
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
