<template>
    <el-card>
      <div class="grid top-grid">
        <h2 class="title">ERRO 404</h2>
        <h4 class="subtitle">PÁGINA NÃO ENCONTRADA</h4>
        <el-button class="ajuda" type="danger" size="big" @click="helpme">
          <router-link style="text-decoration: none; color: inherit;" :to="{name: 'Home'}">Voltar ao Ínicio</router-link>
        </el-button>

      </div>
    </el-card>
</template>

<script>
export default {

}
</script>

<style>

</style>