<template>
  <div class="main-grid" v-if="$store.getters.getLogged">

    <div class="title">
      <h1>FRIDA</h1>
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
          <span>Novos pedidos de Ajuda</span>
          <el-button type="primary" size="small">
            <font-awesome-icon icon="external-link-alt" />
          </el-button>
        </div>
      </template>

      TODO tabela de ajudas
    </el-card>

    <el-card class="denuncia-info">
      <template #header>
        <div class="card">
          <span>Novas denuncias</span>
          <el-button type="primary" size="small">
            <font-awesome-icon icon="external-link-alt" />
          </el-button>
        </div>
      </template>
      TODO Tabelas de denuncias
    </el-card>

    <el-card class="acesso-rapido">
      TODO acesso rápido
    </el-card>

  </div>
</template>

<script>
export default {
  name: "Dashboard",
  components: {
    //Menu,
  },
  data() {return {}},
};
</script>

<style scoped>
p {
  text-align: center;
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
  .title{
    display: none;
  }
  .acesso-rapido{
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
.acesso-rapido{
  grid-area: acesso;
}
</style>
