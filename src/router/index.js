import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home";
import Dashboard from "../views/Dashboard";
import Info from "../views/Info";
import ListarAjuda from "../views/ListarAjuda";
import Ajuda from "../views/Ajuda";
import ListarFormulario from "../views/ListarFormulario";
import Formulario from "../views/Formulario";
import ListarDenuncia from "../views/ListarDenuncia";
import Denuncia from "../views/Denuncia";
import ListarUsuario from "../views/ListarUsuario";
import CadastrarUsuario from "../views/CadastrarUsuario";
import ListarLog from "../views/ListarLog";
import Login from "../views/Login";
//import Logout from '../views/Logout'

const routes = [
  {
    path: "/",
    name: "",
    component: Home,
    meta: {
      home: true,
      requiresAuth: false,
      hiddenH: true,
      icon: "home",
    },
  },
  {
    path: "/",
    name: "Home",
    component: Dashboard,
    meta: {
      requiresAuth: true,
      home: true,
      hiddenH: true,
      icon: "home",
    },
  },
  // {
  //   path: "/Info",
  //   name: "Informações",
  //   component: Info,
  //   meta: {
  //     requiresAuth: false,
  //     icon: "info",
  //   },
  // },
  {
    path: "/ListarAjuda",
    name: "Ajudas",
    component: ListarAjuda,
    meta: {
      requiresAuth: true,
      icon: "heart",
    },
  },
  {
    path: "/Ajuda",
    name: "Pedir Ajuda!",
    component: Ajuda,
    meta: {
      requiresAuth: false,
      icon: "heart",
    },
  },
  {
    path: "/ListarAvaliacao",
    name: "Avaliações",
    component: ListarFormulario,
    meta: {
      requiresAuth: true,
      icon: "chart-line",
    },
  },
  {
    path: "/Avaliacao",
    name: "Avaliação",
    component: Formulario,
    meta: {
      hideNavbar: true,
      requiresAuth: false,
      icon: "chart-line",
    },
  },
  {
    path: "/ListarDenuncia",
    name: "Denúncias",
    component: ListarDenuncia,
    meta: {
      requiresAuth: true,
      icon: "fist-raised",
    },
  },
  {
    path: "/Denuncia/:id?",
    name: "Denúncia",
    component: Denuncia,
    meta: {
      hideNavbar: true,
      requiresAuth: true,
      icon: "fist-raised",
    },
  },
  {
    path: "/DenunciaAnonima",
    name: "Fazer Denúncia",
    component: Denuncia,
    meta: {
      requiresAuth: false,
      icon: "fist-raised",
    },
  },
  {
    path: "/ListarUsuario",
    name: "Usuários",
    component: ListarUsuario,
    meta: {
      requiresAuth: true,
      icon: "users",
    },
  },
  {
    path: "/CadastrarUsuario",
    name: "Cad. Usuários",
    component: CadastrarUsuario,
    meta: {
      hideNavbar: true,
      requiresAuth: false,
      icon: "users",
    },
  },
  {
    path: "/ListarLog",
    name: "Log",
    component: ListarLog,
    meta: {
      requiresAuth: true,
      icon: "clipboard-list",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      requiresAuth: false,
      icon: "sign-in-alt",
    },
  },
  // {
  //     path: '/Logout',
  //     name: 'Logout',
  //     component: Logout,
  //     meta: {
  //         requiresAuth: true,
  //         icon: 'el-icon-unlock',
  //     }
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
