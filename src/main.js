import { createApp, component } from 'vue'
import ElementPlus from 'element-plus';
import '../themes/index.css';
import router from "./router";
import App from './App.vue';
import Maska from 'maska';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import store from './store'
import { setWatcher } from "./controller/AuthService";
import InstantSearch from 'vue-instantsearch/vue3/es';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faFemale,
    faHeart,
    faIdCard,
    faExclamation,
    faTags,
    faCalendarAlt,
    faEdit,
    faSearch,
    faTrashAlt,
    faHandsHelping,
    faFistRaised,
    faChartLine,
    faUsers,
    faClipboardList,
    faInfo,
    faHome,
    faSignOutAlt,
    faSignInAlt,
    faAngleDoubleRight,
    faAngleDoubleLeft,
    faExclamationTriangle,
    faExternalLinkAlt,
    faThermometerHalf,
    faHandHoldingHeart,
    faStar,
    faFolderOpen,
    faUser,
    faPhoneAlt,
    faMapMarkerAlt,
    faCheck,
    faBan,
    faComment,
    faCalendarWeek,
    faInfoCircle,
    faNewspaper
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faNewspaper, faInfoCircle, faCalendarWeek, faComment, faCheck, faBan, faMapMarkerAlt, faPhoneAlt, faUser, faFolderOpen, faStar, faHandHoldingHeart, faThermometerHalf, faExternalLinkAlt, faExclamationTriangle, faAngleDoubleLeft, faAngleDoubleRight, faSignInAlt, faSignOutAlt, faHome, faInfo, faClipboardList, faUsers, faChartLine, faFistRaised, faFemale, faHeart, faIdCard, faExclamation, faTags, faCalendarAlt, faEdit, faSearch, faTrashAlt, faHandsHelping);

let app = null;
setWatcher((usr) => {
    if (app)
        return
    app = createApp(App).component("font-awesome-icon", FontAwesomeIcon).use(Maska).use(InstantSearch).use(ElementPlus).use(router).use(store).use(library).use(VueSweetalert2)
    store.dispatch('stateChange', usr)
    router.beforeEach((to, from, next) => {
        const logged = store.getters.getLogged;
        if (!logged && to.matched.some(record => record.meta.requiresAuth)) {
            return next('/login');
        } else if (logged && to.matched.some(record => record.path === "/")) {
            return next('/Home');
        }
        next();
    });
    app.mount('#app')
})
