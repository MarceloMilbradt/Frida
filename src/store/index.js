import { createStore } from 'vuex'
import { login, logout, getCurrentUser } from '../controller/AuthService';
import router from '../router'

const store = createStore({
    state: {
        user: {},
        logged: getCurrentUser() != null,
        isInited: false,
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user
            state.logged = true
        },
        LOGOUT_USER(state) {
            state.user = {}
            state.logged = false
        },
        INITED(state) {
            state.isInited = true;
        }
    },
    actions: {
        setUser({ commit }, user) {
            commit('SET_USER', user)
        },
        async login({ dispatch }, { email, password }) {
            const result = await login(email, password).then(usr => {
                if (!usr)
                    return false
                dispatch('setUser', usr)
                return true
            })
            if (result)
                router.push({ name: 'Home' })
        },
        async logout({ commit }) {
            await logout()
            commit('LOGOUT_USER')
            router.push({ name: 'Home' })
        },
        stateChange({ dispatch, commit }, usr) {
            commit('INITED')
            if (usr) {
                dispatch('setUser', usr)
            } else {
                commit('LOGOUT_USER')
            }
        }
    },
    getters: {
        getUser(state) {
            return state.user
        },
        getLogged(state) {
            return state.logged
        },
        getInited(state) {
            return state.isInited
        },
    },
})

export default store