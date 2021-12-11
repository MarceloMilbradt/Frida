<template>
  <el-config-provider :locale="locale">
    <el-container v-loading="!$store.getters.getInited" :class="($store.getters.getLogged)?'bg':'bg bg-publico'">
      <el-aside v-if="$store.getters.getLogged" width="65px">
        <Header :vertical="true" />
      </el-aside>
      <el-container>
        <el-header class="head" v-if="!$store.getters.getLogged">
          <Header />
        </el-header>
        <el-main :class="(
          (isHome ? 'main home' : 'main other') + 
          (this.$store.getters.getLogged ? ' plain' : ' colored'))">
          <router-view></router-view>
        </el-main>
        <el-footer>
          <Footer />
        </el-footer>
      </el-container>
    </el-container>
  </el-config-provider>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
import locale from "element-plus/lib/locale/lang/pt-br";
import { ElConfigProvider } from "element-plus";

export default {
  name: "App",
  components: {
    Header,
    Footer,
    ElConfigProvider,
  },
  data() {
    return {
      locale: locale,
    };
  },
  computed: {
    isHome() {
      return this.$route.meta.home;
    },
  },
};
</script>

<style scoped>
</style>

<style>
.el-main.main.other {
  padding: 1em;
  padding-top: 10em;
}
.el-main.main.home.colored {
  --default-color-bg-color: #fde2e2;
  padding: 0px;
}
:root {
  --default-color-bg-color: white;
  --el-color-primary-header: #4b218b;
  --default-dark-tone: #121212;
  --default-dark-tone-secondary: #cfcfcf;
  --el-menu-item-font-color: #cfcfcf;
}
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0em;
  /* padding-bottom: 1.563em; */
  /* padding-left: 0.938em; */
  padding-top: 0em;
  /* padding-right: 0.938em; */
  background-color: var(--default-color-bg-color);
  /* box-shadow: 0 2px 7px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
  margin-top: 10px;

  min-height: calc( 95vh - 20px); */
}
.el-menu-item.is-active {
  background: var(--el-color-primary);
  color: white
}
.el-menu--horizontal .el-menu-item:not(.is-disabled):focus
 {
    color: white;
}
.el-menu-vertical .el-menu-item.is-active {
  background: var(--el-color-primary-light-1);
}
.el-menu-vertical .el-menu-item.is-active:hover {
  background-color: var(--el-menu-item-hover-fill);
}
.el-menu-vertical .el-menu-item,.el-menu--horizontal .el-menu-item
{
    --el-menu-item-font-color: #cfcfcf;
}
.el-menu-item:hover {
  color: var(--el-color-primary-header);
}
main {
  padding-left: 0.938em;
  padding-right: 0.938em;
}
.bg {
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: cover;
  min-height: 100vh;
}
.bg-publico {
  background-image: url("./svg/background-fill-light.svg");
}
.bg-interno {
  background-image: url("./svg/background-fill-light-interno.svg");
}
.el-menu--horizontal > .el-menu-item {
  color: white;
}

@media (max-width: 800px) {
  #app {
    padding-left: 0.313em;
    padding-top: 0em;
    padding-right: 0.313em;
  }
}
</style>
<style scoped>
.main {
  min-width: 80vw;
  margin: 0 auto;
  /* max-width: 80vw; */
}
@media (max-width: 800px) {
  .main {
    min-width: 100%;
    margin: 0;
    max-width: unset;
  }
}
.el-footer {
  position: static;
  bottom: 0;
  text-align: center;
  width: 50%;
  margin: 0 auto;
}
html body {
  margin: 0;
  padding: 0;
}
</style>
