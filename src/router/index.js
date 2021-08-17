import { createRouter, createWebHistory } from 'vue-router'
import Formulario from '../views/Formulario'
import Home from '../views/Home'
import Denuncia from '../views/Denuncia'
import Info from '../views/Info'
import Login from '../views/Login'

const routes = [
    {
        path: '/',
        name: '',
        component: Home,
        icon: 'el-icon-s-home'
    },
    {
        path: '/Info',
        name: 'Informações',
        component: Info,
        icon: 'el-icon-question'
    },
    {
        path: '/Avaliacao',
        name: 'Avaliação',
        component: Formulario,
        icon: 'el-icon-tickets'
    },
    {
        path: '/Denuncia',
        name: 'Denuncia',
        component: Denuncia,
        icon: 'el-icon-warning-outline'
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        icon: 'el-icon-unlock'
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router