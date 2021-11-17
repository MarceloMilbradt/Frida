<template>
  <el-row>
    <el-button class="botao-incluir" type="success" @click="handleAdd()">Incluir</el-button>
  </el-row>
  <el-table
    :data="
      this.listFormularios.filter(
        (data) =>
          !search || data.nome.toLowerCase().includes(search.toLowerCase())
      )
    "
    border
    style="width: 100%"
>
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
    <el-table-column label="Nome" prop="nome"> </el-table-column>
    <el-table-column label="Risco" prop="resultado.riscoDescricao"> </el-table-column>
    <el-table-column align="right">
      <template #header>
        <el-input
          v-model="search"
          size="mini"
          placeholder="Pesquisar por nome..."
        />
      </template>
      <template #default="scope">
        <el-button size="mini" @click="handleEdit(scope.row)">Editar</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
          >Deletar</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { formatDate, formatRelativeDate } from "../controller/Util";
import * as controller from "../controller/ctlFormulario";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      search: "",
      dados: [],
    };
  },
  computed: {
    listFormularios() {
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
    },
    handleAdd() {
      this.$router.push({ path: "Avaliacao" });
    },
    handleEdit(row) {
      this.$router.push({ path: "Avaliacao", query: { id: row.id } });
    },
    async handleDelete(row) {
      controller.excluir(row.id).then(async () => {
        this.listarDados();
      });
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

.botao-incluir {
  margin-bottom: 10px;
}
</style>
