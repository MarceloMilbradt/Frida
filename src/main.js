import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import router from "./router";
import App from './App.vue';
import Maska from 'maska';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


createApp(App).use(Maska).use(ElementPlus).use(router).use(VueSweetalert2).mount('#app')
