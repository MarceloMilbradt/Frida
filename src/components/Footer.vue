<template>
  <footer>
    <p>Copyright &copy; 2021</p>
  </footer>
  <el-affix position="bottom" :offset="60" class="btn-panic">
    <el-popover
      placement="top-start"
      title="Pânico"
      :width="200"
      trigger="hover"
      content="Clique para trocar de página!"
      :hide-after="200"
    >
      <template #reference
        ><el-button
          type="danger"
          icon="el-icon-warning-outline"
          class="icon"
          round
          @click="redirect"
        ></el-button
      ></template>
    </el-popover>
  </el-affix>
</template>


<script>
export default {
  name: "Footer",
  methods: {
    redirect() {
      const urls = [
        "https://www.google.com/",
      ];
      let i = Math.floor(Math.random() * urls.length) + 1;
      window.location.href = urls[i];
    },
  },
};
</script>
<style scoped>
a {
  color: #333;
}
footer {
  margin-top: 30px;
  text-align: center;
}
.btn-panic {
  float: right;
  margin-right: 20px;
}
.icon {
  font-size: 40px;
}
@media (max-width: 800px) {
  .btn-panic {
    float: right;
    margin-right: 15px;
  }
  .icon {
    font-size: 25px;
  }
}
</style>