import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home";
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
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: false,
      home: true,
      hiddenH: true,
      icon: "el-icon-s-home",
    },
  },
  {
    path: "/Info",
    name: "Informações",
    component: Info,
    meta: {
      requiresAuth: false,
      icon: "el-icon-question",
    },
  },
  {
    path: "/ListarAjuda",
    name: "Ajudas",
    component: ListarAjuda,
    meta: {
      requiresAuth: true,
      icon: "el-icon-warning-outline",
    },
  },
  {
    path: "/Ajuda",
    name: "Ajuda",
    component: Ajuda,
    meta: {
      requiresAuth: false,
      icon: "el-icon-warning-outline",
    },
  },
  {
    path: "/ListarAvaliacao",
    name: "Avaliações",
    component: ListarFormulario,
    meta: {
      requiresAuth: true,
      icon: "el-icon-tickets",
    },
  },
  {
    path: "/Avaliacao",
    name: "Avaliação",
    component: Formulario,
    meta: {
      hideNavbar: true,
      requiresAuth: false,
      icon: "el-icon-tickets",
    },
  },
  {
    path: "/ListarDenuncia",
    name: "Denúncias",
    component: ListarDenuncia,
    meta: {
      requiresAuth: true,
      icon: "el-icon-warning-outline",
    },
  },
  {
    path: "/Denuncia/:id?",
    name: "Denúncia",
    component: Denuncia,
    meta: {
      requiresAuth: false,
      icon: "el-icon-warning-outline",
    },
  },
  {
    path: "/ListarUsuario",
    name: "Usuários",
    component: ListarUsuario,
    meta: {
      requiresAuth: true,
      icon: "el-icon-user",
    },
  },
  {
    path: "/CadastrarUsuario",
    name: "Cad. Usuários",
    component: CadastrarUsuario,
    meta: {
      hideNavbar: true,
      requiresAuth: false,
      icon: "el-icon-user",
    },
  },
  {
    path: "/ListarLog",
    name: "Log",
    component: ListarLog,
    meta: {
      requiresAuth: true,
      icon: "el-icon-receiving",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      requiresAuth: false,
      icon: "el-icon-unlock",
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
