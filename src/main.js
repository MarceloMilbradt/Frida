import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import router from "./router";
import App from './App.vue';
import Maska from 'maska';


createApp(App).use(Maska).use(ElementPlus).use(router).mount('#app')
