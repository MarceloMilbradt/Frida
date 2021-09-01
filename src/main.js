import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import '../themes/index.css';
import router from "./router";
import App from './App.vue';
import Maska from 'maska';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import store from './store'
import { setWatcher } from "./controller/AuthService";

let app = null;
setWatcher((usr) => {
    if (app)
        return
    app = createApp(App).use(Maska).use(ElementPlus).use(router).use(store).use(VueSweetalert2)
    store.dispatch('stateChange',usr)
    router.beforeEach((to, from, next) => {
        const logged = store.getters.getLogged;
        if (!logged && to.matched.some(record => record.meta.requiresAuth)) {
            return next('/login');
        }
        next();
    });
    app.mount('#app')
})
