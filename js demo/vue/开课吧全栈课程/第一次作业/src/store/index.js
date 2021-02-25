import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        count: 0,
    },
    getters: {
        doubleCount(state) {
            return state.count * 2
        }
    },
    mutations: {
        add(state) {
            state.count++
        },
    },
    actions: {
        add({ commit }) {
            setTimeout(() => {
                // 这里调用this指向window，commit方法内部的this调用会拿不到属性，call也不行，拿不到指向store的this
                commit('add')
            }, 1000)
        },
    },
})
