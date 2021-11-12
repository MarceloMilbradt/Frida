<template>
  <el-container class="containerFilter">
    <el-header class="headerFilter">
        <el-row>
          <el-col :span="6">
              <el-select v-model="searchStatus" multiple collapse-tags>
                <el-option v-for="s in statusEnum" :key="s.value" :label="s.descricao" :value="s.value"/>
              </el-select>
          </el-col>
          <el-col :span="18">
            <el-input v-model="search" placeholder="Pesquisar envolvidos..." class="input-with-select">
              <template #append>
                <font-awesome-icon icon="search" />
              </template>
            </el-input>
          </el-col>
        </el-row>
    </el-header>
    <el-main>
        <el-table
          :data="this.listDenuncia.filter(filterByDenuncia)"
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
          <el-table-column label="Envolvidos" prop="envolvidos"/>
          <el-table-column label="Status">
            <template #default="scope">
              <font-awesome-icon :class="status(scope.row.status).color" :icon="status(scope.row.status).icon" />
              <span>{{ status(scope.row.status).descricao }}</span>
            </template>
          </el-table-column>
          <el-table-column width="60" align="right">
            <template #default="scope">
              <el-button plain type="primary" size="mini" @click="()=>toRoute('/DenunciaAnonima',scope.row.id)">
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
      searchStatus: [],
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
    }
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
    filterByDenuncia(data) {
      let filterByEnvolvidos = data.envolvidos.toLowerCase().includes(this.search.toLowerCase());
      let filterByStatus = this.searchStatus.toString().includes(data.status.toString());
      return filterByEnvolvidos && filterByStatus;
    }
  },
  async created() {
    this.searchStatus = [0];
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
