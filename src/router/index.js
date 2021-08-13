import {createRouter, createWebHistory} from 'vue-router'
import Formulario from '../views/Formulario'
import Home from '../views/Home'

const routes = [
    {
        path: '/formulario',
        name: 'Formulario',
        component: Formulario,
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router