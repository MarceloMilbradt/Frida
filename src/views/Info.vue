<template>
  <h3>Formulário de Avaliação de Risco - FRIDA</h3>
  <el-collapse v-model="activeNames">
    <el-collapse-item name="1">
      <template #title>
        <b>Violência Doméstica</b>
      </template>
      <p>
        A violência doméstica contra a mulher é uma grave violação aos direitos
        humanos. Como é por todos sabido, os números da violência doméstica
        contra a mulher não param de subir a cada pesquisa. A magnitude das
        agressões, a crueldade das ações criminosas e o requinte da vileza são
        notícias de todos os dias. O feminicídio, por exemplo, é o crime do
        momento, sem que haja uma perspectiva racional para o prenúncio ao menos
        de um declínio.
      </p>
    </el-collapse-item>
    <el-collapse-item name="2">
      <template #title>
        <b>Lei Maria da Penha</b>
      </template>
      <p>
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
      </p>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
export default {
  name: "Info",
  data() {
    return {
      activeNames: ["1"],
    };
  },
};
</script>

<style scoped>
p {
  text-align: left;
}
</style>