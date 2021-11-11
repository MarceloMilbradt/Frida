import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home";
import Dashboard from "../views/Dashboard";
import Info from "../views/Info";
import ListarAjuda from "../views/ListarAjuda";
import Ajuda from "../views/Ajuda";
import ListarFormulario from "../views/ListarFormulario";
import Formulario from "../views/Formulario";
import ListarDenuncia from "../views/ListarDenuncia";
import ListarDenunciaAnonima from "../views/ListarDenunciaAnonima";
import Denuncia from "../views/Denuncia";
import DenunciaAnonima from "../views/DenunciaAnonima";
import ListarUsuario from "../views/ListarUsuario";
import CadastrarUsuario from "../views/CadastrarUsuario";
import ListarLog from "../views/ListarLog";
import Login from "../views/Login";
import NotFound from "../views/NotFound";
//import Logout from '../views/Logout'

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      id: 0,
      home: true,
      requiresAuth: false,
      hiddenH: true,
      icon: "home",
    },
  },
  {
    path: "/Home",
    name: "Página Inicial",
    component: Dashboard,
    meta: {
      id: 0,
      requiresAuth: true,
      home: true,
      hiddenH: true,
      icon: "home",
    },
  },
  {
    path: "/ListarAjuda",
    name: "Ajudas",
    component: ListarAjuda,
    meta: {
      id: 1,
      requiresAuth: true,
      icon: "heart",
    },
  },
  {
    path: "/Ajuda",
    name: "Pedir Ajuda!",
    component: Ajuda,
    meta: {
      id: 1,
      requiresAuth: false,
      icon: "heart",
    },
  },
  {
    path: "/ListarAvaliacao",
    name: "Avaliações",
    component: ListarFormulario,
    meta: {
      id: 2,
      requiresAuth: true,
      icon: "chart-line",
    },
  },
  {
    path: "/Avaliacao",
    name: "Avaliação de risco",
    component: Formulario,
    meta: {
      id: 2,
      hideNavbar: false,
      requiresAuth: false,
      icon: "chart-line",
    },
  },
  {
    path: "/Denuncia/:id?",
    name: "Denúncia",
    component: Denuncia,
    meta: {
      id: 3,
      hideNavbar: true,
      requiresAuth: true,
      icon: "fist-raised",
    },
  },
  {
    path: "/CasosAcolhidos",
    name: "Casos",
    component: ListarDenuncia,
    meta: {
      id: 3,
      requiresAuth: true,
      icon: "folder-open",
    },
    children: []
  },
  {
    path: "/ListarDenuncia",
    name: "Denúncias",
    component: ListarDenunciaAnonima,
    meta: {
      id: 4,
      requiresAuth: true,
      icon: "fist-raised",
    },
    children: []
  },
  {
    path: "/Denuncia/",
    name: "Novo Caso",
    component: Denuncia,
    meta: {
      id: 3,
      quickAccess: true,
      hideNavbar: true,
      requiresAuth: true,
      icon: "folder-open",
    },
  },
  {
    path: "/DenunciaAnonima",
    name: "Fazer Denúncia",
    component: DenunciaAnonima,
    meta: {
      id: 4,
      requiresAuth: false,
      icon: "fist-raised",
    },
  },
  {
    path: "/ListarUsuario",
    name: "Usuários",
    component: ListarUsuario,
    meta: {
      id: 5,
      requiresAuth: true,
      icon: "users",
    },
  },
  {
    path: "/CadastrarUsuario",
    name: "Cad. Usuários",
    component: CadastrarUsuario,
    meta: {
      id: 5,
      quickAccess: true,
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
      id: 6,
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
  {
    path: '/:catchAll(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      id: null
    }
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
