<template>
  <el-steps :active="tab" finish-status="success" align-center class="text-left spaced">
    <el-step title="Vitima" description="Informações quem sofreu a agressão"></el-step>
    <el-step title="Agressor" description="Informações quem cometeu a agressão"></el-step>
    <el-step title="Adicionais" description="Algumas informaçoes adicionais sobre o que ocorreu"></el-step>
  </el-steps>
</template>

<script>
export default {
    name:"Steps",
    props: ["tab"]
};
</script>

<style scoped>
.text-left{
  text-align: left;
}
.spaced{
    margin: 25px 0
}

</style>