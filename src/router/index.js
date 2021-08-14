import {createRouter, createWebHistory} from 'vue-router'
import Formulario from '../views/Formulario'
import Home from '../views/Home'
import Denuncia from '../views/Denuncia'

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
        component: Denuncia,
        icon: 'el-icon-warning-outline'
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router