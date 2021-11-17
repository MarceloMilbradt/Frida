<template>
  <el-row>
    <el-button class="botao-incluir" type="success" @click="handleAdd()">Incluir</el-button>
  </el-row>
  <el-table
    :data="
      this.dados.filter(
        (data) =>
          !search || data.nome.toLowerCase().includes(search.toLowerCase())
      )
    "
    border
    style="width: 100%"
  >
    <el-table-column label="Nome" prop="nome"> </el-table-column>
    <el-table-column label="Email" prop="email"> </el-table-column>
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
import * as controller from "../controller/ctlUsuario";
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
    handleAdd() {
      this.$router.push({ path: "CadastrarUsuario" });
    },
    handleEdit(row) {
      this.$router.push({ path: "CadastrarUsuario", query: { id: row.id } });
    },
    async handleDelete(row) {
      controller.excluir(row.id).then(() => {
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
