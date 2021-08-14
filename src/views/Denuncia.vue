<template>
  <el-tabs v-model="tab" style="margin-top: 20px" tab-position="left">
    <el-tab-pane name="vitima" label="VÍtima">
      <FormPessoa @btn-click-next="changeTab('agressor')" :hideBtn="[true,false]" :text="'Dados da Vitima'" />
    </el-tab-pane>
    <el-tab-pane name="agressor" label="Agressor">
      <FormPessoa :hideBtn="[false,true]" @btn-click-prev="changeTab('vitima')"  :text="'Dados do Agressor'" />
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
          tab:'vitima'
      }
  },
  methods:{
      changeTab(tab){
          this.tab = tab;
      }
  }
};
</script>

<style>
</style>