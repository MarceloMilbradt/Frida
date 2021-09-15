import { createRouter, createWebHistory } from "vue-router";
import Formulario from "../views/Formulario";
import Home from "../views/Home";
import ListarDenuncia from "../views/ListarDenuncia";
import Denuncia from "../views/Denuncia";
import Info from "../views/Info";
import Login from "../views/Login";
//import Logout from '../views/Logout'
import Ajuda from "../views/Ajuda";
import ListarUsuario from "../views/ListarUsuario";
import CadastrarUsuario from "../views/CadastrarUsuario";

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
    path: "/Ajuda",
    name: "Ajuda",
    component: Ajuda,
    meta: {
      requiresAuth: false,
      icon: "el-icon-warning-outline",
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
    path: "/Avaliacao",
    name: "Avaliação",
    component: Formulario,
    meta: {
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
    path: "/Denuncia",
    name: "Cad. Denúncia",
    component: Denuncia,
    meta: {
      hideNavbar: true,
      requiresAuth: true,
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
      requiresAuth: true,
      icon: "el-icon-user",
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
