<template>
  <el-menu
    :router="true"
    :class="
      vertical ? 'el-menu-vertical el-menu-full-height' : 'el-menu-horizontal'
    "
    :collapse="vertical && isCollapse"
    :default-active="$route.path"
    :mode="vertical ? 'vertical' : 'horizontal'"
  >
    <el-menu-item v-if="vertical" @click="toggleExpand">
      <i class="el-icon-menu"></i>
    </el-menu-item>
    <el-menu-item
      :key="index"
      :index="rule.path"
      v-for="(rule, index) in routes"
      @click="collapse"
    >
      <i :class="rule.meta?.icon"></i>
      <template v-if="rule.name && !(rule.meta?.hiddenH && !vertical)" #title>
        <span class="menu-item-name">{{ rule.name }}</span>
      </template>
    </el-menu-item>
  </el-menu>
</template>
<script>
export default {
  name: "Header",
  props: {
    vertical: Boolean,
  },
  data() {
    return {
      isCollapse: true,
    };
  },
  methods: {
    toggleExpand() {
      this.isCollapse = !this.isCollapse;
    },
    collapse() {
      this.isCollapse = true;
    },
  },
  computed: {
    routes() {
      const logged = this.$store.getters.getLogged;
      const [home, ...routes] = this.$router.options.routes;
      return [home, ...routes.filter((r) => r.meta?.requiresAuth === logged)];
    },
  },
};
</script>
<style  scoped>
.el-menu-vertical ul li:last-child {
  float: right;
}
.el-menu-full-height {
  height: 100%;
}
.el-menu-vertical {
  text-align: center;
  position: fixed;
  z-index: 99999;
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>