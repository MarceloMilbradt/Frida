<template>
  <el-table :data="
      this.listAjudas.filter(
        (data) =>
          !search || data.nome.toLowerCase().includes(search.toLowerCase())
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
    <el-table-column label="Nome">
      <template #default="scope">
        <div>{{ scope.row.nome }}</div>
      </template>
    </el-table-column>
    <el-table-column label="">
      <template #default="scope">
        <font-awesome-icon :class="status(scope.row.status).color" :icon="status(scope.row.status).icon" />
        <span>{{ status(scope.row.status).descricao }}</span>
      </template>
    </el-table-column>
    <el-table-column width="220" align="right">
      <template #header>
        <el-input v-model="search" size="mini" placeholder="Pesquisar por nome..." />
      </template>
      <template #default="scope">
        <el-button plain type="primary" size="mini" @click="()=>toRoute('/Ajuda',scope.row.id)">
          <font-awesome-icon icon="external-link-alt" />
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import * as controller from "../controller/ctlAjuda";
import CardAjuda from "../components/CardAjuda.vue";
export default {
  name: "Home",
  components: { CardAjuda },
  data() {
    return {
      search: "",
      dados: [],
    };
  },
  computed: {
    listAjudas() {
      return this.dados.map((a, i) => {
        a.dataRelativa = this.formatRelativeDate(a.data.toDate());
        a.dataLocal = this.formatDate(a.data.toDate());
        a.index = i;
        return a;
      });
    },
    statusEnum() {
      return this.$store.getters["utils/getStatusEnum"];
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
    formatDate(date) {
      return new Date(date).toLocaleString();
    },
    formatRelativeDate(date) {
      const rtf1 = new Intl.RelativeTimeFormat("pt-BR", { style: "narrow" });
      let intervalo = "day";

      const date1 = new Date(date);
      const date2 = new Date();

      let diffTime = Math.ceil(Math.abs(date2 - date1));
      let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      diffTime /= 1000;
      let diff = diffDays;
      if (diffDays <= 1) {
        if (diffTime < 60) intervalo = "second";
        else if ((diffTime /= 60) < 60) intervalo = "minute";
        else if ((diffTime /= 60) < 24) intervalo = "hour";
        diff = diffTime;
      } else if (diffDays < 7) {
        intervalo = "day";
        diff = diffDays;
      } else if ((diffDays /= 7) < 4) {
        intervalo = "week";
        diff = diffDays;
      } else {
        intervalo = "month";
        diffDays /= 4;
        diff = diffDays;
      }

      if (!diff) return "";
      return rtf1.format(Math.floor(diff * -1), intervalo);
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
