<template>
  <el-config-provider :locale="locale">
    <Header/>
    <el-main class="main">
      <router-view></router-view>
    </el-main>
    <Footer/>
  </el-config-provider>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
import locale from "element-plus/lib/locale/lang/pt-br";

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
  #app {
    padding-left: 5px;
    padding-top: 0px;
    padding-right: 5px;
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
    margin: 0;
    max-width: unset;
  }
}
</style>