<template>
  <el-config-provider :locale="locale">
    <el-container v-loading="!$store.getters.getInited">
      <el-aside v-if="$store.getters.getLogged" width="65px"
        ><Header :vertical="true"
      /></el-aside>
      <el-container>
        <el-header v-if="!$store.getters.getLogged"><Header /></el-header>
        <el-main>
          <el-main class="main"> <router-view></router-view> </el-main
        ></el-main>
        <el-footer> <Footer /> </el-footer>
      </el-container>
    </el-container>
  </el-config-provider>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
import locale from "element-plus/lib/locale/lang/pt-br";
import { setWatcher } from './controller/AuthService';

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      locale: locale,
    };
  },
  mounted() {
    setWatcher((usr) => {
      this.$store.dispatch("stateChange", usr);
    });
  },
};
</script>

<style>
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
  padding-bottom: 1.563em;
  padding-left: 0.938em;
  padding-top: 0em;
  padding-right: 0.938em;
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
  max-width: 80vw;
}
@media (max-width: 800px) {
  .menu-item-name {
    display: none;
  }
  .main {
    min-width: 100%;
    margin: 0;
    max-width: unset;
  }
}
</style>