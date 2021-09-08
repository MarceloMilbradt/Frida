<template>
  <footer>
    <p>Copyright &copy; 2021</p>
  </footer>
  <el-affix
    v-if="!$store.getters.getLogged"
    position="bottom"
    :offset="60"
    class="btn-panic"
  >
    <el-popover
      placement="left"
      title="Pânico"
      :width="200"
      trigger="manual"
      :visible="visible"
      content="Clique para trocar de página!"
    >
      <template #reference>
        <el-button
          type="danger"
          icon="el-icon-warning-outline"
          class="icon"
          round
          @click="redirect"
        ></el-button>
      </template>
    </el-popover>
  </el-affix>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    redirect() {
      const urls = ["https://www.amazon.com.br/", "https://www.google.com/"];
      let i = Math.floor(Math.random() * urls.length);
      window.location.href = urls[i];
    },
  },

  mounted: function() {
    this.$nextTick(function() {
      setTimeout(() => (this.visible = true), 1000);
      setTimeout(() => (this.visible = false), 6000);
    });
  },
};
</script>
<style scoped>
a {
  color: #333;
}
footer {
  text-align: center;
}
.el-button.el-button--danger.is-round.icon {
  bottom: 20vh;
  position: fixed;
  right: 1.5rem;
  background-color: #ffbaba;
}
.el-button.el-button--danger.is-round.icon:hover {
  background-color: #ffe5e5;
}
.btn-panic {
  float: right;
  margin-right: 1.25em;
}
.icon {
  font-size: 2.5em;
}
@media (max-width: 800px) {
  .btn-panic {
    float: right;
    margin-right: 0.938em;
  }
  .icon {
    font-size: 1.563em;
  }
}
</style>
