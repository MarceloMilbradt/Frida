<template>
  <div>
    <div style="margin-top: 15px;">
      <ais-instant-search :search-client="searchClient" index-name="frida_denuncias">
        <StateRefresher :key="seachCacheKey" />

        <div>
          <div class="menu-header">

            <ais-refinement-list attribute="tags" searchable>
              <template v-slot="{ items,isFromSearch, refine,searchForItems}">
                <div class="search-info">
                  <input placeholder="Pesquisar por Tag" @input="searchForItems($event.currentTarget.value)">
                  <div v-if="isFromSearch && !items.length">Nenhum resultado.</div>
                  <div v-for="item in items" :key="item.value">
                    <el-checkbox @change="refine(item.value)">{{item.label}} <el-badge :value=" item.count" :max="99"></el-badge>
                    </el-checkbox>
                  </div>
                </div>
              </template>
            </ais-refinement-list>

            <ais-stats>
              <template v-slot="{ hitsPerPage, nbPages, nbHits, page, processingTimeMS, query }">
                <div class="search-info">
                  <div>
                    Pagina <b>{{ page + 1 }}</b> de <b>{{ nbPages }}</b>
                  </div>
                  <div>
                    <b>{{ hitsPerPage }}</b> registros por página
                  </div>
                  <div>
                    <b>{{ nbHits }}</b> denuncias encontradas em {{ processingTimeMS }}ms <span v-if="query">para <q>{{ query }}</q></span>
                  </div>
                </div>
              </template>
            </ais-stats>
            <el-button type="success" @click="handleAdd()">Incluir</el-button>

          </div>

          <el-row>
            <el-col :span="8">

              <ais-menu-select attribute="status">
                <!-- <el-select v-model="searchStatus" @change="changeStatus(refine)">
                  <el-option v-for="s in statusEnum" :key="s.value" :label="s.descricao" :value="s.value" />
                </el-select> -->
                <template v-slot="{ items, refine }">
                  <el-select v-model="searchStatus"  @change="refine(searchStatus)">
                    <el-option :label="''" :value="''" />
                    <el-option v-for="item in items" :label="buscaStatusPorId(item.value)" :key="item.value" :value="item.value" />
                  </el-select>
                </template>

              </ais-menu-select>

            </el-col>
            <el-col :span="16">
              <ais-search-box>
                <template v-slot="{ currentRefinement, refine }">
                  <el-input type="search" :value="currentRefinement" @input="refine(input3)" placeholder="Pesquisar" v-model="input3" class="input-with-select">
                    <template #append>
                      <font-awesome-icon icon="search" />
                    </template>
                  </el-input>
                </template>
              </ais-search-box>
            </el-col>
          </el-row>

          <ais-pagination class="pagination">
            <template v-slot="{ nbHits,refine}">
              <el-pagination layout="prev, pager, next" :page-size="20" :total="nbHits" background @current-change="(p)=>refine(p-1)"></el-pagination>
            </template>
          </ais-pagination>

        </div>

        <ais-hits>
          <template v-slot="{ items }">
            <el-card class="box-card" v-for="hit in items" :key="hit.objectID">

              <el-descriptions :title="hit.filiacao?.mae ?? hit.vitima.nome +' - '+ new Date(hit.data).toLocaleDateString()" column="3" size="small" border>
                <template #extra>
                  <div>
                    <el-button type="danger" size="small" @click="handleDelete(hit.objectID)">
                      <font-awesome-icon icon="trash-alt" />
                    </el-button>
                    <el-button type="info" size="small" @click="handleAvaliacao(hit.objectID, hit.vitima.nome)">
                      <font-awesome-icon icon="chart-line" />
                    </el-button>
                    <el-button type="primary" size="small" @click="handleEdit(hit.objectID)">
                      <font-awesome-icon icon="edit" />
                    </el-button>
                  </div>
                </template>

                <el-descriptions-item span="2" v-if="hit.data">
                  <template #label>
                    <font-awesome-icon class="" icon="calendar-alt" />
                    Data
                  </template>
                  {{new Date(hit.data).toLocaleDateString()}}
                </el-descriptions-item>

                <el-descriptions-item span="2">
                  <template #label>
                    <font-awesome-icon class="" icon="info-circle" />
                    Status
                  </template>
                  {{this.buscaStatusPorId(hit.status)}}
                </el-descriptions-item>

                <el-descriptions-item label-class-name="label-denuncia-min" :span="hit.vitima.cpf ? 2 : 3">
                  <template #label>
                    <font-awesome-icon class="" icon="heart" />
                    Vítima
                  </template>
                  <ais-highlight attribute="vitima.nome" :hit="hit" />
                </el-descriptions-item>

                <el-descriptions-item v-if="hit.vitima.cpf" label-class-name="label-denuncia-min" span="1">
                  <template #label>
                    <font-awesome-icon class="" icon="id-card" />
                    CPF
                  </template>
                  <ais-highlight attribute="vitima.cpf" :hit="hit" />
                </el-descriptions-item>

                <el-descriptions-item :span="hit.agressor.cpf ? 2 : 3">
                  <template #label>
                    <font-awesome-icon class="" icon="exclamation" />
                    Agressor(a)
                  </template>
                  <ais-highlight attribute="agressor.nome" :hit="hit" />
                </el-descriptions-item>

                <el-descriptions-item v-if="hit.agressor.cpf" span="1">
                  <template #label>
                    <font-awesome-icon class="" icon="id-card" />
                    CPF
                  </template>
                  <ais-highlight attribute="agressor.cpf" :hit="hit" />
                </el-descriptions-item>

                <el-descriptions-item span="3">
                  <template #label>
                    <font-awesome-icon class="icon" icon="female" />
                    Mãe da Vítima
                  </template>
                  <ais-highlight attribute="vitima.filiacao.mae" :hit="hit" />
                </el-descriptions-item>

                <el-descriptions-item span="3" v-if="hit.tags">
                  <template #label>
                    <font-awesome-icon class="" icon="tags" />
                    Tags
                  </template>
                  <div class="container">
                    <el-tag :closable="false" :effect="'light'" :key="tag" v-for="(tag, index) in hit.tags" :disable-transitions="false">
                      <ais-highlight :attribute="'tags.' + index" :hit="hit" />
                    </el-tag>
                  </div>
                </el-descriptions-item>
              </el-descriptions>
            </el-card>
          </template>
        </ais-hits>
      </ais-instant-search>

    </div>
  </div>
</template>

<script>
import * as controller from "../controller/ctlDenuncia";
import { client, doRefresh } from "../controller/Algolia";
import StateRefresher from "../components/StateRefresher";
export default {
  name: "Home",
  components: { StateRefresher },
  data() {
    return {
      search: "",
      searchStatus: 0,
      dados: [],
      select: "",
      input3: "",
      seachCacheKey: 0,
    };
  },
  computed: {
    statusEnum() {
      return controller.buscarStatusDenuncia();
    },
    searchClient() {
      return client;
    },
  },
  methods: {
    status(status) {
      return this.statusEnum.find((s) => s.value == (status ?? 0));
    },
    buscaStatusPorId(status) {
      return this.statusEnum.find((s) => s.value == (status || 0))?.descricao;
    },
    handleAdd() {
      this.$router.push({ path: "Denuncia" });
    },
    handleEdit(id) {
      this.$router
        .push({ name: "Denúncia", params: { id } })
        .then(() => window.scrollTo(0, 0));
    },
    async handleDelete(id) {
      controller.excluir(id).then(() => {
        doRefresh(this.searchClient);
        this.seachCacheKey++;
      });
    },
    handleAvaliacao(id, vitima) {
      this.$router
        .push({
          name: "Avaliação de Risco",
          query: { idCaso: id, vitima: vitima },
        })
        .then(() => window.scrollTo(0, 0));
    },
    changeStatus(refine) {
      console.log(this.searchStatus);
      console.log(refine);
      refine(this.searchStatus);
    },
  },
  created() {
    this.searchStatus = "";
    this.seachCacheKey++;
  },
};
</script>

<style scoped>
p {
  text-align: center;
}
.box-card {
  cursor: pointer;
  text-align: left;
  margin: 1.25em;
}
.box-card:hover {
  transform: scale(1.04);
}
.container {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}
.search-info {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: flex-end;
  align-items: flex-start;
  gap: 5px;
}
.menu-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
}
.pagination {
  margin-top: 10px;
}
.el-form-item {
  display: flex;
  margin-bottom: 0;
}
.yellow {
  color: orange;
}
.green {
  color: green;
}
.red {
  color: red;
}
</style>
<style>
.label-denuncia-min {
  width: 140px;
}
.btn-prev .el-icon {
  display: inline-block !important;
}
.btn-next .el-icon {
  display: inline-block !important;
}
.el-pagination button:disabled {
  display: none;
}
.el-badge__content {
  border: unset;
}
</style>