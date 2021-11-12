<template>
  <el-container class="containerFilter">
    <el-header class="headerFilter">
        <el-row>
          <el-input v-model="search" placeholder="Pesquisar por nome..." class="input-with-select">
            <template #prepend>
              <el-select v-model="searchStatus" placeholder="Select" style="width: 160px">
                <el-option v-for="s in statusEnum" :key="s.value" :label="s.descricao" :value="s.value"/>
              </el-select>
            </template>
            <template #append>
              <font-awesome-icon icon="search" />
            </template>
          </el-input>
        </el-row>
    </el-header>
    <el-main>
      <el-table :data="
          this.listAjudas.filter(
            (data) =>
              data.nome.toLowerCase().includes(this.search.toLowerCase()) && data.status == this.searchStatus
          )
        " ref="table" style="width: 100%" empty-text="Nenhum pedido de ajuda novo!" @row-click="expand">
        <el-table-column type="expand">
          <template #default="scope">
            <CardAjuda v-model="scope.row" :min="true" />
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
        <el-table-column label="Nome" prop="nome"/>
        <el-table-column label="Status">
          <template #default="scope">
            <font-awesome-icon :class="status(scope.row.status).color" :icon="status(scope.row.status).icon" />
            <span>{{ status(scope.row.status).descricao }}</span>
          </template>
        </el-table-column>
        <el-table-column width="60" align="right">
          <template #default="scope">
            <el-button plain type="primary" size="mini" @click="()=>toRoute('/Ajuda',scope.row.id)">
              <font-awesome-icon icon="external-link-alt" />
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import { formatDate, formatRelativeDate } from "../controller/Util";
import * as controller from "../controller/ctlAjuda";
import CardAjuda from "../components/CardAjuda.vue";
export default {
  name: "Home",
  components: { CardAjuda },
  data() {
    return {
      search: "",
      searchStatus: "",
      dados: [],
    };
  },
  computed: {
    listAjudas() {
      return this.dados.map((a, i) => {
        a.dataRelativa = formatRelativeDate(a.data);
        a.dataLocal = formatDate(a.data);
        a.index = i;
        return a;
      });
    },
    statusEnum() {
      return controller.buscarStatusAjuda();
    },
  },
  methods: {
    status(status) {
      return this.statusEnum.find((s) => s.value === (status ?? 0));
    },
    async listarDados() {
      this.dados = await controller.listarTodos();
    },
    handleAdd() {
      this.$router.push({ path: "Ajuda" });
    },
    handleEdit(row) {
      this.$router.push({ path: "Ajuda", query: { id: row.id } });
    },
    async handleDelete(row) {
      controller.excluir(row.id).then(() => {
        this.listarDados();
      });
    },
    expand(row, column, event) {
      this.$refs.table.toggleRowExpansion(row);
    },
    toRoute(path, id) {
      this.$router.push({ path, query: { id } });
    },
  },
  async created() {
    this.searchStatus = 0;
    this.listarDados();
  },
};
</script>

<style scoped>
p {
  text-align: center;
}
.yellow {
  color: orange;
  margin-right: 5px;
}
.green {
  color: green;
  margin-right: 5px;
}
.red {
  color: red;
  margin-right: 5px;
}
.containerFilter {
   border: 1px solid #eee;
}
.headerFilter {
  height: 50px;
  border: 1px solid #eee;
}
</style>
