<template>
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
        <el-input v-model="search" size="mini" placeholder="Pesquisar..." />
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
export default {
  data() {
    return {
      search: "",
    };
  },
  props: {
    dados: {
      type: Array,
      default() {
        return [];
      },
    },
    controller: Object,
  },
  methods: {
    handleEdit(row) {
      this.$router.push({ path: "CadastrarUsuario", query: { id: row.id } });
    },
    handleDelete(row) {
      this.controller.excluir(row.id);
    },
  },
};
</script>

<style></style>
