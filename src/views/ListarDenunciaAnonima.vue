<template>
  Buscar Por Status
  <el-select v-model="searchStatus" @change="change">
    <el-option v-for="s in statusEnum" :key="s.value" :label="s.descricao" :value="s.value">
    </el-option>
  </el-select>
  <el-table
    :data="
      this.listDenuncia.filter(
        (data) =>
          data.envolvidos.toLowerCase().includes(search.toLowerCase()) && data.status == this.searchStatus
      )
    "
    ref="table" style="width: 100%" empty-text="Nenhum denúncia nova!" @row-click="expand">
    <el-table-column type="expand">
      <template #default="scope">
        <CardDenunciaAnonima v-model="scope.row" :min="true" />
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
    <el-table-column label="Envolvidos" prop="envolvidos"> </el-table-column>
    <el-table-column label="Status">
      <template #default="scope">
        <font-awesome-icon :class="status(scope.row.status).color" :icon="status(scope.row.status).icon" />
        <span>{{ status(scope.row.status).descricao }}</span>
      </template>
    </el-table-column>
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="mini" placeholder="Pesquisar envolvidos..."/>
      </template>
      <template #default="scope">
        <el-button plain type="primary" size="mini" @click="()=>toRoute('/DenunciaAnonima',scope.row.id)">
          <font-awesome-icon icon="external-link-alt" />
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { formatDate, formatRelativeDate } from "../controller/Util";
import * as controller from "../controller/ctlDenunciaAnonima";
import CardDenunciaAnonima from "../components/CardDenunciaAnonima.vue";
export default {
  name: "Home",
  components: {
    CardDenunciaAnonima
  },
  data() {
    return {
      search: "",
      searchStatus: "",
      dados: [],
    };
  },
  computed: {
    listDenuncia() {
      return this.dados.map((a, i) => {
        a.dataRelativa = formatRelativeDate(a.data);
        a.dataLocal = formatDate(a.data);
        a.index = i;
        return a;
      });
    },
    statusEnum() {
      return controller.buscarStatusDenuncia();
    },
  },
  methods: {
    status(status) {
      return this.statusEnum.find((s) => s.value === (status ?? 0));
    },
    async listarDados() {
      this.dados = await controller.listarTodos();
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
</style>
