import { createStore } from 'vuex'
import { login, logout, getCurrentUser } from '../controller/AuthService';
import router from '../router'

const denuncia = {
    namespaced: true,
    state: {
        denuncia: {
            vitima: {
                endereco: {},
                trabalho: {},
                filiacao: {},
                isValid: true,
            },

            agressor: {
                endereco: {},
                trabalho: {},
                filiacao: {},
                isValid: true,
            },
        }
    },
    mutations: {
        SET_FORM_VITIMA(state, form) {
            state.denuncia.vitima = form
        },
        SET_FORM_AGRESSOR(state, form) {
            state.denuncia.agressor = form
        },
        SET_VALID_AGRESSOR(state, v) {
            state.denuncia.agressor.isValid = v
        },
        SET_VALID_VITIMA(state, v) {
            state.denuncia.vitima.isValid = v
        },
        SET_DENUNCIA(state, form) {
            state.denuncia = form
        },
    },
    actions: {
        setFormAgressor({ commit }, form) {
            commit('SET_FORM_AGRESSOR', form)
        },
        setValidAgressor({ commit }, v) {
            commit('SET_VALID_AGRESSOR', v)
        },
        setDenuncia({ commit }, denuncia) {
            commit('SET_DENUNCIA', denuncia)
        },
        setFormVitima({ commit }, form) {
            commit('SET_FORM_VITIMA', form)
        },
        setValidVitima({ commit }, v) {
            commit('SET_VALID_VITIMA', v)
        },
    },
    getters: {
        getVitima(state) {
            return state.denuncia.vitima
        },
        getDenuncia(state) {
            return state.denuncia
        },
        getAgressor(state) {
            return state.denuncia.agressor
        },
        vitimaIsValid(state) {
            return state.denuncia.vitima.isValid
        },
        agressorIsValid(state) {
            return state.denuncia.agressor.isValid
        },
        denunciaIsValid(state) {
            return this.vitimaIsValid(state) && this.agressorIsValid(state)
        },
    },
}

const security = {
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
                router.push({ name: 'Página Inicial' })
        },
        async logout({ commit }) {
            router.push({ name: 'Home' })
            await logout()
            commit('LOGOUT_USER')
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
            let usr = getCurrentUser()
            if (usr && !!usr != state.logged)
                state.dispatch('setUser', usr)
            return state.logged

        },
        getInited(state) {
            return state.isInited
        },
    },
}

const algolia = {
    namespaced: true,

    state: {
        refreshed: false,
    },
    mutations: {
        SET_REFRESHED(state, refresh) {
            state.refreshed = refresh;
        },

    },
    actions: {
        setRefreshed({ commit }, refresh) {
            commit('SET_REFRESHED', refresh)
        },
    },
    getters: {
        getRefreshed(state) {
            return state.refreshed
        },
    },
}

const utils = {
    namespaced:true,
    state:{
        statusEnum: [
            {
              value: 0,
              descricao: "Aguardando Ação",
              icon: "exclamation",
              color: "yellow",
            },
            {
              value: 1,
              descricao: "Atendido",
              icon: "check",
              color: "green",
            },
            {
              value: 2,
              descricao: "Descartado",
              icon: "ban",
              color: "red",
            },
          ],
    },
    getters: {
        getStatusEnum(state) {
            return state.statusEnum
        },
    },
}

const store = createStore({
    modules: {
        security,
        denuncia,
        algolia,
        utils
    }
})

export default store