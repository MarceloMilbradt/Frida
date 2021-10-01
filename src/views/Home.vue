<template>
  <div v-if="!$store.getters.getLogged">

    <el-card>
      <div class="main-grid">
        <el-button class="ajuda" type="danger" size="big">
          ME AJUDE!
        </el-button>
        <el-card class="violencia">
          A violência doméstica contra a mulher é uma grave violação aos direitos
          humanos. Como é por todos sabido, os números da violência doméstica
          contra a mulher não param de subir a cada pesquisa. A magnitude das
          agressões, a crueldade das ações criminosas e o requinte da vileza são
          notícias de todos os dias. O feminicídio, por exemplo, é o crime do
          momento, sem que haja uma perspectiva racional para o prenúncio ao menos
          de um declínio.
        </el-card>
        <el-card class="lei">
         A Lei Maria da Penha (11.340/16) é o instrumento principal no
        enfrentamento à violência doméstica e familiar contra mulheres no
        Brasil. Mais do que física, ela abrange abusos sexuais, psicológicos,
        morais e patrimoniais entre a vítima e seu agressor – que não precisa
        necessariamente ser cônjuge, basta que tenha algum tipo de relação
        afetiva. O nome da lei é uma homenagem à biofarmacêutica cearense Maria
        da Penha, que lutou por 20 anos para ver seu agressor preso. Maria da
        Penha sofreu duas tentativas de homicídio pelo marido, e a primeira – um
        tiro nas costas enquanto dormia – a deixou paraplégica. Depois de
        acionar a Justiça, ONGs e, por fim, a Comissão Interamericana de
        Direitos Humanos (CIDH-OEA), Penha conseguiu que seu agressor, Marco
        Antonio Herredia Viveros, fosse condenado. É essencial que as mulheres
        busquem os órgãos competentes e continuem denunciando os diversos tipos
        de violência sofridos.
        </el-card>
      </div>
    </el-card>

  </div>
</template>

<script>
import Menu from "../components/Menu.vue";
export default {
  name: "Home",
  components: {
    //Menu,
  },
  data() {},
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
  display: grid;
  min-height: 500px;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas:
    "ajuda ajuda ajuda"
    "violencia violencia ."
    ". lei lei"
    ". . .";
}

@media (max-width: 800px) {
  .main-grid {
    display: grid;
    min-height: 500px;
    grid-gap: 20px;
    grid-template-columns: 1fr;
    grid-template-areas:
      "paralax"
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
.ajuda {
  grid-area: ajuda;
}
.lei {
  grid-area: lei;
}
.violencia{
  grid-area: violencia;
}

</style>
