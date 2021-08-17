<template>
  <el-tabs  v-model="tab" style="margin-top: 20px" tab-position="left">
    <el-tab-pane  label="VÍtima">
      <FormPessoa @btn-click-next="changeTab(+1)" :hideBtn="[true,false]" :text="'Dados da Vitima'"><el-checkbox v-model="terceiro">Não sou a vitima</el-checkbox></FormPessoa>
    </el-tab-pane>
        <el-tab-pane  label="Voce" v-if="terceiro">
      <FormPessoa @btn-click-next="changeTab(+1)" @btn-click-prev="changeTab(-1)" :anonimo="anonimo" :text="'Dados Pessoais'"><el-checkbox v-model="anonimo">Denuncia Anonima</el-checkbox></FormPessoa>
    </el-tab-pane>
    <el-tab-pane  label="Agressor">
      <FormPessoa :hideBtn="[false,true]" @btn-click-prev="changeTab(-1)"  :text="'Dados do Agressor'" />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import FormPessoa from "../components/FormPessoa.vue";
export default {
  components: {
    FormPessoa,
  },
  data(){
      return{
          tab: '0',
          terceiro:false,
          anonimo:false,
      }
  },
  methods:{
      changeTab(tab){
          this.tab = `${+this.tab + tab}`;
      }
  }
};
</script>

<style>
</style>