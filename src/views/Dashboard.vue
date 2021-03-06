<template>
  <div class="main-grid" v-if="$store.getters.getLogged">

    <div class="title">
      <h1></h1>
    </div>

    <el-card class="user-info">
      <div>Logado como <b>{{$store.getters.getUser.email}}</b></div>
      <div v-if="!$store.getters.getUser.emailVerified">
        <font-awesome-icon icon="exclamation-triangle" class="icon" style="margin:0 5px;" /> Email não verificado!
      </div>

    </el-card>

    <el-card class="ajuda-info">
      <template #header>
        <div class="card">
          <font-awesome-icon class="icon" icon="heart" />
          <span>Novos Pedidos de Ajuda</span>
          <el-button type="primary" size="small" @click="()=>toRoute('/ListarAjuda')">
            <font-awesome-icon icon="external-link-alt" />
          </el-button>
        </div>
      </template>

      <el-table :data="listAjudas" ref="table" style="width: 100%" empty-text="Nenhum pedido de ajuda novo!" @row-click="expand" stripe>
        <el-table-column type="expand">
          <template #default="scope">
              <CardAjuda v-model="scope.row" :min="true"/>
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
        <el-table-column width="80">
          <template #default="scope">
            <el-button plain type="primary" size="mini" @click="()=>toRoute('/Ajuda',scope.row.id)">
              <font-awesome-icon icon="external-link-alt" />
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card class="denuncia-info">
      <template #header>
        <div class="card">
          <font-awesome-icon class="icon" icon="fist-raised" />
          <span>Novas Denúncias</span>
          <el-button type="primary" size="small" @click="()=>toRoute('/ListarDenuncia')">
            <font-awesome-icon icon="external-link-alt" />
          </el-button>
        </div>
      </template>

      <el-table :data="listDenuncias" ref="table" style="width: 100%" empty-text="Nenhuma denúncia nova!" @row-click="expand">
        <el-table-column type="expand">
          <template #default="scope">
              <CardDenunciaAnonima v-model="scope.row" :min="true"/>
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
        <el-table-column label="Envolvidos">
          <template #default="scope">
            <div>{{ scope.row.envolvidos }}</div>
          </template>
        </el-table-column>
        <el-table-column width="80">
          <template #default="scope">
            <el-button plain type="primary" size="mini" @click="()=>toRoute('/DenunciaAnonima',scope.row.id)">
              <font-awesome-icon icon="external-link-alt" />
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card class="acesso-rapido">
      <el-menu :router="true">
        <el-menu-item :key="index" :index="rule.path" v-for="(rule, index) in routes">
          <font-awesome-icon class="icon" :icon="rule.meta?.icon" />
          <template #title>
            <span class="menu-item-name">{{ rule.name }}</span>
          </template>
        </el-menu-item>
      </el-menu>
    </el-card>

  </div>
</template>

<script>
import { formatDate, formatRelativeDate } from "../controller/Util";
import { listarUltimosN as listarAjudas } from "../controller/ctlAjuda";
import { listarUltimosN as listarDenuncias } from "../controller/ctlDenunciaAnonima";
import CardAjuda from "../components/CardAjuda.vue";
import CardDenunciaAnonima from "../components/CardDenunciaAnonima.vue";
export default {
  name: "Dashboard",
  components: {
    CardAjuda,
    CardDenunciaAnonima
  },
  data() {
    return {
      ajudas: [],
      denuncias: [],
    };
  },
  computed: {
    listAjudas() {
      return this.ajudas.map((a, i) => {
        a.dataRelativa = formatRelativeDate(a.data);
        a.dataLocal = formatDate(a.data);
        a.index = i;
        return a;
      });
    },
    listDenuncias() {
      return this.denuncias.map((a, i) => {
        a.dataRelativa = formatRelativeDate(a.data);
        a.dataLocal = formatDate(a.data);
        a.index = i;
        return a;
      });
    },
    routes() {
      const logged = this.$store.getters.getLogged;
      const [...routes] = this.$router.options.routes;
      return [...routes.filter((r) => r.meta?.quickAccess)];
    },
  },

  methods: {
    expand(row, column, event) {
      this.$refs.table.toggleRowExpansion(row);
    },
    toRoute(path,id) {
      this.$router.push({ path , query: { id }});
    },
    async getAjudas() {
      this.ajudas = await listarAjudas(5);
      return this.ajudas;
    },
    async getDenuncias() {
      this.denuncias = await listarDenuncias(5);
      return this.denuncias;
    },
  },
  async created() {
    this.getAjudas();
    this.getDenuncias();
  },
};
</script>

<style scoped>
.el-menu {
  border-right: unset;
}
.card {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.main-grid {
  padding-top: 50px;
  display: grid;
  min-height: 500px;
  grid-gap: 20px;
  grid-template-columns: 3fr 1fr;
  grid-template-areas:
    "title user"
    "ajuda acesso"
    "denuncia acesso";
}

@media (max-width: 800px) {
  .main-grid {
    padding-top: 20px;
    display: grid;
    min-height: 500px;
    grid-gap: 20px;
    grid-template-columns: 1fr;
    grid-template-areas:
      "ajuda"
      "denuncia"
      "user";
  }
  .title {
    display: none;
  }
  .acesso-rapido {
    display: none;
  }
}
.title {
  grid-area: title;
}
.user-info {
  grid-area: user;
}
.ajuda-info {
  grid-area: ajuda;
}
.denuncia-info {
  grid-area: denuncia;
}
.acesso-rapido {
  grid-area: acesso;
}
</style>