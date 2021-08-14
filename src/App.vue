<template>
  <el-config-provider :locale="locale">
  <el-container>
    <el-header>
      <el-menu :router="true" :default-active="$route.path" mode="horizontal">
        <el-menu-item
          :key="index"
          :index="rule.path"
          v-for="(rule, index) in $router.options.routes"
        >
          <i :class="rule.icon"></i
          ><span class="menu-item-name">{{ rule.name }}</span>
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-main class="main">
      <router-view></router-view>
    </el-main>
  </el-container>
  </el-config-provider>
</template>

<script>
import locale from 'element-plus/lib/locale/lang/pt-br'
export default {
  name: "App",
  data() {
    return {
      locale: locale,
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  padding-bottom: 25px;
  padding-left: 15px;
  padding-top: 0px;
  padding-right: 15px;
  background-color: white;
  /* box-shadow: 0 2px 7px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
  margin-top: 10px;

  min-height: calc( 95vh - 20px); */
}
.el-menu-item.is-active i {
  color: var(--el-color-primary);
}

@media (max-width: 800px) {
  .menu-item-name {
    display: none;
  }

}
</style>
<style scoped>

.main {
    min-width: 80vw;
    margin: 0 auto;
    max-width: 80vw;
}
@media (max-width: 800px) {
  .menu-item-name {
    display: none;
  }
  .main {
    min-width: unset;
    margin: 0 auto;
    max-width: unset;
  }

}
</style>