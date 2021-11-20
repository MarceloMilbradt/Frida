<template>
  <div class="main-flex card" v-if="!$store.getters.getLogged">

    <el-card>
      <div class="top-grid">
        <h2 class="title">NÃO SE CALE!</h2>
        <h4 class="subtitle">PEÇA AJUDA!</h4>
        <el-button class="ajuda" type="danger" size="big" @click="helpme">
          ME AJUDE!
        </el-button>

      </div>
    </el-card>
    <div class="grid">
      <div class="feed">
        <Feed limit="4"></Feed>
      </div>
      <el-card class="area-info">
        <div class="info">

          <h2>O QUE É VIOLÊNCIA DOMÉSTICA ?</h2>
          <p class="violencia">
            Violência doméstica é todo tipo de violência que é praticada entre os membros que habitam um ambiente familiar em comum.
          </p>
          <el-divider>
            <font-awesome-icon class="icon" icon="heart" />
          </el-divider>
          <h2 class="existe-lei">EXISTE LEI ?</h2>

          <p class="title-lei">
            A Lei Maria da Penha, em vigor desde 2006. ela cria mecanismos para prevenir e coibir a violência doméstica e familiar contra a mulher
          </p>

          <p class="lei">A Lei Maria da Penha (11.340/16) é o instrumento principal no
            enfrentamento à violência doméstica e familiar contra mulheres no
            Brasil. Mais do que física, ela abrange abusos sexuais, psicológicos,
            morais e patrimoniais entre a vítima e seu agressor – que não precisa
            necessariamente ser cônjuge, basta que tenha algum tipo de relação
            afetiva.</p>

          <el-divider>
            <font-awesome-icon class="icon" icon="heart" />
          </el-divider>
        </div>
      </el-card>

      <el-card class="area-ciclos">
        <div class="ciclos">
          <CicloItem :key="ciclo.title" :icon="ciclo.icon" :text="ciclo.text" :title="ciclo.title" :index="index+1" v-for="(ciclo,index) in clicos">
            <el-divider>
            </el-divider>
          </CicloItem>
        </div>
      </el-card>

      <el-card class="area-avaliacao">
        <div class="info">

          <h2>AVALIAÇÃO DE RISCO</h2>

          <p class="avaliacao-risco">
            A avaliação de risco tem como objetivo prevenir a ocorrência ou o agravamento da violência doméstica e
            familiar contra as mulheres.
          </p>

          <p class="avaliacao-risco">
            A coleta sistematizada e padronizada de informa&ccedil;&otilde;es permite&nbsp;
          <ul>
            <li style="line-height: 1.5; text-align: justify;">Fundamentar pedidos de medidas protetivas de urg&ecirc;ncia previstas na Lei Maria da Penha contribuindo para a celeridade de seu deferimento;&nbsp;</li>
            <li style="line-height: 1.5; text-align: justify;">Orientar a aplica&ccedil;&atilde;o das medidas de prote&ccedil;&atilde;o previstas no artigo 11&ordm; da Lei Maria da Penha;&nbsp;</li>
            <li style="line-height: 1.5; text-align: justify;">Prevenir o agravamento da viol&ecirc;ncia para v&iacute;timas sobreviventes de feminic&iacute;dios e/ou v&iacute;timas indiretas&nbsp;</li>
            <li style="line-height: 1.5; text-align: justify;">Organizar o encaminhamento e o acompanhamento das mulheres atrav&eacute;s da rede de servi&ccedil;os facilitando a comunica&ccedil;&atilde;o entre os profissionais com vistas a ampliar a prote&ccedil;&atilde;o para as mulheres.</li>
          </ul>
          </p>

          <el-button type="primary" size="small" @click="avaliacaoRisco">
            REALIZAR A AVALIAÇÃO DE RISCO (GRATUITO)!
          </el-button>

          <el-divider>
            <font-awesome-icon class="icon" icon="chart-line" />
          </el-divider>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import CicloItem from "../components/CicloItem.vue";
import Feed from "../components/Feed.vue";
export default {
  name: "Home",
  components: {
    CicloItem,
    Feed
  },
  data() {
    return {
      clicos: [
        {
          title: "AUMENTO DA TENSÃO",
          text: "Nesse primeiro momento, o agressor mostra-se tenso e irritado por coisas insignificantes, chegando a ter acessos de raiva. Ele também humilha a vítima, faz ameaças e destrói objetos.",
          icon: "thermometer-half",
        },
        {
          title: "ATO DE VIOLÊNCIA",
          text: "Esta fase corresponde à explosão do agressor, ou seja, a falta de controle chega ao limite e leva ao ato violento. Aqui, toda a tensão acumulada na Fase 1 se materializa em violência verbal, física, psicológica, moral ou patrimonial.",
          icon: "fist-raised",
        },
        {
          title: "ARREPENDIMENTO E COMPORTAMENTO CARINHOSO",
          text: "Também conhecida como “lua de mel”, esta fase se caracteriza pelo arrependimento do agressor, que se torna amável para conseguir a reconciliação.<br><br> A mulher se sente confusa e pressionada a manter o seu relacionamento diante da sociedade, sobretudo quando o casal tem filhos. Um misto de medo, confusão, culpa e ilusão fazem parte dos sentimentos da mulher.<br><br> Por fim, a tensão volta e, com ela, as agressões da Fase 1.",
          icon: "hand-holding-heart",
        },
      ],
    };
  },
  methods: {
    helpme() {
      this.$router.push({ name: "Pedir Ajuda!" }).then(() => window.scrollTo(0, 0));
    },
    avaliacaoRisco() {
      this.$router.push({ name: "Avaliação de Risco" }).then(() => window.scrollTo(0, 0));
    },
  },
};
</script>

<style scoped>
p,
h2 {
  text-align: center;
}
.avaliacao-risco {
  text-align: justify;
}
.card {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.main-flex {
  flex-direction: column;
  align-items: stretch;
  gap: 2em;
}
.grid {
  display: grid;
  min-height: 500px;
  grid-gap: 20px;
  grid-row-gap: 55px;
  grid-template-columns: 4fr 1fr;
  grid-template-areas:
    "feed feed"
    "info info"
    "ciclos ciclos"
    "area-avaliacao area-avaliacao";
}
.area-info {
  grid-area: info;
}
.area-ciclos {
  grid-area: ciclos;
}
.area-avaliacao{
  grid-area: area-avaliacao;
}
.info {
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 0 20%;
}
.ciclos {
  text-align: justify;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 50px;
}
.top-grid {
  display: flex;
  flex-direction: column;
  padding: 10px 15em;
  gap: 0px;
  min-height: unset;
}

@media (max-width: 800px) {
  .main-grid {
    display: grid;
    min-height: 500px;
    grid-gap: 20px;
    align-items: stretch;
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
  background: #f54949;
  grid-area: ajuda;
  height: 80px;
}
.title {
  grid-area: title;
  font-size: 36pt;
  margin: 0;
}
.subtitle {
  grid-area: subtitle;
  font-size: 16pt;
}
.lei {
  grid-area: lei;
  text-align: justify;
}
.title-lei {
  grid-area: title-lei;
    text-align: justify;

}
.existe-lei {
  grid-area: existe-lei;
}
.violencia {
  grid-area: violencia;
}
.feed {
  grid-area: feed;
}
</style>
