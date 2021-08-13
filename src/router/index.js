import {createRouter, createWebHistory} from 'vue-router'
import Formulario from '../views/Formulario'
import Home from '../views/Home'

const routes = [
    {
        path: '/',
        name: '',
        component: Home,
        icon: 'el-icon-s-home'
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
        component: Home,
        icon: 'el-icon-warning-outline'
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router