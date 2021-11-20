<template>
  <el-menu :class="(
      vertical ? 'el-menu-vertical el-menu-full-height' : 'el-menu-horizontal'
    )+ ' menu-header-dark'" :collapse="vertical && isCollapse" :default-active="activeLink" :mode="vertical ? 'vertical' : 'horizontal'"
        background-color="#5D3FD3"
        text-color="#fff"
        active-text-color="#fff">
   
   <el-menu-item class="rotate-icon" v-if="vertical" @click="toggleExpand" :index="-2">
      <font-awesome-icon class="icon" :icon="!isCollapse ? 'angle-double-left':'angle-double-right'" />
    </el-menu-item>


    <div v-if="$store.getters.getLogged == false">
      <!-- MENU DO USUÁRIO ANONIMO -->
      <el-menu-item unique-opened class="menu-home" :index="1" @click="()=>gotoRoute('/')">
        <font-awesome-icon class="icon" icon="home" />
        <template #title>
          <span class="menu-item-name">Home</span>
        </template>
      </el-menu-item>
      <el-menu-item unique-opened class="menu-home" :index="2" @click="()=>gotoRoute('/Feed')">
        <font-awesome-icon class="icon" icon="newspaper" />
        <template #title>
          <span class="menu-item-name">Feed</span>
        </template>
      </el-menu-item>
      <el-menu-item class="menu-login" :index="3" @click="()=>gotoRoute('/login')">
        <font-awesome-icon class="icon" icon="sign-in-alt" />
        <template #title>
          <span class="menu-item-name">Login</span>
        </template>
      </el-menu-item>
    </div>

    <div v-if="$store.getters.getLogged == true">
      <!-- MENU DO USUÁRIO ADMIN (LOGADO) -->
      <el-menu-item :key="index" :index="rule.meta.id" v-for="(rule, index) in routes"  @click="()=>gotoRoute(rule.path)" >
        <font-awesome-icon class="icon" :icon="rule.meta?.icon" />
        <template v-if="rule.name && !(rule.meta?.hiddenH && !vertical)" #title>
          <span class="menu-item-name">{{ rule.name }}</span>
        </template>
      </el-menu-item>

      <el-menu-item :index="-1" @click="logout">
        <font-awesome-icon class="icon" icon="sign-out-alt" />
        <template #title>
          <span class="menu-item-name">Sair</span>
        </template>
      </el-menu-item>
    </div>
    
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
      activeLink: null,
    };
  },
  methods: {
    toggleExpand() {
      this.isCollapse = !this.isCollapse;
    },
    collapse() {
      this.isCollapse = true;
    },
    logout() {
      this.$store.dispatch("logout");
    },
    gotoRoute(path) {
      this.collapse();
      this.$router.push({ path });
    },
  },
  watch: {
    $route(to, from) {
      this.activeLink = to.meta.id;
    },
  },
  mounted() {
    this.activeLink = this.$route.meta.id;
  },
  computed: {
    routes() {
      const logged = this.$store.getters.getLogged;
      const [...routes] = this.$router.options.routes;
      return [
        ...routes.filter(
          (r) => r.meta?.requiresAuth === logged && r.meta?.hideNavbar !== true
        ),
      ];
    },
  },
};
</script>
<style scoped>
.menu-header-dark {
  margin-bottom: 2rem;
  background: var(--default-dark-tone);
  border-bottom: unset;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
}

@media (max-width: 800px) {
  .el-menu-horizontal .menu-item-name {
    display: none;
  }
}
.rotate-icon i {
  transition: all 0.5s;
}

.el-menu-vertical .right {
  float: right;
}
.el-menu-full-height {
  height: 100%;
}
.el-menu-vertical {
  text-align: center;
  position: fixed;
  z-index: 99;
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.menu-home {
  float: left;
}
.menu-login {
  float: right;
}
</style>
<style>
.icon {
  width: 1.15em;
  margin: 5px;
}
</style>