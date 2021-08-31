import { readonly } from "vue"

const debug = true,

const state = reactive({
    logged: false
}),

const methods = {
    setlogged(newValue) {
        if (debug) {
            console.log('setlogged triggered with', newValue)
        }

        state.logged = newValue
    },
}

export default {
    state: readonly(state),
    methods
}